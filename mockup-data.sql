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
-- Name: files; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.files (
    version_id integer NOT NULL,
    dir text NOT NULL,
    name text NOT NULL,
    ext text NOT NULL,
    confirmed_in_sync_on_disk boolean DEFAULT false,
    mimetype text NOT NULL,
    size_of_content bigint NOT NULL,
    sha256 text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE badgehub.files OWNER TO badgehub;

--
-- Name: migrations; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.migrations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    run_on timestamp without time zone NOT NULL
);


ALTER TABLE badgehub.migrations OWNER TO badgehub;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: badgehub; Owner: badgehub
--

CREATE SEQUENCE badgehub.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE badgehub.migrations_id_seq OWNER TO badgehub;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: badgehub; Owner: badgehub
--

ALTER SEQUENCE badgehub.migrations_id_seq OWNED BY badgehub.migrations.id;


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
    user_id integer NOT NULL,
    slug text NOT NULL,
    git text,
    allow_team_fixes boolean
);


ALTER TABLE badgehub.projects OWNER TO badgehub;

--
-- Name: users; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.users (
    id integer NOT NULL,
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
-- Name: users_id_seq; Type: SEQUENCE; Schema: badgehub; Owner: badgehub
--

CREATE SEQUENCE badgehub.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE badgehub.users_id_seq OWNER TO badgehub;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: badgehub; Owner: badgehub
--

ALTER SEQUENCE badgehub.users_id_seq OWNED BY badgehub.users.id;


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
-- Name: migrations id; Type: DEFAULT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.migrations ALTER COLUMN id SET DEFAULT nextval('badgehub.migrations_id_seq'::regclass);


--
-- Name: project_statuses_on_badges id; Type: DEFAULT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.project_statuses_on_badges ALTER COLUMN id SET DEFAULT nextval('badgehub.project_statuses_on_badges_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.users ALTER COLUMN id SET DEFAULT nextval('badgehub.users_id_seq'::regclass);


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
1	Uncategorised	CodeCraft	Use CodeCraft for some cool graphical effects.	NanoNavigator	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-11-22 10:06:38.241+00	2023-12-16 10:06:38.241+00	\N
2	Uncategorised	PixelPulse	Use PixelPulse for some cool graphical effects.	NanoNavigator	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-09-19 10:06:38.249+00	2023-12-16 10:06:38.249+00	\N
3	Uncategorised	BitBlast	Use BitBlast for some cool graphical effects.	GameGuardian	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-03-21 10:06:38.255+00	2024-03-25 10:06:38.255+00	\N
4	Uncategorised	NanoGames	Use NanoGames for some cool graphical effects.	CircuitCaptain	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-08-26 10:06:38.259+00	2023-09-07 10:06:38.259+00	\N
5	Uncategorised	ElectraPlay	Use ElectraPlay for some cool graphical effects.	GameGazer	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-11-06 10:06:38.264+00	2023-12-16 10:06:38.264+00	\N
6	Adult	CircuitForge	Use CircuitForge for some cool graphical effects.	GameGladiator	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-01-21 10:06:38.269+00	2024-03-25 10:06:38.269+00	\N
7	Silly	ByteBash	Use ByteBash for some cool graphical effects.	TechTinker	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-08-02 10:06:38.273+00	2023-09-07 10:06:38.273+00	\N
8	Uncategorised	CodeCanvas	Use CodeCanvas for some cool graphical effects.	LogicLabyrinth	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-10-15 10:06:38.278+00	2025-01-19 10:06:38.278+00	\N
9	Uncategorised	SparkScript	Use SparkScript for some cool graphical effects.	GameGizmo	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-08-28 10:06:38.282+00	2024-10-11 10:06:38.282+00	\N
10	Uncategorised	LogicLand	Use LogicLand for some cool graphical effects.	ByteBlitz	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-02-10 10:06:38.287+00	2024-03-25 10:06:38.287+00	\N
11	Adult	MicroArcade	Use MicroArcade for some cool graphical effects.	PixelPaladin	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-10-17 10:06:38.291+00	2023-12-16 10:06:38.291+00	\N
12	Uncategorised	CodeCraze	Use CodeCraze for some cool graphical effects.	ElectronEcho	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-05-24 10:06:38.295+00	2024-07-03 10:06:38.295+00	\N
13	Adult	GameGenius	Use GameGenius for some cool graphical effects.	CodeCrafter	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-06-05 10:06:38.299+00	2024-07-03 10:06:38.299+00	\N
14	Uncategorised	PixelPal	Use PixelPal for some cool graphical effects.	LogicLuminary	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-07-27 10:06:38.303+00	2024-10-11 10:06:38.303+00	\N
15	Adult	Electronica	Use Electronica for some cool graphical effects.	CyberCraftsman	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-11-10 10:06:38.307+00	2023-12-16 10:06:38.307+00	\N
16	Uncategorised	CodeQuest	Use CodeQuest for some cool graphical effects.	TechTrailblazer	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-12-18 10:06:38.312+00	2025-01-19 10:06:38.312+00	\N
17	Uncategorised	CircuitCraft	Use CircuitCraft for some cool graphical effects.	PixelPulse	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-03-21 10:06:38.316+00	2024-03-25 10:06:38.316+00	\N
18	Uncategorised	ByteBeat	Use ByteBeat for some cool graphical effects.	ByteBlaze	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-02-02 10:06:38.32+00	2024-03-25 10:06:38.32+00	\N
19	Uncategorised	NanoNexus	Use NanoNexus for some cool graphical effects.	LogicLabyrinth	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-04-30 10:06:38.324+00	2024-07-03 10:06:38.324+00	\N
20	Adult	BitBox	Use BitBox for some cool graphical effects.	NanoNinja	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-01-21 10:06:38.328+00	2024-03-25 10:06:38.328+00	\N
21	Hardware	CircuitChaos	Use CircuitChaos for some cool graphical effects.	CircuitChamp	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-11-02 10:06:38.337+00	2023-12-16 10:06:38.337+00	\N
22	Silly	CodeCrafter	Use CodeCrafter for some cool graphical effects.	CodeCaptain	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-05-08 10:06:38.341+00	2024-07-03 10:06:38.341+00	\N
23	SAO	PixelPioneer	Make some magic happen with PixelPioneer.	DigitalDreamer	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-09-07 10:06:38.347+00	2024-10-11 10:06:38.347+00	\N
24	Uncategorised	LogicLab	Use LogicLab for some cool graphical effects.	PixelPilot	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-11-08 10:06:38.351+00	2025-01-19 10:06:38.351+00	\N
25	Uncategorised	ByteBlitz	Use ByteBlitz for some cool graphical effects.	GameGizmo	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-04-06 10:06:38.354+00	2024-07-03 10:06:38.354+00	\N
26	Silly	CodeWave	Use CodeWave for some cool graphical effects.	ByteBandit	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-01-25 10:06:38.358+00	2024-03-25 10:06:38.358+00	\N
27	Adult	NanoNet	Use NanoNet for some cool graphical effects.	PixelPro	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-07-07 10:06:38.362+00	2024-10-11 10:06:38.362+00	\N
28	Uncategorised	ElectraForge	Use ElectraForge for some cool graphical effects.	ElectronEmperor	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-05-16 10:06:38.366+00	2024-07-03 10:06:38.366+00	\N
29	Uncategorised	GameGrid	Use GameGrid for some cool graphical effects.	GameGlider	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-03-21 10:06:38.369+00	2024-03-25 10:06:38.369+00	\N
30	Adult	LogicLoom	Use LogicLoom for some cool graphical effects.	NanoNomad	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-10-19 10:06:38.372+00	2025-01-19 10:06:38.372+00	\N
31	Hardware	PixelPlaza	Use PixelPlaza for some cool graphical effects.	ElectronExpedition	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-09-01 10:06:38.376+00	2024-10-11 10:06:38.376+00	\N
32	Silly	CodeCity	Use CodeCity for some cool graphical effects.	PixelPulse	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-08-12 10:06:38.379+00	2024-10-11 10:06:38.379+00	\N
33	Uncategorised	NanoArcade	Use NanoArcade for some cool graphical effects.	TechTornado	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-03-05 10:06:38.383+00	2024-03-25 10:06:38.383+00	\N
34	Silly	ElectronEra	Use ElectronEra for some cool graphical effects.	GameGlobetrotter	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-07-03 10:06:38.386+00	2024-07-03 10:06:38.386+00	\N
35	Uncategorised	BitBazaar	Use BitBazaar for some cool graphical effects.	LogicLore	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-09-11 10:06:38.389+00	2023-12-16 10:06:38.389+00	\N
36	Adult	LogicLegends	Use LogicLegends for some cool graphical effects.	CircuitCommander	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-02-14 10:06:38.393+00	2024-03-25 10:06:38.393+00	\N
37	Silly	CodeClan	Use CodeClan for some cool graphical effects.	PixelPaladin	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-02-02 10:06:38.396+00	2024-03-25 10:06:38.396+00	\N
38	Hardware	PixelPortal	Use PixelPortal for some cool graphical effects.	CyberCraft	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-09-09 10:06:38.399+00	2024-10-11 10:06:38.399+00	\N
39	Uncategorised	CircuitCraze	Use CircuitCraze for some cool graphical effects.	PixelPulse	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-04-14 10:06:38.403+00	2024-07-03 10:06:38.403+00	\N
40	Uncategorised	ByteBuster	Use ByteBuster for some cool graphical effects.	LogicLionheart	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-03-21 10:06:38.407+00	2024-03-25 10:06:38.407+00	\N
41	Silly	NanoNovel	Use NanoNovel for some cool graphical effects.	PixelProdigy	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-08-02 10:06:38.411+00	2023-09-07 10:06:38.411+00	\N
42	Silly	ElectraEden	Use ElectraEden for some cool graphical effects.	ByteBlaze	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-01-25 10:06:38.414+00	2024-03-25 10:06:38.414+00	\N
43	Uncategorised	CodeComet	Use CodeComet for some cool graphical effects.	CircuitConnoisseur	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-09-13 10:06:38.418+00	2024-10-11 10:06:38.418+00	\N
44	Uncategorised	PixelPlayground	Use PixelPlayground for some cool graphical effects.	LogicLionheart	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-11-30 10:06:38.422+00	2023-12-16 10:06:38.422+00	\N
45	Uncategorised	LogicLandia	Use LogicLandia for some cool graphical effects.	GameGlobetrotter	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-08-12 10:06:38.426+00	2024-10-11 10:06:38.426+00	\N
46	Silly	ByteBounce	Use ByteBounce for some cool graphical effects.	CircuitConnoisseur	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-12-08 10:06:38.429+00	2023-12-16 10:06:38.429+00	\N
47	Silly	CircuitCarnival	Use CircuitCarnival for some cool graphical effects.	CircuitCraze	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-07-27 10:06:38.433+00	2024-10-11 10:06:38.433+00	\N
48	Uncategorised	CodeCove	Use CodeCove for some cool graphical effects.	ElectronEager	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-12-26 10:06:38.437+00	2025-01-19 10:06:38.437+00	\N
49	Uncategorised	NanoNest	Use NanoNest for some cool graphical effects.	CodeChampion	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-08-10 10:06:38.441+00	2023-09-07 10:06:38.441+00	\N
50	Uncategorised	ElectraEntertain	Use ElectraEntertain for some cool graphical effects.	DigitalDynamo	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-10-15 10:06:38.447+00	2025-01-19 10:06:38.447+00	\N
51	Uncategorised	GameGalaxy	Use GameGalaxy for some cool graphical effects.	DigitalDynamo	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-10-15 10:06:38.452+00	2025-01-19 10:06:38.452+00	\N
52	Silly	LogicLabyrinth	Use LogicLabyrinth for some cool graphical effects.	CodeChampion	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-03-13 10:06:38.456+00	2024-03-25 10:06:38.456+00	\N
53	Silly	ByteBlaster	Use ByteBlaster for some cool graphical effects.	CyberCraftsman	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-09-21 10:06:38.46+00	2024-10-11 10:06:38.46+00	\N
54	Silly	CodeCompass	Use CodeCompass for some cool graphical effects.	ElectronExplorer	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-10-23 10:06:38.464+00	2025-01-19 10:06:38.464+00	\N
55	Uncategorised	NanoNation	Use NanoNation for some cool graphical effects.	ElectronEmperor	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-09-05 10:06:38.467+00	2024-10-11 10:06:38.467+00	\N
56	Silly	ElectraEmpire	Use ElectraEmpire for some cool graphical effects.	LogicLion	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-11-14 10:06:38.471+00	2023-12-16 10:06:38.471+00	\N
57	Uncategorised	GameGarden	Use GameGarden for some cool graphical effects.	PixelPathfinder	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2025-01-03 10:06:38.475+00	2025-01-19 10:06:38.475+00	\N
58	Hardware	PixelPeak	Use PixelPeak for some cool graphical effects.	CircuitChampion	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-09-17 10:06:38.478+00	2024-10-11 10:06:38.478+00	\N
59	Silly	CircuitCelestial	Use CircuitCelestial for some cool graphical effects.	CodeCaptain	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-07-09 10:06:38.482+00	2023-09-07 10:06:38.482+00	\N
60	Uncategorised	CodeCrusade	Use CodeCrusade for some cool graphical effects.	LogicLion	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-06-25 10:06:38.486+00	2024-07-03 10:06:38.486+00	\N
61	SAO	NanoNebula	Make some magic happen with NanoNebula.	ElectronEnigma	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-12-04 10:06:38.491+00	2025-01-19 10:06:38.491+00	\N
62	Silly	ElectraEnclave	Use ElectraEnclave for some cool graphical effects.	TechTornado	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-11-30 10:06:38.495+00	2023-12-16 10:06:38.495+00	\N
63	Uncategorised	GameGizmo	Use GameGizmo for some cool graphical effects.	CodeCraftsman	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-03-21 10:06:38.498+00	2024-03-25 10:06:38.498+00	\N
64	Games	PixelPlanet	Make some magic happen with PixelPlanet.	CodeConqueror	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-10-05 10:06:38.501+00	2024-10-11 10:06:38.501+00	\N
65	Silly	LogicLounge	Use LogicLounge for some cool graphical effects.	CodeCaptain	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-12-02 10:06:38.505+00	2025-01-19 10:06:38.505+00	\N
66	Uncategorised	ByteBeacon	Use ByteBeacon for some cool graphical effects.	PixelPathfinder	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-09-03 10:06:38.509+00	2023-09-07 10:06:38.509+00	\N
67	Adult	CodeCircus	Use CodeCircus for some cool graphical effects.	DigitalDreamer	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-10-01 10:06:38.513+00	2023-12-16 10:06:38.513+00	\N
68	Uncategorised	NanoNook	Use NanoNook for some cool graphical effects.	NanoNinja	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-10-23 10:06:38.517+00	2025-01-19 10:06:38.517+00	\N
69	Silly	ElectraElysium	Use ElectraElysium for some cool graphical effects.	LogicLore	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-12-24 10:06:38.52+00	2024-03-25 10:06:38.52+00	\N
70	Silly	GameGlimpse	Use GameGlimpse for some cool graphical effects.	PixelPilot	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-10-15 10:06:38.524+00	2025-01-19 10:06:38.524+00	\N
71	Silly	PixelParadise	Use PixelParadise for some cool graphical effects.	CircuitCaptain	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-11-22 10:06:38.528+00	2023-12-16 10:06:38.528+00	\N
72	Silly	CodeCoast	Use CodeCoast for some cool graphical effects.	CircuitCommander	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-04-22 10:06:38.531+00	2024-07-03 10:06:38.531+00	\N
73	Uncategorised	NanoNirvana	Use NanoNirvana for some cool graphical effects.	ElectronExpedition	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-02-26 10:06:38.534+00	2024-03-25 10:06:38.534+00	\N
74	Silly	ElectraEdifice	Use ElectraEdifice for some cool graphical effects.	ElectronEagle	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-01-17 10:06:38.538+00	2024-03-25 10:06:38.538+00	\N
75	Uncategorised	GameGen	Use GameGen for some cool graphical effects.	GameGuru	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-09-27 10:06:38.541+00	2023-12-16 10:06:38.541+00	\N
76	Uncategorised	PixelPandemonium	Use PixelPandemonium for some cool graphical effects.	PixelPilot	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-04-22 10:06:38.546+00	2024-07-03 10:06:38.546+00	\N
77	Wearable	LogicLagoon	Make some magic happen with LogicLagoon.	GameGuru	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-06-09 10:06:38.551+00	2023-09-07 10:06:38.551+00	\N
78	Hardware	ByteBlaze	Use ByteBlaze for some cool graphical effects.	CircuitChamp	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-06-11 10:06:38.555+00	2023-09-07 10:06:38.555+00	\N
79	Uncategorised	CodeCorridor	Use CodeCorridor for some cool graphical effects.	TechTrailblazer	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-04-22 10:06:38.559+00	2024-07-03 10:06:38.559+00	\N
80	Adult	HackSimulator	Use HackSimulator for some cool graphical effects.	CodeCraftsman	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-10-11 10:06:38.562+00	2024-10-11 10:06:38.562+00	\N
81	Uncategorised	CodeCrunch	Use CodeCrunch for some cool graphical effects.	CyberSavvy	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-06-25 10:06:38.566+00	2024-07-03 10:06:38.566+00	\N
82	Uncategorised	SecureCraft	Use SecureCraft for some cool graphical effects.	ElectronEcho	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-05-24 10:06:38.571+00	2024-07-03 10:06:38.571+00	\N
83	Uncategorised	CryptoPulse	Use CryptoPulse for some cool graphical effects.	ByteBuddy	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-08-28 10:06:38.575+00	2024-10-11 10:06:38.575+00	\N
84	Silly	DataForge	Use DataForge for some cool graphical effects.	ByteBuddy	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-07-09 10:06:38.58+00	2023-09-07 10:06:38.58+00	\N
85	Uncategorised	CipherQuest	Use CipherQuest for some cool graphical effects.	CodeCrafter	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-06-23 10:06:38.584+00	2023-09-07 10:06:38.584+00	\N
86	Uncategorised	HackQuest	Use HackQuest for some cool graphical effects.	CodeCrusader	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-09-21 10:06:38.591+00	2024-10-11 10:06:38.591+00	\N
87	Uncategorised	SecureSphere	Use SecureSphere for some cool graphical effects.	CodeCrusader	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-06-17 10:06:38.595+00	2024-07-03 10:06:38.595+00	\N
\.


--
-- Data for Name: badges; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.badges (slug, name, created_at, updated_at, deleted_at) FROM stdin;
mch2022	mch2022	2023-06-11 10:06:38.181+00	2023-09-07 10:06:38.182+00	\N
troopers23	troopers23	2024-07-03 10:06:38.184+00	2024-07-03 10:06:38.184+00	\N
why2025	WHY2025	2025-01-19 10:06:38.185+00	2025-01-19 10:06:38.185+00	\N
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.categories (slug, name, created_at, updated_at, deleted_at) FROM stdin;
uncategorised	Uncategorised	2024-02-26 10:06:38.185+00	2024-03-25 10:06:38.185+00	\N
event_related	Event related	2024-06-09 10:06:38.186+00	2024-07-03 10:06:38.186+00	\N
games	Games	2024-02-26 10:06:38.187+00	2024-03-25 10:06:38.187+00	\N
graphics	Graphics	2024-12-10 10:06:38.187+00	2025-01-19 10:06:38.187+00	\N
hardware	Hardware	2024-06-09 10:06:38.188+00	2024-07-03 10:06:38.188+00	\N
utility	Utility	2024-01-09 10:06:38.188+00	2024-03-25 10:06:38.188+00	\N
wearable	Wearable	2024-08-04 10:06:38.189+00	2024-10-11 10:06:38.189+00	\N
data	Data	2023-12-04 10:06:38.189+00	2023-12-16 10:06:38.189+00	\N
silly	Silly	2024-06-25 10:06:38.19+00	2024-07-03 10:06:38.19+00	\N
hacking	Hacking	2024-01-25 10:06:38.19+00	2024-03-25 10:06:38.19+00	\N
troll	Troll	2024-10-31 10:06:38.19+00	2025-01-19 10:06:38.19+00	\N
unusable	Unusable	2024-02-18 10:06:38.191+00	2024-03-25 10:06:38.191+00	\N
adult	Adult	2023-06-07 10:06:38.191+00	2023-09-07 10:06:38.191+00	\N
virus	Virus	2023-08-26 10:06:38.191+00	2023-09-07 10:06:38.191+00	\N
sao	SAO	2024-03-05 10:06:38.192+00	2024-03-25 10:06:38.192+00	\N
interpreter	Interpreter	2024-06-01 10:06:38.192+00	2024-07-03 10:06:38.192+00	\N
\.


--
-- Data for Name: files; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.files (version_id, dir, name, ext, confirmed_in_sync_on_disk, mimetype, size_of_content, sha256, created_at, updated_at, deleted_at) FROM stdin;
1		metadata	.json	t	application/json	259	3b6f1b0b664e414550b1cb95109374d1feb09f7b5481740aad03b68735bfcca5	2025-01-19 10:06:38.276328+00	2025-01-19 10:06:38.276328+00	\N
1		__init__	.py	t	text/x-python-script	43	4028201b6ebf876b3ee30462c4d170146a2d3d92c5aca9fefc5e3d1a0508f5df	2025-01-19 10:06:38.280304+00	2025-01-19 10:06:38.280304+00	\N
2		metadata	.json	t	application/json	261	5eaa46e8d6e97a716c49d9f98e3300c14352d4cf915f075a5b32d7e2d55e3c73	2025-01-19 10:06:38.282734+00	2025-01-19 10:06:38.282734+00	\N
2		__init__	.py	t	text/x-python-script	44	9aa3814437e99d152b55e8d30785ae282f4ace6d5b47371690f27571174641ba	2025-01-19 10:06:38.285592+00	2025-01-19 10:06:38.285592+00	\N
3		metadata	.json	t	application/json	256	4ff34ac6cc2fe9011aa1486cc2ddc46bc58af44a6d9369d234f4f49b1add3ab6	2025-01-19 10:06:38.287973+00	2025-01-19 10:06:38.287973+00	\N
3		__init__	.py	t	text/x-python-script	42	49b72397cd8e216aaf79fe5588c549c3d0345a9a4a557116de55e25ff02261b7	2025-01-19 10:06:38.289872+00	2025-01-19 10:06:38.289872+00	\N
4		metadata	.json	t	application/json	260	602a1eda360d8c3910debd574235597bb1b646eccf4821a1db9fbf5b5c6ede45	2025-01-19 10:06:38.292837+00	2025-01-19 10:06:38.292837+00	\N
4		__init__	.py	t	text/x-python-script	43	5e785c38408783e0c19e21d247aed30e7756e473a8b717c8ed76987134781f9e	2025-01-19 10:06:38.295438+00	2025-01-19 10:06:38.295438+00	\N
5		metadata	.json	t	application/json	259	47028ff94c512076f1f4b55675dde0cfb0eddcc5809d525929d98d3c64aa60bf	2025-01-19 10:06:38.297625+00	2025-01-19 10:06:38.297625+00	\N
5		__init__	.py	t	text/x-python-script	45	a0cf3ab0dde63421421a47268941bf6dcbd2d5046a82edf532951b8619e04168	2025-01-19 10:06:38.299829+00	2025-01-19 10:06:38.299829+00	\N
6		metadata	.json	t	application/json	257	45acfc7bcccba63fccea0c17bc1fc94928ab3426319d302b62ba68089c215ef2	2025-01-19 10:06:38.302879+00	2025-01-19 10:06:38.302879+00	\N
6		__init__	.py	t	text/x-python-script	46	3c374193e3ec95322be1d5e5c569c3a7514a4dbf169d9ae7d494bb6911dc2bf6	2025-01-19 10:06:38.30478+00	2025-01-19 10:06:38.30478+00	\N
7		metadata	.json	t	application/json	246	c1abb6b99acadc79f7c9d7f7d96f66bbd6e89b32392da59c7c64f3970ff6d6f1	2025-01-19 10:06:38.306753+00	2025-01-19 10:06:38.306753+00	\N
7		__init__	.py	t	text/x-python-script	42	c4b9c74fa92f14325701797e6a063ee0658a942a48b5130aedb64bb2b910b132	2025-01-19 10:06:38.308927+00	2025-01-19 10:06:38.308927+00	\N
8		metadata	.json	t	application/json	262	cbeee48ed7d86e618e494c2b33c71444488b834df391c94a79bdfb39878ca4f9	2025-01-19 10:06:38.311176+00	2025-01-19 10:06:38.311176+00	\N
8		__init__	.py	t	text/x-python-script	44	96308cdc9e544da17073506cec8066e7dd19634f8544c38cae0b35b7f8071a01	2025-01-19 10:06:38.31335+00	2025-01-19 10:06:38.31335+00	\N
9		metadata	.json	t	application/json	259	ad3065114e3d12edd36fb1825e3bf635b30cd3bf6cd161545a348b23019692ee	2025-01-19 10:06:38.315514+00	2025-01-19 10:06:38.315514+00	\N
9		__init__	.py	t	text/x-python-script	45	d9978aacdb1ac896d1842a76af206475750d37832758cbd4fb6d1f4a2a6ee2c7	2025-01-19 10:06:38.317874+00	2025-01-19 10:06:38.317874+00	\N
10		metadata	.json	t	application/json	255	0e9f4582326b92d8898273ef22d5224bdc1ddf23e0b88559e58c23d461e636b9	2025-01-19 10:06:38.32005+00	2025-01-19 10:06:38.32005+00	\N
10		__init__	.py	t	text/x-python-script	43	11e20b405e3d7a1ced041746672eb8b7a51dfe1f79f3403ab31e08c57c3311fa	2025-01-19 10:06:38.322002+00	2025-01-19 10:06:38.322002+00	\N
11		metadata	.json	t	application/json	254	63b7ba1dc17e2cfdda372283fb857b49ceb575c879c99fb3d5f9bd9e6468bee0	2025-01-19 10:06:38.323918+00	2025-01-19 10:06:38.323918+00	\N
11		__init__	.py	t	text/x-python-script	45	12b73cdd685d319fd31d2f22a2219cda722f172c53aa0a68933b57e4ffe55183	2025-01-19 10:06:38.326008+00	2025-01-19 10:06:38.326008+00	\N
12		metadata	.json	t	application/json	258	baed47685795b820dcf81d2cc2af2156b11833de7668dd12c61399100d165d64	2025-01-19 10:06:38.3281+00	2025-01-19 10:06:38.3281+00	\N
12		__init__	.py	t	text/x-python-script	43	b82df97bdcc0b1cef23111b62764dc082145dbec8e6334a593c0170f6ef61857	2025-01-19 10:06:38.330151+00	2025-01-19 10:06:38.330151+00	\N
13		metadata	.json	t	application/json	251	4bf6a2c0d879386639beda0c8074c7ed698366261edc5cdcd7af7f045211be36	2025-01-19 10:06:38.332138+00	2025-01-19 10:06:38.332138+00	\N
13		__init__	.py	t	text/x-python-script	44	89f2eab3a286770d3329b931085227c17964449ab1aed5a7d36ad6dcd5895d60	2025-01-19 10:06:38.334023+00	2025-01-19 10:06:38.334023+00	\N
14		metadata	.json	t	application/json	257	0907e46d025d3077a17d39bd8b8e25b0960586e655c500049e6867f5c3e984a6	2025-01-19 10:06:38.336522+00	2025-01-19 10:06:38.336522+00	\N
14		__init__	.py	t	text/x-python-script	42	3c2a3ed74b13094a58bc12b16f806ccb4ad4d65f29d2c7cc9f988fb6d73e2118	2025-01-19 10:06:38.338841+00	2025-01-19 10:06:38.338841+00	\N
15		metadata	.json	t	application/json	256	7831518c15590ad2a71daf0c29b9f7bab1ba18e195ee9aa3f1bfcc1bf84d32ca	2025-01-19 10:06:38.340825+00	2025-01-19 10:06:38.340825+00	\N
15		__init__	.py	t	text/x-python-script	45	656e3f5da029c38e116fdb96451ee053f78bf8673dbf86d7ccfc87df62dfce64	2025-01-19 10:06:38.343132+00	2025-01-19 10:06:38.343132+00	\N
16		metadata	.json	t	application/json	261	991f54147c4bf80f76985244cae3b30f4651751a40eed57d084bff6c99aedca5	2025-01-19 10:06:38.345326+00	2025-01-19 10:06:38.345326+00	\N
16		__init__	.py	t	text/x-python-script	43	ea8e580ec6d0a25e8a646fdc234570c7f178eb783808766e6467a75b5666b72e	2025-01-19 10:06:38.347267+00	2025-01-19 10:06:38.347267+00	\N
17		metadata	.json	t	application/json	262	477a602e44d2358885bc4ef389246deb654e1e77a8cd3ebe3751f587554550ca	2025-01-19 10:06:38.349265+00	2025-01-19 10:06:38.349265+00	\N
17		__init__	.py	t	text/x-python-script	46	9c5ad176a1421fb4518bda694005ffa8e8450eae6d497eeb30dfeb880a60f9e5	2025-01-19 10:06:38.351041+00	2025-01-19 10:06:38.351041+00	\N
18		metadata	.json	t	application/json	253	777ad07dc0554d74deeabcab4aceb46ff5c9465b3ed73a5b3e6020913a6e1ffc	2025-01-19 10:06:38.353077+00	2025-01-19 10:06:38.353077+00	\N
18		__init__	.py	t	text/x-python-script	42	311fe9d1fa6e3b32dcbb1c00bf06cebd2c34e9a448dc1d0170f427ec7d9f14ba	2025-01-19 10:06:38.355203+00	2025-01-19 10:06:38.355203+00	\N
19		metadata	.json	t	application/json	260	82cc6abe8bd445a8702ee9882618413f3b76398b0e27c19cf97620bb615dafbd	2025-01-19 10:06:38.357146+00	2025-01-19 10:06:38.357146+00	\N
19		__init__	.py	t	text/x-python-script	43	db0635cc4c7bc58a20f8112a63b3e0e4f8ade8c29b33a320a90e11a725240ed4	2025-01-19 10:06:38.35895+00	2025-01-19 10:06:38.35895+00	\N
20		metadata	.json	t	application/json	241	c55b22d4263b7c43a1a3a6fbbbbb57218a624a6f38a9faf105bf7fd858f102f0	2025-01-19 10:06:38.361547+00	2025-01-19 10:06:38.361547+00	\N
20		__init__	.py	t	text/x-python-script	40	0be82bd8ab1b6926799dbb3ffbaa889c01f12c8be5e5cc06ec53b453399f4f6f	2025-01-19 10:06:38.365318+00	2025-01-19 10:06:38.365318+00	\N
21		metadata	.json	t	application/json	259	3ce85a71ea5bfed9252b3699d3649dc57d2e25a5665d7f3c6f9fa5ca4ef5cc49	2025-01-19 10:06:38.37051+00	2025-01-19 10:06:38.37051+00	\N
21		__init__	.py	t	text/x-python-script	46	6f92441881943cf29cd88682b7bcfd77160a54086d26cc21e9bb8363b5f20f06	2025-01-19 10:06:38.372481+00	2025-01-19 10:06:38.372481+00	\N
22		metadata	.json	t	application/json	253	b9c21793858b4920803ff24ff38dbdbf8a3f1f2433c95369a8e47cf36508284e	2025-01-19 10:06:38.374322+00	2025-01-19 10:06:38.374322+00	\N
22		__init__	.py	t	text/x-python-script	45	3d1851a1085a775b2fac2ec8bf7d438c52c28afd1d7ede65b7156eb9097d26bb	2025-01-19 10:06:38.376366+00	2025-01-19 10:06:38.376366+00	\N
23		metadata	.json	t	application/json	248	157978942525fcaf7ad48037c5874b5449b7e4c524758d05e51a58ec3ec57972	2025-01-19 10:06:38.380082+00	2025-01-19 10:06:38.380082+00	\N
23		__init__	.py	t	text/x-python-script	46	8788d5a25c4df605562437cd2f4a345b5c9f5ef0624fc9dfc5f74f96d9a01565	2025-01-19 10:06:38.381859+00	2025-01-19 10:06:38.381859+00	\N
24		metadata	.json	t	application/json	254	fad617a016dbbda836745c52179b76d4a7103a98db519bcef2362c3802e6be18	2025-01-19 10:06:38.383833+00	2025-01-19 10:06:38.383833+00	\N
24		__init__	.py	t	text/x-python-script	42	aa89bad5fd2e9a5a426f2f219e254b29f2f88373be02f46ca35036699300fb16	2025-01-19 10:06:38.385738+00	2025-01-19 10:06:38.385738+00	\N
25		metadata	.json	t	application/json	255	05e6eb394dbb4ac32ffaf91c7b72323598eeea3418449aa5d93866f0a7f5a9c8	2025-01-19 10:06:38.387792+00	2025-01-19 10:06:38.387792+00	\N
25		__init__	.py	t	text/x-python-script	43	80adf6f9ad455acb1259c72fbc7732d11b8a303bf32a47baebad59a9862c8c5a	2025-01-19 10:06:38.389558+00	2025-01-19 10:06:38.389558+00	\N
26		metadata	.json	t	application/json	246	8f69d3c18e4ed67709dfe49777922ff4c2661785e7f0cadcad74dd97a5db038b	2025-01-19 10:06:38.391511+00	2025-01-19 10:06:38.391511+00	\N
26		__init__	.py	t	text/x-python-script	42	5d7aae0024b1997bb653822f25e8972ca2cde4a98621feaf5fcfac591c20dde9	2025-01-19 10:06:38.393426+00	2025-01-19 10:06:38.393426+00	\N
27		metadata	.json	t	application/json	242	d72fcef0ba932a643d8c532f238cc3b13ff884394afd5ea7f809536977df4a6f	2025-01-19 10:06:38.395313+00	2025-01-19 10:06:38.395313+00	\N
27		__init__	.py	t	text/x-python-script	41	3071bf13cbdf540815345b2a9ef3d59d4439b0bb0456729b3df8af45c2c3802c	2025-01-19 10:06:38.396994+00	2025-01-19 10:06:38.396994+00	\N
28		metadata	.json	t	application/json	267	6a12301e569d491c49f61f820103b67b45e8c5aba7d5dc7d8180008ac6278b19	2025-01-19 10:06:38.398776+00	2025-01-19 10:06:38.398776+00	\N
28		__init__	.py	t	text/x-python-script	46	398b24b1f29327b0ec9dbf63c5d2673a02cc06dd741a3571d1ea72e43b6e3db8	2025-01-19 10:06:38.400413+00	2025-01-19 10:06:38.400413+00	\N
29		metadata	.json	t	application/json	254	312e67272f2b266bb248bea5e223ac9297d7079226d39a20f3aebd1c390caa0d	2025-01-19 10:06:38.402264+00	2025-01-19 10:06:38.402264+00	\N
29		__init__	.py	t	text/x-python-script	42	918aae5ccf3988bcff6383167b4977c3038cea3a60da35c663c7f97333d53aaa	2025-01-19 10:06:38.403855+00	2025-01-19 10:06:38.403855+00	\N
30		metadata	.json	t	application/json	247	c62fa7845d8becd716104c724d9bd348ab28cab37603d7a848893acdab6a101c	2025-01-19 10:06:38.405548+00	2025-01-19 10:06:38.405548+00	\N
30		__init__	.py	t	text/x-python-script	43	7df619c50ac341c729bb865c642c15940de0ad496122d14f1051caefee8c4233	2025-01-19 10:06:38.407488+00	2025-01-19 10:06:38.407488+00	\N
31		metadata	.json	t	application/json	261	e0e876ad4f6806e44de14d94a19a6995684c7a8c0877bd99fac3c96aa857889d	2025-01-19 10:06:38.409173+00	2025-01-19 10:06:38.409173+00	\N
31		__init__	.py	t	text/x-python-script	44	b537c8a50136df4284723697305ba0f00e52f2541a9c8690abaaa0db98001d18	2025-01-19 10:06:38.410998+00	2025-01-19 10:06:38.410998+00	\N
32		metadata	.json	t	application/json	246	db39b5fafd79099a1f6ed2b014499886223f4423c75c2272c8dfa48cc0652b03	2025-01-19 10:06:38.412679+00	2025-01-19 10:06:38.412679+00	\N
32		__init__	.py	t	text/x-python-script	42	760ea0d98cd8e3757c11d4ac73462be5064f4485119e916e4fbc005aa9326dad	2025-01-19 10:06:38.414394+00	2025-01-19 10:06:38.414394+00	\N
33		metadata	.json	t	application/json	259	6879ad9a8c6c2a9e8424e9f5da437e18c505a2712f32c76fa29e53cf7e2188d3	2025-01-19 10:06:38.416257+00	2025-01-19 10:06:38.416257+00	\N
33		__init__	.py	t	text/x-python-script	44	f7bc3ef2e7f414f4f17b2cf67bd2610ea80ba047789243547e4e051cadac5b6a	2025-01-19 10:06:38.417806+00	2025-01-19 10:06:38.417806+00	\N
34		metadata	.json	t	application/json	258	f1f78640b0d96a77f465e2517e9b42df4a425993c60f3a46fd801d45eeea4a2b	2025-01-19 10:06:38.419379+00	2025-01-19 10:06:38.419379+00	\N
34		__init__	.py	t	text/x-python-script	45	cb39a9e8828263ae885799354626520f13834032bc558ef163c91952192b3b3c	2025-01-19 10:06:38.420887+00	2025-01-19 10:06:38.420887+00	\N
35		metadata	.json	t	application/json	255	8470ea5d58cddcfd55629e9ebc510ff8d1cef8978c883f9fcd6ad665369d8613	2025-01-19 10:06:38.422536+00	2025-01-19 10:06:38.422536+00	\N
35		__init__	.py	t	text/x-python-script	43	ce63d83ead08212fd0cf698658dab22240a40bcbca0518cf7fd84375771ba978	2025-01-19 10:06:38.424403+00	2025-01-19 10:06:38.424403+00	\N
36		metadata	.json	t	application/json	260	a5c57fd4dfc571bd97c4e1a1bf0d6f8c7d4bc35f98127ac556c4d498a95a3eac	2025-01-19 10:06:38.426075+00	2025-01-19 10:06:38.426075+00	\N
36		__init__	.py	t	text/x-python-script	46	ff81bb8a38d778b22ac126fb629a90090e89680f341d3ed2627ccbf18f2d1ac1	2025-01-19 10:06:38.427778+00	2025-01-19 10:06:38.427778+00	\N
37		metadata	.json	t	application/json	248	b6fd7a1bd13cf1e8f43fe0312505f82440dfd2c6f90b9d0385bb8a43c11cb538	2025-01-19 10:06:38.42934+00	2025-01-19 10:06:38.42934+00	\N
37		__init__	.py	t	text/x-python-script	42	d02191d847a994ea25b7bd986b75ba4f03410a13fe5d4acddb69348551f96489	2025-01-19 10:06:38.430849+00	2025-01-19 10:06:38.430849+00	\N
38		metadata	.json	t	application/json	255	b583db0c776b3a01539535182067b713d3f3ac7d5ea09c303c96a1af4606aa5c	2025-01-19 10:06:38.432647+00	2025-01-19 10:06:38.432647+00	\N
38		__init__	.py	t	text/x-python-script	45	11eceeb4781496e9741c97e6745a7c4eee1ff0135588902cbf3ecb1cf50385ef	2025-01-19 10:06:38.434723+00	2025-01-19 10:06:38.434723+00	\N
39		metadata	.json	t	application/json	262	1e37b99081c9daf68a2ae00298c6abbeb212cb7b541380620d2ab833a1aa64e6	2025-01-19 10:06:38.436552+00	2025-01-19 10:06:38.436552+00	\N
39		__init__	.py	t	text/x-python-script	46	b7976ad99a92849942b8e63e5f55d6779aaa55c5e2399d9af4efd69a236c2947	2025-01-19 10:06:38.438421+00	2025-01-19 10:06:38.438421+00	\N
40		metadata	.json	t	application/json	262	c7cc39d98f230396f92252c52304d8546ddf9e3e9be996efb16551df35fe3073	2025-01-19 10:06:38.440089+00	2025-01-19 10:06:38.440089+00	\N
40		__init__	.py	t	text/x-python-script	44	6bbc5ee37b74e55bb30a8c02ece279acb2c7b1cf9411c758b5cfe3e37c5d014c	2025-01-19 10:06:38.44169+00	2025-01-19 10:06:38.44169+00	\N
41		metadata	.json	t	application/json	250	6cc0104ce4ee65ebde406d621e0cd03cc8b1b63441d3ec41eec796d3322446df	2025-01-19 10:06:38.443831+00	2025-01-19 10:06:38.443831+00	\N
41		__init__	.py	t	text/x-python-script	43	dd5b3e78ee8784eaa5cb2980b1239bc686f7d81f19f683afd4dba76b3fefcbbd	2025-01-19 10:06:38.445669+00	2025-01-19 10:06:38.445669+00	\N
42		metadata	.json	t	application/json	251	b509a14eec2e0382814373afe33f71fc7f5807a95cbaca30e03c8cf86c694474	2025-01-19 10:06:38.447488+00	2025-01-19 10:06:38.447488+00	\N
42		__init__	.py	t	text/x-python-script	45	4ccae50446870c56e5690f1d28a84e5b7fb705ca6c60cee90e7c3b0c79adfd7b	2025-01-19 10:06:38.44923+00	2025-01-19 10:06:38.44923+00	\N
43		metadata	.json	t	application/json	264	06d5754f986fa6690134eed681cdfd468199bbc19ebea2bf4eb7ba87cab3928e	2025-01-19 10:06:38.451055+00	2025-01-19 10:06:38.451055+00	\N
43		__init__	.py	t	text/x-python-script	43	0d79605e578a4b1047d2b25cd98f703f9f7222164b81525f4847e5e60b1b0ac0	2025-01-19 10:06:38.452894+00	2025-01-19 10:06:38.452894+00	\N
44		metadata	.json	t	application/json	272	bb55d723fe45ea583d7478455f89d8919249e3559708c1de0861415d5054f7bd	2025-01-19 10:06:38.454981+00	2025-01-19 10:06:38.454981+00	\N
44		__init__	.py	t	text/x-python-script	49	bf27c558940e1d2839f6be84c192caecc16431e88efb1dbbc234e4755e99e687	2025-01-19 10:06:38.456955+00	2025-01-19 10:06:38.456955+00	\N
45		metadata	.json	t	application/json	266	cd3e38f38d8c28a0fcb26719d2365088315cd2fb5b29b34ed90682279750c8d5	2025-01-19 10:06:38.458807+00	2025-01-19 10:06:38.458807+00	\N
45		__init__	.py	t	text/x-python-script	45	0d13a0db9e75bd50aea04f83309d015f66a652977dd6d6875ca03f7a498993e3	2025-01-19 10:06:38.460516+00	2025-01-19 10:06:38.460516+00	\N
46		metadata	.json	t	application/json	258	79cf9afed5f1d91ebfe5830fdca2924c2e712c7fe311a502c55587a2c6a396cf	2025-01-19 10:06:38.462815+00	2025-01-19 10:06:38.462815+00	\N
46		__init__	.py	t	text/x-python-script	44	f9eb1b945f387e09e98869ec7d2de4c19d72b66e5085796c64e0ce1bea83488b	2025-01-19 10:06:38.464588+00	2025-01-19 10:06:38.464588+00	\N
47		metadata	.json	t	application/json	262	d10fc722347937372e8af7c1b60c00c931039b3ae2c5b37f577f27923692a026	2025-01-19 10:06:38.466419+00	2025-01-19 10:06:38.466419+00	\N
47		__init__	.py	t	text/x-python-script	49	09ff5b49da0828569ea5c49e18d163c2186763502bd4f7e440107cd46b55a915	2025-01-19 10:06:38.468098+00	2025-01-19 10:06:38.468098+00	\N
48		metadata	.json	t	application/json	257	32d91c8ed09bb06af9a816bf943f57eb14e0701abf919399afcd1c9e10dc26f3	2025-01-19 10:06:38.469981+00	2025-01-19 10:06:38.469981+00	\N
48		__init__	.py	t	text/x-python-script	42	df429492023867526959b63fe50a18b8e6361a8a270bc31f472934192ecbd102	2025-01-19 10:06:38.472164+00	2025-01-19 10:06:38.472164+00	\N
49		metadata	.json	t	application/json	256	92e0cc9638f2a29d889406cc2d6217cab3d503e4ea569cd9429de170e534f40d	2025-01-19 10:06:38.474638+00	2025-01-19 10:06:38.474638+00	\N
49		__init__	.py	t	text/x-python-script	42	eef072abc987a307e85cc0731e60917a6bf99c8e9f8541766cca3d6ef9088411	2025-01-19 10:06:38.478411+00	2025-01-19 10:06:38.478411+00	\N
50		metadata	.json	t	application/json	273	e486486fcb1cd3db04e7acdaa379f3f0db459b1142ba061b0dfba50d8f7fafe9	2025-01-19 10:06:38.480724+00	2025-01-19 10:06:38.480724+00	\N
50		__init__	.py	t	text/x-python-script	50	c65110ef76cfbffc2bc3fe1e2251a337efc50b8f64be2b1e0a5cdffc0de63a5c	2025-01-19 10:06:38.48268+00	2025-01-19 10:06:38.48268+00	\N
51		metadata	.json	t	application/json	261	39460f3158a098d8cc0fc5b68e23cc8909fa3dea99a4da4dc2861aedb91cb358	2025-01-19 10:06:38.485075+00	2025-01-19 10:06:38.485075+00	\N
51		__init__	.py	t	text/x-python-script	44	b6194d9e4ba967dc71de7acf058b181ed085eb9cdb4e35f3a00f5d8302c81fb7	2025-01-19 10:06:38.487248+00	2025-01-19 10:06:38.487248+00	\N
52		metadata	.json	t	application/json	260	ebd15b1ed0ba5a553682ac0b27da83390655b59c5416834bda7f3a85db8b03cd	2025-01-19 10:06:38.489167+00	2025-01-19 10:06:38.489167+00	\N
52		__init__	.py	t	text/x-python-script	48	a3778a531b89ef556b00953336c8085cca9aaa0e4e49eaeb0e98240bedc6860d	2025-01-19 10:06:38.491202+00	2025-01-19 10:06:38.491202+00	\N
53		metadata	.json	t	application/json	256	128939b0bbe7aabed2a49fd56668b931289b617effea7d1d00c4dd1773ae3bfa	2025-01-19 10:06:38.493088+00	2025-01-19 10:06:38.493088+00	\N
53		__init__	.py	t	text/x-python-script	45	bb489356808ea265850c04aa391a0736c784392cc4c9d4899b98391badada12e	2025-01-19 10:06:38.49494+00	2025-01-19 10:06:38.49494+00	\N
54		metadata	.json	t	application/json	258	e1cacc0c329e1ad80f1864ff512f01c977157573e7ac105ad1b7e776f0ab4292	2025-01-19 10:06:38.496893+00	2025-01-19 10:06:38.496893+00	\N
54		__init__	.py	t	text/x-python-script	45	ff8b16479077c522308c3b2e96d40396c064a7da291d6ec3f691278183d650f6	2025-01-19 10:06:38.498518+00	2025-01-19 10:06:38.498518+00	\N
55		metadata	.json	t	application/json	263	6203f1e978eb19f09f3ba98cf7b484589b4f67a7978ab3dab44bb0dd6e4a7960	2025-01-19 10:06:38.500369+00	2025-01-19 10:06:38.500369+00	\N
55		__init__	.py	t	text/x-python-script	44	367c213d7ce87ad07d70c732baf2477636f8710a7580ee6edfc22780e82b805b	2025-01-19 10:06:38.50213+00	2025-01-19 10:06:38.50213+00	\N
56		metadata	.json	t	application/json	255	74fd37b0ec9ad3ad25ee2470df218a1a72429bfc68a6c89ea3f31fdbbe869540	2025-01-19 10:06:38.504188+00	2025-01-19 10:06:38.504188+00	\N
56		__init__	.py	t	text/x-python-script	47	889360c69a1ab25536eb69b2bada125e0e21abe0138faaaca732b39666ce1c93	2025-01-19 10:06:38.505965+00	2025-01-19 10:06:38.505965+00	\N
57		metadata	.json	t	application/json	263	1214e2ef8e446444c0b50e9538a43e7ae312ff41fb39c77a38be337e569fa191	2025-01-19 10:06:38.507855+00	2025-01-19 10:06:38.507855+00	\N
57		__init__	.py	t	text/x-python-script	44	d49bd8e9c65cb1e2d0e87e437a167472ffe8fa5d706b6541d4656dffebe61fea	2025-01-19 10:06:38.50992+00	2025-01-19 10:06:38.50992+00	\N
58		metadata	.json	t	application/json	256	040825b5425747959744f8c09feee34b25fa8fdf5258631e9b96fa535388a02f	2025-01-19 10:06:38.511594+00	2025-01-19 10:06:38.511594+00	\N
58		__init__	.py	t	text/x-python-script	43	e2a3dfea029502ade1cb5a130057fa4e3fc274553b40d6f5f341200423d81b4b	2025-01-19 10:06:38.513281+00	2025-01-19 10:06:38.513281+00	\N
59		metadata	.json	t	application/json	263	e8d3f8a356fada625952ffe8f92cb11717edd1414cabeedf00f56936b5894fa2	2025-01-19 10:06:38.515332+00	2025-01-19 10:06:38.515332+00	\N
59		__init__	.py	t	text/x-python-script	50	c8dbc7924e72eb2a83aa055ea974b17aa87118e3daf111a3f55ce66641304126	2025-01-19 10:06:38.517078+00	2025-01-19 10:06:38.517078+00	\N
60		metadata	.json	t	application/json	259	adaf21a32f53298a88f8d5af7b06e2f98cd96298f5d8b78a67eb4b815797cc1e	2025-01-19 10:06:38.519367+00	2025-01-19 10:06:38.519367+00	\N
60		__init__	.py	t	text/x-python-script	45	b45bd0c4dff69bde68bc493e39c737e4156ba179179662fb959f4e558366f1a1	2025-01-19 10:06:38.522382+00	2025-01-19 10:06:38.522382+00	\N
61		metadata	.json	t	application/json	244	b7a03fac3a93b9f4acb04d910b6472b583b28e562e7fef2ac83f63bf399cecce	2025-01-19 10:06:38.524305+00	2025-01-19 10:06:38.524305+00	\N
61		__init__	.py	t	text/x-python-script	44	00428777642cb39830c51b7f26a943ff364fe97fc0c89660d263f1d1ff789d95	2025-01-19 10:06:38.526064+00	2025-01-19 10:06:38.526064+00	\N
62		metadata	.json	t	application/json	259	56fb17cca8bae7a858fa3ef5684a6ad5b4735f1639bcd10e0169630f9c62cc5c	2025-01-19 10:06:38.527793+00	2025-01-19 10:06:38.527793+00	\N
62		__init__	.py	t	text/x-python-script	48	0f6aa20a34aae328af3ddd39d34fb3a153a992dff42a97f1005e57f2e36916b6	2025-01-19 10:06:38.529607+00	2025-01-19 10:06:38.529607+00	\N
63		metadata	.json	t	application/json	259	b63c824015b631357296344c67a5f2ba8d271e00c16f45e94a28a9ac5a1a5c38	2025-01-19 10:06:38.531179+00	2025-01-19 10:06:38.531179+00	\N
63		__init__	.py	t	text/x-python-script	43	f9f014ed3f4ea7605ef1b1d6d0ef07dea9a58e881ec0f52b159289415f7b08ce	2025-01-19 10:06:38.532719+00	2025-01-19 10:06:38.532719+00	\N
64		metadata	.json	t	application/json	247	8069695cda265155ecc7eb3387abda19fb37b567b2ec1ab389c6df6c25362317	2025-01-19 10:06:38.534717+00	2025-01-19 10:06:38.534717+00	\N
64		__init__	.py	t	text/x-python-script	45	9a963bf1d01609f2028433a80a4c1eefb3459672f10cfc58b519ea984ac010b6	2025-01-19 10:06:38.536554+00	2025-01-19 10:06:38.536554+00	\N
65		metadata	.json	t	application/json	253	b2a08b4c98341227dbada87aeb507111a3e5d1b44d2f22bce19f8c4c05d6b5c1	2025-01-19 10:06:38.538657+00	2025-01-19 10:06:38.538657+00	\N
65		__init__	.py	t	text/x-python-script	45	6bb37c106cc14e53fb51ed81f698f45239c8f3b1c7acc245ada72dc18e0f011d	2025-01-19 10:06:38.540285+00	2025-01-19 10:06:38.540285+00	\N
66		metadata	.json	t	application/json	263	00797d399908b94e0a6bf397cc9fb5c76bcf6fa4fec81907b614985c27495176	2025-01-19 10:06:38.542114+00	2025-01-19 10:06:38.542114+00	\N
66		__init__	.py	t	text/x-python-script	44	18af3a74174426196a58c0222acf937ac7d30d2fdae4ac597ceeba38f989b5a5	2025-01-19 10:06:38.544244+00	2025-01-19 10:06:38.544244+00	\N
67		metadata	.json	t	application/json	254	aee4d62800dec0a1471004ce815368dbb12735da3177385a2240aae5e2464727	2025-01-19 10:06:38.546106+00	2025-01-19 10:06:38.546106+00	\N
67		__init__	.py	t	text/x-python-script	44	4181a072cf3ac464f32d6155bce4ab9672ff4c24a939d3af9c0dbf815d6885ce	2025-01-19 10:06:38.548022+00	2025-01-19 10:06:38.548022+00	\N
68		metadata	.json	t	application/json	253	9504400f049e4ac46bcf6b4fec7fbb9e79eab846775f454e3675e9c007cbaaf6	2025-01-19 10:06:38.549796+00	2025-01-19 10:06:38.549796+00	\N
68		__init__	.py	t	text/x-python-script	42	595601465bd3833f10707800b5fc56925d2dbc0d71f9455c38384c7b16a650f4	2025-01-19 10:06:38.551403+00	2025-01-19 10:06:38.551403+00	\N
69		metadata	.json	t	application/json	257	b7046fb2033020572cddc3dc422dfc970525b17fda6d2fb89c8a67aa085d8be3	2025-01-19 10:06:38.553213+00	2025-01-19 10:06:38.553213+00	\N
69		__init__	.py	t	text/x-python-script	48	81072032b736af0ab4262580b7f01f77bdd3d78ac31a38dc223cff8bd4605e23	2025-01-19 10:06:38.554941+00	2025-01-19 10:06:38.554941+00	\N
70		metadata	.json	t	application/json	252	114248b5aff06321f7c356b4b989a65dcda8d98849a499e557702a887b4042b7	2025-01-19 10:06:38.556765+00	2025-01-19 10:06:38.556765+00	\N
70		__init__	.py	t	text/x-python-script	45	8696676a5eb919fe6a9b64614214886dc4352ff0d62975ee78ea821ba41d2d7f	2025-01-19 10:06:38.558872+00	2025-01-19 10:06:38.558872+00	\N
71		metadata	.json	t	application/json	260	62c4155dc280950fe7f04548d85671ea2d15bcc6c7ce358e11a9057226f04212	2025-01-19 10:06:38.560777+00	2025-01-19 10:06:38.560777+00	\N
71		__init__	.py	t	text/x-python-script	47	7938a97199eee293bf5cac71e31dcdbdc7e321d98059351225d260ac5fddc088	2025-01-19 10:06:38.562384+00	2025-01-19 10:06:38.562384+00	\N
72		metadata	.json	t	application/json	254	981b57bb94a5bc624dbc5a7e4d842a182eeea596279733ad9bf2c5fcc216d5e3	2025-01-19 10:06:38.564261+00	2025-01-19 10:06:38.564261+00	\N
72		__init__	.py	t	text/x-python-script	43	28b64f0ce701ddf289d03b5a3ef0674bbd50a6e6fffc55e3c5b45f3f3715f273	2025-01-19 10:06:38.565879+00	2025-01-19 10:06:38.565879+00	\N
73		metadata	.json	t	application/json	268	a4fd3320e3b0c6b9b002d440a452d08a89e3b7aae681e435eca2eb0777410f4c	2025-01-19 10:06:38.567853+00	2025-01-19 10:06:38.567853+00	\N
73		__init__	.py	t	text/x-python-script	45	f9e8c7db9f201b98aa2b79a4254c25723f9db416497e0a5b2d7a6b1ddd9df91e	2025-01-19 10:06:38.569501+00	2025-01-19 10:06:38.569501+00	\N
74		metadata	.json	t	application/json	261	6940d2e18e8d1b13f4554809810e530e60de6af16234625b97e1c8abd7bf259a	2025-01-19 10:06:38.571168+00	2025-01-19 10:06:38.571168+00	\N
74		__init__	.py	t	text/x-python-script	48	6a7087ed5f4a1b8d1a1e1fdfc9dc6aee880c437ab802dced59b2847823e7892e	2025-01-19 10:06:38.572913+00	2025-01-19 10:06:38.572913+00	\N
75		metadata	.json	t	application/json	250	c8c69ea93e50bfc171b89e38c7328bd5b5dea4115284c8958a2f85a453a9f01a	2025-01-19 10:06:38.574844+00	2025-01-19 10:06:38.574844+00	\N
75		__init__	.py	t	text/x-python-script	41	4dba8d670aa18bfafd092ed9bdb05b84bf2e3d7893cde361df931fc4f2d46359	2025-01-19 10:06:38.577716+00	2025-01-19 10:06:38.577716+00	\N
76		metadata	.json	t	application/json	270	6e56bf4628bfc6f4490eed997f28c8205ada8b44895df97dc835b3dce097900b	2025-01-19 10:06:38.580035+00	2025-01-19 10:06:38.580035+00	\N
76		__init__	.py	t	text/x-python-script	50	936a2c7790fbe46763b8b28c662ddb4da6a375a263dea71473a1c5501b939569	2025-01-19 10:06:38.582318+00	2025-01-19 10:06:38.582318+00	\N
77		metadata	.json	t	application/json	245	49a02fc041f3ad449e5d5117ad0925edf8aa92ee870286525e089533b0fed6e2	2025-01-19 10:06:38.584264+00	2025-01-19 10:06:38.584264+00	\N
77		__init__	.py	t	text/x-python-script	45	fca41a7f0aa6a83fd44c8aa67414841f5bb7f1b7b7b4b2c0c3fa92668c49dae5	2025-01-19 10:06:38.586424+00	2025-01-19 10:06:38.586424+00	\N
78		metadata	.json	t	application/json	253	7bfe40514aef5cc1f583bcb12769b48651fbb907b90945edf3b9390eb6cf50d6	2025-01-19 10:06:38.588185+00	2025-01-19 10:06:38.588185+00	\N
78		__init__	.py	t	text/x-python-script	43	1a5f59cfb4f864a6aaf638f94834ed1e33d810617fb85524fb6555d29cd1e87d	2025-01-19 10:06:38.590028+00	2025-01-19 10:06:38.590028+00	\N
79		metadata	.json	t	application/json	267	fb9d44934b05e4013fad377da604f7dabc4c6c133c7906200de00d050376526c	2025-01-19 10:06:38.591733+00	2025-01-19 10:06:38.591733+00	\N
79		__init__	.py	t	text/x-python-script	46	1df62b4ba6be0d38231cfd284df235ea5b82f836e36a9aad4f1a2a2e09967c3e	2025-01-19 10:06:38.593553+00	2025-01-19 10:06:38.593553+00	\N
80		metadata	.json	t	application/json	259	cf3b23a17bc1b963e7a2ac756008a4d32c7bf6bfcedb9dd3b3778f08a919adb1	2025-01-19 10:06:38.595636+00	2025-01-19 10:06:38.595636+00	\N
80		__init__	.py	t	text/x-python-script	47	4348b45e8dda4ab0f6195f1840e2765771fa2d6b51f0355b93f432d4df118fa3	2025-01-19 10:06:38.597506+00	2025-01-19 10:06:38.597506+00	\N
81		metadata	.json	t	application/json	258	d9c16a9ffeeb611904223a1d1dcd249557a42396ab8320148c173d0882a5edad	2025-01-19 10:06:38.600805+00	2025-01-19 10:06:38.600805+00	\N
81		__init__	.py	t	text/x-python-script	44	f208c9f2d6dcc003fb3a896c8e66377e92ca86ea6fd8e9bac021989f615888e5	2025-01-19 10:06:38.602797+00	2025-01-19 10:06:38.602797+00	\N
82		metadata	.json	t	application/json	262	a0b7f7f0aa8e64dbdabdd82fcb2e3568927c81fc27321b9dd80a0fa40785bd4c	2025-01-19 10:06:38.604669+00	2025-01-19 10:06:38.604669+00	\N
82		__init__	.py	t	text/x-python-script	45	fae3aefade81eb10b9ea0374dc66853a5005aadb179139934f9e5294c4d91aab	2025-01-19 10:06:38.606586+00	2025-01-19 10:06:38.606586+00	\N
83		metadata	.json	t	application/json	259	3a2b21d1df7a4985eb206886758e2c83fe6763f7aa21739c9fcb41073e10cbdc	2025-01-19 10:06:38.609394+00	2025-01-19 10:06:38.609394+00	\N
83		__init__	.py	t	text/x-python-script	45	2ee69c2783edeaa28e5f02d6869c5dca87858160de785647a370b97cffe1defc	2025-01-19 10:06:38.611448+00	2025-01-19 10:06:38.611448+00	\N
84		metadata	.json	t	application/json	247	631635f981e40c281e54b45dee8213ea0638fe3099e9a1baea369a410a7d2832	2025-01-19 10:06:38.613115+00	2025-01-19 10:06:38.613115+00	\N
84		__init__	.py	t	text/x-python-script	43	0192c9c46c8e325d5b3e14ee04ae44fd95479d2aeb3af2bd571839796c49b8de	2025-01-19 10:06:38.614823+00	2025-01-19 10:06:38.614823+00	\N
85		metadata	.json	t	application/json	261	eb5bc649786e308ed7cdc47e60d778fa8b166edb9917dd768e237fd85aebaaf3	2025-01-19 10:06:38.61688+00	2025-01-19 10:06:38.61688+00	\N
85		__init__	.py	t	text/x-python-script	45	7d67ad149f3a761bb8469e50c44920b0de2be3570a46f806aa6cec210950fb82	2025-01-19 10:06:38.622058+00	2025-01-19 10:06:38.622058+00	\N
86		metadata	.json	t	application/json	258	b2c5b69ba38d10d265e695486e1195dbf31ffe83a3a5f0a2c5acdf72da552ef5	2025-01-19 10:06:38.62466+00	2025-01-19 10:06:38.62466+00	\N
86		__init__	.py	t	text/x-python-script	43	77b01f39a2edefccd41f8fb2fbb0a4ea7fa5cfbcbf9530ee81b4119970d41759	2025-01-19 10:06:38.626322+00	2025-01-19 10:06:38.626322+00	\N
87		metadata	.json	t	application/json	264	3c0113a51b37acc99df0dea52a2e36119d52da40dc796e5d13f69d477192fa85	2025-01-19 10:06:38.628014+00	2025-01-19 10:06:38.628014+00	\N
87		__init__	.py	t	text/x-python-script	46	0372f6128e21d37905c799ccc3247caab8e32f894901fe246f187622001b9318	2025-01-19 10:06:38.629816+00	2025-01-19 10:06:38.629816+00	\N
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.migrations (id, name, run_on) FROM stdin;
14	/20241116085102-initialize	2025-01-19 11:06:32.071
15	/20250113193413-files-table	2025-01-19 11:06:32.076
\.


--
-- Data for Name: project_statuses_on_badges; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.project_statuses_on_badges (id, project_slug, badge_slug, status, created_at, updated_at, deleted_at) FROM stdin;
1	codecraft	why2025	\N	2025-01-19 10:06:38.631152+00	2025-01-19 10:06:38.631152+00	\N
2	pixelpulse	troopers23	\N	2025-01-19 10:06:38.631935+00	2025-01-19 10:06:38.631935+00	\N
3	bitblast	why2025	\N	2025-01-19 10:06:38.632318+00	2025-01-19 10:06:38.632318+00	\N
4	nanogames	why2025	\N	2025-01-19 10:06:38.632702+00	2025-01-19 10:06:38.632702+00	\N
5	electraplay	mch2022	\N	2025-01-19 10:06:38.633058+00	2025-01-19 10:06:38.633058+00	\N
6	circuitforge	mch2022	\N	2025-01-19 10:06:38.633415+00	2025-01-19 10:06:38.633415+00	\N
7	bytebash	mch2022	\N	2025-01-19 10:06:38.633762+00	2025-01-19 10:06:38.633762+00	\N
8	codecanvas	troopers23	\N	2025-01-19 10:06:38.634083+00	2025-01-19 10:06:38.634083+00	\N
9	sparkscript	troopers23	\N	2025-01-19 10:06:38.634426+00	2025-01-19 10:06:38.634426+00	\N
10	logicland	mch2022	\N	2025-01-19 10:06:38.634791+00	2025-01-19 10:06:38.634791+00	\N
11	microarcade	troopers23	\N	2025-01-19 10:06:38.635206+00	2025-01-19 10:06:38.635206+00	\N
12	codecraze	mch2022	\N	2025-01-19 10:06:38.635621+00	2025-01-19 10:06:38.635621+00	\N
13	gamegenius	troopers23	\N	2025-01-19 10:06:38.635948+00	2025-01-19 10:06:38.635948+00	\N
14	pixelpal	why2025	\N	2025-01-19 10:06:38.636286+00	2025-01-19 10:06:38.636286+00	\N
15	electronica	mch2022	\N	2025-01-19 10:06:38.636639+00	2025-01-19 10:06:38.636639+00	\N
16	codequest	mch2022	\N	2025-01-19 10:06:38.636977+00	2025-01-19 10:06:38.636977+00	\N
17	circuitcraft	troopers23	\N	2025-01-19 10:06:38.637309+00	2025-01-19 10:06:38.637309+00	\N
18	bytebeat	troopers23	\N	2025-01-19 10:06:38.637618+00	2025-01-19 10:06:38.637618+00	\N
19	nanonexus	mch2022	\N	2025-01-19 10:06:38.637916+00	2025-01-19 10:06:38.637916+00	\N
20	bitbox	troopers23	\N	2025-01-19 10:06:38.638211+00	2025-01-19 10:06:38.638211+00	\N
21	circuitchaos	troopers23	\N	2025-01-19 10:06:38.638502+00	2025-01-19 10:06:38.638502+00	\N
22	codecrafter	why2025	\N	2025-01-19 10:06:38.63879+00	2025-01-19 10:06:38.63879+00	\N
23	pixelpioneer	why2025	\N	2025-01-19 10:06:38.639077+00	2025-01-19 10:06:38.639077+00	\N
24	logiclab	why2025	\N	2025-01-19 10:06:38.639386+00	2025-01-19 10:06:38.639386+00	\N
25	byteblitz	why2025	\N	2025-01-19 10:06:38.639708+00	2025-01-19 10:06:38.639708+00	\N
26	codewave	mch2022	\N	2025-01-19 10:06:38.640018+00	2025-01-19 10:06:38.640018+00	\N
27	nanonet	why2025	\N	2025-01-19 10:06:38.640344+00	2025-01-19 10:06:38.640344+00	\N
28	electraforge	troopers23	\N	2025-01-19 10:06:38.640665+00	2025-01-19 10:06:38.640665+00	\N
29	gamegrid	why2025	\N	2025-01-19 10:06:38.640965+00	2025-01-19 10:06:38.640965+00	\N
30	logicloom	mch2022	\N	2025-01-19 10:06:38.641286+00	2025-01-19 10:06:38.641286+00	\N
31	pixelplaza	mch2022	\N	2025-01-19 10:06:38.641604+00	2025-01-19 10:06:38.641604+00	\N
32	codecity	troopers23	\N	2025-01-19 10:06:38.641946+00	2025-01-19 10:06:38.641946+00	\N
33	nanoarcade	mch2022	\N	2025-01-19 10:06:38.642285+00	2025-01-19 10:06:38.642285+00	\N
34	electronera	troopers23	\N	2025-01-19 10:06:38.642633+00	2025-01-19 10:06:38.642633+00	\N
35	bitbazaar	mch2022	\N	2025-01-19 10:06:38.643089+00	2025-01-19 10:06:38.643089+00	\N
36	logiclegends	mch2022	\N	2025-01-19 10:06:38.643555+00	2025-01-19 10:06:38.643555+00	\N
37	codeclan	troopers23	\N	2025-01-19 10:06:38.644186+00	2025-01-19 10:06:38.644186+00	\N
38	pixelportal	troopers23	\N	2025-01-19 10:06:38.64459+00	2025-01-19 10:06:38.64459+00	\N
39	circuitcraze	mch2022	\N	2025-01-19 10:06:38.644918+00	2025-01-19 10:06:38.644918+00	\N
40	bytebuster	mch2022	\N	2025-01-19 10:06:38.645261+00	2025-01-19 10:06:38.645261+00	\N
41	nanonovel	mch2022	\N	2025-01-19 10:06:38.645569+00	2025-01-19 10:06:38.645569+00	\N
42	electraeden	why2025	\N	2025-01-19 10:06:38.645888+00	2025-01-19 10:06:38.645888+00	\N
43	codecomet	troopers23	\N	2025-01-19 10:06:38.646195+00	2025-01-19 10:06:38.646195+00	\N
44	pixelplayground	mch2022	\N	2025-01-19 10:06:38.646474+00	2025-01-19 10:06:38.646474+00	\N
45	logiclandia	troopers23	\N	2025-01-19 10:06:38.646806+00	2025-01-19 10:06:38.646806+00	\N
46	bytebounce	why2025	\N	2025-01-19 10:06:38.647145+00	2025-01-19 10:06:38.647145+00	\N
47	circuitcarnival	mch2022	\N	2025-01-19 10:06:38.64747+00	2025-01-19 10:06:38.64747+00	\N
48	codecove	troopers23	\N	2025-01-19 10:06:38.647739+00	2025-01-19 10:06:38.647739+00	\N
49	nanonest	mch2022	\N	2025-01-19 10:06:38.648038+00	2025-01-19 10:06:38.648038+00	\N
50	electraentertain	troopers23	\N	2025-01-19 10:06:38.648344+00	2025-01-19 10:06:38.648344+00	\N
51	gamegalaxy	why2025	\N	2025-01-19 10:06:38.648664+00	2025-01-19 10:06:38.648664+00	\N
52	logiclabyrinth	mch2022	\N	2025-01-19 10:06:38.648974+00	2025-01-19 10:06:38.648974+00	\N
53	byteblaster	why2025	\N	2025-01-19 10:06:38.649301+00	2025-01-19 10:06:38.649301+00	\N
54	codecompass	troopers23	\N	2025-01-19 10:06:38.649611+00	2025-01-19 10:06:38.649611+00	\N
55	nanonation	mch2022	\N	2025-01-19 10:06:38.649922+00	2025-01-19 10:06:38.649922+00	\N
56	electraempire	mch2022	\N	2025-01-19 10:06:38.650242+00	2025-01-19 10:06:38.650242+00	\N
57	gamegarden	why2025	\N	2025-01-19 10:06:38.650593+00	2025-01-19 10:06:38.650593+00	\N
58	pixelpeak	mch2022	\N	2025-01-19 10:06:38.650925+00	2025-01-19 10:06:38.650925+00	\N
59	circuitcelestial	troopers23	\N	2025-01-19 10:06:38.65124+00	2025-01-19 10:06:38.65124+00	\N
60	codecrusade	mch2022	\N	2025-01-19 10:06:38.651568+00	2025-01-19 10:06:38.651568+00	\N
61	nanonebula	mch2022	\N	2025-01-19 10:06:38.651899+00	2025-01-19 10:06:38.651899+00	\N
62	electraenclave	why2025	\N	2025-01-19 10:06:38.652237+00	2025-01-19 10:06:38.652237+00	\N
63	gamegizmo	troopers23	\N	2025-01-19 10:06:38.652583+00	2025-01-19 10:06:38.652583+00	\N
64	pixelplanet	troopers23	\N	2025-01-19 10:06:38.652877+00	2025-01-19 10:06:38.652877+00	\N
65	logiclounge	why2025	\N	2025-01-19 10:06:38.653174+00	2025-01-19 10:06:38.653174+00	\N
66	bytebeacon	why2025	\N	2025-01-19 10:06:38.653528+00	2025-01-19 10:06:38.653528+00	\N
67	codecircus	why2025	\N	2025-01-19 10:06:38.65385+00	2025-01-19 10:06:38.65385+00	\N
68	nanonook	mch2022	\N	2025-01-19 10:06:38.654152+00	2025-01-19 10:06:38.654152+00	\N
69	electraelysium	why2025	\N	2025-01-19 10:06:38.654466+00	2025-01-19 10:06:38.654466+00	\N
70	gameglimpse	troopers23	\N	2025-01-19 10:06:38.654799+00	2025-01-19 10:06:38.654799+00	\N
71	pixelparadise	mch2022	\N	2025-01-19 10:06:38.655132+00	2025-01-19 10:06:38.655132+00	\N
72	codecoast	mch2022	\N	2025-01-19 10:06:38.65545+00	2025-01-19 10:06:38.65545+00	\N
73	nanonirvana	why2025	\N	2025-01-19 10:06:38.655786+00	2025-01-19 10:06:38.655786+00	\N
74	electraedifice	troopers23	\N	2025-01-19 10:06:38.656126+00	2025-01-19 10:06:38.656126+00	\N
75	gamegen	troopers23	\N	2025-01-19 10:06:38.656441+00	2025-01-19 10:06:38.656441+00	\N
76	pixelpandemonium	mch2022	\N	2025-01-19 10:06:38.656735+00	2025-01-19 10:06:38.656735+00	\N
77	logiclagoon	mch2022	\N	2025-01-19 10:06:38.657019+00	2025-01-19 10:06:38.657019+00	\N
78	byteblaze	mch2022	\N	2025-01-19 10:06:38.657311+00	2025-01-19 10:06:38.657311+00	\N
79	codecorridor	mch2022	\N	2025-01-19 10:06:38.657591+00	2025-01-19 10:06:38.657591+00	\N
80	hacksimulator	why2025	\N	2025-01-19 10:06:38.657877+00	2025-01-19 10:06:38.657877+00	\N
81	codecrunch	mch2022	\N	2025-01-19 10:06:38.658153+00	2025-01-19 10:06:38.658153+00	\N
82	securecraft	troopers23	\N	2025-01-19 10:06:38.658518+00	2025-01-19 10:06:38.658518+00	\N
83	cryptopulse	troopers23	\N	2025-01-19 10:06:38.658865+00	2025-01-19 10:06:38.658865+00	\N
84	dataforge	why2025	\N	2025-01-19 10:06:38.659196+00	2025-01-19 10:06:38.659196+00	\N
85	cipherquest	troopers23	\N	2025-01-19 10:06:38.659526+00	2025-01-19 10:06:38.659526+00	\N
86	hackquest	why2025	\N	2025-01-19 10:06:38.659848+00	2025-01-19 10:06:38.659848+00	\N
87	securesphere	troopers23	\N	2025-01-19 10:06:38.660359+00	2025-01-19 10:06:38.660359+00	\N
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.projects (created_at, updated_at, deleted_at, version_id, user_id, slug, git, allow_team_fixes) FROM stdin;
2023-11-22 10:06:38.241+00	2023-12-16 10:06:38.241+00	\N	1	24	codecraft	\N	\N
2023-09-19 10:06:38.249+00	2023-12-16 10:06:38.249+00	\N	2	24	pixelpulse	\N	\N
2024-03-21 10:06:38.255+00	2024-03-25 10:06:38.255+00	\N	3	43	bitblast	\N	\N
2023-08-26 10:06:38.259+00	2023-09-07 10:06:38.259+00	\N	4	34	nanogames	\N	\N
2023-11-06 10:06:38.264+00	2023-12-16 10:06:38.264+00	\N	5	17	electraplay	\N	\N
2024-01-21 10:06:38.269+00	2024-03-25 10:06:38.269+00	\N	6	50	circuitforge	\N	\N
2023-08-02 10:06:38.273+00	2023-09-07 10:06:38.273+00	\N	7	45	bytebash	\N	\N
2024-10-15 10:06:38.278+00	2025-01-19 10:06:38.278+00	\N	8	22	codecanvas	\N	\N
2024-08-28 10:06:38.282+00	2024-10-11 10:06:38.282+00	\N	9	58	sparkscript	\N	\N
2024-02-10 10:06:38.287+00	2024-03-25 10:06:38.287+00	\N	10	51	logicland	\N	\N
2023-10-17 10:06:38.291+00	2023-12-16 10:06:38.291+00	\N	11	39	microarcade	\N	\N
2024-05-24 10:06:38.295+00	2024-07-03 10:06:38.295+00	\N	12	14	codecraze	\N	\N
2024-06-05 10:06:38.299+00	2024-07-03 10:06:38.299+00	\N	13	1	gamegenius	\N	\N
2024-07-27 10:06:38.303+00	2024-10-11 10:06:38.303+00	\N	14	13	pixelpal	\N	\N
2023-11-10 10:06:38.307+00	2023-12-16 10:06:38.307+00	\N	15	69	electronica	\N	\N
2024-12-18 10:06:38.312+00	2025-01-19 10:06:38.312+00	\N	16	60	codequest	\N	\N
2024-03-21 10:06:38.316+00	2024-03-25 10:06:38.316+00	\N	17	12	circuitcraft	\N	\N
2024-02-02 10:06:38.32+00	2024-03-25 10:06:38.32+00	\N	18	27	bytebeat	\N	\N
2024-04-30 10:06:38.324+00	2024-07-03 10:06:38.324+00	\N	19	22	nanonexus	\N	\N
2024-01-21 10:06:38.328+00	2024-03-25 10:06:38.328+00	\N	20	15	bitbox	\N	\N
2023-11-02 10:06:38.337+00	2023-12-16 10:06:38.337+00	\N	21	57	circuitchaos	\N	\N
2024-05-08 10:06:38.341+00	2024-07-03 10:06:38.341+00	\N	22	61	codecrafter	\N	\N
2024-09-07 10:06:38.347+00	2024-10-11 10:06:38.347+00	\N	23	28	pixelpioneer	\N	\N
2024-11-08 10:06:38.351+00	2025-01-19 10:06:38.351+00	\N	24	2	logiclab	\N	\N
2024-04-06 10:06:38.354+00	2024-07-03 10:06:38.354+00	\N	25	58	byteblitz	\N	\N
2024-01-25 10:06:38.358+00	2024-03-25 10:06:38.358+00	\N	26	44	codewave	\N	\N
2024-07-07 10:06:38.362+00	2024-10-11 10:06:38.362+00	\N	27	54	nanonet	\N	\N
2024-05-16 10:06:38.366+00	2024-07-03 10:06:38.366+00	\N	28	56	electraforge	\N	\N
2024-03-21 10:06:38.369+00	2024-03-25 10:06:38.369+00	\N	29	7	gamegrid	\N	\N
2024-10-19 10:06:38.372+00	2025-01-19 10:06:38.372+00	\N	30	5	logicloom	\N	\N
2024-09-01 10:06:38.376+00	2024-10-11 10:06:38.376+00	\N	31	64	pixelplaza	\N	\N
2024-08-12 10:06:38.379+00	2024-10-11 10:06:38.379+00	\N	32	12	codecity	\N	\N
2024-03-05 10:06:38.383+00	2024-03-25 10:06:38.383+00	\N	33	19	nanoarcade	\N	\N
2024-07-03 10:06:38.386+00	2024-07-03 10:06:38.386+00	\N	34	67	electronera	\N	\N
2023-09-11 10:06:38.389+00	2023-12-16 10:06:38.389+00	\N	35	40	bitbazaar	\N	\N
2024-02-14 10:06:38.393+00	2024-03-25 10:06:38.393+00	\N	36	66	logiclegends	\N	\N
2024-02-02 10:06:38.396+00	2024-03-25 10:06:38.396+00	\N	37	39	codeclan	\N	\N
2024-09-09 10:06:38.399+00	2024-10-11 10:06:38.399+00	\N	38	9	pixelportal	\N	\N
2024-04-14 10:06:38.403+00	2024-07-03 10:06:38.403+00	\N	39	12	circuitcraze	\N	\N
2024-03-21 10:06:38.407+00	2024-03-25 10:06:38.407+00	\N	40	63	bytebuster	\N	\N
2023-08-02 10:06:38.411+00	2023-09-07 10:06:38.411+00	\N	41	21	nanonovel	\N	\N
2024-01-25 10:06:38.414+00	2024-03-25 10:06:38.414+00	\N	42	27	electraeden	\N	\N
2024-09-13 10:06:38.418+00	2024-10-11 10:06:38.418+00	\N	43	42	codecomet	\N	\N
2023-11-30 10:06:38.422+00	2023-12-16 10:06:38.422+00	\N	44	63	pixelplayground	\N	\N
2024-08-12 10:06:38.426+00	2024-10-11 10:06:38.426+00	\N	45	67	logiclandia	\N	\N
2023-12-08 10:06:38.429+00	2023-12-16 10:06:38.429+00	\N	46	42	bytebounce	\N	\N
2024-07-27 10:06:38.433+00	2024-10-11 10:06:38.433+00	\N	47	6	circuitcarnival	\N	\N
2024-12-26 10:06:38.437+00	2025-01-19 10:06:38.437+00	\N	48	4	codecove	\N	\N
2023-08-10 10:06:38.441+00	2023-09-07 10:06:38.441+00	\N	49	20	nanonest	\N	\N
2024-10-15 10:06:38.447+00	2025-01-19 10:06:38.447+00	\N	50	10	electraentertain	\N	\N
2024-10-15 10:06:38.452+00	2025-01-19 10:06:38.452+00	\N	51	10	gamegalaxy	\N	\N
2024-03-13 10:06:38.456+00	2024-03-25 10:06:38.456+00	\N	52	20	logiclabyrinth	\N	\N
2024-09-21 10:06:38.46+00	2024-10-11 10:06:38.46+00	\N	53	69	byteblaster	\N	\N
2024-10-23 10:06:38.464+00	2025-01-19 10:06:38.464+00	\N	54	23	codecompass	\N	\N
2024-09-05 10:06:38.467+00	2024-10-11 10:06:38.467+00	\N	55	56	nanonation	\N	\N
2023-11-14 10:06:38.471+00	2023-12-16 10:06:38.471+00	\N	56	3	electraempire	\N	\N
2025-01-03 10:06:38.475+00	2025-01-19 10:06:38.475+00	\N	57	62	gamegarden	\N	\N
2024-09-17 10:06:38.478+00	2024-10-11 10:06:38.478+00	\N	58	16	pixelpeak	\N	\N
2023-07-09 10:06:38.482+00	2023-09-07 10:06:38.482+00	\N	59	61	circuitcelestial	\N	\N
2024-06-25 10:06:38.486+00	2024-07-03 10:06:38.486+00	\N	60	3	codecrusade	\N	\N
2024-12-04 10:06:38.491+00	2025-01-19 10:06:38.491+00	\N	61	41	nanonebula	\N	\N
2023-11-30 10:06:38.495+00	2023-12-16 10:06:38.495+00	\N	62	19	electraenclave	\N	\N
2024-03-21 10:06:38.498+00	2024-03-25 10:06:38.498+00	\N	63	53	gamegizmo	\N	\N
2024-10-05 10:06:38.501+00	2024-10-11 10:06:38.501+00	\N	64	38	pixelplanet	\N	\N
2024-12-02 10:06:38.505+00	2025-01-19 10:06:38.505+00	\N	65	61	logiclounge	\N	\N
2023-09-03 10:06:38.509+00	2023-09-07 10:06:38.509+00	\N	66	62	bytebeacon	\N	\N
2023-10-01 10:06:38.513+00	2023-12-16 10:06:38.513+00	\N	67	28	codecircus	\N	\N
2024-10-23 10:06:38.517+00	2025-01-19 10:06:38.517+00	\N	68	15	nanonook	\N	\N
2023-12-24 10:06:38.52+00	2024-03-25 10:06:38.52+00	\N	69	40	electraelysium	\N	\N
2024-10-15 10:06:38.524+00	2025-01-19 10:06:38.524+00	\N	70	2	gameglimpse	\N	\N
2023-11-22 10:06:38.528+00	2023-12-16 10:06:38.528+00	\N	71	34	pixelparadise	\N	\N
2024-04-22 10:06:38.531+00	2024-07-03 10:06:38.531+00	\N	72	66	codecoast	\N	\N
2024-02-26 10:06:38.534+00	2024-03-25 10:06:38.534+00	\N	73	64	nanonirvana	\N	\N
2024-01-17 10:06:38.538+00	2024-03-25 10:06:38.538+00	\N	74	48	electraedifice	\N	\N
2023-09-27 10:06:38.541+00	2023-12-16 10:06:38.541+00	\N	75	26	gamegen	\N	\N
2024-04-22 10:06:38.546+00	2024-07-03 10:06:38.546+00	\N	76	2	pixelpandemonium	\N	\N
2023-06-09 10:06:38.551+00	2023-09-07 10:06:38.551+00	\N	77	26	logiclagoon	\N	\N
2023-06-11 10:06:38.555+00	2023-09-07 10:06:38.555+00	\N	78	57	byteblaze	\N	\N
2024-04-22 10:06:38.559+00	2024-07-03 10:06:38.559+00	\N	79	60	codecorridor	\N	\N
2024-10-11 10:06:38.562+00	2024-10-11 10:06:38.562+00	\N	80	53	hacksimulator	\N	\N
2024-06-25 10:06:38.566+00	2024-07-03 10:06:38.566+00	\N	81	52	codecrunch	\N	\N
2024-05-24 10:06:38.571+00	2024-07-03 10:06:38.571+00	\N	82	14	securecraft	\N	\N
2024-08-28 10:06:38.575+00	2024-10-11 10:06:38.575+00	\N	83	18	cryptopulse	\N	\N
2023-07-09 10:06:38.58+00	2023-09-07 10:06:38.58+00	\N	84	18	dataforge	\N	\N
2023-06-23 10:06:38.584+00	2023-09-07 10:06:38.584+00	\N	85	1	cipherquest	\N	\N
2024-09-21 10:06:38.591+00	2024-10-11 10:06:38.591+00	\N	86	46	hackquest	\N	\N
2024-06-17 10:06:38.595+00	2024-07-03 10:06:38.595+00	\N	87	46	securesphere	\N	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.users (id, email, admin, name, password, remember_token, editor, public, show_projects, email_verified_at, created_at, updated_at, deleted_at) FROM stdin;
0	techtinkerer@gmail.com	t	TechTinkerer	****	\N	\N	f	f	\N	2024-12-10 10:06:38.193+00	2025-01-19 10:06:38.193+00	\N
1	codecrafter@gmail.com	f	CodeCrafter	****	\N	\N	t	t	\N	2024-05-08 10:06:38.201+00	2024-07-03 10:06:38.201+00	\N
2	pixelpilot@gmail.com	f	PixelPilot	****	\N	\N	t	t	\N	2024-05-08 10:06:38.202+00	2024-07-03 10:06:38.203+00	\N
3	logiclion@techinc.nl	f	LogicLion	****	\N	\N	t	t	\N	2023-11-30 10:06:38.203+00	2023-12-16 10:06:38.203+00	\N
4	electroneager@gmail.com	f	ElectronEager	****	\N	\N	t	t	\N	2023-12-04 10:06:38.205+00	2023-12-16 10:06:38.205+00	\N
5	nanonomad@techinc.nl	f	NanoNomad	****	\N	\N	t	t	\N	2024-03-29 10:06:38.206+00	2024-07-03 10:06:38.206+00	\N
6	circuitcraze@gmail.com	t	CircuitCraze	****	\N	\N	f	f	\N	2024-04-14 10:06:38.206+00	2024-07-03 10:06:38.206+00	\N
7	gameglider@gmail.com	f	GameGlider	****	\N	\N	t	t	\N	2024-05-08 10:06:38.207+00	2024-07-03 10:06:38.207+00	\N
8	byteblast@bitlair.nl	f	ByteBlast	****	\N	\N	t	t	\N	2024-02-18 10:06:38.208+00	2024-03-25 10:06:38.208+00	\N
9	cybercraft@techinc.nl	f	CyberCraft	****	\N	\N	t	t	\N	2024-01-17 10:06:38.208+00	2024-03-25 10:06:38.208+00	\N
10	digitaldynamo@gmail.com	t	DigitalDynamo	****	\N	\N	f	f	\N	2024-04-14 10:06:38.209+00	2024-07-03 10:06:38.209+00	\N
11	codecreator@bitlair.nl	f	CodeCreator	****	\N	\N	t	t	\N	2024-06-17 10:06:38.211+00	2024-07-03 10:06:38.211+00	\N
12	pixelpulse@techinc.nl	f	PixelPulse	****	\N	\N	t	t	\N	2023-09-19 10:06:38.212+00	2023-12-16 10:06:38.212+00	\N
13	logicluminary@gmail.com	f	LogicLuminary	****	\N	\N	t	t	\N	2024-09-29 10:06:38.212+00	2024-10-11 10:06:38.212+00	\N
14	electronecho@bitlair.nl	f	ElectronEcho	****	\N	\N	t	t	\N	2024-08-28 10:06:38.213+00	2024-10-11 10:06:38.213+00	\N
15	nanoninja@gmail.com	f	NanoNinja	****	\N	\N	t	t	\N	2024-01-09 10:06:38.214+00	2024-03-25 10:06:38.215+00	\N
16	circuitchampion@techinc.nl	f	CircuitChampion	****	\N	\N	t	t	\N	2023-08-26 10:06:38.215+00	2023-09-07 10:06:38.215+00	\N
17	gamegazer@bitlair.nl	t	GameGazer	****	\N	\N	f	f	\N	2024-09-21 10:06:38.216+00	2024-10-11 10:06:38.216+00	\N
18	bytebuddy@bitlair.nl	f	ByteBuddy	****	\N	\N	t	t	\N	2023-08-22 10:06:38.216+00	2023-09-07 10:06:38.216+00	\N
19	techtornado@bitlair.nl	f	TechTornado	****	\N	\N	t	t	\N	2024-03-01 10:06:38.217+00	2024-03-25 10:06:38.217+00	\N
20	codechampion@techinc.nl	f	CodeChampion	****	\N	\N	t	t	\N	2024-04-10 10:06:38.217+00	2024-07-03 10:06:38.217+00	\N
21	pixelprodigy@bitlair.nl	f	PixelProdigy	****	\N	\N	t	t	\N	2024-06-11 10:06:38.218+00	2024-07-03 10:06:38.218+00	\N
22	logiclabyrinth@bitlair.nl	f	LogicLabyrinth	****	\N	\N	t	t	\N	2024-03-13 10:06:38.218+00	2024-03-25 10:06:38.218+00	\N
23	electronexplorer@gmail.com	f	ElectronExplorer	****	\N	\N	t	t	\N	2024-12-22 10:06:38.219+00	2025-01-19 10:06:38.219+00	\N
24	nanonavigator@bitlair.nl	f	NanoNavigator	****	\N	\N	t	t	\N	2023-06-11 10:06:38.219+00	2023-09-07 10:06:38.219+00	\N
25	circuitcatalyst@gmail.com	f	CircuitCatalyst	****	\N	\N	t	t	\N	2024-11-16 10:06:38.22+00	2025-01-19 10:06:38.22+00	\N
26	gameguru@bitlair.nl	f	GameGuru	****	\N	\N	t	t	\N	2023-08-10 10:06:38.22+00	2023-09-07 10:06:38.22+00	\N
27	byteblaze@bitlair.nl	f	ByteBlaze	****	\N	\N	t	t	\N	2023-06-11 10:06:38.221+00	2023-09-07 10:06:38.221+00	\N
28	digitaldreamer@bitlair.nl	f	DigitalDreamer	****	\N	\N	t	t	\N	2024-08-28 10:06:38.222+00	2024-10-11 10:06:38.222+00	\N
29	codecommander@techinc.nl	f	CodeCommander	****	\N	\N	t	t	\N	2024-05-10 10:06:38.222+00	2024-07-03 10:06:38.222+00	\N
30	pixelpioneer@techinc.nl	f	PixelPioneer	****	\N	\N	t	t	\N	2024-09-07 10:06:38.223+00	2024-10-11 10:06:38.223+00	\N
31	logiclegend@bitlair.nl	t	LogicLegend	****	\N	\N	f	f	\N	2024-07-23 10:06:38.223+00	2024-10-11 10:06:38.223+00	\N
32	electronelite@bitlair.nl	t	ElectronElite	****	\N	\N	f	f	\N	2024-09-21 10:06:38.223+00	2024-10-11 10:06:38.223+00	\N
33	nanonerd@bitlair.nl	f	NanoNerd	****	\N	\N	t	t	\N	2023-12-20 10:06:38.224+00	2024-03-25 10:06:38.224+00	\N
34	circuitcaptain@techinc.nl	f	CircuitCaptain	****	\N	\N	t	t	\N	2023-11-30 10:06:38.224+00	2023-12-16 10:06:38.224+00	\N
35	gamegenius@bitlair.nl	f	GameGenius	****	\N	\N	t	t	\N	2024-06-05 10:06:38.225+00	2024-07-03 10:06:38.225+00	\N
36	bytebolt@bitlair.nl	f	ByteBolt	****	\N	\N	t	t	\N	2023-07-17 10:06:38.226+00	2023-09-07 10:06:38.226+00	\N
37	cybercipher@techinc.nl	f	CyberCipher	****	\N	\N	t	t	\N	2024-12-18 10:06:38.226+00	2025-01-19 10:06:38.226+00	\N
38	codeconqueror@techinc.nl	f	CodeConqueror	****	\N	\N	t	t	\N	2023-11-30 10:06:38.227+00	2023-12-16 10:06:38.227+00	\N
39	pixelpaladin@gmail.com	f	PixelPaladin	****	\N	\N	t	t	\N	2024-08-24 10:06:38.228+00	2024-10-11 10:06:38.228+00	\N
40	logiclore@bitlair.nl	t	LogicLore	****	\N	\N	f	f	\N	2024-09-21 10:06:38.228+00	2024-10-11 10:06:38.228+00	\N
41	electronenigma@bitlair.nl	f	ElectronEnigma	****	\N	\N	t	t	\N	2024-11-26 10:06:38.228+00	2025-01-19 10:06:38.228+00	\N
42	circuitconnoisseur@gmail.com	t	CircuitConnoisseur	****	\N	\N	f	f	\N	2024-08-12 10:06:38.229+00	2024-10-11 10:06:38.229+00	\N
43	gameguardian@gmail.com	f	GameGuardian	****	\N	\N	t	t	\N	2024-02-26 10:06:38.229+00	2024-03-25 10:06:38.229+00	\N
44	bytebandit@gmail.com	f	ByteBandit	****	\N	\N	t	t	\N	2023-11-10 10:06:38.23+00	2023-12-16 10:06:38.23+00	\N
45	techtinker@gmail.com	t	TechTinker	****	\N	\N	f	f	\N	2023-12-16 10:06:38.23+00	2023-12-16 10:06:38.23+00	\N
46	codecrusader@gmail.com	t	CodeCrusader	****	\N	\N	f	f	\N	2023-08-18 10:06:38.23+00	2023-09-07 10:06:38.23+00	\N
47	pixelpirate@gmail.com	f	PixelPirate	****	\N	\N	t	t	\N	2024-09-05 10:06:38.231+00	2024-10-11 10:06:38.231+00	\N
48	electroneagle@techinc.nl	f	ElectronEagle	****	\N	\N	t	t	\N	2024-04-22 10:06:38.231+00	2024-07-03 10:06:38.231+00	\N
49	circuitsavant@bitlair.nl	f	CircuitSavant	****	\N	\N	t	t	\N	2024-10-27 10:06:38.232+00	2025-01-19 10:06:38.232+00	\N
50	gamegladiator@bitlair.nl	f	GameGladiator	****	\N	\N	t	t	\N	2024-10-03 10:06:38.232+00	2024-10-11 10:06:38.232+00	\N
51	byteblitz@bitlair.nl	f	ByteBlitz	****	\N	\N	t	t	\N	2024-04-06 10:06:38.232+00	2024-07-03 10:06:38.232+00	\N
52	cybersavvy@bitlair.nl	f	CyberSavvy	****	\N	\N	t	t	\N	2023-09-03 10:06:38.233+00	2023-09-07 10:06:38.233+00	\N
53	codecraftsman@gmail.com	f	CodeCraftsman	****	\N	\N	t	t	\N	2024-07-19 10:06:38.233+00	2024-10-11 10:06:38.233+00	\N
54	pixelpro@techinc.nl	f	PixelPro	****	\N	\N	t	t	\N	2023-08-02 10:06:38.234+00	2023-09-07 10:06:38.234+00	\N
55	logicloremaster@gmail.com	f	LogicLoreMaster	****	\N	\N	t	t	\N	2024-07-19 10:06:38.234+00	2024-10-11 10:06:38.234+00	\N
56	electronemperor@techinc.nl	f	ElectronEmperor	****	\N	\N	t	t	\N	2024-12-18 10:06:38.234+00	2025-01-19 10:06:38.234+00	\N
57	circuitchamp@gmail.com	f	CircuitChamp	****	\N	\N	t	t	\N	2024-06-25 10:06:38.235+00	2024-07-03 10:06:38.235+00	\N
58	gamegizmo@gmail.com	f	GameGizmo	****	\N	\N	t	t	\N	2024-03-21 10:06:38.235+00	2024-03-25 10:06:38.235+00	\N
59	bytebrawler@gmail.com	f	ByteBrawler	****	\N	\N	t	t	\N	2024-05-08 10:06:38.236+00	2024-07-03 10:06:38.236+00	\N
60	techtrailblazer@hack42.nl	f	TechTrailblazer	****	\N	\N	t	t	\N	2023-07-02 10:06:38.236+00	2023-09-07 10:06:38.236+00	\N
61	codecaptain@gmail.com	t	CodeCaptain	****	\N	\N	f	f	\N	2023-12-16 10:06:38.236+00	2023-12-16 10:06:38.236+00	\N
62	pixelpathfinder@techinc.nl	t	PixelPathfinder	****	\N	\N	f	f	\N	2023-09-07 10:06:38.237+00	2023-09-07 10:06:38.237+00	\N
63	logiclionheart@bitlair.nl	f	LogicLionheart	****	\N	\N	t	t	\N	2023-10-21 10:06:38.237+00	2023-12-16 10:06:38.237+00	\N
64	electronexpedition@bitlair.nl	f	ElectronExpedition	****	\N	\N	t	t	\N	2024-04-06 10:06:38.237+00	2024-07-03 10:06:38.237+00	\N
65	nanonoble@bitlair.nl	f	NanoNoble	****	\N	\N	t	t	\N	2024-12-02 10:06:38.238+00	2025-01-19 10:06:38.238+00	\N
66	circuitcommander@gmail.com	t	CircuitCommander	****	\N	\N	f	f	\N	2023-08-18 10:06:38.238+00	2023-09-07 10:06:38.238+00	\N
67	gameglobetrotter@techinc.nl	f	GameGlobetrotter	****	\N	\N	t	t	\N	2024-03-29 10:06:38.239+00	2024-07-03 10:06:38.239+00	\N
68	cybersherpa@gmail.com	t	CyberSherpa	****	\N	\N	f	f	\N	2023-12-16 10:06:38.239+00	2023-12-16 10:06:38.239+00	\N
69	cybercraftsman@techinc.nl	f	CyberCraftsman	****	\N	\N	t	t	\N	2025-01-11 10:06:38.24+00	2025-01-19 10:06:38.24+00	\N
70	codeconnoisseur@techinc.nl	f	CodeConnoisseur	****	\N	\N	t	t	\N	2024-05-16 10:06:38.24+00	2024-07-03 10:06:38.24+00	\N
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
1	codecraft	1	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.273523+00	2025-01-19 10:06:38.273523+00	\N
2	pixelpulse	2	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.281881+00	2025-01-19 10:06:38.281881+00	\N
3	bitblast	3	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.287203+00	2025-01-19 10:06:38.287203+00	\N
4	nanogames	4	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.291245+00	2025-01-19 10:06:38.291245+00	\N
5	electraplay	5	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.296897+00	2025-01-19 10:06:38.296897+00	\N
6	circuitforge	6	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.301975+00	2025-01-19 10:06:38.301975+00	\N
7	bytebash	7	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.306003+00	2025-01-19 10:06:38.306003+00	\N
8	codecanvas	8	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.310466+00	2025-01-19 10:06:38.310466+00	\N
9	sparkscript	9	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.314674+00	2025-01-19 10:06:38.314674+00	\N
10	logicland	10	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.319369+00	2025-01-19 10:06:38.319369+00	\N
11	microarcade	11	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.323234+00	2025-01-19 10:06:38.323234+00	\N
12	codecraze	12	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.327451+00	2025-01-19 10:06:38.327451+00	\N
13	gamegenius	13	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.331406+00	2025-01-19 10:06:38.331406+00	\N
14	pixelpal	14	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.335779+00	2025-01-19 10:06:38.335779+00	\N
15	electronica	15	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.340157+00	2025-01-19 10:06:38.340157+00	\N
16	codequest	16	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.34458+00	2025-01-19 10:06:38.34458+00	\N
17	circuitcraft	17	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.348521+00	2025-01-19 10:06:38.348521+00	\N
18	bytebeat	18	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.352369+00	2025-01-19 10:06:38.352369+00	\N
19	nanonexus	19	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.356497+00	2025-01-19 10:06:38.356497+00	\N
20	bitbox	20	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.360878+00	2025-01-19 10:06:38.360878+00	\N
21	circuitchaos	21	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.369772+00	2025-01-19 10:06:38.369772+00	\N
22	codecrafter	22	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.373684+00	2025-01-19 10:06:38.373684+00	\N
23	pixelpioneer	23	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.379352+00	2025-01-19 10:06:38.379352+00	\N
24	logiclab	24	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.383155+00	2025-01-19 10:06:38.383155+00	\N
25	byteblitz	25	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.386849+00	2025-01-19 10:06:38.386849+00	\N
26	codewave	26	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.390911+00	2025-01-19 10:06:38.390911+00	\N
27	nanonet	27	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.394699+00	2025-01-19 10:06:38.394699+00	\N
28	electraforge	28	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.398178+00	2025-01-19 10:06:38.398178+00	\N
29	gamegrid	29	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.401645+00	2025-01-19 10:06:38.401645+00	\N
30	logicloom	30	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.404925+00	2025-01-19 10:06:38.404925+00	\N
31	pixelplaza	31	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.408578+00	2025-01-19 10:06:38.408578+00	\N
32	codecity	32	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.412068+00	2025-01-19 10:06:38.412068+00	\N
33	nanoarcade	33	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.415604+00	2025-01-19 10:06:38.415604+00	\N
34	electronera	34	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.418822+00	2025-01-19 10:06:38.418822+00	\N
35	bitbazaar	35	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.421948+00	2025-01-19 10:06:38.421948+00	\N
36	logiclegends	36	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.425473+00	2025-01-19 10:06:38.425473+00	\N
37	codeclan	37	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.428767+00	2025-01-19 10:06:38.428767+00	\N
38	pixelportal	38	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.431869+00	2025-01-19 10:06:38.431869+00	\N
39	circuitcraze	39	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.435973+00	2025-01-19 10:06:38.435973+00	\N
40	bytebuster	40	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.439522+00	2025-01-19 10:06:38.439522+00	\N
41	nanonovel	41	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.443237+00	2025-01-19 10:06:38.443237+00	\N
42	electraeden	42	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.446792+00	2025-01-19 10:06:38.446792+00	\N
43	codecomet	43	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.450405+00	2025-01-19 10:06:38.450405+00	\N
44	pixelplayground	44	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.454145+00	2025-01-19 10:06:38.454145+00	\N
45	logiclandia	45	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.45813+00	2025-01-19 10:06:38.45813+00	\N
46	bytebounce	46	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.461934+00	2025-01-19 10:06:38.461934+00	\N
47	circuitcarnival	47	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.46578+00	2025-01-19 10:06:38.46578+00	\N
48	codecove	48	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.469281+00	2025-01-19 10:06:38.469281+00	\N
49	nanonest	49	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.473697+00	2025-01-19 10:06:38.473697+00	\N
50	electraentertain	50	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.480014+00	2025-01-19 10:06:38.480014+00	\N
51	gamegalaxy	51	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.484365+00	2025-01-19 10:06:38.484365+00	\N
52	logiclabyrinth	52	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.488488+00	2025-01-19 10:06:38.488488+00	\N
53	byteblaster	53	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.49244+00	2025-01-19 10:06:38.49244+00	\N
54	codecompass	54	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.496162+00	2025-01-19 10:06:38.496162+00	\N
55	nanonation	55	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.499675+00	2025-01-19 10:06:38.499675+00	\N
56	electraempire	56	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.503226+00	2025-01-19 10:06:38.503226+00	\N
57	gamegarden	57	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.507194+00	2025-01-19 10:06:38.507194+00	\N
58	pixelpeak	58	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.510989+00	2025-01-19 10:06:38.510989+00	\N
59	circuitcelestial	59	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.514602+00	2025-01-19 10:06:38.514602+00	\N
60	codecrusade	60	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.518483+00	2025-01-19 10:06:38.518483+00	\N
61	nanonebula	61	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.523694+00	2025-01-19 10:06:38.523694+00	\N
62	electraenclave	62	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.527126+00	2025-01-19 10:06:38.527126+00	\N
63	gamegizmo	63	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.530605+00	2025-01-19 10:06:38.530605+00	\N
64	pixelplanet	64	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.533929+00	2025-01-19 10:06:38.533929+00	\N
65	logiclounge	65	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.537672+00	2025-01-19 10:06:38.537672+00	\N
66	bytebeacon	66	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.541389+00	2025-01-19 10:06:38.541389+00	\N
67	codecircus	67	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.545465+00	2025-01-19 10:06:38.545465+00	\N
68	nanonook	68	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.549194+00	2025-01-19 10:06:38.549194+00	\N
69	electraelysium	69	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.552623+00	2025-01-19 10:06:38.552623+00	\N
70	gameglimpse	70	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.556107+00	2025-01-19 10:06:38.556107+00	\N
71	pixelparadise	71	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.560172+00	2025-01-19 10:06:38.560172+00	\N
72	codecoast	72	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.563707+00	2025-01-19 10:06:38.563707+00	\N
73	nanonirvana	73	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.567058+00	2025-01-19 10:06:38.567058+00	\N
74	electraedifice	74	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.570564+00	2025-01-19 10:06:38.570564+00	\N
75	gamegen	75	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.574089+00	2025-01-19 10:06:38.574089+00	\N
76	pixelpandemonium	76	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.579125+00	2025-01-19 10:06:38.579125+00	\N
77	logiclagoon	77	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.583514+00	2025-01-19 10:06:38.583514+00	\N
78	byteblaze	78	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.587549+00	2025-01-19 10:06:38.587549+00	\N
79	codecorridor	79	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.591139+00	2025-01-19 10:06:38.591139+00	\N
80	hacksimulator	80	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.594978+00	2025-01-19 10:06:38.594978+00	\N
81	codecrunch	81	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.598835+00	2025-01-19 10:06:38.598835+00	\N
82	securecraft	82	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.604025+00	2025-01-19 10:06:38.604025+00	\N
83	cryptopulse	83	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.608649+00	2025-01-19 10:06:38.608649+00	\N
84	dataforge	84	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.612521+00	2025-01-19 10:06:38.612521+00	\N
85	cipherquest	85	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.616182+00	2025-01-19 10:06:38.616182+00	\N
86	hackquest	86	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.623465+00	2025-01-19 10:06:38.623465+00	\N
87	securesphere	87	0	\N	\N	\N	\N	\N	0	2025-01-19 10:06:38.627398+00	2025-01-19 10:06:38.627398+00	\N
\.


--
-- Name: app_metadata_jsons_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.app_metadata_jsons_id_seq', 87, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.migrations_id_seq', 15, true);


--
-- Name: project_statuses_on_badges_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.project_statuses_on_badges_id_seq', 87, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.users_id_seq', 1, false);


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
-- Name: files files_pkey; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (version_id, dir, name, ext);


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
-- Name: idx_files_sha256; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_files_sha256 ON badgehub.files USING btree (sha256);


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
-- Name: files files_version_id_fk; Type: FK CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.files
    ADD CONSTRAINT files_version_id_fk FOREIGN KEY (version_id) REFERENCES badgehub.versions(id) ON DELETE CASCADE;


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

