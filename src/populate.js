const CATEGORIES_COUNT = 15;

export default async function populate(pool) {
    const client = await pool.connect()
    await client.query('DELETE FROM badgehub.badge_project');
    await client.query('DELETE FROM badgehub.dependencies');
    await client.query('DELETE FROM badgehub.files');
    await client.query('DELETE FROM badgehub.migrations');
    await client.query('DELETE FROM badgehub.password_resets');
    await client.query('DELETE FROM badgehub.project_user');
    await client.query('DELETE FROM badgehub.users');
    await client.query('DELETE FROM badgehub.projects');
    const userCount = await insertUsers(client);
    const projectCount = await insertProjects(client, userCount);
    await userProjectsCrossTable(client, userCount, projectCount);
    client.release();
}

function random(n) {
    return Math.floor(Math.random() * n);
}

function date(days) {
    const now = new Date();
    const d = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    return d.toISOString();
}

function getSlug(appName) {
    switch(random(4)) {
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

async function insertUsers(client) {
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
        'bitlair.nl',
        'hackalot.nl',
        'techinc.nl',
        'gmail.com',
        'hotmail.com',
        'ziggo.com'
    ]

    for (const id in users) {
        const isAdmin = random(10) == 0;
        const name = users[id];
        const email = `${users[id].toLowerCase()}@${domains[random(domains.length)]}`;
        const password = "****";
        const isPublic = random(10) != 0;
        const showProjects = random(10) != 0;
        const createDate = -random(600);
        const createdAt = date(createDate);
        const updatedAt = date(createDate + random(100));

        await client.query(`INSERT INTO badgehub.users
        (id, admin, name, email, password, public, show_projects, created_at, updated_at) VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [id, isAdmin, name, email, password, isPublic, showProjects, createdAt, updatedAt]
        );
    }

    return users.length;
}

async function insertProjects(client, userCount) {
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
        const name = apps[id];
        const slug = getSlug(apps[id]);
        const userId = random(userCount);
        const categoryId = random(CATEGORIES_COUNT) + 1;
        const createDate = -random(600);
        const createdAt = date(createDate);
        const updatedAt = date(createDate + random(100));

        await client.query(`INSERT INTO badgehub.projects
        (id, name, slug, user_id, category_id, created_at, updated_at) VALUES
        ($1, $2, $3, $4, $5, $6, $7)`,
            [id, name, slug, userId, categoryId, createdAt, updatedAt]
        );
    }

    return apps.length;
}

async function userProjectsCrossTable(client, userCount, projectCount) {
    for (let index=0; index < 300; index++) {

        const userId = random(userCount);
        const projectId = random(projectCount);
        const createDate = -random(600);
        const createdAt = date(createDate);
        const updatedAt = date(createDate + random(100));
        await client.query(`INSERT INTO badgehub.project_user
        (id, user_id, project_id, created_at, updated_at) VALUES
        ($1, $2, $3, $4, $5)`,
            [index, userId, projectId, createdAt, updatedAt]
        );
    }
}