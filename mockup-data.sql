--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+2)
-- Dumped by pg_dump version 16.4 (Debian 16.4-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: badgehub; Type: SCHEMA; Schema: -; Owner: badgehub
--

CREATE SCHEMA badgehub;


ALTER SCHEMA badgehub OWNER TO badgehub;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: app_metadata_jsons; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.app_metadata_jsons (
    id integer NOT NULL,
    category text,
    name text,
    description text,
    author text,
    icon text,
    license_file text,
    is_library boolean,
    is_hidden boolean,
    semantic_version text,
    interpreter text,
    main_executable text,
    main_executable_overrides jsonb,
    file_mappings jsonb,
    file_mappings_overrides jsonb,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    deleted_at timestamp with time zone
);


ALTER TABLE badgehub.app_metadata_jsons OWNER TO badgehub;

--
-- Name: app_metadata_jsons_id_seq; Type: SEQUENCE; Schema: badgehub; Owner: badgehub
--

CREATE SEQUENCE badgehub.app_metadata_jsons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE badgehub.app_metadata_jsons_id_seq OWNER TO badgehub;

--
-- Name: app_metadata_jsons_id_seq; Type: SEQUENCE OWNED BY; Schema: badgehub; Owner: badgehub
--

ALTER SEQUENCE badgehub.app_metadata_jsons_id_seq OWNED BY badgehub.app_metadata_jsons.id;


--
-- Name: badges; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.badges (
    slug text NOT NULL,
    name text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    deleted_at timestamp with time zone
);


ALTER TABLE badgehub.badges OWNER TO badgehub;

--
-- Name: categories; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.categories (
    slug text NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    deleted_at timestamp with time zone
);


ALTER TABLE badgehub.categories OWNER TO badgehub;

--
-- Name: migrations; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.migrations (
    id integer DEFAULT nextval('badgehub_old.migrations_id_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL,
    run_on timestamp without time zone NOT NULL
);


ALTER TABLE badgehub.migrations OWNER TO badgehub;

--
-- Name: project_statuses_on_badges; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.project_statuses_on_badges (
    id integer NOT NULL,
    project_slug text NOT NULL,
    badge_slug text NOT NULL,
    status text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    deleted_at timestamp with time zone
);


ALTER TABLE badgehub.project_statuses_on_badges OWNER TO badgehub;

--
-- Name: project_statuses_on_badges_id_seq; Type: SEQUENCE; Schema: badgehub; Owner: badgehub
--

CREATE SEQUENCE badgehub.project_statuses_on_badges_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE badgehub.project_statuses_on_badges_id_seq OWNER TO badgehub;

--
-- Name: project_statuses_on_badges_id_seq; Type: SEQUENCE OWNED BY; Schema: badgehub; Owner: badgehub
--

ALTER SEQUENCE badgehub.project_statuses_on_badges_id_seq OWNED BY badgehub.project_statuses_on_badges.id;


--
-- Name: projects; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.projects (
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    version_id integer,
    user_id text NOT NULL,
    slug text NOT NULL,
    git text,
    allow_team_fixes boolean
);


ALTER TABLE badgehub.projects OWNER TO badgehub;

--
-- Name: users; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.users (
    id text NOT NULL,
    email text,
    admin boolean,
    name text NOT NULL,
    password text NOT NULL,
    remember_token text,
    editor text,
    public boolean,
    show_projects boolean,
    email_verified_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    deleted_at timestamp with time zone
);


ALTER TABLE badgehub.users OWNER TO badgehub;

--
-- Name: versioned_dependencies; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.versioned_dependencies (
    id integer NOT NULL,
    project_slug text NOT NULL,
    depends_on_project_slug text NOT NULL,
    semantic_version_range text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    deleted_at timestamp with time zone
);


ALTER TABLE badgehub.versioned_dependencies OWNER TO badgehub;

--
-- Name: versioned_dependencies_id_seq; Type: SEQUENCE; Schema: badgehub; Owner: badgehub
--

CREATE SEQUENCE badgehub.versioned_dependencies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE badgehub.versioned_dependencies_id_seq OWNER TO badgehub;

--
-- Name: versioned_dependencies_id_seq; Type: SEQUENCE OWNED BY; Schema: badgehub; Owner: badgehub
--

ALTER SEQUENCE badgehub.versioned_dependencies_id_seq OWNED BY badgehub.versioned_dependencies.id;


--
-- Name: versions; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.versions (
    id integer NOT NULL,
    project_slug text NOT NULL,
    app_metadata_json_id integer NOT NULL,
    revision integer DEFAULT 0 NOT NULL,
    semantic_version text,
    zip text,
    size_of_zip bigint,
    git_commit_id text,
    published_at timestamp with time zone,
    download_count bigint DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    deleted_at timestamp with time zone
);


ALTER TABLE badgehub.versions OWNER TO badgehub;

--
-- Name: versions_id_seq; Type: SEQUENCE; Schema: badgehub; Owner: badgehub
--

CREATE SEQUENCE badgehub.versions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE badgehub.versions_id_seq OWNER TO badgehub;

--
-- Name: versions_id_seq; Type: SEQUENCE OWNED BY; Schema: badgehub; Owner: badgehub
--

ALTER SEQUENCE badgehub.versions_id_seq OWNED BY badgehub.versions.id;


--
-- Name: app_metadata_jsons id; Type: DEFAULT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.app_metadata_jsons ALTER COLUMN id SET DEFAULT nextval('badgehub.app_metadata_jsons_id_seq'::regclass);


--
-- Name: project_statuses_on_badges id; Type: DEFAULT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.project_statuses_on_badges ALTER COLUMN id SET DEFAULT nextval('badgehub.project_statuses_on_badges_id_seq'::regclass);


--
-- Name: versioned_dependencies id; Type: DEFAULT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.versioned_dependencies ALTER COLUMN id SET DEFAULT nextval('badgehub.versioned_dependencies_id_seq'::regclass);


--
-- Name: versions id; Type: DEFAULT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.versions ALTER COLUMN id SET DEFAULT nextval('badgehub.versions_id_seq'::regclass);


--
-- Data for Name: app_metadata_jsons; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.app_metadata_jsons (id, category, name, description, author, icon, license_file, is_library, is_hidden, semantic_version, interpreter, main_executable, main_executable_overrides, file_mappings, file_mappings_overrides, created_at, updated_at, deleted_at) FROM stdin;
1	Silly	CodeCraft	Make some magic happen with CodeCraft.	GameGlobetrotter	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-01-05 11:29:07.05+00	2024-03-20 11:29:07.05+00	\N
2	Games	PixelPulse	Make some magic happen with PixelPulse.	GameGizmo	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-08-30 11:29:07.053+00	2023-10-29 11:29:07.053+00	\N
3	Event related	BitBlast	Make some magic happen with BitBlast.	GameGuardian	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-09-22 11:29:07.055+00	2023-11-13 11:29:07.055+00	\N
4	Event related	NanoGames	Make some magic happen with NanoGames.	DigitalDynamo	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2022-10-24 11:29:07.056+00	2023-01-02 11:29:07.057+00	\N
5	Unusable	ElectraPlay	With ElectraPlay, you can do interesting things with the sensors.	PixelPirate	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-09-04 11:29:07.058+00	2023-10-06 11:29:07.058+00	\N
6	SAO	CircuitForge	With CircuitForge, you can do interesting things with the sensors.	PixelPro	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-01-28 11:29:07.06+00	2023-04-24 11:29:07.06+00	\N
7	Event related	ByteBash	Use ByteBash for some cool graphical effects.	CodeConqueror	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-08-02 11:29:07.061+00	2023-10-27 11:29:07.061+00	\N
8	Adult	CodeCanvas	With CodeCanvas, you can do interesting things with the sensors.	TechTornado	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-12-31 11:29:07.063+00	2024-02-09 11:29:07.063+00	\N
9	Unusable	SparkScript	Make some magic happen with SparkScript.	ElectronExplorer	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2022-12-13 11:29:07.064+00	2023-01-13 11:29:07.064+00	\N
10	Data	LogicLand	Use LogicLand for some cool graphical effects.	CodeConqueror	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-02-05 11:29:07.066+00	2023-05-13 11:29:07.066+00	\N
11	Event related	MicroArcade	MicroArcade is just some silly test app.	LogicLuminary	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-01-05 11:29:07.069+00	2024-03-01 11:29:07.069+00	\N
12	SAO	CodeCraze	Use CodeCraze for some cool graphical effects.	CodeCreator	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-05-07 11:29:07.071+00	2024-07-22 11:29:07.071+00	\N
13	SAO	GameGenius	GameGenius is just some silly test app.	ElectronExplorer	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-12-14 11:29:07.073+00	2024-01-22 11:29:07.073+00	\N
14	Wearable	PixelPal	Make some magic happen with PixelPal.	PixelPro	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-08-10 11:29:07.075+00	2023-10-23 11:29:07.075+00	\N
15	Graphics	Electronica	Use Electronica for some cool graphical effects.	NanoNinja	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-02-26 11:29:07.078+00	2024-04-29 11:29:07.078+00	\N
16	Event related	CodeQuest	Use CodeQuest for some cool graphical effects.	LogicLabyrinth	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-05-15 11:29:07.08+00	2023-07-04 11:29:07.08+00	\N
17	Troll	CircuitCraft	Make some magic happen with CircuitCraft.	GameGlider	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-06-19 11:29:07.082+00	2023-07-20 11:29:07.083+00	\N
18	Troll	ByteBeat	ByteBeat is just some silly test app.	ElectronEmperor	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-06-07 11:29:07.084+00	2023-07-30 11:29:07.084+00	\N
19	Data	NanoNexus	With NanoNexus, you can do interesting things with the sensors.	ByteBrawler	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-06-28 11:29:07.087+00	2023-07-16 11:29:07.087+00	\N
20	Event related	BitBox	With BitBox, you can do interesting things with the sensors.	CircuitChampion	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-10-15 11:29:07.089+00	2023-10-21 11:29:07.089+00	\N
21	Unusable	CircuitChaos	Use CircuitChaos for some cool graphical effects.	CodeConqueror	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-02-08 11:29:07.09+00	2023-03-11 11:29:07.09+00	\N
22	Data	CodeCrafter	Use CodeCrafter for some cool graphical effects.	CircuitCaptain	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-04-16 11:29:07.092+00	2024-04-28 11:29:07.092+00	\N
23	Virus	PixelPioneer	PixelPioneer is just some silly test app.	NanoNoble	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2022-12-07 11:29:07.094+00	2023-02-18 11:29:07.094+00	\N
24	Unusable	LogicLab	Use LogicLab for some cool graphical effects.	GameGazer	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-05-14 11:29:07.096+00	2023-08-16 11:29:07.096+00	\N
25	Data	ByteBlitz	Make some magic happen with ByteBlitz.	LogicLegend	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-03-29 11:29:07.099+00	2024-05-23 11:29:07.099+00	\N
26	Virus	CodeWave	Use CodeWave for some cool graphical effects.	GameGazer	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-03-09 11:29:07.1+00	2024-06-07 11:29:07.1+00	\N
27	Event related	NanoNet	NanoNet is just some silly test app.	ElectronExpedition	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-11-16 11:29:07.102+00	2024-01-16 11:29:07.102+00	\N
28	Wearable	ElectraForge	Make some magic happen with ElectraForge.	ElectronExpedition	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-04-21 11:29:07.103+00	2023-06-29 11:29:07.104+00	\N
29	Wearable	GameGrid	With GameGrid, you can do interesting things with the sensors.	ElectronEager	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2022-10-22 11:29:07.105+00	2022-12-09 11:29:07.105+00	\N
30	Silly	LogicLoom	With LogicLoom, you can do interesting things with the sensors.	NanoNinja	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-08-28 11:29:07.106+00	2023-10-03 11:29:07.106+00	\N
31	Silly	PixelPlaza	Use PixelPlaza for some cool graphical effects.	PixelPilot	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-06-27 11:29:07.108+00	2023-06-28 11:29:07.108+00	\N
32	Event related	CodeCity	CodeCity is just some silly test app.	GameGizmo	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2022-10-01 11:29:07.11+00	2022-10-27 11:29:07.11+00	\N
33	Troll	NanoArcade	Use NanoArcade for some cool graphical effects.	PixelPulse	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-07-24 11:29:07.112+00	2023-08-11 11:29:07.112+00	\N
34	Adult	ElectronEra	With ElectronEra, you can do interesting things with the sensors.	ElectronEcho	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-11-12 11:29:07.114+00	2024-01-17 11:29:07.114+00	\N
35	Troll	BitBazaar	Make some magic happen with BitBazaar.	GameGlider	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2022-12-12 11:29:07.115+00	2023-02-13 11:29:07.115+00	\N
36	SAO	LogicLegends	LogicLegends is just some silly test app.	ByteBandit	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-03-16 11:29:07.116+00	2023-05-22 11:29:07.116+00	\N
37	Data	CodeClan	Use CodeClan for some cool graphical effects.	NanoNerd	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-11-28 11:29:07.118+00	2024-01-06 11:29:07.118+00	\N
38	Adult	PixelPortal	PixelPortal is just some silly test app.	PixelPilot	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-02-12 11:29:07.119+00	2024-04-25 11:29:07.119+00	\N
39	Adult	CircuitCraze	With CircuitCraze, you can do interesting things with the sensors.	GameGlider	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2022-11-04 11:29:07.12+00	2023-01-22 11:29:07.12+00	\N
40	Utility	ByteBuster	With ByteBuster, you can do interesting things with the sensors.	CyberCraftsman	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2022-12-09 11:29:07.122+00	2022-12-24 11:29:07.122+00	\N
41	Silly	NanoNovel	Make some magic happen with NanoNovel.	PixelPulse	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-03-17 11:29:07.123+00	2024-05-14 11:29:07.123+00	\N
42	Games	ElectraEden	Use ElectraEden for some cool graphical effects.	CodeCrusader	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-05-19 11:29:07.125+00	2023-06-03 11:29:07.125+00	\N
43	Adult	CodeComet	With CodeComet, you can do interesting things with the sensors.	CircuitCaptain	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-02-25 11:29:07.126+00	2024-03-05 11:29:07.126+00	\N
44	SAO	PixelPlayground	Make some magic happen with PixelPlayground.	DigitalDreamer	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-02-15 11:29:07.128+00	2023-05-12 11:29:07.128+00	\N
45	Uncategorised	LogicLandia	Use LogicLandia for some cool graphical effects.	CodeConnoisseur	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-08-10 11:29:07.129+00	2023-09-23 11:29:07.129+00	\N
46	Silly	ByteBounce	With ByteBounce, you can do interesting things with the sensors.	GameGlider	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-03-02 11:29:07.13+00	2024-05-15 11:29:07.13+00	\N
47	Games	CircuitCarnival	Make some magic happen with CircuitCarnival.	LogicLore	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-02-03 11:29:07.131+00	2023-03-10 11:29:07.131+00	\N
48	SAO	CodeCove	Use CodeCove for some cool graphical effects.	ElectronEagle	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2022-10-15 11:29:07.132+00	2022-12-05 11:29:07.132+00	\N
49	Games	NanoNest	With NanoNest, you can do interesting things with the sensors.	CircuitChampion	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-10-05 11:29:07.133+00	2023-11-12 11:29:07.134+00	\N
50	Uncategorised	ElectraEntertain	ElectraEntertain is just some silly test app.	ElectronEagle	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-07-11 11:29:07.135+00	2023-09-21 11:29:07.135+00	\N
51	Adult	GameGalaxy	Use GameGalaxy for some cool graphical effects.	GameGladiator	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-02-02 11:29:07.136+00	2024-05-05 11:29:07.136+00	\N
52	Unusable	LogicLabyrinth	Make some magic happen with LogicLabyrinth.	LogicLion	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-01-04 11:29:07.138+00	2024-01-04 11:29:07.138+00	\N
53	Unusable	ByteBlaster	ByteBlaster is just some silly test app.	DigitalDreamer	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2022-10-12 11:29:07.14+00	2022-11-07 11:29:07.14+00	\N
54	Data	CodeCompass	CodeCompass is just some silly test app.	CircuitCraze	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-02-18 11:29:07.142+00	2023-03-20 11:29:07.142+00	\N
55	Silly	NanoNation	Use NanoNation for some cool graphical effects.	GameGuru	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-03-06 11:29:07.143+00	2024-06-11 11:29:07.143+00	\N
56	Silly	ElectraEmpire	ElectraEmpire is just some silly test app.	CyberCipher	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-04-17 11:29:07.144+00	2023-06-14 11:29:07.145+00	\N
57	Adult	GameGarden	Make some magic happen with GameGarden.	LogicLion	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-04-04 11:29:07.146+00	2024-04-29 11:29:07.146+00	\N
58	Graphics	PixelPeak	With PixelPeak, you can do interesting things with the sensors.	CircuitCaptain	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-06-13 11:29:07.147+00	2023-07-13 11:29:07.147+00	\N
59	Games	CircuitCelestial	CircuitCelestial is just some silly test app.	LogicLoreMaster	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-07-14 11:29:07.149+00	2023-07-19 11:29:07.149+00	\N
60	Hardware	CodeCrusade	CodeCrusade is just some silly test app.	PixelPioneer	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-10-09 11:29:07.15+00	2023-12-23 11:29:07.15+00	\N
61	Unusable	NanoNebula	NanoNebula is just some silly test app.	CircuitChampion	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-03-03 11:29:07.151+00	2023-05-22 11:29:07.151+00	\N
62	Utility	ElectraEnclave	Use ElectraEnclave for some cool graphical effects.	LogicLion	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-09-18 11:29:07.153+00	2023-10-07 11:29:07.153+00	\N
63	Graphics	GameGizmo	Use GameGizmo for some cool graphical effects.	GameGlider	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-12-04 11:29:07.155+00	2024-01-17 11:29:07.155+00	\N
64	SAO	PixelPlanet	With PixelPlanet, you can do interesting things with the sensors.	CircuitChamp	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-02-04 11:29:07.156+00	2023-04-06 11:29:07.156+00	\N
65	Graphics	LogicLounge	Make some magic happen with LogicLounge.	LogicLoreMaster	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2022-12-24 11:29:07.157+00	2023-03-02 11:29:07.157+00	\N
66	Silly	ByteBeacon	Use ByteBeacon for some cool graphical effects.	CyberCraft	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-01-25 11:29:07.158+00	2024-02-04 11:29:07.158+00	\N
67	Hardware	CodeCircus	CodeCircus is just some silly test app.	CyberSavvy	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-07-04 11:29:07.16+00	2023-08-14 11:29:07.16+00	\N
68	Adult	NanoNook	Make some magic happen with NanoNook.	ElectronEnigma	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2022-12-14 11:29:07.161+00	2023-03-12 11:29:07.161+00	\N
69	Uncategorised	ElectraElysium	Make some magic happen with ElectraElysium.	LogicLoreMaster	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-06-25 11:29:07.163+00	2023-07-28 11:29:07.163+00	\N
70	Graphics	GameGlimpse	GameGlimpse is just some silly test app.	ByteBlitz	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-01-24 11:29:07.164+00	2023-03-12 11:29:07.164+00	\N
71	Virus	PixelParadise	PixelParadise is just some silly test app.	CodeConqueror	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-03-02 11:29:07.165+00	2023-03-22 11:29:07.165+00	\N
72	SAO	CodeCoast	With CodeCoast, you can do interesting things with the sensors.	ByteBrawler	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-01-18 11:29:07.167+00	2024-02-04 11:29:07.167+00	\N
73	Utility	NanoNirvana	NanoNirvana is just some silly test app.	ByteBrawler	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-06-18 11:29:07.168+00	2023-07-18 11:29:07.168+00	\N
74	Utility	ElectraEdifice	Make some magic happen with ElectraEdifice.	LogicLoreMaster	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2022-11-15 11:29:07.17+00	2022-11-25 11:29:07.17+00	\N
75	Hacking	GameGen	GameGen is just some silly test app.	LogicLoreMaster	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-01-16 11:29:07.171+00	2023-03-02 11:29:07.171+00	\N
76	Wearable	PixelPandemonium	Make some magic happen with PixelPandemonium.	ByteBandit	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-12-21 11:29:07.172+00	2024-03-23 11:29:07.172+00	\N
77	Silly	LogicLagoon	Use LogicLagoon for some cool graphical effects.	CodeCrusader	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-11-25 11:29:07.174+00	2023-12-13 11:29:07.174+00	\N
78	Games	ByteBlaze	With ByteBlaze, you can do interesting things with the sensors.	LogicLion	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-03-20 11:29:07.175+00	2023-04-05 11:29:07.175+00	\N
79	Silly	CodeCorridor	CodeCorridor is just some silly test app.	CodeCrusader	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-05-18 11:29:07.176+00	2023-07-21 11:29:07.176+00	\N
80	Silly	HackSimulator	With HackSimulator, you can do interesting things with the sensors.	CyberCipher	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-01-31 11:29:07.177+00	2023-03-06 11:29:07.177+00	\N
81	Utility	CodeCrunch	With CodeCrunch, you can do interesting things with the sensors.	TechTinker	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-02-21 11:29:07.178+00	2023-05-27 11:29:07.178+00	\N
82	Uncategorised	SecureCraft	With SecureCraft, you can do interesting things with the sensors.	ElectronExplorer	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-01-29 11:29:07.179+00	2024-03-16 11:29:07.179+00	\N
83	SAO	CryptoPulse	With CryptoPulse, you can do interesting things with the sensors.	PixelPulse	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-01-18 11:29:07.181+00	2023-04-16 11:29:07.181+00	\N
84	Graphics	DataForge	With DataForge, you can do interesting things with the sensors.	PixelPulse	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-07-15 11:29:07.182+00	2023-07-24 11:29:07.182+00	\N
85	Utility	CipherQuest	With CipherQuest, you can do interesting things with the sensors.	GameGladiator	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2022-12-14 11:29:07.183+00	2022-12-24 11:29:07.183+00	\N
86	Hardware	HackQuest	With HackQuest, you can do interesting things with the sensors.	CyberCipher	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-08-16 11:29:07.185+00	2023-08-18 11:29:07.185+00	\N
87	Virus	SecureSphere	Use SecureSphere for some cool graphical effects.	PixelPro	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-12-26 11:29:07.186+00	2024-03-15 11:29:07.186+00	\N
\.


--
-- Data for Name: badges; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.badges (slug, name, created_at, updated_at, deleted_at) FROM stdin;
mch2022	mch2022	2022-06-12 16:41:34+00	2022-06-12 16:41:48+00	\N
troopers23	troopers23	2023-06-19 17:48:13+00	2023-06-19 17:48:13+00	\N
why2025	WHY2025	2024-05-22 11:17:11.441719+00	2024-05-22 11:17:11.441719+00	\N
admin	Admin	\N	\N	\N
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.categories (slug, name, created_at, updated_at, deleted_at) FROM stdin;
uncategorised	Uncategorised	2022-06-27 17:06:25+00	2022-06-27 17:06:25+00	\N
event_related	Event related	2022-06-27 17:06:25+00	2022-06-27 17:06:25+00	\N
games	Games	2022-06-27 17:06:25+00	2022-06-27 17:06:25+00	\N
graphics	Graphics	2022-06-27 17:06:26+00	2022-06-27 17:06:26+00	\N
hardware	Hardware	2022-06-27 17:06:26+00	2022-06-27 17:06:26+00	\N
utility	Utility	2022-06-27 17:06:26+00	2022-06-27 17:06:26+00	\N
wearable	Wearable	2022-06-27 17:06:26+00	2022-06-27 17:06:26+00	\N
data	Data	2022-06-27 17:06:26+00	2022-06-27 17:06:26+00	\N
silly	Silly	2022-06-27 17:06:26+00	2022-06-27 17:06:26+00	\N
hacking	Hacking	2022-06-27 17:06:26+00	2022-06-27 17:06:26+00	\N
troll	Troll	2022-06-27 17:06:26+00	2022-06-27 17:06:26+00	\N
unusable	Unusable	2022-06-27 17:06:26+00	2022-06-27 17:06:26+00	\N
adult	Adult	2022-06-27 17:06:26+00	2022-06-27 17:06:26+00	\N
virus	Virus	2022-06-27 17:06:26+00	2022-06-27 17:06:26+00	\N
sao	SAO	\N	\N	\N
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.migrations (id, name, run_on) FROM stdin;
38	/20241116085102-initialize	2024-11-25 23:55:13.518
\.


--
-- Data for Name: project_statuses_on_badges; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.project_statuses_on_badges (id, project_slug, badge_slug, status, created_at, updated_at, deleted_at) FROM stdin;
1	codecraft	why2025	unknown	\N	\N	\N
2	codecraft	troopers23	unknown	\N	\N	\N
3	pixelpulse	why2025	unknown	\N	\N	\N
4	bitblast	why2025	unknown	\N	\N	\N
5	nanogames	mch2022	unknown	\N	\N	\N
6	nanogames	troopers23	unknown	\N	\N	\N
7	electraplay	troopers23	unknown	\N	\N	\N
8	circuitforge	troopers23	unknown	\N	\N	\N
9	bytebash	mch2022	unknown	\N	\N	\N
10	codecanvas	troopers23	unknown	\N	\N	\N
11	sparkscript	why2025	unknown	\N	\N	\N
12	logicland	why2025	unknown	\N	\N	\N
13	microarcade	troopers23	unknown	\N	\N	\N
14	codecraze	troopers23	unknown	\N	\N	\N
15	gamegenius	mch2022	unknown	\N	\N	\N
16	gamegenius	troopers23	unknown	\N	\N	\N
17	pixelpal	troopers23	unknown	\N	\N	\N
18	electronica	troopers23	unknown	\N	\N	\N
19	codequest	why2025	unknown	\N	\N	\N
20	circuitcraft	mch2022	unknown	\N	\N	\N
21	bytebeat	why2025	unknown	\N	\N	\N
22	bytebeat	troopers23	unknown	\N	\N	\N
23	nanonexus	mch2022	unknown	\N	\N	\N
24	nanonexus	why2025	unknown	\N	\N	\N
25	bitbox	mch2022	unknown	\N	\N	\N
26	circuitchaos	troopers23	unknown	\N	\N	\N
27	circuitchaos	why2025	unknown	\N	\N	\N
28	codecrafter	mch2022	unknown	\N	\N	\N
29	pixelpioneer	troopers23	unknown	\N	\N	\N
30	logiclab	why2025	unknown	\N	\N	\N
31	byteblitz	troopers23	unknown	\N	\N	\N
32	byteblitz	why2025	unknown	\N	\N	\N
33	codewave	mch2022	unknown	\N	\N	\N
34	codewave	troopers23	unknown	\N	\N	\N
35	nanonet	why2025	unknown	\N	\N	\N
36	electraforge	why2025	unknown	\N	\N	\N
37	electraforge	mch2022	unknown	\N	\N	\N
38	gamegrid	troopers23	unknown	\N	\N	\N
39	logicloom	troopers23	unknown	\N	\N	\N
40	pixelplaza	troopers23	unknown	\N	\N	\N
41	codecity	why2025	unknown	\N	\N	\N
42	nanoarcade	mch2022	unknown	\N	\N	\N
43	electronera	why2025	unknown	\N	\N	\N
44	bitbazaar	why2025	unknown	\N	\N	\N
45	logiclegends	troopers23	unknown	\N	\N	\N
46	codeclan	why2025	unknown	\N	\N	\N
47	codeclan	mch2022	unknown	\N	\N	\N
48	pixelportal	troopers23	unknown	\N	\N	\N
49	circuitcraze	why2025	unknown	\N	\N	\N
50	bytebuster	mch2022	unknown	\N	\N	\N
51	nanonovel	mch2022	unknown	\N	\N	\N
52	electraeden	troopers23	unknown	\N	\N	\N
53	electraeden	mch2022	unknown	\N	\N	\N
54	codecomet	mch2022	unknown	\N	\N	\N
55	pixelplayground	why2025	unknown	\N	\N	\N
56	logiclandia	why2025	unknown	\N	\N	\N
57	bytebounce	mch2022	unknown	\N	\N	\N
58	bytebounce	why2025	unknown	\N	\N	\N
59	circuitcarnival	mch2022	unknown	\N	\N	\N
60	codecove	mch2022	unknown	\N	\N	\N
61	codecove	troopers23	unknown	\N	\N	\N
62	nanonest	why2025	unknown	\N	\N	\N
63	electraentertain	why2025	unknown	\N	\N	\N
64	gamegalaxy	mch2022	unknown	\N	\N	\N
65	logiclabyrinth	why2025	unknown	\N	\N	\N
66	byteblaster	mch2022	unknown	\N	\N	\N
67	codecompass	troopers23	unknown	\N	\N	\N
68	nanonation	mch2022	unknown	\N	\N	\N
69	electraempire	why2025	unknown	\N	\N	\N
70	electraempire	mch2022	unknown	\N	\N	\N
71	gamegarden	troopers23	unknown	\N	\N	\N
72	pixelpeak	troopers23	unknown	\N	\N	\N
73	pixelpeak	mch2022	unknown	\N	\N	\N
74	circuitcelestial	mch2022	unknown	\N	\N	\N
75	codecrusade	why2025	unknown	\N	\N	\N
76	nanonebula	why2025	unknown	\N	\N	\N
77	electraenclave	troopers23	unknown	\N	\N	\N
78	gamegizmo	why2025	unknown	\N	\N	\N
79	pixelplanet	mch2022	unknown	\N	\N	\N
80	logiclounge	troopers23	unknown	\N	\N	\N
81	bytebeacon	why2025	unknown	\N	\N	\N
82	codecircus	mch2022	unknown	\N	\N	\N
83	nanonook	why2025	unknown	\N	\N	\N
84	nanonook	mch2022	unknown	\N	\N	\N
85	electraelysium	troopers23	unknown	\N	\N	\N
86	gameglimpse	mch2022	unknown	\N	\N	\N
87	pixelparadise	mch2022	unknown	\N	\N	\N
88	pixelparadise	why2025	unknown	\N	\N	\N
89	codecoast	troopers23	unknown	\N	\N	\N
90	nanonirvana	why2025	unknown	\N	\N	\N
91	electraedifice	why2025	unknown	\N	\N	\N
92	gamegen	mch2022	unknown	\N	\N	\N
93	gamegen	why2025	unknown	\N	\N	\N
94	pixelpandemonium	troopers23	unknown	\N	\N	\N
95	logiclagoon	mch2022	unknown	\N	\N	\N
96	byteblaze	why2025	unknown	\N	\N	\N
97	codecorridor	mch2022	unknown	\N	\N	\N
98	hacksimulator	mch2022	unknown	\N	\N	\N
99	codecrunch	mch2022	unknown	\N	\N	\N
100	securecraft	troopers23	unknown	\N	\N	\N
101	cryptopulse	troopers23	unknown	\N	\N	\N
102	dataforge	mch2022	unknown	\N	\N	\N
103	cipherquest	why2025	unknown	\N	\N	\N
104	hackquest	why2025	unknown	\N	\N	\N
105	securesphere	why2025	unknown	\N	\N	\N
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.projects (created_at, updated_at, deleted_at, version_id, user_id, slug, git, allow_team_fixes) FROM stdin;
2024-01-05 11:29:07.05+00	2024-03-20 11:29:07.05+00	\N	1	67	codecraft	\N	\N
2023-08-30 11:29:07.053+00	2023-10-29 11:29:07.053+00	\N	2	58	pixelpulse	\N	\N
2023-09-22 11:29:07.055+00	2023-11-13 11:29:07.055+00	\N	3	43	bitblast	\N	\N
2022-10-24 11:29:07.056+00	2023-01-02 11:29:07.057+00	\N	4	10	nanogames	\N	\N
2023-09-04 11:29:07.058+00	2023-10-06 11:29:07.058+00	\N	5	47	electraplay	\N	\N
2023-01-28 11:29:07.06+00	2023-04-24 11:29:07.06+00	\N	6	54	circuitforge	\N	\N
2023-08-02 11:29:07.061+00	2023-10-27 11:29:07.061+00	\N	7	38	bytebash	\N	\N
2023-12-31 11:29:07.063+00	2024-02-09 11:29:07.063+00	\N	8	19	codecanvas	\N	\N
2022-12-13 11:29:07.064+00	2023-01-13 11:29:07.064+00	\N	9	23	sparkscript	\N	\N
2023-02-05 11:29:07.066+00	2023-05-13 11:29:07.066+00	\N	10	38	logicland	\N	\N
2024-01-05 11:29:07.069+00	2024-03-01 11:29:07.069+00	\N	11	13	microarcade	\N	\N
2024-05-07 11:29:07.071+00	2024-07-22 11:29:07.071+00	\N	12	11	codecraze	\N	\N
2023-12-14 11:29:07.073+00	2024-01-22 11:29:07.073+00	\N	13	23	gamegenius	\N	\N
2023-08-10 11:29:07.075+00	2023-10-23 11:29:07.075+00	\N	14	54	pixelpal	\N	\N
2024-02-26 11:29:07.078+00	2024-04-29 11:29:07.078+00	\N	15	15	electronica	\N	\N
2023-05-15 11:29:07.08+00	2023-07-04 11:29:07.08+00	\N	16	22	codequest	\N	\N
2023-06-19 11:29:07.082+00	2023-07-20 11:29:07.083+00	\N	17	7	circuitcraft	\N	\N
2023-06-07 11:29:07.084+00	2023-07-30 11:29:07.084+00	\N	18	56	bytebeat	\N	\N
2023-06-28 11:29:07.087+00	2023-07-16 11:29:07.087+00	\N	19	59	nanonexus	\N	\N
2023-10-15 11:29:07.089+00	2023-10-21 11:29:07.089+00	\N	20	16	bitbox	\N	\N
2023-02-08 11:29:07.09+00	2023-03-11 11:29:07.09+00	\N	21	38	circuitchaos	\N	\N
2024-04-16 11:29:07.092+00	2024-04-28 11:29:07.092+00	\N	22	34	codecrafter	\N	\N
2022-12-07 11:29:07.094+00	2023-02-18 11:29:07.094+00	\N	23	65	pixelpioneer	\N	\N
2023-05-14 11:29:07.096+00	2023-08-16 11:29:07.096+00	\N	24	17	logiclab	\N	\N
2024-03-29 11:29:07.099+00	2024-05-23 11:29:07.099+00	\N	25	31	byteblitz	\N	\N
2024-03-09 11:29:07.1+00	2024-06-07 11:29:07.1+00	\N	26	17	codewave	\N	\N
2023-11-16 11:29:07.102+00	2024-01-16 11:29:07.102+00	\N	27	64	nanonet	\N	\N
2023-04-21 11:29:07.103+00	2023-06-29 11:29:07.104+00	\N	28	64	electraforge	\N	\N
2022-10-22 11:29:07.105+00	2022-12-09 11:29:07.105+00	\N	29	4	gamegrid	\N	\N
2023-08-28 11:29:07.106+00	2023-10-03 11:29:07.106+00	\N	30	15	logicloom	\N	\N
2023-06-27 11:29:07.108+00	2023-06-28 11:29:07.108+00	\N	31	2	pixelplaza	\N	\N
2022-10-01 11:29:07.11+00	2022-10-27 11:29:07.11+00	\N	32	58	codecity	\N	\N
2023-07-24 11:29:07.112+00	2023-08-11 11:29:07.112+00	\N	33	12	nanoarcade	\N	\N
2023-11-12 11:29:07.114+00	2024-01-17 11:29:07.114+00	\N	34	14	electronera	\N	\N
2022-12-12 11:29:07.115+00	2023-02-13 11:29:07.115+00	\N	35	7	bitbazaar	\N	\N
2023-03-16 11:29:07.116+00	2023-05-22 11:29:07.116+00	\N	36	44	logiclegends	\N	\N
2023-11-28 11:29:07.118+00	2024-01-06 11:29:07.118+00	\N	37	33	codeclan	\N	\N
2024-02-12 11:29:07.119+00	2024-04-25 11:29:07.119+00	\N	38	2	pixelportal	\N	\N
2022-11-04 11:29:07.12+00	2023-01-22 11:29:07.12+00	\N	39	7	circuitcraze	\N	\N
2022-12-09 11:29:07.122+00	2022-12-24 11:29:07.122+00	\N	40	69	bytebuster	\N	\N
2024-03-17 11:29:07.123+00	2024-05-14 11:29:07.123+00	\N	41	12	nanonovel	\N	\N
2023-05-19 11:29:07.125+00	2023-06-03 11:29:07.125+00	\N	42	46	electraeden	\N	\N
2024-02-25 11:29:07.126+00	2024-03-05 11:29:07.126+00	\N	43	34	codecomet	\N	\N
2023-02-15 11:29:07.128+00	2023-05-12 11:29:07.128+00	\N	44	28	pixelplayground	\N	\N
2023-08-10 11:29:07.129+00	2023-09-23 11:29:07.129+00	\N	45	70	logiclandia	\N	\N
2024-03-02 11:29:07.13+00	2024-05-15 11:29:07.13+00	\N	46	7	bytebounce	\N	\N
2023-02-03 11:29:07.131+00	2023-03-10 11:29:07.131+00	\N	47	40	circuitcarnival	\N	\N
2022-10-15 11:29:07.132+00	2022-12-05 11:29:07.132+00	\N	48	48	codecove	\N	\N
2023-10-05 11:29:07.133+00	2023-11-12 11:29:07.134+00	\N	49	16	nanonest	\N	\N
2023-07-11 11:29:07.135+00	2023-09-21 11:29:07.135+00	\N	50	48	electraentertain	\N	\N
2024-02-02 11:29:07.136+00	2024-05-05 11:29:07.136+00	\N	51	50	gamegalaxy	\N	\N
2024-01-04 11:29:07.138+00	2024-01-04 11:29:07.138+00	\N	52	3	logiclabyrinth	\N	\N
2022-10-12 11:29:07.14+00	2022-11-07 11:29:07.14+00	\N	53	28	byteblaster	\N	\N
2023-02-18 11:29:07.142+00	2023-03-20 11:29:07.142+00	\N	54	6	codecompass	\N	\N
2024-03-06 11:29:07.143+00	2024-06-11 11:29:07.143+00	\N	55	26	nanonation	\N	\N
2023-04-17 11:29:07.144+00	2023-06-14 11:29:07.145+00	\N	56	37	electraempire	\N	\N
2024-04-04 11:29:07.146+00	2024-04-29 11:29:07.146+00	\N	57	3	gamegarden	\N	\N
2023-06-13 11:29:07.147+00	2023-07-13 11:29:07.147+00	\N	58	34	pixelpeak	\N	\N
2023-07-14 11:29:07.149+00	2023-07-19 11:29:07.149+00	\N	59	55	circuitcelestial	\N	\N
2023-10-09 11:29:07.15+00	2023-12-23 11:29:07.15+00	\N	60	30	codecrusade	\N	\N
2023-03-03 11:29:07.151+00	2023-05-22 11:29:07.151+00	\N	61	16	nanonebula	\N	\N
2023-09-18 11:29:07.153+00	2023-10-07 11:29:07.153+00	\N	62	3	electraenclave	\N	\N
2023-12-04 11:29:07.155+00	2024-01-17 11:29:07.155+00	\N	63	7	gamegizmo	\N	\N
2023-02-04 11:29:07.156+00	2023-04-06 11:29:07.156+00	\N	64	57	pixelplanet	\N	\N
2022-12-24 11:29:07.157+00	2023-03-02 11:29:07.157+00	\N	65	55	logiclounge	\N	\N
2024-01-25 11:29:07.158+00	2024-02-04 11:29:07.158+00	\N	66	9	bytebeacon	\N	\N
2023-07-04 11:29:07.16+00	2023-08-14 11:29:07.16+00	\N	67	52	codecircus	\N	\N
2022-12-14 11:29:07.161+00	2023-03-12 11:29:07.161+00	\N	68	41	nanonook	\N	\N
2023-06-25 11:29:07.163+00	2023-07-28 11:29:07.163+00	\N	69	55	electraelysium	\N	\N
2023-01-24 11:29:07.164+00	2023-03-12 11:29:07.164+00	\N	70	51	gameglimpse	\N	\N
2023-03-02 11:29:07.165+00	2023-03-22 11:29:07.165+00	\N	71	38	pixelparadise	\N	\N
2024-01-18 11:29:07.167+00	2024-02-04 11:29:07.167+00	\N	72	59	codecoast	\N	\N
2023-06-18 11:29:07.168+00	2023-07-18 11:29:07.168+00	\N	73	59	nanonirvana	\N	\N
2022-11-15 11:29:07.17+00	2022-11-25 11:29:07.17+00	\N	74	55	electraedifice	\N	\N
2023-01-16 11:29:07.171+00	2023-03-02 11:29:07.171+00	\N	75	55	gamegen	\N	\N
2023-12-21 11:29:07.172+00	2024-03-23 11:29:07.172+00	\N	76	44	pixelpandemonium	\N	\N
2023-11-25 11:29:07.174+00	2023-12-13 11:29:07.174+00	\N	77	46	logiclagoon	\N	\N
2023-03-20 11:29:07.175+00	2023-04-05 11:29:07.175+00	\N	78	3	byteblaze	\N	\N
2023-05-18 11:29:07.176+00	2023-07-21 11:29:07.176+00	\N	79	46	codecorridor	\N	\N
2023-01-31 11:29:07.177+00	2023-03-06 11:29:07.177+00	\N	80	37	hacksimulator	\N	\N
2023-02-21 11:29:07.178+00	2023-05-27 11:29:07.178+00	\N	81	45	codecrunch	\N	\N
2024-01-29 11:29:07.179+00	2024-03-16 11:29:07.179+00	\N	82	23	securecraft	\N	\N
2023-01-18 11:29:07.181+00	2023-04-16 11:29:07.181+00	\N	83	12	cryptopulse	\N	\N
2023-07-15 11:29:07.182+00	2023-07-24 11:29:07.182+00	\N	84	12	dataforge	\N	\N
2022-12-14 11:29:07.183+00	2022-12-24 11:29:07.183+00	\N	85	50	cipherquest	\N	\N
2023-08-16 11:29:07.185+00	2023-08-18 11:29:07.185+00	\N	86	37	hackquest	\N	\N
2023-12-26 11:29:07.186+00	2024-03-15 11:29:07.186+00	\N	87	54	securesphere	\N	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.users (id, email, admin, name, password, remember_token, editor, public, show_projects, email_verified_at, created_at, updated_at, deleted_at) FROM stdin;
0	techtinkerer@hotmail.com	f	TechTinkerer	****	\N	default	t	t	\N	2023-06-01 11:29:06.891+00	2023-08-19 11:29:06.9+00	\N
1	codecrafter@hotmail.com	f	CodeCrafter	****	\N	default	t	t	\N	2023-12-19 11:29:06.912+00	2024-01-07 11:29:06.913+00	\N
2	pixelpilot@gmail.com	f	PixelPilot	****	\N	default	t	t	\N	2022-11-29 11:29:06.917+00	2023-01-17 11:29:06.918+00	\N
3	logiclion@techinc.nl	f	LogicLion	****	\N	default	t	t	\N	2024-02-14 11:29:06.92+00	2024-03-20 11:29:06.921+00	\N
4	electroneager@hackalot.nl	f	ElectronEager	****	\N	default	t	t	\N	2024-02-08 11:29:06.923+00	2024-02-26 11:29:06.924+00	\N
5	nanonomad@hack42.nl	f	NanoNomad	****	\N	default	f	t	\N	2024-05-13 11:29:06.927+00	2024-06-13 11:29:06.927+00	\N
6	circuitcraze@hotmail.com	t	CircuitCraze	****	\N	default	t	f	\N	2024-01-27 11:29:06.931+00	2024-03-14 11:29:06.932+00	\N
7	gameglider@techinc.nl	f	GameGlider	****	\N	default	t	t	\N	2023-09-14 11:29:06.934+00	2023-11-27 11:29:06.934+00	\N
8	byteblast@hotmail.com	f	ByteBlast	****	\N	default	t	f	\N	2022-11-20 11:29:06.937+00	2022-12-05 11:29:06.937+00	\N
9	cybercraft@hotmail.com	f	CyberCraft	****	\N	default	t	t	\N	2023-03-11 11:29:06.94+00	2023-05-14 11:29:06.941+00	\N
10	digitaldynamo@hackalot.nl	f	DigitalDynamo	****	\N	default	t	t	\N	2024-04-15 11:29:06.944+00	2024-04-22 11:29:06.944+00	\N
11	codecreator@hotmail.com	f	CodeCreator	****	\N	default	t	f	\N	2023-10-12 11:29:06.946+00	2023-12-11 11:29:06.946+00	\N
12	pixelpulse@gmail.com	f	PixelPulse	****	\N	default	f	f	\N	2024-03-27 11:29:06.948+00	2024-05-08 11:29:06.948+00	\N
13	logicluminary@hack42.nl	t	LogicLuminary	****	\N	default	t	t	\N	2022-12-18 11:29:06.949+00	2023-02-16 11:29:06.949+00	\N
14	electronecho@gmail.com	f	ElectronEcho	****	\N	default	t	t	\N	2024-03-08 11:29:06.951+00	2024-06-04 11:29:06.951+00	\N
15	nanoninja@bitlair.nl	f	NanoNinja	****	\N	default	f	t	\N	2023-03-29 11:29:06.953+00	2023-06-26 11:29:06.953+00	\N
16	circuitchampion@gmail.com	f	CircuitChampion	****	\N	default	t	t	\N	2024-01-05 11:29:06.955+00	2024-01-19 11:29:06.955+00	\N
17	gamegazer@hackalot.nl	t	GameGazer	****	\N	default	t	t	\N	2022-11-23 11:29:06.956+00	2023-02-08 11:29:06.956+00	\N
18	bytebuddy@hack42.nl	f	ByteBuddy	****	\N	default	t	t	\N	2022-12-08 11:29:06.957+00	2023-01-28 11:29:06.957+00	\N
19	techtornado@techinc.nl	f	TechTornado	****	\N	default	t	t	\N	2023-08-20 11:29:06.959+00	2023-11-27 11:29:06.959+00	\N
20	codechampion@hackalot.nl	f	CodeChampion	****	\N	default	t	t	\N	2022-11-10 11:29:06.96+00	2022-11-20 11:29:06.961+00	\N
21	pixelprodigy@techinc.nl	t	PixelProdigy	****	\N	default	t	t	\N	2023-11-01 11:29:06.962+00	2023-12-06 11:29:06.962+00	\N
22	logiclabyrinth@techinc.nl	f	LogicLabyrinth	****	\N	default	t	t	\N	2024-05-21 11:29:06.963+00	2024-06-04 11:29:06.964+00	\N
23	electronexplorer@bitlair.nl	f	ElectronExplorer	****	\N	default	t	t	\N	2023-04-01 11:29:06.965+00	2023-05-25 11:29:06.965+00	\N
24	nanonavigator@gmail.com	f	NanoNavigator	****	\N	default	t	t	\N	2022-10-02 11:29:06.967+00	2022-10-04 11:29:06.967+00	\N
25	circuitcatalyst@bitlair.nl	f	CircuitCatalyst	****	\N	default	f	t	\N	2023-05-16 11:29:06.968+00	2023-08-13 11:29:06.968+00	\N
26	gameguru@hackalot.nl	f	GameGuru	****	\N	default	t	t	\N	2024-05-18 11:29:06.97+00	2024-07-15 11:29:06.97+00	\N
27	byteblaze@gmail.com	f	ByteBlaze	****	\N	default	t	t	\N	2023-12-29 11:29:06.971+00	2024-01-22 11:29:06.971+00	\N
28	digitaldreamer@bitlair.nl	f	DigitalDreamer	****	\N	default	t	t	\N	2024-03-24 11:29:06.973+00	2024-04-08 11:29:06.973+00	\N
29	codecommander@hotmail.com	f	CodeCommander	****	\N	default	t	t	\N	2022-11-16 11:29:06.974+00	2023-01-05 11:29:06.974+00	\N
30	pixelpioneer@bitlair.nl	f	PixelPioneer	****	\N	default	f	t	\N	2023-08-09 11:29:06.976+00	2023-11-06 11:29:06.976+00	\N
31	logiclegend@hackalot.nl	f	LogicLegend	****	\N	default	t	t	\N	2024-01-07 11:29:06.977+00	2024-03-14 11:29:06.977+00	\N
32	electronelite@hotmail.com	f	ElectronElite	****	\N	default	t	t	\N	2023-12-30 11:29:06.978+00	2024-01-07 11:29:06.978+00	\N
33	nanonerd@gmail.com	f	NanoNerd	****	\N	default	t	t	\N	2023-11-04 11:29:06.98+00	2023-11-04 11:29:06.98+00	\N
34	circuitcaptain@hack42.nl	f	CircuitCaptain	****	\N	default	t	t	\N	2024-01-19 11:29:06.981+00	2024-04-12 11:29:06.981+00	\N
35	gamegenius@gmail.com	f	GameGenius	****	\N	default	t	f	\N	2023-06-11 11:29:06.983+00	2023-09-14 11:29:06.983+00	\N
36	bytebolt@techinc.nl	f	ByteBolt	****	\N	default	t	t	\N	2023-12-11 11:29:06.984+00	2024-01-14 11:29:06.984+00	\N
37	cybercipher@hackalot.nl	f	CyberCipher	****	\N	default	t	t	\N	2022-10-01 11:29:06.986+00	2022-10-05 11:29:06.986+00	\N
38	codeconqueror@hack42.nl	f	CodeConqueror	****	\N	default	f	t	\N	2023-09-26 11:29:06.988+00	2023-10-18 11:29:06.988+00	\N
39	pixelpaladin@hack42.nl	f	PixelPaladin	****	\N	default	t	t	\N	2022-11-02 11:29:06.989+00	2022-12-24 11:29:06.99+00	\N
40	logiclore@techinc.nl	f	LogicLore	****	\N	default	t	t	\N	2024-04-15 11:29:06.992+00	2024-07-01 11:29:06.992+00	\N
41	electronenigma@gmail.com	f	ElectronEnigma	****	\N	default	t	t	\N	2022-10-01 11:29:06.993+00	2022-10-24 11:29:06.993+00	\N
42	circuitconnoisseur@gmail.com	f	CircuitConnoisseur	****	\N	default	f	t	\N	2022-10-26 11:29:06.996+00	2022-12-16 11:29:06.996+00	\N
43	gameguardian@techinc.nl	f	GameGuardian	****	\N	default	t	t	\N	2023-07-16 11:29:06.998+00	2023-10-11 11:29:06.998+00	\N
44	bytebandit@gmail.com	f	ByteBandit	****	\N	default	t	t	\N	2023-01-08 11:29:07+00	2023-01-15 11:29:07+00	\N
45	techtinker@techinc.nl	t	TechTinker	****	\N	default	t	t	\N	2023-10-05 11:29:07.002+00	2023-11-17 11:29:07.002+00	\N
46	codecrusader@hotmail.com	f	CodeCrusader	****	\N	default	t	t	\N	2024-02-23 11:29:07.004+00	2024-05-19 11:29:07.004+00	\N
47	pixelpirate@gmail.com	f	PixelPirate	****	\N	default	t	t	\N	2023-09-30 11:29:07.006+00	2023-10-02 11:29:07.006+00	\N
48	electroneagle@hackalot.nl	f	ElectronEagle	****	\N	default	t	t	\N	2023-03-19 11:29:07.007+00	2023-06-10 11:29:07.007+00	\N
49	circuitsavant@hackalot.nl	t	CircuitSavant	****	\N	default	f	t	\N	2024-02-08 11:29:07.009+00	2024-05-16 11:29:07.009+00	\N
50	gamegladiator@techinc.nl	f	GameGladiator	****	\N	default	t	t	\N	2023-07-09 11:29:07.011+00	2023-09-15 11:29:07.011+00	\N
51	byteblitz@techinc.nl	f	ByteBlitz	****	\N	default	t	t	\N	2024-03-18 11:29:07.013+00	2024-04-19 11:29:07.013+00	\N
52	cybersavvy@bitlair.nl	f	CyberSavvy	****	\N	default	t	f	\N	2023-09-06 11:29:07.015+00	2023-11-15 11:29:07.015+00	\N
53	codecraftsman@techinc.nl	f	CodeCraftsman	****	\N	default	t	t	\N	2023-03-02 11:29:07.017+00	2023-06-01 11:29:07.017+00	\N
54	pixelpro@hotmail.com	f	PixelPro	****	\N	default	t	t	\N	2023-05-21 11:29:07.018+00	2023-06-05 11:29:07.018+00	\N
55	logicloremaster@hackalot.nl	f	LogicLoreMaster	****	\N	default	t	f	\N	2023-03-24 11:29:07.02+00	2023-05-10 11:29:07.02+00	\N
56	electronemperor@techinc.nl	f	ElectronEmperor	****	\N	default	t	t	\N	2023-05-11 11:29:07.022+00	2023-08-14 11:29:07.022+00	\N
57	circuitchamp@gmail.com	f	CircuitChamp	****	\N	default	t	t	\N	2023-10-21 11:29:07.024+00	2024-01-03 11:29:07.024+00	\N
58	gamegizmo@hotmail.com	f	GameGizmo	****	\N	default	t	t	\N	2023-06-04 11:29:07.026+00	2023-08-24 11:29:07.026+00	\N
59	bytebrawler@techinc.nl	f	ByteBrawler	****	\N	default	t	t	\N	2023-12-20 11:29:07.028+00	2024-01-23 11:29:07.028+00	\N
60	techtrailblazer@gmail.com	f	TechTrailblazer	****	\N	default	t	t	\N	2023-10-25 11:29:07.029+00	2023-11-19 11:29:07.029+00	\N
61	codecaptain@techinc.nl	f	CodeCaptain	****	\N	default	t	t	\N	2023-01-03 11:29:07.031+00	2023-01-06 11:29:07.031+00	\N
62	pixelpathfinder@gmail.com	f	PixelPathfinder	****	\N	default	t	t	\N	2023-03-07 11:29:07.033+00	2023-03-26 11:29:07.033+00	\N
63	logiclionheart@techinc.nl	f	LogicLionheart	****	\N	default	t	t	\N	2024-01-02 11:29:07.035+00	2024-03-31 11:29:07.035+00	\N
64	electronexpedition@hack42.nl	f	ElectronExpedition	****	\N	default	t	t	\N	2023-10-20 11:29:07.036+00	2023-11-30 11:29:07.036+00	\N
65	nanonoble@gmail.com	f	NanoNoble	****	\N	default	t	t	\N	2022-11-14 11:29:07.037+00	2023-01-12 11:29:07.038+00	\N
66	circuitcommander@bitlair.nl	f	CircuitCommander	****	\N	default	t	t	\N	2023-01-26 11:29:07.039+00	2023-02-28 11:29:07.039+00	\N
67	gameglobetrotter@bitlair.nl	f	GameGlobetrotter	****	\N	default	t	t	\N	2023-01-05 11:29:07.04+00	2023-02-16 11:29:07.04+00	\N
68	cybersherpa@hack42.nl	f	CyberSherpa	****	\N	default	f	t	\N	2023-03-19 11:29:07.042+00	2023-04-24 11:29:07.042+00	\N
69	cybercraftsman@bitlair.nl	f	CyberCraftsman	****	\N	default	t	f	\N	2024-04-26 11:29:07.044+00	2024-05-08 11:29:07.044+00	\N
70	codeconnoisseur@hotmail.com	f	CodeConnoisseur	****	\N	default	t	t	\N	2023-01-22 11:29:07.047+00	2023-04-20 11:29:07.047+00	\N
\.


--
-- Data for Name: versioned_dependencies; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.versioned_dependencies (id, project_slug, depends_on_project_slug, semantic_version_range, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: versions; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.versions (id, project_slug, app_metadata_json_id, revision, semantic_version, zip, size_of_zip, git_commit_id, published_at, download_count, created_at, updated_at, deleted_at) FROM stdin;
1	codecraft	1	0	\N	\N	\N	\N	\N	0	2024-01-05 11:29:07.05+00	2024-03-20 11:29:07.05+00	\N
2	pixelpulse	2	0	\N	\N	\N	\N	\N	0	2023-08-30 11:29:07.053+00	2023-10-29 11:29:07.053+00	\N
3	bitblast	3	0	\N	\N	\N	\N	\N	0	2023-09-22 11:29:07.055+00	2023-11-13 11:29:07.055+00	\N
4	nanogames	4	0	\N	\N	\N	\N	\N	0	2022-10-24 11:29:07.056+00	2023-01-02 11:29:07.057+00	\N
5	electraplay	5	0	\N	\N	\N	\N	\N	0	2023-09-04 11:29:07.058+00	2023-10-06 11:29:07.058+00	\N
6	circuitforge	6	0	\N	\N	\N	\N	\N	0	2023-01-28 11:29:07.06+00	2023-04-24 11:29:07.06+00	\N
7	bytebash	7	0	\N	\N	\N	\N	\N	0	2023-08-02 11:29:07.061+00	2023-10-27 11:29:07.061+00	\N
8	codecanvas	8	0	\N	\N	\N	\N	\N	0	2023-12-31 11:29:07.063+00	2024-02-09 11:29:07.063+00	\N
9	sparkscript	9	0	\N	\N	\N	\N	\N	0	2022-12-13 11:29:07.064+00	2023-01-13 11:29:07.064+00	\N
10	logicland	10	0	\N	\N	\N	\N	\N	0	2023-02-05 11:29:07.066+00	2023-05-13 11:29:07.066+00	\N
11	microarcade	11	0	\N	\N	\N	\N	\N	0	2024-01-05 11:29:07.069+00	2024-03-01 11:29:07.069+00	\N
12	codecraze	12	0	\N	\N	\N	\N	\N	0	2024-05-07 11:29:07.071+00	2024-07-22 11:29:07.071+00	\N
13	gamegenius	13	0	\N	\N	\N	\N	\N	0	2023-12-14 11:29:07.073+00	2024-01-22 11:29:07.073+00	\N
14	pixelpal	14	0	\N	\N	\N	\N	\N	0	2023-08-10 11:29:07.075+00	2023-10-23 11:29:07.075+00	\N
15	electronica	15	0	\N	\N	\N	\N	\N	0	2024-02-26 11:29:07.078+00	2024-04-29 11:29:07.078+00	\N
16	codequest	16	0	\N	\N	\N	\N	\N	0	2023-05-15 11:29:07.08+00	2023-07-04 11:29:07.08+00	\N
17	circuitcraft	17	0	\N	\N	\N	\N	\N	0	2023-06-19 11:29:07.082+00	2023-07-20 11:29:07.083+00	\N
18	bytebeat	18	0	\N	\N	\N	\N	\N	0	2023-06-07 11:29:07.084+00	2023-07-30 11:29:07.084+00	\N
19	nanonexus	19	0	\N	\N	\N	\N	\N	0	2023-06-28 11:29:07.087+00	2023-07-16 11:29:07.087+00	\N
20	bitbox	20	0	\N	\N	\N	\N	\N	0	2023-10-15 11:29:07.089+00	2023-10-21 11:29:07.089+00	\N
21	circuitchaos	21	0	\N	\N	\N	\N	\N	0	2023-02-08 11:29:07.09+00	2023-03-11 11:29:07.09+00	\N
22	codecrafter	22	0	\N	\N	\N	\N	\N	0	2024-04-16 11:29:07.092+00	2024-04-28 11:29:07.092+00	\N
23	pixelpioneer	23	0	\N	\N	\N	\N	\N	0	2022-12-07 11:29:07.094+00	2023-02-18 11:29:07.094+00	\N
24	logiclab	24	0	\N	\N	\N	\N	\N	0	2023-05-14 11:29:07.096+00	2023-08-16 11:29:07.096+00	\N
25	byteblitz	25	0	\N	\N	\N	\N	\N	0	2024-03-29 11:29:07.099+00	2024-05-23 11:29:07.099+00	\N
26	codewave	26	0	\N	\N	\N	\N	\N	0	2024-03-09 11:29:07.1+00	2024-06-07 11:29:07.1+00	\N
27	nanonet	27	0	\N	\N	\N	\N	\N	0	2023-11-16 11:29:07.102+00	2024-01-16 11:29:07.102+00	\N
28	electraforge	28	0	\N	\N	\N	\N	\N	0	2023-04-21 11:29:07.103+00	2023-06-29 11:29:07.104+00	\N
29	gamegrid	29	0	\N	\N	\N	\N	\N	0	2022-10-22 11:29:07.105+00	2022-12-09 11:29:07.105+00	\N
30	logicloom	30	0	\N	\N	\N	\N	\N	0	2023-08-28 11:29:07.106+00	2023-10-03 11:29:07.106+00	\N
31	pixelplaza	31	0	\N	\N	\N	\N	\N	0	2023-06-27 11:29:07.108+00	2023-06-28 11:29:07.108+00	\N
32	codecity	32	0	\N	\N	\N	\N	\N	0	2022-10-01 11:29:07.11+00	2022-10-27 11:29:07.11+00	\N
33	nanoarcade	33	0	\N	\N	\N	\N	\N	0	2023-07-24 11:29:07.112+00	2023-08-11 11:29:07.112+00	\N
34	electronera	34	0	\N	\N	\N	\N	\N	0	2023-11-12 11:29:07.114+00	2024-01-17 11:29:07.114+00	\N
35	bitbazaar	35	0	\N	\N	\N	\N	\N	0	2022-12-12 11:29:07.115+00	2023-02-13 11:29:07.115+00	\N
36	logiclegends	36	0	\N	\N	\N	\N	\N	0	2023-03-16 11:29:07.116+00	2023-05-22 11:29:07.116+00	\N
37	codeclan	37	0	\N	\N	\N	\N	\N	0	2023-11-28 11:29:07.118+00	2024-01-06 11:29:07.118+00	\N
38	pixelportal	38	0	\N	\N	\N	\N	\N	0	2024-02-12 11:29:07.119+00	2024-04-25 11:29:07.119+00	\N
39	circuitcraze	39	0	\N	\N	\N	\N	\N	0	2022-11-04 11:29:07.12+00	2023-01-22 11:29:07.12+00	\N
40	bytebuster	40	0	\N	\N	\N	\N	\N	0	2022-12-09 11:29:07.122+00	2022-12-24 11:29:07.122+00	\N
41	nanonovel	41	0	\N	\N	\N	\N	\N	0	2024-03-17 11:29:07.123+00	2024-05-14 11:29:07.123+00	\N
42	electraeden	42	0	\N	\N	\N	\N	\N	0	2023-05-19 11:29:07.125+00	2023-06-03 11:29:07.125+00	\N
43	codecomet	43	0	\N	\N	\N	\N	\N	0	2024-02-25 11:29:07.126+00	2024-03-05 11:29:07.126+00	\N
44	pixelplayground	44	0	\N	\N	\N	\N	\N	0	2023-02-15 11:29:07.128+00	2023-05-12 11:29:07.128+00	\N
45	logiclandia	45	0	\N	\N	\N	\N	\N	0	2023-08-10 11:29:07.129+00	2023-09-23 11:29:07.129+00	\N
46	bytebounce	46	0	\N	\N	\N	\N	\N	0	2024-03-02 11:29:07.13+00	2024-05-15 11:29:07.13+00	\N
47	circuitcarnival	47	0	\N	\N	\N	\N	\N	0	2023-02-03 11:29:07.131+00	2023-03-10 11:29:07.131+00	\N
48	codecove	48	0	\N	\N	\N	\N	\N	0	2022-10-15 11:29:07.132+00	2022-12-05 11:29:07.132+00	\N
49	nanonest	49	0	\N	\N	\N	\N	\N	0	2023-10-05 11:29:07.133+00	2023-11-12 11:29:07.134+00	\N
50	electraentertain	50	0	\N	\N	\N	\N	\N	0	2023-07-11 11:29:07.135+00	2023-09-21 11:29:07.135+00	\N
51	gamegalaxy	51	0	\N	\N	\N	\N	\N	0	2024-02-02 11:29:07.136+00	2024-05-05 11:29:07.136+00	\N
52	logiclabyrinth	52	0	\N	\N	\N	\N	\N	0	2024-01-04 11:29:07.138+00	2024-01-04 11:29:07.138+00	\N
53	byteblaster	53	0	\N	\N	\N	\N	\N	0	2022-10-12 11:29:07.14+00	2022-11-07 11:29:07.14+00	\N
54	codecompass	54	0	\N	\N	\N	\N	\N	0	2023-02-18 11:29:07.142+00	2023-03-20 11:29:07.142+00	\N
55	nanonation	55	0	\N	\N	\N	\N	\N	0	2024-03-06 11:29:07.143+00	2024-06-11 11:29:07.143+00	\N
56	electraempire	56	0	\N	\N	\N	\N	\N	0	2023-04-17 11:29:07.144+00	2023-06-14 11:29:07.145+00	\N
57	gamegarden	57	0	\N	\N	\N	\N	\N	0	2024-04-04 11:29:07.146+00	2024-04-29 11:29:07.146+00	\N
58	pixelpeak	58	0	\N	\N	\N	\N	\N	0	2023-06-13 11:29:07.147+00	2023-07-13 11:29:07.147+00	\N
59	circuitcelestial	59	0	\N	\N	\N	\N	\N	0	2023-07-14 11:29:07.149+00	2023-07-19 11:29:07.149+00	\N
60	codecrusade	60	0	\N	\N	\N	\N	\N	0	2023-10-09 11:29:07.15+00	2023-12-23 11:29:07.15+00	\N
61	nanonebula	61	0	\N	\N	\N	\N	\N	0	2023-03-03 11:29:07.151+00	2023-05-22 11:29:07.151+00	\N
62	electraenclave	62	0	\N	\N	\N	\N	\N	0	2023-09-18 11:29:07.153+00	2023-10-07 11:29:07.153+00	\N
63	gamegizmo	63	0	\N	\N	\N	\N	\N	0	2023-12-04 11:29:07.155+00	2024-01-17 11:29:07.155+00	\N
64	pixelplanet	64	0	\N	\N	\N	\N	\N	0	2023-02-04 11:29:07.156+00	2023-04-06 11:29:07.156+00	\N
65	logiclounge	65	0	\N	\N	\N	\N	\N	0	2022-12-24 11:29:07.157+00	2023-03-02 11:29:07.157+00	\N
66	bytebeacon	66	0	\N	\N	\N	\N	\N	0	2024-01-25 11:29:07.158+00	2024-02-04 11:29:07.158+00	\N
67	codecircus	67	0	\N	\N	\N	\N	\N	0	2023-07-04 11:29:07.16+00	2023-08-14 11:29:07.16+00	\N
68	nanonook	68	0	\N	\N	\N	\N	\N	0	2022-12-14 11:29:07.161+00	2023-03-12 11:29:07.161+00	\N
69	electraelysium	69	0	\N	\N	\N	\N	\N	0	2023-06-25 11:29:07.163+00	2023-07-28 11:29:07.163+00	\N
70	gameglimpse	70	0	\N	\N	\N	\N	\N	0	2023-01-24 11:29:07.164+00	2023-03-12 11:29:07.164+00	\N
71	pixelparadise	71	0	\N	\N	\N	\N	\N	0	2023-03-02 11:29:07.165+00	2023-03-22 11:29:07.165+00	\N
72	codecoast	72	0	\N	\N	\N	\N	\N	0	2024-01-18 11:29:07.167+00	2024-02-04 11:29:07.167+00	\N
73	nanonirvana	73	0	\N	\N	\N	\N	\N	0	2023-06-18 11:29:07.168+00	2023-07-18 11:29:07.168+00	\N
74	electraedifice	74	0	\N	\N	\N	\N	\N	0	2022-11-15 11:29:07.17+00	2022-11-25 11:29:07.17+00	\N
75	gamegen	75	0	\N	\N	\N	\N	\N	0	2023-01-16 11:29:07.171+00	2023-03-02 11:29:07.171+00	\N
76	pixelpandemonium	76	0	\N	\N	\N	\N	\N	0	2023-12-21 11:29:07.172+00	2024-03-23 11:29:07.172+00	\N
77	logiclagoon	77	0	\N	\N	\N	\N	\N	0	2023-11-25 11:29:07.174+00	2023-12-13 11:29:07.174+00	\N
78	byteblaze	78	0	\N	\N	\N	\N	\N	0	2023-03-20 11:29:07.175+00	2023-04-05 11:29:07.175+00	\N
79	codecorridor	79	0	\N	\N	\N	\N	\N	0	2023-05-18 11:29:07.176+00	2023-07-21 11:29:07.176+00	\N
80	hacksimulator	80	0	\N	\N	\N	\N	\N	0	2023-01-31 11:29:07.177+00	2023-03-06 11:29:07.177+00	\N
81	codecrunch	81	0	\N	\N	\N	\N	\N	0	2023-02-21 11:29:07.178+00	2023-05-27 11:29:07.178+00	\N
82	securecraft	82	0	\N	\N	\N	\N	\N	0	2024-01-29 11:29:07.179+00	2024-03-16 11:29:07.179+00	\N
83	cryptopulse	83	0	\N	\N	\N	\N	\N	0	2023-01-18 11:29:07.181+00	2023-04-16 11:29:07.181+00	\N
84	dataforge	84	0	\N	\N	\N	\N	\N	0	2023-07-15 11:29:07.182+00	2023-07-24 11:29:07.182+00	\N
85	cipherquest	85	0	\N	\N	\N	\N	\N	0	2022-12-14 11:29:07.183+00	2022-12-24 11:29:07.183+00	\N
86	hackquest	86	0	\N	\N	\N	\N	\N	0	2023-08-16 11:29:07.185+00	2023-08-18 11:29:07.185+00	\N
87	securesphere	87	0	\N	\N	\N	\N	\N	0	2023-12-26 11:29:07.186+00	2024-03-15 11:29:07.186+00	\N
\.


--
-- Name: app_metadata_jsons_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.app_metadata_jsons_id_seq', 87, true);


--
-- Name: project_statuses_on_badges_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.project_statuses_on_badges_id_seq', 105, true);


--
-- Name: versioned_dependencies_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.versioned_dependencies_id_seq', 1, false);


--
-- Name: versions_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.versions_id_seq', 87, true);


--
-- Name: app_metadata_jsons app_metadata_jsons_pkey; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.app_metadata_jsons
    ADD CONSTRAINT app_metadata_jsons_pkey PRIMARY KEY (id);


--
-- Name: badges badges_pkey; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.badges
    ADD CONSTRAINT badges_pkey PRIMARY KEY (slug);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (slug);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: project_statuses_on_badges project_statuses_on_badges_pkey; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.project_statuses_on_badges
    ADD CONSTRAINT project_statuses_on_badges_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (slug);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: versioned_dependencies versioned_dependencies_pkey; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.versioned_dependencies
    ADD CONSTRAINT versioned_dependencies_pkey PRIMARY KEY (id);


--
-- Name: versions versions_pkey; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.versions
    ADD CONSTRAINT versions_pkey PRIMARY KEY (id);


--
-- Name: idx_app_metadata_jsons_category; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_app_metadata_jsons_category ON badgehub.app_metadata_jsons USING btree (category);


--
-- Name: idx_app_metadata_jsons_is_hidden; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_app_metadata_jsons_is_hidden ON badgehub.app_metadata_jsons USING btree (is_hidden);


--
-- Name: idx_app_metadata_jsons_name; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_app_metadata_jsons_name ON badgehub.app_metadata_jsons USING btree (name);


--
-- Name: idx_categories_deleted_at; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_categories_deleted_at ON badgehub.categories USING btree (deleted_at);


--
-- Name: idx_categories_name; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_categories_name ON badgehub.categories USING btree (name);


--
-- Name: idx_user_id; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_user_id ON badgehub.projects USING btree (user_id);


--
-- Name: idx_versions_project_slug; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_versions_project_slug ON badgehub.versions USING btree (project_slug);


--
-- Name: idx_versions_published_at; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_versions_published_at ON badgehub.versions USING btree (published_at);


--
-- Name: app_metadata_jsons app_metadata_jsons_category_fk; Type: FK CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.app_metadata_jsons
    ADD CONSTRAINT app_metadata_jsons_category_fk FOREIGN KEY (category) REFERENCES badgehub.categories(name) ON DELETE SET DEFAULT;


--
-- Name: project_statuses_on_badges project_statuses_on_badges_badge_slug_fk; Type: FK CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.project_statuses_on_badges
    ADD CONSTRAINT project_statuses_on_badges_badge_slug_fk FOREIGN KEY (badge_slug) REFERENCES badgehub.badges(slug) ON DELETE CASCADE;


--
-- Name: project_statuses_on_badges project_statuses_on_badges_project_slug_fk; Type: FK CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.project_statuses_on_badges
    ADD CONSTRAINT project_statuses_on_badges_project_slug_fk FOREIGN KEY (project_slug) REFERENCES badgehub.projects(slug) ON DELETE CASCADE;


--
-- Name: projects projects_user_id_fk; Type: FK CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.projects
    ADD CONSTRAINT projects_user_id_fk FOREIGN KEY (user_id) REFERENCES badgehub.users(id) ON DELETE CASCADE;


--
-- Name: projects projects_version_id_fk; Type: FK CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.projects
    ADD CONSTRAINT projects_version_id_fk FOREIGN KEY (version_id) REFERENCES badgehub.versions(id) ON DELETE SET NULL;


--
-- Name: versioned_dependencies versioned_dependency_project_slug_fk; Type: FK CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.versioned_dependencies
    ADD CONSTRAINT versioned_dependency_project_slug_fk FOREIGN KEY (project_slug) REFERENCES badgehub.projects(slug) ON DELETE CASCADE;


--
-- Name: versions versions_app_metadata_json_id_fk; Type: FK CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.versions
    ADD CONSTRAINT versions_app_metadata_json_id_fk FOREIGN KEY (app_metadata_json_id) REFERENCES badgehub.app_metadata_jsons(id) ON DELETE CASCADE;


--
-- Name: versions versions_project_slug_fk; Type: FK CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.versions
    ADD CONSTRAINT versions_project_slug_fk FOREIGN KEY (project_slug) REFERENCES badgehub.projects(slug) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

