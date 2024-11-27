import pg from "pg";
import express, { Express, Router } from "express";
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from "@config";

const CATEGORIES_COUNT = 15;

export default async function populateDB(app: Express) {
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

  router.get("/populate", async (req, res) => {
    await deleteDatabases(pool);
    await populateDatabases(pool);
    return res.status(200).send("Population done.");
  });
}

async function deleteDatabases(pool: pg.Pool) {
  const client = await pool.connect();
  await client.query("DELETE FROM badgehub.badge_project");
  await client.query("DELETE FROM badgehub.dependencies");
  await client.query("DELETE FROM badgehub.users");
  await client.query("DELETE FROM badgehub.projects");
  client.release();
}

async function populateDatabases(pool: pg.Pool) {
  const client = await pool.connect();
  const userCount = await insertUsers(client);
  const projectCount = await insertProjects(client, userCount);
  await badgeProjectCrossTable(client, projectCount);
  client.release();
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

async function insertUsers(client: pg.PoolClient) {
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

  for (const id in users) {
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

    await client.query(
      `INSERT INTO badgehub.users
            (id, admin, name, email, password, public, show_projects, created_at, updated_at) VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        id,
        isAdmin,
        name,
        email,
        password,
        isPublic,
        showProjects,
        createdAt,
        updatedAt,
      ]
    );
  }

  return users.length;
}

async function insertProjects(client: pg.PoolClient, userCount: number) {
  const apps = [
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

  for (const id in apps) {
    const name = apps[id]!;
    const slug = name.toLowerCase();
    const description = getDescription(name);
    const userId = random(userCount);
    const categoryId = random(CATEGORIES_COUNT) + 1;
    const createDate = -random(600);
    const createdAt = date(createDate);
    const updatedAt = date(createDate + random(100));

    console.log(`insert into projects ${name} (${description})`);

    await client.query(
      `INSERT INTO badgehub.projects
            (id, name, slug, description, user_id, category_id, created_at, updated_at) VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [id, name, slug, description, userId, categoryId, createdAt, updatedAt]
    );
  }

  return apps.length;
}

async function badgeProjectCrossTable(
  client: pg.PoolClient,
  projectCount: number
) {
  const badgeIds = [1, 2, 5]; // Hardcoded! Update by hand
  for (let index = 0; index < projectCount; index++) {
    const badgeId = badgeIds[random(3)];
    await client.query(
      `INSERT INTO badgehub.badge_project
            (badge_id, project_id) VALUES
            ($1, $2)`,
      [badgeId, index]
    );

    // Some project support two badges
    const badgeId2 = badgeIds[random(3)];
    if (badgeId2 != badgeId && random(3) == 1) {
      await client.query(
        `INSERT INTO badgehub.badge_project
                (badge_id, project_id) VALUES
                ($1, $2)`,
        [badgeId2, index]
      );
    }
  }
}

// Not in use right now
async function userProjectsCrossTable(
  client: pg.PoolClient,
  userCount: number,
  projectCount: number
) {
  for (let index = 0; index < 300; index++) {
    const userId = random(userCount);
    const projectId = random(projectCount);
    const createDate = -random(600);
    const createdAt = date(createDate);
    const updatedAt = date(createDate + random(100));
    await client.query(
      `INSERT INTO badgehub.project_user
        (id, user_id, project_id, created_at, updated_at) VALUES
        ($1, $2, $3, $4, $5)`,
      [index, userId, projectId, createdAt, updatedAt]
    );
  }
}
