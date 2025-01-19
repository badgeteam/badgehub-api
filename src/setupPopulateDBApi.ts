import pg from "pg";
import express, { Express, Router } from "express";
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
import { NodeFSBadgeHubFiles } from "@fs/NodeFSBadgeHubFiles";

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
  // "Interpreter", // TODO add Interpreter to mock data?
] as const;
const CATEGORIES_COUNT = CATEGORY_NAMES.length;
export default async function setupPopulateDBApi(app: Express) {
  const router = Router();

  app.use(express.json());
  app.use(express.static("public"));
  app.use("/", router);

  const pool = new pg.Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: POSTGRES_PORT,
  });

  router.post("/populate", async (req, res) => {
    const client: pg.PoolClient = await pool.connect();
    const badgeHubData = new BadgeHubData(
      new PostgreSQLBadgeHubMetadata(),
      new NodeFSBadgeHubFiles()
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
  await client.query(sql`delete from badgehub.users`);
  await client.query(sql`delete from badgehub.projects`);
  await client.query(sql`delete from badgehub.app_metadata_jsons`);
  await client.query(sql`delete from badgehub.versions`);
  await client.query(sql`delete from badgehub.versioned_dependencies`);
  await client.query(sql`delete from badgehub.project_statuses_on_badges`);
}

async function populateDatabases(
  client: pg.PoolClient,
  badgeHubData: BadgeHubData
) {
  const userCount = await insertUsers(badgeHubData);
  const projectSlugs = await insertProjects(badgeHubData, userCount);
  await badgeProjectCrossTable(client, projectSlugs);
}

function random(n: number) {
  return Math.floor(Math.random() * n);
}

function date(days: number) {
  const now = new Date();
  const d = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  return d.toISOString();
}

function getDescription(appName: string) {
  switch (random(4)) {
    case 0:
      return `Use ${appName} for some cool graphical effects.`;
    case 1:
      return `With ${appName}, you can do interesting things with the sensors.`;
    case 2:
      return `Make some magic happen with ${appName}.`;
    default:
      return `${appName} is just some silly test app.`;
  }
}

async function insertUsers(badgeHubData: BadgeHubData) {
  const users = [
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

  const domains = [
    "bitlair.nl",
    "hackalot.nl",
    "techinc.nl",
    "hack42.nl",
    "gmail.com",
    "hotmail.com",
  ];

  for (let id = 0; id < users.length; id++) {
    const isAdmin = random(10) == 0;
    const name = users[id]!;
    const email = `${name.toLowerCase()}@${domains[random(domains.length)]}`;
    const password = "****";
    const isPublic = random(10) != 0;
    const showProjects = random(10) != 0;
    const createDate = -random(600);
    const createdAt = date(createDate);
    const updatedAt = date(createDate + random(100));

    console.log(`insert into users ${name}`);
    const toInsert: DBInsertUser & DBDatedData = {
      id,
      admin: isAdmin,
      name,
      email,
      password,
      public: isPublic,
      show_projects: showProjects,
      created_at: createdAt,
      updated_at: updatedAt,
    };

    await badgeHubData.insertUser(toInsert);
  }

  return users.length;
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
    const slug = name.toLowerCase();
    const description = getDescription(name);
    const userId = random(userCount);
    const categoryId = random(CATEGORIES_COUNT);
    const createDate = -random(600);
    const createdAt = date(createDate);
    const updatedAt = date(createDate + random(100));

    console.log(`insert into projects ${name} (${description})`);

    const inserted: DBInsertProject & DBDatedData = {
      slug,
      user_id: userId,
      created_at: createdAt,
      updated_at: updatedAt,
    };

    await badgeHubData.insertProject(inserted);
    const appMetadata: DBInsertAppMetadataJSON & DBDatedData = {
      name,
      description,
      category: CATEGORY_NAMES[categoryId],
      created_at: createdAt,
      updated_at: updatedAt,
    };

    const fileContent = Buffer.from(JSON.stringify(appMetadata));
    await badgeHubData.writeDraftFile(inserted.slug, "metadata.json", {
      mimetype: "application/json",
      size: fileContent.length,
      fileContent: fileContent,
    });
    // TODO also write __init__.py file that does print("Hello, World! from the {appname} app") for the interpreter
  }

  return projectSlugs.map((slug) => slug.toLowerCase());
}

async function badgeProjectCrossTable(
  client: pg.PoolClient,
  projectSlugs: string[]
) {
  const badgeSlugs = ["mch2022", "troopers23", "why2025"] as const; // Hardcoded! Update by hand
  for (let index = 0; index < projectSlugs.length; index++) {
    const badgeSlug = badgeSlugs[random(3)]!;
    let insertObject1: DBInsertProjectStatusOnBadge = {
      badge_slug: badgeSlug,
      project_slug: projectSlugs[index]!,
    };
    const insert1 = getInsertKeysAndValuesSql(insertObject1);
    await client.query(
      sql`insert into badgehub.project_statuses_on_badges (${insert1.keys})
                values (${insert1.values})`
    );

    // Some project support two badges
    const badgeId2 = badgeSlugs[random(3)]!;
    if (badgeId2 != badgeSlug && random(3) == 1) {
      const insertObject2: DBInsertProjectStatusOnBadge = {
        badge_slug: badgeId2,
        project_slug: projectSlugs[index]!,
      };
      const insert2 = getInsertKeysAndValuesSql(insertObject2);
      await client.query(
        sql`insert into badgehub.project_statuses_on_badges (${insert2.keys})
                    values (${insert2.values})`
      );
    }
  }
}
