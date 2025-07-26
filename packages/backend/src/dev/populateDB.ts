import pg from "pg";
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from "@config";
import sql, { raw } from "sql-template-tag";
import { BadgeHubData } from "@domain/BadgeHubData";
import { PostgreSQLBadgeHubMetadata } from "@db/PostgreSQLBadgeHubMetadata";
import { PostgreSQLBadgeHubFiles } from "@db/PostgreSQLBadgeHubFiles";
import { stringToSemiRandomNumber } from "@dev/stringToSemiRandomNumber";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { getCategoryNames } from "@shared/domain/readModels/project/Category";
import { AppMetadataJSON } from "@shared/domain/readModels/project/AppMetadataJSON";
import { getBadgeSlugs } from "@shared/domain/readModels/Badge";

const CATEGORY_NAMES = getCategoryNames();

const ICON_COUNT = 16;
const ICON_FILENAMES = Array.from(
  { length: ICON_COUNT },
  (_, i) => `icon${i}.png`
);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ICONS_ASSETS_PATH = path.resolve(__dirname, "./dummy-icons");

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
    await cleanTables(client);
    await populateDatabases(client, badgeHubData);
  } finally {
    client.release();
  }
}

async function cleanTables(client: pg.PoolClient) {
  const tablesWithoutIdSeq = ["projects"];
  for (const table of tablesWithoutIdSeq) {
    await client.query(sql`delete
                           from ${raw(table)}`);
  }

  const tablesWithIdSeq = ["files", "file_data", "versions"];
  for (const table of tablesWithIdSeq) {
    await client.query(sql`delete
                           from ${raw(table)}`);
    await client
      .query(sql`alter sequence ${raw(table)}_id_seq restart`)
      .catch((e) => {
        console.warn(`could not reset ${table}_id_seq, ignoring issue`, e);
      });
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
  const projectNames = await insertProjects(badgeHubData);
  await publishSomeProjects(badgeHubData, projectNames);
}

function date(millisBackFrom2025: number) {
  const JAN_FIRST_2025_BRUSSELS = 1_735_686_000_000;
  const MAX_DATE_MILLIS = JAN_FIRST_2025_BRUSSELS;
  return new Date(MAX_DATE_MILLIS - millisBackFrom2025).toISOString();
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

function getSemiRandomElementSelection<T>(
  semiRandomNumber: number,
  items: T[],
  max_items: number
): T[] {
  const nbItems = Math.max(semiRandomNumber % max_items, 1);
  const selection = new Set<T>();
  for (let i = 0; i < nbItems; i++) {
    selection.add(items[(i + semiRandomNumber) % items.length]!);
  }
  return [...selection];
}

const writeDraftAppFiles = async (
  badgeHubData: BadgeHubData,
  projectName: string,
  semanticVersion: string = ""
) => {
  const semiRandomNumber = await stringToSemiRandomNumber(projectName);
  const projectSlug = projectName.toLowerCase();
  const description = await getDescription(projectName);
  const userId = semiRandomNumber % USERS.length;

  const { created_at, updated_at } = await getSemiRandomDates(projectName);

  let iconBuffer: Buffer | undefined = undefined;

  // Pick a semirandom icon
  const iconIndex = semiRandomNumber % (ICON_COUNT + 4);
  const iconFilename = ICON_FILENAMES[iconIndex];
  const iconRelativePath = iconFilename;
  if (iconFilename) {
    const iconFullPath = path.join(ICONS_ASSETS_PATH, iconFilename);

    // Read icon file from disk
    try {
      iconBuffer = fs.readFileSync(iconFullPath);
    } catch (e) {
      console.warn(`Could not read icon file: ${iconFullPath}`);
    }
  }

  const categories = getSemiRandomElementSelection(
    semiRandomNumber,
    CATEGORY_NAMES,
    3
  );
  const allBadges = getBadgeSlugs();
  const badges = getSemiRandomElementSelection(
    semiRandomNumber,
    allBadges,
    allBadges.length
  );
  const appMetadata: AppMetadataJSON = {
    name: projectName,
    description,
    author: USERS[userId]!,
    license_type: "MIT",
    badges,
    categories,
    icon_map: iconRelativePath ? { "64x64": iconRelativePath } : undefined,
  };
  if (semanticVersion !== "") {
    appMetadata.version = semanticVersion;
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

  // Upload the icon file if it exists
  if (iconRelativePath && iconBuffer) {
    await badgeHubData.writeDraftFile(
      projectSlug,
      iconRelativePath,
      {
        mimetype: "image/png",
        size: iconBuffer.length,
        fileContent: iconBuffer,
      },
      { created_at, updated_at }
    );
  }

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
