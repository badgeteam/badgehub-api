import pg from "pg";
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from "@config";
import sql, { raw } from "sql-template-tag";
import { DBDatedData } from "@shared/dbModels/project/DBDatedData";
import { DBInsertAppMetadataJSON } from "@shared/dbModels/project/DBAppMetadataJSON";
import { getInsertKeysAndValuesSql } from "@db/sqlHelpers/objectToSQL";
import { DBInsertProjectStatusOnBadge } from "@shared/dbModels/DBProjectStatusOnBadge";
import { BadgeHubData } from "@domain/BadgeHubData";
import { PostgreSQLBadgeHubMetadata } from "@db/PostgreSQLBadgeHubMetadata";
import { PostgreSQLBadgeHubFiles } from "@db/PostgreSQLBadgeHubFiles";
import { exec } from "node:child_process";
import { stringToSemiRandomNumber } from "@dev/stringToSemiRandomNumber";
import { CATEGORIES } from "@shared/domain/readModels/project/Category";

const CATEGORY_NAMES = Object.values(CATEGORIES);

const nameToSlug = (name: string) => name.toLowerCase().replaceAll(" ", "_");
const BADGES = ["mch2022", "troopers23", "WHY2025"] as const; // Hardcoded! Update by hand
const badgeSlugs = BADGES.map(nameToSlug); // Hardcoded! Update by hand

const CATEGORIES_COUNT = CATEGORY_NAMES.length;

export async function repopulateDB() {
  const pool = new pg.Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: POSTGRES_PORT,
  });
  const client: pg.PoolClient = await pool.connect();
  const badgeHubData = new BadgeHubData(
    new PostgreSQLBadgeHubMetadata(),
    new PostgreSQLBadgeHubFiles()
  );
  try {
    await cleanDatabases(client);
    await populateDatabases(client, badgeHubData);
  } finally {
    client.release();
  }

  const shouldRunWithPodman = await new Promise((resolve) =>
    exec("podman --version", (error) => {
      if (error) {
        resolve(false); // assuming podman is not in use
      } else {
        // podman is in use, so we'll use that
        resolve(true);
      }
    })
  );
  if (shouldRunWithPodman) {
    exec("npm run podman:overwrite-mockup-data");
  } else {
    exec("npm run docker:overwrite-mockup-data");
  }
}

async function cleanDatabases(client: pg.PoolClient) {
  const tablesWithoutIdSeq = ["projects", "categories", "badges"];
  for (const table of tablesWithoutIdSeq) {
    await client.query(sql`delete
                           from ${raw(table)}`);
  }
  const tablesWithIdSeq = [
    "files",
    "file_data",
    "app_metadata_jsons",
    "versions",
    "versioned_dependencies",
    "project_statuses_on_badges",
  ];
  for (const table of tablesWithIdSeq) {
    await client.query(sql`delete
                           from ${raw(table)}`);
    await client.query(sql`alter sequence ${raw(table)}_id_seq restart`);
  }
}

const TWENTY_FOUR_HOURS_IN_MS = 24 * 60 * 60 * 1000;
const SIX_HUNDRED_DAYS_IN_MS = 600 * TWENTY_FOUR_HOURS_IN_MS;

const getSemiRandomDates = async (stringToDigest: string) => {
  const semiRandomNumber = await stringToSemiRandomNumber(stringToDigest);
  const createMillisBack = semiRandomNumber % SIX_HUNDRED_DAYS_IN_MS;
  const created_at = date(createMillisBack);

  const updated_at = date(
    createMillisBack -
      Math.min(
        0,
        createMillisBack - (semiRandomNumber % (1234 * TWENTY_FOUR_HOURS_IN_MS))
      )
  );
  return { created_at, updated_at };
};

async function insertBadges(client: pg.PoolClient) {
  for (const badgeName of BADGES) {
    const { created_at, updated_at } = await getSemiRandomDates(badgeName);
    await client.query(
      sql`insert into badgehub.badges (name, slug, created_at, updated_at)
          values (${badgeName}, ${nameToSlug(badgeName)}, ${created_at}, ${updated_at})`
    );
  }
}

async function insertCategories(client: pg.PoolClient) {
  for (const categoryName of CATEGORY_NAMES) {
    const { created_at, updated_at } = await getSemiRandomDates(categoryName);
    await client.query(
      sql`insert into badgehub.categories (name, slug, created_at, updated_at)
          values (${categoryName}, ${nameToSlug(categoryName)}, ${created_at}, ${updated_at})`
    );
  }
}

const get1DayAfterSemiRandomUpdatedAt = async (projectSlug: string) => {
  return new Date(
    Date.parse((await getSemiRandomDates(projectSlug)).updated_at) +
      TWENTY_FOUR_HOURS_IN_MS
  ).toISOString();
};

async function publishSomeProjects(
  badgeHubData: BadgeHubData,
  projectNames: string[]
) {
  const halfOfProjectNames = projectNames.slice(0, projectNames.length >> 1);
  await Promise.all(
    halfOfProjectNames.map(async (projectName) => {
      await badgeHubData.publishVersion(
        projectName.toLowerCase(),
        await get1DayAfterSemiRandomUpdatedAt(projectName)
      );
      await writeDraftAppFiles(badgeHubData, projectName, "0.0.1");
    })
  );
}

async function populateDatabases(
  client: pg.PoolClient,
  badgeHubData: BadgeHubData
) {
  await insertBadges(client);
  await insertCategories(client);
  const projectNames = await insertProjects(badgeHubData);
  await publishSomeProjects(badgeHubData, projectNames);
  await badgeProjectCrossTable(
    client,
    projectNames.map((s) => s.toLowerCase())
  );
}

function date(millisBackFrom2025: number) {
  const MAX_DATE = new Date(2025, 0);
  return new Date(MAX_DATE.getTime() - millisBackFrom2025).toISOString();
}

async function getDescription(appName: string) {
  switch ((await stringToSemiRandomNumber(appName)) % 4) {
    case 0:
      return `Use ${appName} for some cool graphical effects.`;
    case 1:
      return `With ${appName}, you can do interesting things with the sensors.`;
    case 2:
      return `Make some magic happen with ${appName}.`;
    case 3:
      return `${appName} is just some silly test app.`;
  }
}

const USERS = [
  "TechTinkerer",
  "CodeCrafter",
  "PixelPilot",
  "LogicLion",
  "ElectronEager",
  "NanoNomad",
  "CircuitCraze",
  "GameGlider",
  "ByteBlast",
  "CyberCraft",
  "DigitalDynamo",
  "CodeCreator",
  "PixelPulse",
  "LogicLuminary",
  "ElectronEcho",
  "NanoNinja",
  "CircuitChampion",
  "GameGazer",
  "ByteBuddy",
  "TechTornado",
  "CodeChampion",
  "PixelProdigy",
  "LogicLabyrinth",
  "ElectronExplorer",
  "NanoNavigator",
  "CircuitCatalyst",
  "GameGuru",
  "ByteBlaze",
  "DigitalDreamer",
  "CodeCommander",
  "PixelPioneer",
  "LogicLegend",
  "ElectronElite",
  "NanoNerd",
  "CircuitCaptain",
  "GameGenius",
  "ByteBolt",
  "CyberCipher",
  "CodeConqueror",
  "PixelPaladin",
  "LogicLore",
  "ElectronEnigma",
  "CircuitConnoisseur",
  "GameGuardian",
  "ByteBandit",
  "TechTinker",
  "CodeCrusader",
  "PixelPirate",
  "ElectronEagle",
  "CircuitSavant",
  "GameGladiator",
  "ByteBlitz",
  "CyberSavvy",
  "CodeCraftsman",
  "PixelPro",
  "LogicLoreMaster",
  "ElectronEmperor",
  "CircuitChamp",
  "GameGizmo",
  "ByteBrawler",
  "TechTrailblazer",
  "CodeCaptain",
  "PixelPathfinder",
  "LogicLionheart",
  "ElectronExpedition",
  "NanoNoble",
  "CircuitCommander",
  "GameGlobetrotter",
  "CyberSherpa",
  "CyberCraftsman",
  "CodeConnoisseur",
];

const writeDraftAppFiles = async (
  badgeHubData: BadgeHubData,
  projectName: string,
  semanticVersion: string = ""
) => {
  const semiRandomNumber = await stringToSemiRandomNumber(projectName);
  const projectSlug = projectName.toLowerCase();
  const description = await getDescription(projectName);
  const userId = semiRandomNumber % USERS.length;
  const categoryId = semiRandomNumber % CATEGORIES_COUNT;

  const { created_at, updated_at } = await getSemiRandomDates(projectName);

  const appMetadata: DBInsertAppMetadataJSON & DBDatedData = {
    name: projectName,
    description,
    interpreter: "python",
    author: USERS[userId]!,
    license_file: "MIT",
    category: CATEGORY_NAMES[categoryId],
    created_at,
    updated_at,
  };
  if (semanticVersion !== "") {
    appMetadata.semantic_version = semanticVersion;
  }

  const metadataJsonContent = Buffer.from(JSON.stringify(appMetadata));
  await badgeHubData.writeDraftFile(
    projectSlug,
    "metadata.json",
    {
      mimetype: "application/json",
      size: metadataJsonContent.length,
      fileContent: metadataJsonContent,
    },
    { created_at, updated_at }
  );

  const initPyContent = Buffer.from(
    `print('Hello world from the ${projectName} app${semanticVersion}')`
  );
  await badgeHubData.writeDraftFile(
    projectSlug,
    "__init__.py",
    {
      mimetype: "text/x-python-script",
      size: initPyContent.length,
      fileContent: initPyContent,
    },
    { created_at, updated_at }
  );
};

async function insertProjects(badgeHubData: BadgeHubData) {
  const projectNames = [
    "CodeCraft",
    "PixelPulse",
    "BitBlast",
    "NanoGames",
    "ElectraPlay",
    "CircuitForge",
    "ByteBash",
    "CodeCanvas",
    "SparkScript",
    "LogicLand",
    "MicroArcade",
    "CodeCraze",
    "GameGenius",
    "PixelPal",
    "Electronica",
    "CodeQuest",
    "CircuitCraft",
    "ByteBeat",
    "NanoNexus",
    "BitBox",
    "CircuitChaos",
    "CodeCrafter",
    "PixelPioneer",
    "LogicLab",
    "ByteBlitz",
    "CodeWave",
    "NanoNet",
    "ElectraForge",
    "GameGrid",
    "LogicLoom",
    "PixelPlaza",
    "CodeCity",
    "NanoArcade",
    "ElectronEra",
    "BitBazaar",
    "LogicLegends",
    "CodeClan",
    "PixelPortal",
    "CircuitCraze",
    "ByteBuster",
    "NanoNovel",
    "ElectraEden",
    "CodeComet",
    "PixelPlayground",
    "LogicLandia",
    "ByteBounce",
    "CircuitCarnival",
    "CodeCove",
    "NanoNest",
    "ElectraEntertain",
    "GameGalaxy",
    "LogicLabyrinth",
    "ByteBlaster",
    "CodeCompass",
    "NanoNation",
    "ElectraEmpire",
    "GameGarden",
    "PixelPeak",
    "CircuitCelestial",
    "CodeCrusade",
    "NanoNebula",
    "ElectraEnclave",
    "GameGizmo",
    "PixelPlanet",
    "LogicLounge",
    "ByteBeacon",
    "CodeCircus",
    "NanoNook",
    "ElectraElysium",
    "GameGlimpse",
    "PixelParadise",
    "CodeCoast",
    "NanoNirvana",
    "ElectraEdifice",
    "GameGen",
    "PixelPandemonium",
    "LogicLagoon",
    "ByteBlaze",
    "CodeCorridor",
    "HackSimulator",
    "CodeCrunch",
    "SecureCraft",
    "CryptoPulse",
    "DataForge",
    "CipherQuest",
    "HackQuest",
    "SecureSphere",
  ];

  for (const projectName of projectNames) {
    const semiRandomNumber = await stringToSemiRandomNumber(projectName);
    const slug = projectName.toLowerCase();
    const userName = USERS[semiRandomNumber % USERS.length]!;

    const { created_at, updated_at } = await getSemiRandomDates(projectName);

    await badgeHubData.insertProject(
      { slug, idp_user_id: userName },
      { created_at, updated_at }
    );
    await writeDraftAppFiles(badgeHubData, projectName);
  }

  return projectNames;
}

async function badgeProjectCrossTable(
  client: pg.PoolClient,
  projectSlugs: string[]
) {
  for (let index = 0; index < projectSlugs.length; index++) {
    let projectSlug = projectSlugs[index]!;
    const semiRandomNumber = await stringToSemiRandomNumber(projectSlug);
    const badgeSlug = badgeSlugs[semiRandomNumber % 3]!;
    let insertObject1: DBInsertProjectStatusOnBadge = {
      badge_slug: badgeSlug,
      project_slug: projectSlug,
      ...(await getSemiRandomDates([projectSlug, badgeSlug].join(","))),
    };
    const insert1 = getInsertKeysAndValuesSql(insertObject1);
    await client.query(
      sql`insert into project_statuses_on_badges (${insert1.keys})
          values (${insert1.values})`
    );

    // Some project support two badges
    const badgeId2 = badgeSlugs[semiRandomNumber % 3]!;
    if (badgeId2 != badgeSlug && semiRandomNumber % 3 == 1) {
      const insertObject2: DBInsertProjectStatusOnBadge = {
        badge_slug: badgeId2,
        project_slug: projectSlug,
      };
      const insert2 = getInsertKeysAndValuesSql(insertObject2);
      await client.query(
        sql`insert into badgehub.project_statuses_on_badges (${insert2.keys})
            values (${insert2.values})`
      );
    }
  }
}
