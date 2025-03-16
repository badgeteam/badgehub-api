import pg from "pg";
import { Express, Router } from "express";
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from "@config";
import sql from "sql-template-tag";
import { DBInsertUser } from "@db/models/app/DBUser";
import { DBDatedData } from "@db/models/app/DBDatedData";
import { DBInsertProject } from "@db/models/app/DBProject";
import { DBInsertAppMetadataJSON } from "@db/models/app/DBAppMetadataJSON";
import { getInsertKeysAndValuesSql } from "@db/sqlHelpers/objectToSQL";
import { DBInsertProjectStatusOnBadge } from "@db/models/DBProjectStatusOnBadge";
import { BadgeHubData } from "@domain/BadgeHubData";
import { PostgreSQLBadgeHubMetadata } from "@db/PostgreSQLBadgeHubMetadata";
import { stringToNumberDigest } from "@util/digests";
import { PostgreSQLBadgeHubFiles } from "@db/PostgreSQLBadgeHubFiles";

const CATEGORY_NAMES = [
  "Uncategorised",
  "Event related",
  "Games",
  "Graphics",
  "Hardware",
  "Utility",
  "Wearable",
  "Data",
  "Silly",
  "Hacking",
  "Troll",
  "Unusable",
  "Adult",
  "Virus",
  "SAO",
  "Interpreter",
] as const;

const nameToSlug = (name: string) => name.toLowerCase().replaceAll(" ", "_");
const BADGES = ["mch2022", "troopers23", "WHY2025"] as const; // Hardcoded! Update by hand
const badgeSlugs = BADGES.map(nameToSlug); // Hardcoded! Update by hand

const CATEGORIES_COUNT = CATEGORY_NAMES.length;
export default function setupPopulateDBApi(app: Express) {
  const router = Router();

  app.use("/populate", router);

  const pool = new pg.Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: POSTGRES_PORT,
  });
  router.post("", async (req, res) => {
    const client: pg.PoolClient = await pool.connect();
    const badgeHubData = new BadgeHubData(
      new PostgreSQLBadgeHubMetadata(),
      new PostgreSQLBadgeHubFiles()
    );
    try {
      await cleanDatabases(client);
      await populateDatabases(client, badgeHubData);
      return res.status(200).send("Population done.");
    } finally {
      client.release();
    }
  });
}

async function cleanDatabases(client: pg.PoolClient) {
  await client.query(sql`delete from files`);
  await client.query(sql`alter sequence files_id_seq restart`);
  await client.query(sql`delete from users`);
  await client.query(sql`alter sequence users_id_seq restart`);
  await client.query(sql`delete from projects`);
  await client.query(sql`delete from app_metadata_jsons`);
  await client.query(sql`alter sequence app_metadata_jsons_id_seq restart`);
  await client.query(sql`delete from versions`);
  await client.query(sql`alter sequence versions_id_seq restart`);
  await client.query(sql`delete from versioned_dependencies`);
  await client.query(sql`alter sequence versioned_dependencies_id_seq restart`);
  await client.query(sql`delete from project_statuses_on_badges`);
  await client.query(
    sql`alter sequence project_statuses_on_badges_id_seq restart`
  );
  await client.query(sql`delete from categories`);
  await client.query(sql`delete from badges`);
}

const TWENTY_FOUR_HOURS_IN_MS = 24 * 60 * 60 * 1000;
const SIX_HUNDRED_DAYS_IN_MS = 600 * TWENTY_FOUR_HOURS_IN_MS;

const getSemiRandomDates = async (stringToDigest: string) => {
  const semiRandomNumber = await stringToNumberDigest(stringToDigest);
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

async function populateDatabases(
  client: pg.PoolClient,
  badgeHubData: BadgeHubData
) {
  await insertBadges(client);
  await insertCategories(client);
  const userCount = await insertUsers(badgeHubData);
  const projectSlugs = await insertProjects(badgeHubData, userCount);
  await badgeProjectCrossTable(client, projectSlugs);
}

function date(millisBackFrom2025: number) {
  const MAX_DATE = new Date(2025, 0);
  return new Date(MAX_DATE.getTime() - millisBackFrom2025).toISOString();
}

async function getDescription(appName: string) {
  switch ((await stringToNumberDigest(appName)) % 4) {
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

async function insertUsers(badgeHubData: BadgeHubData) {
  const domains = [
    "bitlair.nl",
    "hackalot.nl",
    "techinc.nl",
    "hack42.nl",
    "gmail.com",
    "hotmail.com",
  ];
  for (let id = 0; id < USERS.length; id++) {
    const name = USERS[id]!;
    const semiRandomNumber = await stringToNumberDigest(name);
    const isAdmin = semiRandomNumber % 10 == 0;
    const email = `${name.toLowerCase()}@${domains[semiRandomNumber % domains.length]}`;
    const password = "****";
    const isPublic = semiRandomNumber % 10 != 0;
    const showProjects = semiRandomNumber % 10 != 0;
    const { created_at, updated_at } = await getSemiRandomDates(name);

    console.log(`insert into users ${name}`);
    const toInsert: DBInsertUser & DBDatedData = {
      id,
      admin: isAdmin,
      name,
      email,
      password,
      public: isPublic,
      show_projects: showProjects,
      created_at,
      updated_at,
    };

    await badgeHubData.insertUser(toInsert);
  }

  return USERS.length;
}

async function insertProjects(badgeHubData: BadgeHubData, userCount: number) {
  const projectSlugs = [
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

  for (let id = 0; id < projectSlugs.length; id++) {
    const name = projectSlugs[id]!;
    const semiRandomNumber = await stringToNumberDigest(name);
    const slug = name.toLowerCase();
    const description = await getDescription(name);
    const userId = semiRandomNumber % userCount;
    const categoryId = semiRandomNumber % CATEGORIES_COUNT;
    const { created_at, updated_at } = await getSemiRandomDates(name);

    console.log(`insert into projects ${name} (${description})`);

    const inserted: DBInsertProject & DBDatedData = {
      slug,
      user_id: userId,
      created_at,
      updated_at,
    };

    await badgeHubData.insertProject(inserted);
    const appMetadata: DBInsertAppMetadataJSON & DBDatedData = {
      name,
      description,
      interpreter: "python",
      author: USERS[userId]!,
      license_file: "MIT",
      category: CATEGORY_NAMES[categoryId],
      created_at,
      updated_at,
    };

    const metadataJsonContent = Buffer.from(JSON.stringify(appMetadata));
    await badgeHubData.writeDraftFile(
      inserted.slug,
      "metadata.json",
      {
        mimetype: "application/json",
        size: metadataJsonContent.length,
        fileContent: metadataJsonContent,
      },
      { created_at, updated_at }
    );

    const initPyContent = Buffer.from(
      `print('Hello world from the ${name} app')`
    );
    await badgeHubData.writeDraftFile(
      inserted.slug,
      "__init__.py",
      {
        mimetype: "text/x-python-script",
        size: initPyContent.length,
        fileContent: initPyContent,
      },
      { created_at, updated_at }
    );
  }

  return projectSlugs.map((slug) => slug.toLowerCase());
}

async function badgeProjectCrossTable(
  client: pg.PoolClient,
  projectSlugs: string[]
) {
  for (let index = 0; index < projectSlugs.length; index++) {
    let projectSlug = projectSlugs[index]!;
    const semiRandomNumber = await stringToNumberDigest(projectSlug);
    const badgeSlug = badgeSlugs[semiRandomNumber % 3]!;
    let insertObject1: DBInsertProjectStatusOnBadge = {
      badge_slug: badgeSlug,
      project_slug: projectSlug,
      ...(await getSemiRandomDates([projectSlug, badgeSlug].join(","))),
    };
    const insert1 = getInsertKeysAndValuesSql(insertObject1);
    await client.query(
      sql`insert into badgehub.project_statuses_on_badges (${insert1.keys})
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
