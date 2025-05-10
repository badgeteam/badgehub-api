--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6 (Debian 16.6-1.pgdg120+1)
-- Dumped by pg_dump version 16.6 (Debian 16.6-1.pgdg120+1)

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
    updated_at timestamp with time zone DEFAULT now()
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
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE badgehub.badges OWNER TO badgehub;

--
-- Name: categories; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.categories (
    slug text NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE badgehub.categories OWNER TO badgehub;

--
-- Name: file_data; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.file_data (
    id integer NOT NULL,
    sha256 text NOT NULL,
    content bytea NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE badgehub.file_data OWNER TO badgehub;

--
-- Name: file_data_id_seq; Type: SEQUENCE; Schema: badgehub; Owner: badgehub
--

CREATE SEQUENCE badgehub.file_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE badgehub.file_data_id_seq OWNER TO badgehub;

--
-- Name: file_data_id_seq; Type: SEQUENCE OWNED BY; Schema: badgehub; Owner: badgehub
--

ALTER SEQUENCE badgehub.file_data_id_seq OWNED BY badgehub.file_data.id;


--
-- Name: files; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.files (
    id integer NOT NULL,
    version_id integer NOT NULL,
    dir text NOT NULL,
    name text NOT NULL,
    ext text NOT NULL,
    mimetype text NOT NULL,
    size_of_content bigint NOT NULL,
    sha256 text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE badgehub.files OWNER TO badgehub;

--
-- Name: files_id_seq; Type: SEQUENCE; Schema: badgehub; Owner: badgehub
--

CREATE SEQUENCE badgehub.files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE badgehub.files_id_seq OWNER TO badgehub;

--
-- Name: files_id_seq; Type: SEQUENCE OWNED BY; Schema: badgehub; Owner: badgehub
--

ALTER SEQUENCE badgehub.files_id_seq OWNED BY badgehub.files.id;


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
    updated_at timestamp with time zone DEFAULT now()
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
    user_id integer NOT NULL,
    slug text NOT NULL,
    git text,
    allow_team_fixes boolean,
    latest_revision integer,
    draft_revision integer
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
    updated_at timestamp with time zone DEFAULT now()
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
    updated_at timestamp with time zone DEFAULT now()
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
-- Name: file_data id; Type: DEFAULT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.file_data ALTER COLUMN id SET DEFAULT nextval('badgehub.file_data_id_seq'::regclass);


--
-- Name: files id; Type: DEFAULT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.files ALTER COLUMN id SET DEFAULT nextval('badgehub.files_id_seq'::regclass);


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

COPY badgehub.app_metadata_jsons (id, category, name, description, author, icon, license_file, is_library, is_hidden, semantic_version, interpreter, main_executable, main_executable_overrides, file_mappings, file_mappings_overrides, created_at, updated_at) FROM stdin;
103	Uncategorised	CircuitCraft	Use CircuitCraft for some cool graphical effects.	PixelPulse	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2023-09-29 03:29:47.696+00	2023-09-29 03:29:47.696+00
94	Uncategorised	LogicLand	Use LogicLand for some cool graphical effects.	ByteBlitz	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-08-16 21:30:54.256+00	2022-11-23 21:30:54.256+00
126	Uncategorised	CircuitCraze	Use CircuitCraze for some cool graphical effects.	PixelPulse	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2023-07-04 20:36:02.72+00	2023-07-04 20:36:02.72+00
115	Uncategorised	GameGrid	Use GameGrid for some cool graphical effects.	GameGlider	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2023-06-14 14:37:26.096+00	2022-08-14 14:37:26.096+00
96	Uncategorised	SparkScript	Use SparkScript for some cool graphical effects.	GameGizmo	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-05-18 00:02:21.456+00	2023-10-13 00:02:21.456+00
120	Uncategorised	ByteBlitz	Use ByteBlitz for some cool graphical effects.	GameGizmo	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-05-07 06:19:17.712+00	2023-04-19 06:19:17.712+00
106	Silly	CodeCrafter	Use CodeCrafter for some cool graphical effects.	CodeCaptain	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-11-12 18:51:09.944+00	2024-08-18 18:51:09.944+00
129	Uncategorised	ByteBuster	Use ByteBuster for some cool graphical effects.	LogicLionheart	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-08-30 08:26:56.096+00	2021-09-05 08:26:56.096+00
97	Uncategorised	BitBlast	Use BitBlast for some cool graphical effects.	GameGuardian	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-01-15 06:15:05.696+00	2021-10-25 06:15:05.696+00
114	Silly	CodeWave	Use CodeWave for some cool graphical effects.	ByteBandit	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2023-12-21 17:42:11.64+00	2022-09-21 17:42:11.64+00
105	Uncategorised	NanoNexus	Use NanoNexus for some cool graphical effects.	LogicLabyrinth	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-10-21 16:26:33.936+00	2023-05-18 16:26:33.936+00
130	Uncategorised	CodeComet	Use CodeComet for some cool graphical effects.	CircuitConnoisseur	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2023-11-23 09:45:55.072+00	2023-11-23 09:45:55.072+00
98	Silly	ByteBash	Use ByteBash for some cool graphical effects.	TechTinker	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2023-07-17 14:27:29.464+00	2023-07-17 14:27:29.464+00
109	SAO	PixelPioneer	Make some magic happen with PixelPioneer.	DigitalDreamer	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-11-07 01:09:31.666+00	2024-04-27 01:09:31.666+00
113	Adult	LogicLoom	Use LogicLoom for some cool graphical effects.	NanoNomad	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-08-22 14:13:04.708+00	2023-10-15 14:13:04.708+00
123	Adult	LogicLegends	Use LogicLegends for some cool graphical effects.	CircuitCommander	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2023-10-19 20:19:20.66+00	2022-11-19 20:19:20.66+00
99	Uncategorised	PixelPulse	Use PixelPulse for some cool graphical effects.	NanoNavigator	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2023-11-30 00:51:54.112+00	2022-04-21 00:51:54.112+00
104	Adult	BitBox	Use BitBox for some cool graphical effects.	NanoNinja	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-10-10 18:13:06.836+00	2022-04-16 18:13:06.836+00
112	Adult	NanoNet	Use NanoNet for some cool graphical effects.	PixelPro	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2023-12-01 19:06:24.404+00	2021-11-19 19:06:24.404+00
121	Silly	ElectronEra	Use ElectronEra for some cool graphical effects.	GameGlobetrotter	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-10-14 10:09:17.8+00	2024-10-14 10:09:17.8+00
1	Uncategorised	CodeCraft	Use CodeCraft for some cool graphical effects.	NanoNavigator	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-11-01 13:12:19.376+00	2022-09-05 13:12:19.376+00
2	Uncategorised	PixelPulse	Use PixelPulse for some cool graphical effects.	NanoNavigator	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-11-30 00:51:54.112+00	2022-04-21 00:51:54.112+00
3	Uncategorised	BitBlast	Use BitBlast for some cool graphical effects.	GameGuardian	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-01-15 06:15:05.696+00	2021-10-25 06:15:05.696+00
4	Uncategorised	NanoGames	Use NanoGames for some cool graphical effects.	CircuitCaptain	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-07-14 16:45:35.488+00	2023-07-14 16:45:35.488+00
32	Silly	CodeCity	Use CodeCity for some cool graphical effects.	PixelPulse	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-01-25 11:02:05.24+00	2021-09-11 11:02:05.24+00
33	Uncategorised	NanoArcade	Use NanoArcade for some cool graphical effects.	TechTornado	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-03-03 03:17:23.68+00	2024-03-03 03:17:23.68+00
5	Uncategorised	ElectraPlay	Use ElectraPlay for some cool graphical effects.	GameGazer	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-03-30 14:40:52.96+00	2021-10-16 14:40:52.96+00
6	Adult	CircuitForge	Use CircuitForge for some cool graphical effects.	GameGladiator	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-11-17 23:23:23.636+00	2023-02-26 23:23:23.636+00
7	Silly	ByteBash	Use ByteBash for some cool graphical effects.	TechTinker	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-07-17 14:27:29.464+00	2023-07-17 14:27:29.464+00
8	Uncategorised	CodeCanvas	Use CodeCanvas for some cool graphical effects.	LogicLabyrinth	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-12-13 15:53:56.304+00	2022-06-07 15:53:56.304+00
9	Uncategorised	SparkScript	Use SparkScript for some cool graphical effects.	GameGizmo	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-05-18 00:02:21.456+00	2023-10-13 00:02:21.456+00
10	Uncategorised	LogicLand	Use LogicLand for some cool graphical effects.	ByteBlitz	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-08-16 21:30:54.256+00	2022-11-23 21:30:54.256+00
11	Adult	MicroArcade	Use MicroArcade for some cool graphical effects.	PixelPaladin	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-11-03 11:28:12.74+00	2023-11-03 11:28:12.74+00
12	Uncategorised	CodeCraze	Use CodeCraze for some cool graphical effects.	ElectronEcho	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-10-30 02:46:51.36+00	2021-11-09 02:46:51.36+00
13	Adult	GameGenius	Use GameGenius for some cool graphical effects.	CodeCrafter	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-06-07 06:49:56.772+00	2023-02-19 06:49:56.772+00
14	Uncategorised	PixelPal	Use PixelPal for some cool graphical effects.	LogicLuminary	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-07-29 11:14:20.224+00	2023-07-29 11:14:20.224+00
15	Adult	Electronica	Use Electronica for some cool graphical effects.	CyberCraftsman	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-11-24 22:55:24.164+00	2021-09-01 22:55:24.164+00
16	Uncategorised	CodeQuest	Use CodeQuest for some cool graphical effects.	TechTrailblazer	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-02-02 22:52:43.168+00	2022-06-10 22:52:43.168+00
17	Uncategorised	CircuitCraft	Use CircuitCraft for some cool graphical effects.	PixelPulse	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-09-29 03:29:47.696+00	2023-09-29 03:29:47.696+00
18	Uncategorised	ByteBeat	Use ByteBeat for some cool graphical effects.	ByteBlaze	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-06-19 17:13:46.448+00	2023-06-19 17:13:46.448+00
19	Uncategorised	NanoNexus	Use NanoNexus for some cool graphical effects.	LogicLabyrinth	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-10-21 16:26:33.936+00	2023-05-18 16:26:33.936+00
20	Adult	BitBox	Use BitBox for some cool graphical effects.	NanoNinja	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-10-10 18:13:06.836+00	2022-04-16 18:13:06.836+00
21	Hardware	CircuitChaos	Use CircuitChaos for some cool graphical effects.	CircuitChamp	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-08-16 03:07:57.756+00	2024-08-16 03:07:57.756+00
22	Silly	CodeCrafter	Use CodeCrafter for some cool graphical effects.	CodeCaptain	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-11-12 18:51:09.944+00	2024-08-18 18:51:09.944+00
23	SAO	PixelPioneer	Make some magic happen with PixelPioneer.	DigitalDreamer	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-11-07 01:09:31.666+00	2024-04-27 01:09:31.666+00
24	Uncategorised	LogicLab	Use LogicLab for some cool graphical effects.	PixelPilot	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-10-22 09:43:30.528+00	2023-11-19 09:43:30.528+00
25	Uncategorised	ByteBlitz	Use ByteBlitz for some cool graphical effects.	GameGizmo	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-05-07 06:19:17.712+00	2023-04-19 06:19:17.712+00
26	Silly	CodeWave	Use CodeWave for some cool graphical effects.	ByteBandit	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-12-21 17:42:11.64+00	2022-09-21 17:42:11.64+00
27	Adult	NanoNet	Use NanoNet for some cool graphical effects.	PixelPro	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-12-01 19:06:24.404+00	2021-11-19 19:06:24.404+00
28	Uncategorised	ElectraForge	Use ElectraForge for some cool graphical effects.	ElectronEmperor	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-09-17 05:22:36.352+00	2023-05-18 05:22:36.352+00
29	Uncategorised	GameGrid	Use GameGrid for some cool graphical effects.	GameGlider	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-06-14 14:37:26.096+00	2022-08-14 14:37:26.096+00
30	Adult	LogicLoom	Use LogicLoom for some cool graphical effects.	NanoNomad	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-08-22 14:13:04.708+00	2023-10-15 14:13:04.708+00
31	Hardware	PixelPlaza	Use PixelPlaza for some cool graphical effects.	ElectronExpedition	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-11-03 20:03:16.06+00	2023-01-31 20:03:16.06+00
34	Silly	ElectronEra	Use ElectronEra for some cool graphical effects.	GameGlobetrotter	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-10-14 10:09:17.8+00	2024-10-14 10:09:17.8+00
35	Uncategorised	BitBazaar	Use BitBazaar for some cool graphical effects.	LogicLore	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-11-03 05:05:47.504+00	2023-09-22 05:05:47.504+00
36	Adult	LogicLegends	Use LogicLegends for some cool graphical effects.	CircuitCommander	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-10-19 20:19:20.66+00	2022-11-19 20:19:20.66+00
37	Silly	CodeClan	Use CodeClan for some cool graphical effects.	PixelPaladin	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-09-21 04:03:11.048+00	2023-12-28 04:03:11.048+00
38	Hardware	PixelPortal	Use PixelPortal for some cool graphical effects.	CyberCraft	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-05-23 17:26:04.668+00	2024-02-13 17:26:04.668+00
39	Uncategorised	CircuitCraze	Use CircuitCraze for some cool graphical effects.	PixelPulse	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-07-04 20:36:02.72+00	2023-07-04 20:36:02.72+00
40	Uncategorised	ByteBuster	Use ByteBuster for some cool graphical effects.	LogicLionheart	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-08-30 08:26:56.096+00	2021-09-05 08:26:56.096+00
41	Silly	NanoNovel	Use NanoNovel for some cool graphical effects.	PixelProdigy	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-01-25 00:59:51.064+00	2022-06-04 00:59:51.064+00
42	Silly	ElectraEden	Use ElectraEden for some cool graphical effects.	ByteBlaze	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-07-01 10:51:30.84+00	2022-05-21 10:51:30.84+00
43	Uncategorised	CodeComet	Use CodeComet for some cool graphical effects.	CircuitConnoisseur	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-11-23 09:45:55.072+00	2023-11-23 09:45:55.072+00
44	Uncategorised	PixelPlayground	Use PixelPlayground for some cool graphical effects.	LogicLionheart	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-12-31 18:26:24.784+00	2024-07-24 18:26:24.784+00
45	Uncategorised	LogicLandia	Use LogicLandia for some cool graphical effects.	GameGlobetrotter	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-04-14 08:17:02.24+00	2022-10-10 08:17:02.24+00
46	Silly	ByteBounce	Use ByteBounce for some cool graphical effects.	CircuitConnoisseur	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-05-21 07:52:12.792+00	2023-05-19 07:52:12.792+00
47	Silly	CircuitCarnival	Use CircuitCarnival for some cool graphical effects.	CircuitCraze	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-02-05 07:45:38.824+00	2024-02-05 07:45:38.824+00
48	Uncategorised	CodeCove	Use CodeCove for some cool graphical effects.	ElectronEager	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-03-12 09:05:08.976+00	2024-03-12 09:05:08.976+00
49	Uncategorised	NanoNest	Use NanoNest for some cool graphical effects.	CodeChampion	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-11-13 08:24:15.072+00	2023-10-20 08:24:15.072+00
50	Uncategorised	ElectraEntertain	Use ElectraEntertain for some cool graphical effects.	DigitalDynamo	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-12-22 05:37:15.504+00	2022-01-29 05:37:15.504+00
51	Uncategorised	GameGalaxy	Use GameGalaxy for some cool graphical effects.	DigitalDynamo	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-10-28 19:46:23.904+00	2022-10-17 19:46:23.904+00
52	Silly	LogicLabyrinth	Use LogicLabyrinth for some cool graphical effects.	CodeChampion	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-10-25 17:33:41.688+00	2021-12-14 17:33:41.688+00
53	Silly	ByteBlaster	Use ByteBlaster for some cool graphical effects.	CyberCraftsman	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-05-30 11:28:58.68+00	2022-05-01 11:28:58.68+00
54	Silly	CodeCompass	Use CodeCompass for some cool graphical effects.	ElectronExplorer	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-08-04 15:22:58.712+00	2023-01-26 15:22:58.712+00
55	Uncategorised	NanoNation	Use NanoNation for some cool graphical effects.	ElectronEmperor	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-05-20 22:09:19.664+00	2022-02-22 22:09:19.664+00
56	Silly	ElectraEmpire	Use ElectraEmpire for some cool graphical effects.	LogicLion	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-07-09 21:46:04.968+00	2023-07-09 21:46:04.968+00
82	Uncategorised	SecureCraft	Use SecureCraft for some cool graphical effects.	ElectronEcho	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-07-03 00:30:41.76+00	2022-11-17 00:30:41.76+00
83	Uncategorised	CryptoPulse	Use CryptoPulse for some cool graphical effects.	ByteBuddy	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-08-28 13:28:10.656+00	2024-08-02 13:28:10.656+00
57	Uncategorised	GameGarden	Use GameGarden for some cool graphical effects.	PixelPathfinder	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-11-05 09:02:28.784+00	2024-07-04 09:02:28.784+00
58	Hardware	PixelPeak	Use PixelPeak for some cool graphical effects.	CircuitChampion	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-02-09 16:13:44.876+00	2022-05-14 16:13:44.876+00
59	Silly	CircuitCelestial	Use CircuitCelestial for some cool graphical effects.	CodeCaptain	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-09-02 22:18:08.44+00	2023-09-02 22:18:08.44+00
60	Uncategorised	CodeCrusade	Use CodeCrusade for some cool graphical effects.	LogicLion	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-12-05 03:41:56.192+00	2022-04-28 03:41:56.192+00
61	SAO	NanoNebula	Make some magic happen with NanoNebula.	ElectronEnigma	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-05-21 09:16:51.554+00	2022-10-07 09:16:51.554+00
62	Silly	ElectraEnclave	Use ElectraEnclave for some cool graphical effects.	TechTornado	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-07-21 02:31:48.184+00	2023-07-21 02:31:48.184+00
63	Uncategorised	GameGizmo	Use GameGizmo for some cool graphical effects.	CodeCraftsman	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-03-19 02:18:38.096+00	2021-08-18 02:18:38.096+00
64	Games	PixelPlanet	Make some magic happen with PixelPlanet.	CodeConqueror	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-06-24 21:57:36.494+00	2022-05-14 21:57:36.494+00
65	Silly	LogicLounge	Use LogicLounge for some cool graphical effects.	CodeCaptain	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-08-09 14:23:25.752+00	2021-12-03 14:23:25.752+00
66	Uncategorised	ByteBeacon	Use ByteBeacon for some cool graphical effects.	PixelPathfinder	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-12-19 20:19:10.896+00	2023-01-01 20:19:10.896+00
67	Adult	CodeCircus	Use CodeCircus for some cool graphical effects.	DigitalDreamer	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-09-11 19:49:28.324+00	2023-07-27 19:49:28.324+00
68	Uncategorised	NanoNook	Use NanoNook for some cool graphical effects.	NanoNinja	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-02-12 20:46:28.112+00	2023-11-14 20:46:28.112+00
69	Silly	ElectraElysium	Use ElectraElysium for some cool graphical effects.	LogicLore	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-12-03 07:30:33.208+00	2023-08-17 07:30:33.208+00
70	Silly	GameGlimpse	Use GameGlimpse for some cool graphical effects.	PixelPilot	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-12-10 03:47:30.504+00	2022-10-02 03:47:30.504+00
71	Silly	PixelParadise	Use PixelParadise for some cool graphical effects.	CircuitCaptain	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-10-30 00:09:40.376+00	2022-01-06 00:09:40.376+00
72	Silly	CodeCoast	Use CodeCoast for some cool graphical effects.	CircuitCommander	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-03-21 13:24:49.528+00	2023-05-02 13:24:49.528+00
73	Uncategorised	NanoNirvana	Use NanoNirvana for some cool graphical effects.	ElectronExpedition	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-09-17 15:44:08.672+00	2022-09-22 15:44:08.672+00
74	Silly	ElectraEdifice	Use ElectraEdifice for some cool graphical effects.	ElectronEagle	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-02-06 15:06:27.832+00	2024-02-06 15:06:27.832+00
75	Uncategorised	GameGen	Use GameGen for some cool graphical effects.	GameGuru	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-11-04 09:30:30.72+00	2021-11-16 09:30:30.72+00
76	Uncategorised	PixelPandemonium	Use PixelPandemonium for some cool graphical effects.	PixelPilot	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-10-26 10:11:48.928+00	2023-07-22 10:11:48.928+00
77	Wearable	LogicLagoon	Make some magic happen with LogicLagoon.	GameGuru	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-06-13 23:31:30.01+00	2022-01-23 23:31:30.01+00
78	Hardware	ByteBlaze	Use ByteBlaze for some cool graphical effects.	CircuitChamp	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-08-21 00:04:19.212+00	2023-11-19 00:04:19.212+00
79	Uncategorised	CodeCorridor	Use CodeCorridor for some cool graphical effects.	TechTrailblazer	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-11-08 06:16:09.328+00	2024-04-30 06:16:09.328+00
80	Adult	HackSimulator	Use HackSimulator for some cool graphical effects.	CodeCraftsman	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-07-25 16:37:02.9+00	2022-12-09 16:37:02.9+00
81	Uncategorised	CodeCrunch	Use CodeCrunch for some cool graphical effects.	CyberSavvy	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-02-08 21:20:39.392+00	2021-12-30 21:20:39.392+00
84	Silly	DataForge	Use DataForge for some cool graphical effects.	ByteBuddy	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-05-19 23:17:49.24+00	2023-05-19 23:17:49.24+00
85	Uncategorised	CipherQuest	Use CipherQuest for some cool graphical effects.	CodeCrafter	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-11-14 01:27:48.624+00	2022-11-11 01:27:48.624+00
86	Uncategorised	HackQuest	Use HackQuest for some cool graphical effects.	CodeCrusader	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2023-05-28 22:05:38.88+00	2022-11-09 22:05:38.88+00
87	Uncategorised	SecureSphere	Use SecureSphere for some cool graphical effects.	CodeCrusader	\N	MIT	\N	\N	\N	python	\N	\N	\N	\N	2024-12-02 15:18:25.584+00	2023-09-13 15:18:25.584+00
90	Uncategorised	CodeCraze	Use CodeCraze for some cool graphical effects.	ElectronEcho	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-10-30 02:46:51.36+00	2021-11-09 02:46:51.36+00
91	Adult	GameGenius	Use GameGenius for some cool graphical effects.	CodeCrafter	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2023-06-07 06:49:56.772+00	2023-02-19 06:49:56.772+00
89	Adult	MicroArcade	Use MicroArcade for some cool graphical effects.	PixelPaladin	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2023-11-03 11:28:12.74+00	2023-11-03 11:28:12.74+00
88	Uncategorised	CodeCraft	Use CodeCraft for some cool graphical effects.	NanoNavigator	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-11-01 13:12:19.376+00	2022-09-05 13:12:19.376+00
95	Uncategorised	PixelPal	Use PixelPal for some cool graphical effects.	LogicLuminary	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2023-07-29 11:14:20.224+00	2023-07-29 11:14:20.224+00
101	Uncategorised	ElectraPlay	Use ElectraPlay for some cool graphical effects.	GameGazer	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-03-30 14:40:52.96+00	2021-10-16 14:40:52.96+00
117	Uncategorised	ElectraForge	Use ElectraForge for some cool graphical effects.	ElectronEmperor	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-09-17 05:22:36.352+00	2023-05-18 05:22:36.352+00
122	Uncategorised	BitBazaar	Use BitBazaar for some cool graphical effects.	LogicLore	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2023-11-03 05:05:47.504+00	2023-09-22 05:05:47.504+00
100	Uncategorised	ByteBeat	Use ByteBeat for some cool graphical effects.	ByteBlaze	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2023-06-19 17:13:46.448+00	2023-06-19 17:13:46.448+00
108	Hardware	CircuitChaos	Use CircuitChaos for some cool graphical effects.	CircuitChamp	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-08-16 03:07:57.756+00	2024-08-16 03:07:57.756+00
125	Hardware	PixelPortal	Use PixelPortal for some cool graphical effects.	CyberCraft	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-05-23 17:26:04.668+00	2024-02-13 17:26:04.668+00
92	Adult	CircuitForge	Use CircuitForge for some cool graphical effects.	GameGladiator	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2023-11-17 23:23:23.636+00	2023-02-26 23:23:23.636+00
107	Uncategorised	CodeQuest	Use CodeQuest for some cool graphical effects.	TechTrailblazer	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-02-02 22:52:43.168+00	2022-06-10 22:52:43.168+00
110	Uncategorised	CodeCanvas	Use CodeCanvas for some cool graphical effects.	LogicLabyrinth	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2023-12-13 15:53:56.304+00	2022-06-07 15:53:56.304+00
111	Uncategorised	LogicLab	Use LogicLab for some cool graphical effects.	PixelPilot	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-10-22 09:43:30.528+00	2023-11-19 09:43:30.528+00
127	Silly	NanoNovel	Use NanoNovel for some cool graphical effects.	PixelProdigy	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-01-25 00:59:51.064+00	2022-06-04 00:59:51.064+00
119	Silly	CodeCity	Use CodeCity for some cool graphical effects.	PixelPulse	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-01-25 11:02:05.24+00	2021-09-11 11:02:05.24+00
118	Uncategorised	NanoArcade	Use NanoArcade for some cool graphical effects.	TechTornado	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-03-03 03:17:23.68+00	2024-03-03 03:17:23.68+00
124	Silly	ElectraEden	Use ElectraEden for some cool graphical effects.	ByteBlaze	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-07-01 10:51:30.84+00	2022-05-21 10:51:30.84+00
93	Uncategorised	NanoGames	Use NanoGames for some cool graphical effects.	CircuitCaptain	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2023-07-14 16:45:35.488+00	2023-07-14 16:45:35.488+00
102	Adult	Electronica	Use Electronica for some cool graphical effects.	CyberCraftsman	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2023-11-24 22:55:24.164+00	2021-09-01 22:55:24.164+00
128	Silly	CodeClan	Use CodeClan for some cool graphical effects.	PixelPaladin	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-09-21 04:03:11.048+00	2023-12-28 04:03:11.048+00
116	Hardware	PixelPlaza	Use PixelPlaza for some cool graphical effects.	ElectronExpedition	\N	MIT	\N	\N	0.0.1	python	\N	\N	\N	\N	2024-11-03 20:03:16.06+00	2023-01-31 20:03:16.06+00
\.


--
-- Data for Name: badges; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.badges (slug, name, created_at, updated_at) FROM stdin;
mch2022	mch2022	2024-01-08 21:34:59.412+00	2023-10-30 21:34:59.412+00
troopers23	troopers23	2024-11-08 09:48:56.8+00	2022-05-23 09:48:56.8+00
why2025	WHY2025	2023-11-16 14:41:01.2+00	2023-11-16 14:41:01.2+00
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.categories (slug, name, created_at, updated_at) FROM stdin;
uncategorised	Uncategorised	2024-11-01 05:42:38.072+00	2023-05-01 05:42:38.072+00
event_related	Event related	2024-11-26 04:55:01.576+00	2024-04-04 04:55:01.576+00
games	Games	2024-05-27 08:37:07.472+00	2022-07-21 08:37:07.472+00
graphics	Graphics	2023-07-31 06:47:44.36+00	2023-07-31 06:47:44.36+00
hardware	Hardware	2023-09-20 23:25:53.776+00	2023-05-23 23:25:53.776+00
utility	Utility	2023-08-11 07:35:42.824+00	2021-09-18 07:35:42.824+00
wearable	Wearable	2024-07-30 08:37:30.432+00	2024-07-30 08:37:30.432+00
data	Data	2023-07-28 10:47:36.188+00	2023-07-28 10:47:36.188+00
silly	Silly	2023-11-14 13:15:52.592+00	2023-09-03 13:15:52.592+00
hacking	Hacking	2024-05-07 14:50:32.64+00	2023-11-19 14:50:32.64+00
troll	Troll	2024-01-19 15:37:58.72+00	2022-01-15 15:37:58.72+00
unusable	Unusable	2024-02-19 17:48:24.864+00	2023-10-24 17:48:24.864+00
adult	Adult	2023-07-05 00:41:46.808+00	2022-04-07 00:41:46.808+00
virus	Virus	2023-12-10 06:21:53.488+00	2023-02-27 06:21:53.488+00
sao	SAO	2023-05-26 00:13:02.68+00	2021-11-18 00:13:02.68+00
interpreter	Interpreter	2024-07-19 22:23:49.568+00	2024-07-19 22:23:49.568+00
\.


--
-- Data for Name: file_data; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.file_data (id, sha256, content, created_at, updated_at) FROM stdin;
246	9d1fcf7acd50934cf26f3c525e40fa356fe239538730c3adca0be308095f63d1	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f64654369747920617070302e302e312729	2024-01-25 11:02:05.24+00	2021-09-11 11:02:05.24+00
254	6856aaa3543631f1281aaa540d842d43cd6c203af258379ee407f574f382d430	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204e616e6f4e6578757320617070302e302e312729	2024-10-21 16:26:33.936+00	2023-05-18 16:26:33.936+00
1	d1010a609b51931a168bd38aedbdb952ca51b3f05505f3a4f5fd2ad604f66a23	\\x7b226e616d65223a22436f64654372616674222c226465736372697074696f6e223a2255736520436f6465437261667420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224e616e6f4e6176696761746f72222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d31312d30315431333a31323a31392e3337365a222c22757064617465645f6174223a22323032322d30392d30355431333a31323a31392e3337365a227d	2024-11-01 13:12:19.376+00	2022-09-05 13:12:19.376+00
14	c4b9c74fa92f14325701797e6a063ee0658a942a48b5130aedb64bb2b910b132	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204279746542617368206170702729	2023-07-17 14:27:29.464+00	2023-07-17 14:27:29.464+00
2	4028201b6ebf876b3ee30462c4d170146a2d3d92c5aca9fefc5e3d1a0508f5df	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f64654372616674206170702729	2024-11-01 13:12:19.376+00	2022-09-05 13:12:19.376+00
3	7e05683fdade2a6d33d4bebaabb8ccea1215dce6c6b9c9da89ffd2514a799384	\\x7b226e616d65223a22506978656c50756c7365222c226465736372697074696f6e223a2255736520506978656c50756c736520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224e616e6f4e6176696761746f72222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d31312d33305430303a35313a35342e3131325a222c22757064617465645f6174223a22323032322d30342d32315430303a35313a35342e3131325a227d	2023-11-30 00:51:54.112+00	2022-04-21 00:51:54.112+00
4	9aa3814437e99d152b55e8d30785ae282f4ace6d5b47371690f27571174641ba	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520506978656c50756c7365206170702729	2023-11-30 00:51:54.112+00	2022-04-21 00:51:54.112+00
5	28fe8a2b3715b7149ea57fea66cdb5a7afa902267a251e3a757427bd4d7ec1e8	\\x7b226e616d65223a22426974426c617374222c226465736372697074696f6e223a2255736520426974426c61737420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2247616d65477561726469616e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30312d31355430363a31353a30352e3639365a222c22757064617465645f6174223a22323032312d31302d32355430363a31353a30352e3639365a227d	2024-01-15 06:15:05.696+00	2021-10-25 06:15:05.696+00
6	49b72397cd8e216aaf79fe5588c549c3d0345a9a4a557116de55e25ff02261b7	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520426974426c617374206170702729	2024-01-15 06:15:05.696+00	2021-10-25 06:15:05.696+00
7	15b9100b8e870a99ae40cd64bd477d7786fa0304b1ae4cacfe169cee792dd047	\\x7b226e616d65223a224e616e6f47616d6573222c226465736372697074696f6e223a22557365204e616e6f47616d657320666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22436972637569744361707461696e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d30372d31345431363a34353a33352e3438385a222c22757064617465645f6174223a22323032332d30372d31345431363a34353a33352e3438385a227d	2023-07-14 16:45:35.488+00	2023-07-14 16:45:35.488+00
8	5e785c38408783e0c19e21d247aed30e7756e473a8b717c8ed76987134781f9e	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204e616e6f47616d6573206170702729	2023-07-14 16:45:35.488+00	2023-07-14 16:45:35.488+00
9	b898b75196f09feb0a92ea6eb1ef38647d8e86241c58125c10ca245ac2fcdcaa	\\x7b226e616d65223a22456c6563747261506c6179222c226465736372697074696f6e223a2255736520456c6563747261506c617920666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2247616d6547617a6572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30332d33305431343a34303a35322e3936305a222c22757064617465645f6174223a22323032312d31302d31365431343a34303a35322e3936305a227d	2024-03-30 14:40:52.96+00	2021-10-16 14:40:52.96+00
10	a0cf3ab0dde63421421a47268941bf6dcbd2d5046a82edf532951b8619e04168	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520456c6563747261506c6179206170702729	2024-03-30 14:40:52.96+00	2021-10-16 14:40:52.96+00
11	5bee104781bcf61f6d196a3ab4d482c2810a6f11500dec7dee3855288b3022df	\\x7b226e616d65223a2243697263756974466f726765222c226465736372697074696f6e223a225573652043697263756974466f72676520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2247616d65476c61646961746f72222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224164756c74222c22637265617465645f6174223a22323032332d31312d31375432333a32333a32332e3633365a222c22757064617465645f6174223a22323032332d30322d32365432333a32333a32332e3633365a227d	2023-11-17 23:23:23.636+00	2023-02-26 23:23:23.636+00
12	3c374193e3ec95322be1d5e5c569c3a7514a4dbf169d9ae7d494bb6911dc2bf6	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652043697263756974466f726765206170702729	2023-11-17 23:23:23.636+00	2023-02-26 23:23:23.636+00
13	bf972080fed2dd169323b6f9919d7074c05d70be082da5865ff9ff92e762499a	\\x7b226e616d65223a224279746542617368222c226465736372697074696f6e223a2255736520427974654261736820666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a225465636854696e6b6572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032332d30372d31375431343a32373a32392e3436345a222c22757064617465645f6174223a22323032332d30372d31375431343a32373a32392e3436345a227d	2023-07-17 14:27:29.464+00	2023-07-17 14:27:29.464+00
15	2de9fec337ea8de11e7b341bc87d6b087117f82260d0aa4d2d3d66680844d59b	\\x7b226e616d65223a22436f646543616e766173222c226465736372697074696f6e223a2255736520436f646543616e76617320666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224c6f6769634c61627972696e7468222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d31322d31335431353a35333a35362e3330345a222c22757064617465645f6174223a22323032322d30362d30375431353a35333a35362e3330345a227d	2023-12-13 15:53:56.304+00	2022-06-07 15:53:56.304+00
16	96308cdc9e544da17073506cec8066e7dd19634f8544c38cae0b35b7f8071a01	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f646543616e766173206170702729	2023-12-13 15:53:56.304+00	2022-06-07 15:53:56.304+00
17	40632e6eabab00764f21b56c2b20fd3426f63eb2055819b98228d963f9c39cb8	\\x7b226e616d65223a22537061726b536372697074222c226465736372697074696f6e223a2255736520537061726b53637269707420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2247616d6547697a6d6f222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30352d31385430303a30323a32312e3435365a222c22757064617465645f6174223a22323032332d31302d31335430303a30323a32312e3435365a227d	2024-05-18 00:02:21.456+00	2023-10-13 00:02:21.456+00
18	d9978aacdb1ac896d1842a76af206475750d37832758cbd4fb6d1f4a2a6ee2c7	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520537061726b536372697074206170702729	2024-05-18 00:02:21.456+00	2023-10-13 00:02:21.456+00
19	a0372510e24a324c461f8c23535877c350b7bd3bfe9a3d839ddccfe28b489b8c	\\x7b226e616d65223a224c6f6769634c616e64222c226465736372697074696f6e223a22557365204c6f6769634c616e6420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2242797465426c69747a222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30382d31365432313a33303a35342e3235365a222c22757064617465645f6174223a22323032322d31312d32335432313a33303a35342e3235365a227d	2024-08-16 21:30:54.256+00	2022-11-23 21:30:54.256+00
20	11e20b405e3d7a1ced041746672eb8b7a51dfe1f79f3403ab31e08c57c3311fa	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204c6f6769634c616e64206170702729	2024-08-16 21:30:54.256+00	2022-11-23 21:30:54.256+00
21	93d9864ef5b92c13da634f3437247a3e9e6ff0e97fb07ccc8f766a8c721dcbaa	\\x7b226e616d65223a224d6963726f417263616465222c226465736372697074696f6e223a22557365204d6963726f41726361646520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22506978656c50616c6164696e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224164756c74222c22637265617465645f6174223a22323032332d31312d30335431313a32383a31322e3734305a222c22757064617465645f6174223a22323032332d31312d30335431313a32383a31322e3734305a227d	2023-11-03 11:28:12.74+00	2023-11-03 11:28:12.74+00
22	12b73cdd685d319fd31d2f22a2219cda722f172c53aa0a68933b57e4ffe55183	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204d6963726f417263616465206170702729	2023-11-03 11:28:12.74+00	2023-11-03 11:28:12.74+00
23	504aa1fda79f122cde8702e8b303e70f9ad1f322c6e1be768f3c36b7bf1c4a0c	\\x7b226e616d65223a22436f64654372617a65222c226465736372697074696f6e223a2255736520436f64654372617a6520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22456c656374726f6e4563686f222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d31302d33305430323a34363a35312e3336305a222c22757064617465645f6174223a22323032312d31312d30395430323a34363a35312e3336305a227d	2024-10-30 02:46:51.36+00	2021-11-09 02:46:51.36+00
24	b82df97bdcc0b1cef23111b62764dc082145dbec8e6334a593c0170f6ef61857	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f64654372617a65206170702729	2024-10-30 02:46:51.36+00	2021-11-09 02:46:51.36+00
25	4c6afc488fcea9f59f151689d6e729c534f380298873518c4b347f6f06120d27	\\x7b226e616d65223a2247616d6547656e697573222c226465736372697074696f6e223a225573652047616d6547656e69757320666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22436f646543726166746572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224164756c74222c22637265617465645f6174223a22323032332d30362d30375430363a34393a35362e3737325a222c22757064617465645f6174223a22323032332d30322d31395430363a34393a35362e3737325a227d	2023-06-07 06:49:56.772+00	2023-02-19 06:49:56.772+00
26	89f2eab3a286770d3329b931085227c17964449ab1aed5a7d36ad6dcd5895d60	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652047616d6547656e697573206170702729	2023-06-07 06:49:56.772+00	2023-02-19 06:49:56.772+00
27	a7bccba18283b69f823ec3362a484409aba960cbf121b8e78d06b86863b162c9	\\x7b226e616d65223a22506978656c50616c222c226465736372697074696f6e223a2255736520506978656c50616c20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224c6f6769634c756d696e617279222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d30372d32395431313a31343a32302e3232345a222c22757064617465645f6174223a22323032332d30372d32395431313a31343a32302e3232345a227d	2023-07-29 11:14:20.224+00	2023-07-29 11:14:20.224+00
28	3c2a3ed74b13094a58bc12b16f806ccb4ad4d65f29d2c7cc9f988fb6d73e2118	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520506978656c50616c206170702729	2023-07-29 11:14:20.224+00	2023-07-29 11:14:20.224+00
42	6f92441881943cf29cd88682b7bcfd77160a54086d26cc21e9bb8363b5f20f06	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436972637569744368616f73206170702729	2024-08-16 03:07:57.756+00	2024-08-16 03:07:57.756+00
29	08fed01b0a9713a266865ae255e2018dc972d14f133ceafb02f092bb1aed6215	\\x7b226e616d65223a22456c656374726f6e696361222c226465736372697074696f6e223a2255736520456c656374726f6e69636120666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2243796265724372616674736d616e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224164756c74222c22637265617465645f6174223a22323032332d31312d32345432323a35353a32342e3136345a222c22757064617465645f6174223a22323032312d30392d30315432323a35353a32342e3136345a227d	2023-11-24 22:55:24.164+00	2021-09-01 22:55:24.164+00
30	656e3f5da029c38e116fdb96451ee053f78bf8673dbf86d7ccfc87df62dfce64	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520456c656374726f6e696361206170702729	2023-11-24 22:55:24.164+00	2021-09-01 22:55:24.164+00
31	954ad6cbe60cce8b1f47027f49a540c0d2274584eef7873f171be5d20d49091e	\\x7b226e616d65223a22436f64655175657374222c226465736372697074696f6e223a2255736520436f6465517565737420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2254656368547261696c626c617a6572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30322d30325432323a35323a34332e3136385a222c22757064617465645f6174223a22323032322d30362d31305432323a35323a34332e3136385a227d	2024-02-02 22:52:43.168+00	2022-06-10 22:52:43.168+00
32	ea8e580ec6d0a25e8a646fdc234570c7f178eb783808766e6467a75b5666b72e	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f64655175657374206170702729	2024-02-02 22:52:43.168+00	2022-06-10 22:52:43.168+00
33	8b8d9d2d21930e1e9ea59937c199561489f91b2ee62e4823c183fbe51e5c5a4a	\\x7b226e616d65223a22436972637569744372616674222c226465736372697074696f6e223a225573652043697263756974437261667420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22506978656c50756c7365222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d30392d32395430333a32393a34372e3639365a222c22757064617465645f6174223a22323032332d30392d32395430333a32393a34372e3639365a227d	2023-09-29 03:29:47.696+00	2023-09-29 03:29:47.696+00
34	9c5ad176a1421fb4518bda694005ffa8e8450eae6d497eeb30dfeb880a60f9e5	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436972637569744372616674206170702729	2023-09-29 03:29:47.696+00	2023-09-29 03:29:47.696+00
35	61fa2e9b4ba0ea304163f8fc84fbe6a5f6fd9cc85c3ac76524ed40f61ce0f62e	\\x7b226e616d65223a224279746542656174222c226465736372697074696f6e223a2255736520427974654265617420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2242797465426c617a65222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d30362d31395431373a31333a34362e3434385a222c22757064617465645f6174223a22323032332d30362d31395431373a31333a34362e3434385a227d	2023-06-19 17:13:46.448+00	2023-06-19 17:13:46.448+00
36	311fe9d1fa6e3b32dcbb1c00bf06cebd2c34e9a448dc1d0170f427ec7d9f14ba	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204279746542656174206170702729	2023-06-19 17:13:46.448+00	2023-06-19 17:13:46.448+00
37	3062c3944beb106bd36d8a5cafa587437f5b71bee3ae6d243bc94656c93e1677	\\x7b226e616d65223a224e616e6f4e65787573222c226465736372697074696f6e223a22557365204e616e6f4e6578757320666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224c6f6769634c61627972696e7468222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d31302d32315431363a32363a33332e3933365a222c22757064617465645f6174223a22323032332d30352d31385431363a32363a33332e3933365a227d	2024-10-21 16:26:33.936+00	2023-05-18 16:26:33.936+00
38	db0635cc4c7bc58a20f8112a63b3e0e4f8ade8c29b33a320a90e11a725240ed4	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204e616e6f4e65787573206170702729	2024-10-21 16:26:33.936+00	2023-05-18 16:26:33.936+00
39	9ffcab2222e8e4a3cfca098a72160259fde76718fa154c9986f8621f051689e8	\\x7b226e616d65223a22426974426f78222c226465736372697074696f6e223a2255736520426974426f7820666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224e616e6f4e696e6a61222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224164756c74222c22637265617465645f6174223a22323032342d31302d31305431383a31333a30362e3833365a222c22757064617465645f6174223a22323032322d30342d31365431383a31333a30362e3833365a227d	2024-10-10 18:13:06.836+00	2022-04-16 18:13:06.836+00
40	0be82bd8ab1b6926799dbb3ffbaa889c01f12c8be5e5cc06ec53b453399f4f6f	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520426974426f78206170702729	2024-10-10 18:13:06.836+00	2022-04-16 18:13:06.836+00
41	6dc277a961260ccfe58d797da99ee9bce3063ec48a19ccd101c3afe80996926a	\\x7b226e616d65223a22436972637569744368616f73222c226465736372697074696f6e223a2255736520436972637569744368616f7320666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22436972637569744368616d70222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224861726477617265222c22637265617465645f6174223a22323032342d30382d31365430333a30373a35372e3735365a222c22757064617465645f6174223a22323032342d30382d31365430333a30373a35372e3735365a227d	2024-08-16 03:07:57.756+00	2024-08-16 03:07:57.756+00
43	0ffa6ab90673477becb1ba6ce41e32c60e91d52e5adc2e47df8d89c685521522	\\x7b226e616d65223a22436f646543726166746572222c226465736372697074696f6e223a2255736520436f64654372616674657220666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22436f64654361707461696e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032342d31312d31325431383a35313a30392e3934345a222c22757064617465645f6174223a22323032342d30382d31385431383a35313a30392e3934345a227d	2024-11-12 18:51:09.944+00	2024-08-18 18:51:09.944+00
44	3d1851a1085a775b2fac2ec8bf7d438c52c28afd1d7ede65b7156eb9097d26bb	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f646543726166746572206170702729	2024-11-12 18:51:09.944+00	2024-08-18 18:51:09.944+00
45	1cdecf846dc91ba93606b438f3e44d17d2e3c88483a893774ff040d24a37d5f2	\\x7b226e616d65223a22506978656c50696f6e656572222c226465736372697074696f6e223a224d616b6520736f6d65206d616769632068617070656e207769746820506978656c50696f6e6565722e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224469676974616c447265616d6572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253414f222c22637265617465645f6174223a22323032342d31312d30375430313a30393a33312e3636365a222c22757064617465645f6174223a22323032342d30342d32375430313a30393a33312e3636365a227d	2024-11-07 01:09:31.666+00	2024-04-27 01:09:31.666+00
46	8788d5a25c4df605562437cd2f4a345b5c9f5ef0624fc9dfc5f74f96d9a01565	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520506978656c50696f6e656572206170702729	2024-11-07 01:09:31.666+00	2024-04-27 01:09:31.666+00
47	4a7069707c46debeaa59d9a7fc87961af41027b334678fc5efef09f3db39d089	\\x7b226e616d65223a224c6f6769634c6162222c226465736372697074696f6e223a22557365204c6f6769634c616220666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22506978656c50696c6f74222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d31302d32325430393a34333a33302e3532385a222c22757064617465645f6174223a22323032332d31312d31395430393a34333a33302e3532385a227d	2024-10-22 09:43:30.528+00	2023-11-19 09:43:30.528+00
48	aa89bad5fd2e9a5a426f2f219e254b29f2f88373be02f46ca35036699300fb16	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204c6f6769634c6162206170702729	2024-10-22 09:43:30.528+00	2023-11-19 09:43:30.528+00
49	0de3957fe34179f45dbede36d041758d89be2ac3e79cf969c13418a0dab8f62a	\\x7b226e616d65223a2242797465426c69747a222c226465736372697074696f6e223a225573652042797465426c69747a20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2247616d6547697a6d6f222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30352d30375430363a31393a31372e3731325a222c22757064617465645f6174223a22323032332d30342d31395430363a31393a31372e3731325a227d	2024-05-07 06:19:17.712+00	2023-04-19 06:19:17.712+00
50	80adf6f9ad455acb1259c72fbc7732d11b8a303bf32a47baebad59a9862c8c5a	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652042797465426c69747a206170702729	2024-05-07 06:19:17.712+00	2023-04-19 06:19:17.712+00
51	94a9a2693feca91fb1b104f7162bc6774cc2cd3cdd6e8e4dd2dd9058a96152d1	\\x7b226e616d65223a22436f646557617665222c226465736372697074696f6e223a2255736520436f64655761766520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224279746542616e646974222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032332d31322d32315431373a34323a31312e3634305a222c22757064617465645f6174223a22323032322d30392d32315431373a34323a31312e3634305a227d	2023-12-21 17:42:11.64+00	2022-09-21 17:42:11.64+00
52	5d7aae0024b1997bb653822f25e8972ca2cde4a98621feaf5fcfac591c20dde9	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f646557617665206170702729	2023-12-21 17:42:11.64+00	2022-09-21 17:42:11.64+00
53	f34cdee96c2e8ded06cf6bf0ca49dd2601aae7cbf6e68c78a2c3caa997879123	\\x7b226e616d65223a224e616e6f4e6574222c226465736372697074696f6e223a22557365204e616e6f4e657420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22506978656c50726f222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224164756c74222c22637265617465645f6174223a22323032332d31322d30315431393a30363a32342e3430345a222c22757064617465645f6174223a22323032312d31312d31395431393a30363a32342e3430345a227d	2023-12-01 19:06:24.404+00	2021-11-19 19:06:24.404+00
54	3071bf13cbdf540815345b2a9ef3d59d4439b0bb0456729b3df8af45c2c3802c	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204e616e6f4e6574206170702729	2023-12-01 19:06:24.404+00	2021-11-19 19:06:24.404+00
55	e8724bc2bd817154f3fd8a5908c651cf9d48599c6c0c8f319e36d8238ac13ee4	\\x7b226e616d65223a22456c6563747261466f726765222c226465736372697074696f6e223a2255736520456c6563747261466f72676520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22456c656374726f6e456d7065726f72222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30392d31375430353a32323a33362e3335325a222c22757064617465645f6174223a22323032332d30352d31385430353a32323a33362e3335325a227d	2024-09-17 05:22:36.352+00	2023-05-18 05:22:36.352+00
56	398b24b1f29327b0ec9dbf63c5d2673a02cc06dd741a3571d1ea72e43b6e3db8	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520456c6563747261466f726765206170702729	2024-09-17 05:22:36.352+00	2023-05-18 05:22:36.352+00
57	70594d4ea26eb4b286c34c56d44f9874f025a32916478fd11e5708d110f0d013	\\x7b226e616d65223a2247616d6547726964222c226465736372697074696f6e223a225573652047616d654772696420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2247616d65476c69646572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d30362d31345431343a33373a32362e3039365a222c22757064617465645f6174223a22323032322d30382d31345431343a33373a32362e3039365a227d	2023-06-14 14:37:26.096+00	2022-08-14 14:37:26.096+00
58	918aae5ccf3988bcff6383167b4977c3038cea3a60da35c663c7f97333d53aaa	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652047616d6547726964206170702729	2023-06-14 14:37:26.096+00	2022-08-14 14:37:26.096+00
59	712c3725923a54ccf312a9ed4b8d3195a3d066c2d4a8c97969a090a4ff6e4634	\\x7b226e616d65223a224c6f6769634c6f6f6d222c226465736372697074696f6e223a22557365204c6f6769634c6f6f6d20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224e616e6f4e6f6d6164222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224164756c74222c22637265617465645f6174223a22323032342d30382d32325431343a31333a30342e3730385a222c22757064617465645f6174223a22323032332d31302d31355431343a31333a30342e3730385a227d	2024-08-22 14:13:04.708+00	2023-10-15 14:13:04.708+00
60	7df619c50ac341c729bb865c642c15940de0ad496122d14f1051caefee8c4233	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204c6f6769634c6f6f6d206170702729	2024-08-22 14:13:04.708+00	2023-10-15 14:13:04.708+00
61	243a4a3e4adbcec8303d5b6b3b3425bc25979906696b7a05dead5d3b65366cd2	\\x7b226e616d65223a22506978656c506c617a61222c226465736372697074696f6e223a2255736520506978656c506c617a6120666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22456c656374726f6e45787065646974696f6e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224861726477617265222c22637265617465645f6174223a22323032342d31312d30335432303a30333a31362e3036305a222c22757064617465645f6174223a22323032332d30312d33315432303a30333a31362e3036305a227d	2024-11-03 20:03:16.06+00	2023-01-31 20:03:16.06+00
62	b537c8a50136df4284723697305ba0f00e52f2541a9c8690abaaa0db98001d18	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520506978656c506c617a61206170702729	2024-11-03 20:03:16.06+00	2023-01-31 20:03:16.06+00
63	ea43508b9af13edff59cebb86f0faf1837c742ad0307387e782f521dfa71dd95	\\x7b226e616d65223a22436f646543697479222c226465736372697074696f6e223a2255736520436f64654369747920666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22506978656c50756c7365222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032342d30312d32355431313a30323a30352e3234305a222c22757064617465645f6174223a22323032312d30392d31315431313a30323a30352e3234305a227d	2024-01-25 11:02:05.24+00	2021-09-11 11:02:05.24+00
64	760ea0d98cd8e3757c11d4ac73462be5064f4485119e916e4fbc005aa9326dad	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f646543697479206170702729	2024-01-25 11:02:05.24+00	2021-09-11 11:02:05.24+00
65	1c335ebcb09d8c75665b2a39b57c477e25689e3c8aeef49b5e0afa14bfe50376	\\x7b226e616d65223a224e616e6f417263616465222c226465736372697074696f6e223a22557365204e616e6f41726361646520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2254656368546f726e61646f222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30332d30335430333a31373a32332e3638305a222c22757064617465645f6174223a22323032342d30332d30335430333a31373a32332e3638305a227d	2024-03-03 03:17:23.68+00	2024-03-03 03:17:23.68+00
66	f7bc3ef2e7f414f4f17b2cf67bd2610ea80ba047789243547e4e051cadac5b6a	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204e616e6f417263616465206170702729	2024-03-03 03:17:23.68+00	2024-03-03 03:17:23.68+00
67	b4f95d665780c254dab0be9185bb31ad5d6f47ed65172b97f2421713ba3973da	\\x7b226e616d65223a22456c656374726f6e457261222c226465736372697074696f6e223a2255736520456c656374726f6e45726120666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2247616d65476c6f626574726f74746572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032342d31302d31345431303a30393a31372e3830305a222c22757064617465645f6174223a22323032342d31302d31345431303a30393a31372e3830305a227d	2024-10-14 10:09:17.8+00	2024-10-14 10:09:17.8+00
68	cb39a9e8828263ae885799354626520f13834032bc558ef163c91952192b3b3c	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520456c656374726f6e457261206170702729	2024-10-14 10:09:17.8+00	2024-10-14 10:09:17.8+00
69	ba7573140c57c73af42ba828742f8f8837b3438635f80d812504ba2d7335bcbe	\\x7b226e616d65223a2242697442617a616172222c226465736372697074696f6e223a225573652042697442617a61617220666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224c6f6769634c6f7265222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d31312d30335430353a30353a34372e3530345a222c22757064617465645f6174223a22323032332d30392d32325430353a30353a34372e3530345a227d	2023-11-03 05:05:47.504+00	2023-09-22 05:05:47.504+00
70	ce63d83ead08212fd0cf698658dab22240a40bcbca0518cf7fd84375771ba978	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652042697442617a616172206170702729	2023-11-03 05:05:47.504+00	2023-09-22 05:05:47.504+00
71	a0a564793f4f6748a8e5f8a0ffbff9e677f8db8cd537919b33f11557789d15a0	\\x7b226e616d65223a224c6f6769634c6567656e6473222c226465736372697074696f6e223a22557365204c6f6769634c6567656e647320666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2243697263756974436f6d6d616e646572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224164756c74222c22637265617465645f6174223a22323032332d31302d31395432303a31393a32302e3636305a222c22757064617465645f6174223a22323032322d31312d31395432303a31393a32302e3636305a227d	2023-10-19 20:19:20.66+00	2022-11-19 20:19:20.66+00
72	ff81bb8a38d778b22ac126fb629a90090e89680f341d3ed2627ccbf18f2d1ac1	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204c6f6769634c6567656e6473206170702729	2023-10-19 20:19:20.66+00	2022-11-19 20:19:20.66+00
73	dc98a37ab06b38e985e9c6911e028bd47b39dead4335cc46ca7a8f691a12ce68	\\x7b226e616d65223a22436f6465436c616e222c226465736372697074696f6e223a2255736520436f6465436c616e20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22506978656c50616c6164696e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032342d30392d32315430343a30333a31312e3034385a222c22757064617465645f6174223a22323032332d31322d32385430343a30333a31312e3034385a227d	2024-09-21 04:03:11.048+00	2023-12-28 04:03:11.048+00
74	d02191d847a994ea25b7bd986b75ba4f03410a13fe5d4acddb69348551f96489	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f6465436c616e206170702729	2024-09-21 04:03:11.048+00	2023-12-28 04:03:11.048+00
75	afb7da0abc4d57c6d4b3b91aeb84b362c4d01fe5449403a5160d216696af9eba	\\x7b226e616d65223a22506978656c506f7274616c222c226465736372697074696f6e223a2255736520506978656c506f7274616c20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2243796265724372616674222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224861726477617265222c22637265617465645f6174223a22323032342d30352d32335431373a32363a30342e3636385a222c22757064617465645f6174223a22323032342d30322d31335431373a32363a30342e3636385a227d	2024-05-23 17:26:04.668+00	2024-02-13 17:26:04.668+00
76	11eceeb4781496e9741c97e6745a7c4eee1ff0135588902cbf3ecb1cf50385ef	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520506978656c506f7274616c206170702729	2024-05-23 17:26:04.668+00	2024-02-13 17:26:04.668+00
77	6e93ba3f5fa225b9f0d99d1451bea6d8d8f783dde4fd8c348a8f01371b095a10	\\x7b226e616d65223a22436972637569744372617a65222c226465736372697074696f6e223a2255736520436972637569744372617a6520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22506978656c50756c7365222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d30372d30345432303a33363a30322e3732305a222c22757064617465645f6174223a22323032332d30372d30345432303a33363a30322e3732305a227d	2023-07-04 20:36:02.72+00	2023-07-04 20:36:02.72+00
78	b7976ad99a92849942b8e63e5f55d6779aaa55c5e2399d9af4efd69a236c2947	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436972637569744372617a65206170702729	2023-07-04 20:36:02.72+00	2023-07-04 20:36:02.72+00
79	4efae41c8897a8f11923e8d0c7e1558ca84d1ef01e7f89e9f3887ebbb00ff886	\\x7b226e616d65223a2242797465427573746572222c226465736372697074696f6e223a22557365204279746542757374657220666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224c6f6769634c696f6e6865617274222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30382d33305430383a32363a35362e3039365a222c22757064617465645f6174223a22323032312d30392d30355430383a32363a35362e3039365a227d	2024-08-30 08:26:56.096+00	2021-09-05 08:26:56.096+00
80	6bbc5ee37b74e55bb30a8c02ece279acb2c7b1cf9411c758b5cfe3e37c5d014c	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652042797465427573746572206170702729	2024-08-30 08:26:56.096+00	2021-09-05 08:26:56.096+00
81	84e2523314728a9d1d680ebb156e56c3f092b4a93d1dad7411e7dd1f8b065e44	\\x7b226e616d65223a224e616e6f4e6f76656c222c226465736372697074696f6e223a22557365204e616e6f4e6f76656c20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22506978656c50726f64696779222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032342d30312d32355430303a35393a35312e3036345a222c22757064617465645f6174223a22323032322d30362d30345430303a35393a35312e3036345a227d	2024-01-25 00:59:51.064+00	2022-06-04 00:59:51.064+00
82	dd5b3e78ee8784eaa5cb2980b1239bc686f7d81f19f683afd4dba76b3fefcbbd	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204e616e6f4e6f76656c206170702729	2024-01-25 00:59:51.064+00	2022-06-04 00:59:51.064+00
83	6ee7fe69d30922aad1de55e931cf5f020455a23a87fffb1470cdb00b10ae4e0c	\\x7b226e616d65223a22456c65637472614564656e222c226465736372697074696f6e223a2255736520456c65637472614564656e20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2242797465426c617a65222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032342d30372d30315431303a35313a33302e3834305a222c22757064617465645f6174223a22323032322d30352d32315431303a35313a33302e3834305a227d	2024-07-01 10:51:30.84+00	2022-05-21 10:51:30.84+00
84	4ccae50446870c56e5690f1d28a84e5b7fb705ca6c60cee90e7c3b0c79adfd7b	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520456c65637472614564656e206170702729	2024-07-01 10:51:30.84+00	2022-05-21 10:51:30.84+00
85	0aac1c808a8557b3aa9962553a605026cae4f0955987f64fc8a0ba17dbac4d02	\\x7b226e616d65223a22436f6465436f6d6574222c226465736372697074696f6e223a2255736520436f6465436f6d657420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2243697263756974436f6e6e6f697373657572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d31312d32335430393a34353a35352e3037325a222c22757064617465645f6174223a22323032332d31312d32335430393a34353a35352e3037325a227d	2023-11-23 09:45:55.072+00	2023-11-23 09:45:55.072+00
86	0d79605e578a4b1047d2b25cd98f703f9f7222164b81525f4847e5e60b1b0ac0	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f6465436f6d6574206170702729	2023-11-23 09:45:55.072+00	2023-11-23 09:45:55.072+00
87	6cbc90231e32d2b876b723dce9447ac2f1c237a1217191487b986ec9e484a84a	\\x7b226e616d65223a22506978656c506c617967726f756e64222c226465736372697074696f6e223a2255736520506978656c506c617967726f756e6420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224c6f6769634c696f6e6865617274222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d31322d33315431383a32363a32342e3738345a222c22757064617465645f6174223a22323032342d30372d32345431383a32363a32342e3738345a227d	2024-12-31 18:26:24.784+00	2024-07-24 18:26:24.784+00
88	bf27c558940e1d2839f6be84c192caecc16431e88efb1dbbc234e4755e99e687	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520506978656c506c617967726f756e64206170702729	2024-12-31 18:26:24.784+00	2024-07-24 18:26:24.784+00
89	d890bb21eb6ccb1b93d0e158d5b4c67e596b4fb9b876591d8d3fd382ef4ee26f	\\x7b226e616d65223a224c6f6769634c616e646961222c226465736372697074696f6e223a22557365204c6f6769634c616e64696120666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2247616d65476c6f626574726f74746572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30342d31345430383a31373a30322e3234305a222c22757064617465645f6174223a22323032322d31302d31305430383a31373a30322e3234305a227d	2024-04-14 08:17:02.24+00	2022-10-10 08:17:02.24+00
90	0d13a0db9e75bd50aea04f83309d015f66a652977dd6d6875ca03f7a498993e3	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204c6f6769634c616e646961206170702729	2024-04-14 08:17:02.24+00	2022-10-10 08:17:02.24+00
91	91256a2ff937d2f97c9f9576d33437c6097af65705eb68710603d7e6fd549fe0	\\x7b226e616d65223a2242797465426f756e6365222c226465736372697074696f6e223a225573652042797465426f756e636520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2243697263756974436f6e6e6f697373657572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032342d30352d32315430373a35323a31322e3739325a222c22757064617465645f6174223a22323032332d30352d31395430373a35323a31322e3739325a227d	2024-05-21 07:52:12.792+00	2023-05-19 07:52:12.792+00
92	f9eb1b945f387e09e98869ec7d2de4c19d72b66e5085796c64e0ce1bea83488b	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652042797465426f756e6365206170702729	2024-05-21 07:52:12.792+00	2023-05-19 07:52:12.792+00
93	97b42f86f44b6537da276d1f48f3487915352ad36fe638ad77233a22735fe200	\\x7b226e616d65223a22436972637569744361726e6976616c222c226465736372697074696f6e223a2255736520436972637569744361726e6976616c20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22436972637569744372617a65222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032342d30322d30355430373a34353a33382e3832345a222c22757064617465645f6174223a22323032342d30322d30355430373a34353a33382e3832345a227d	2024-02-05 07:45:38.824+00	2024-02-05 07:45:38.824+00
94	09ff5b49da0828569ea5c49e18d163c2186763502bd4f7e440107cd46b55a915	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436972637569744361726e6976616c206170702729	2024-02-05 07:45:38.824+00	2024-02-05 07:45:38.824+00
95	25a58de7b963488dbaaa21b7f5cbee5b8d43a4004a6f156a28d2971ca38bc97a	\\x7b226e616d65223a22436f6465436f7665222c226465736372697074696f6e223a2255736520436f6465436f766520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22456c656374726f6e4561676572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30332d31325430393a30353a30382e3937365a222c22757064617465645f6174223a22323032342d30332d31325430393a30353a30382e3937365a227d	2024-03-12 09:05:08.976+00	2024-03-12 09:05:08.976+00
96	df429492023867526959b63fe50a18b8e6361a8a270bc31f472934192ecbd102	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f6465436f7665206170702729	2024-03-12 09:05:08.976+00	2024-03-12 09:05:08.976+00
97	31e800b96b92e3472059a8455711e1c7196378732359daf9c18ef47aa54932de	\\x7b226e616d65223a224e616e6f4e657374222c226465736372697074696f6e223a22557365204e616e6f4e65737420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22436f64654368616d70696f6e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d31312d31335430383a32343a31352e3037325a222c22757064617465645f6174223a22323032332d31302d32305430383a32343a31352e3037325a227d	2023-11-13 08:24:15.072+00	2023-10-20 08:24:15.072+00
98	eef072abc987a307e85cc0731e60917a6bf99c8e9f8541766cca3d6ef9088411	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204e616e6f4e657374206170702729	2023-11-13 08:24:15.072+00	2023-10-20 08:24:15.072+00
99	140ad61be45d50c3c213880ef6bd7d776e7663011dc5fe44afb2dd77c31795a8	\\x7b226e616d65223a22456c6563747261456e7465727461696e222c226465736372697074696f6e223a2255736520456c6563747261456e7465727461696e20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224469676974616c44796e616d6f222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d31322d32325430353a33373a31352e3530345a222c22757064617465645f6174223a22323032322d30312d32395430353a33373a31352e3530345a227d	2023-12-22 05:37:15.504+00	2022-01-29 05:37:15.504+00
100	c65110ef76cfbffc2bc3fe1e2251a337efc50b8f64be2b1e0a5cdffc0de63a5c	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520456c6563747261456e7465727461696e206170702729	2023-12-22 05:37:15.504+00	2022-01-29 05:37:15.504+00
101	2907044868a7ebcad94f8d02bbdf95b3da44222f2adb10ec538023f4ab69ea95	\\x7b226e616d65223a2247616d6547616c617879222c226465736372697074696f6e223a225573652047616d6547616c61787920666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224469676974616c44796e616d6f222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d31302d32385431393a34363a32332e3930345a222c22757064617465645f6174223a22323032322d31302d31375431393a34363a32332e3930345a227d	2024-10-28 19:46:23.904+00	2022-10-17 19:46:23.904+00
102	b6194d9e4ba967dc71de7acf058b181ed085eb9cdb4e35f3a00f5d8302c81fb7	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652047616d6547616c617879206170702729	2024-10-28 19:46:23.904+00	2022-10-17 19:46:23.904+00
103	508cfd732e3100ec14d893428144149aae26483dd1618048ecb671ffd86b36f2	\\x7b226e616d65223a224c6f6769634c61627972696e7468222c226465736372697074696f6e223a22557365204c6f6769634c61627972696e746820666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22436f64654368616d70696f6e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032342d31302d32355431373a33333a34312e3638385a222c22757064617465645f6174223a22323032312d31322d31345431373a33333a34312e3638385a227d	2024-10-25 17:33:41.688+00	2021-12-14 17:33:41.688+00
104	a3778a531b89ef556b00953336c8085cca9aaa0e4e49eaeb0e98240bedc6860d	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204c6f6769634c61627972696e7468206170702729	2024-10-25 17:33:41.688+00	2021-12-14 17:33:41.688+00
105	f9f2930cf1e6912bd708d2db43d99b6758d479801b4dc71940476ba0cf0c21f3	\\x7b226e616d65223a2242797465426c6173746572222c226465736372697074696f6e223a225573652042797465426c617374657220666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2243796265724372616674736d616e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032342d30352d33305431313a32383a35382e3638305a222c22757064617465645f6174223a22323032322d30352d30315431313a32383a35382e3638305a227d	2024-05-30 11:28:58.68+00	2022-05-01 11:28:58.68+00
106	bb489356808ea265850c04aa391a0736c784392cc4c9d4899b98391badada12e	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652042797465426c6173746572206170702729	2024-05-30 11:28:58.68+00	2022-05-01 11:28:58.68+00
107	93665eabe60a0a9302154e99d769ca1a5081c5b273009cf9636b34282084f060	\\x7b226e616d65223a22436f6465436f6d70617373222c226465736372697074696f6e223a2255736520436f6465436f6d7061737320666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22456c656374726f6e4578706c6f726572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032342d30382d30345431353a32323a35382e3731325a222c22757064617465645f6174223a22323032332d30312d32365431353a32323a35382e3731325a227d	2024-08-04 15:22:58.712+00	2023-01-26 15:22:58.712+00
108	ff8b16479077c522308c3b2e96d40396c064a7da291d6ec3f691278183d650f6	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f6465436f6d70617373206170702729	2024-08-04 15:22:58.712+00	2023-01-26 15:22:58.712+00
109	8842d3e8e8c4ea639853d8347abf214b26a5fa919785d8193df6268f9f659f7f	\\x7b226e616d65223a224e616e6f4e6174696f6e222c226465736372697074696f6e223a22557365204e616e6f4e6174696f6e20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22456c656374726f6e456d7065726f72222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30352d32305432323a30393a31392e3636345a222c22757064617465645f6174223a22323032322d30322d32325432323a30393a31392e3636345a227d	2024-05-20 22:09:19.664+00	2022-02-22 22:09:19.664+00
110	367c213d7ce87ad07d70c732baf2477636f8710a7580ee6edfc22780e82b805b	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204e616e6f4e6174696f6e206170702729	2024-05-20 22:09:19.664+00	2022-02-22 22:09:19.664+00
111	8bbba5c7843f1391cd21bf62fd1394095f3e5630bd0894b69ea86f5068dd3950	\\x7b226e616d65223a22456c6563747261456d70697265222c226465736372697074696f6e223a2255736520456c6563747261456d7069726520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224c6f6769634c696f6e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032332d30372d30395432313a34363a30342e3936385a222c22757064617465645f6174223a22323032332d30372d30395432313a34363a30342e3936385a227d	2023-07-09 21:46:04.968+00	2023-07-09 21:46:04.968+00
112	889360c69a1ab25536eb69b2bada125e0e21abe0138faaaca732b39666ce1c93	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520456c6563747261456d70697265206170702729	2023-07-09 21:46:04.968+00	2023-07-09 21:46:04.968+00
113	d2a0af2cc0e2aba4358eee161bc2c9c968033bbcbb72843dbe24c70a939bd42f	\\x7b226e616d65223a2247616d6547617264656e222c226465736372697074696f6e223a225573652047616d6547617264656e20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22506978656c5061746866696e646572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d31312d30355430393a30323a32382e3738345a222c22757064617465645f6174223a22323032342d30372d30345430393a30323a32382e3738345a227d	2024-11-05 09:02:28.784+00	2024-07-04 09:02:28.784+00
114	d49bd8e9c65cb1e2d0e87e437a167472ffe8fa5d706b6541d4656dffebe61fea	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652047616d6547617264656e206170702729	2024-11-05 09:02:28.784+00	2024-07-04 09:02:28.784+00
115	4c4d5eba6c3f1556d89ad870305cb8e11fd6632f56b4222cc5a83d1802af426f	\\x7b226e616d65223a22506978656c5065616b222c226465736372697074696f6e223a2255736520506978656c5065616b20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22436972637569744368616d70696f6e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224861726477617265222c22637265617465645f6174223a22323032342d30322d30395431363a31333a34342e3837365a222c22757064617465645f6174223a22323032322d30352d31345431363a31333a34342e3837365a227d	2024-02-09 16:13:44.876+00	2022-05-14 16:13:44.876+00
116	e2a3dfea029502ade1cb5a130057fa4e3fc274553b40d6f5f341200423d81b4b	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520506978656c5065616b206170702729	2024-02-09 16:13:44.876+00	2022-05-14 16:13:44.876+00
117	f3e9a5ea5ffd9de172c282c77a562fefe55f277611dfb7b81f76d6dde28aa964	\\x7b226e616d65223a224369726375697443656c65737469616c222c226465736372697074696f6e223a22557365204369726375697443656c65737469616c20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22436f64654361707461696e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032332d30392d30325432323a31383a30382e3434305a222c22757064617465645f6174223a22323032332d30392d30325432323a31383a30382e3434305a227d	2023-09-02 22:18:08.44+00	2023-09-02 22:18:08.44+00
118	c8dbc7924e72eb2a83aa055ea974b17aa87118e3daf111a3f55ce66641304126	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204369726375697443656c65737469616c206170702729	2023-09-02 22:18:08.44+00	2023-09-02 22:18:08.44+00
119	392b730600f3c34f5b8006bb4fcb9e476284dd86fac47ee19217de6eeed22b6c	\\x7b226e616d65223a22436f646543727573616465222c226465736372697074696f6e223a2255736520436f64654372757361646520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224c6f6769634c696f6e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d31322d30355430333a34313a35362e3139325a222c22757064617465645f6174223a22323032322d30342d32385430333a34313a35362e3139325a227d	2023-12-05 03:41:56.192+00	2022-04-28 03:41:56.192+00
120	b45bd0c4dff69bde68bc493e39c737e4156ba179179662fb959f4e558366f1a1	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f646543727573616465206170702729	2023-12-05 03:41:56.192+00	2022-04-28 03:41:56.192+00
121	9da105ff3401a9c20698d32bf0ee79ff81b03ed1169421a9599d6ab05ab721f3	\\x7b226e616d65223a224e616e6f4e6562756c61222c226465736372697074696f6e223a224d616b6520736f6d65206d616769632068617070656e2077697468204e616e6f4e6562756c612e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22456c656374726f6e456e69676d61222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253414f222c22637265617465645f6174223a22323032342d30352d32315430393a31363a35312e3535345a222c22757064617465645f6174223a22323032322d31302d30375430393a31363a35312e3535345a227d	2024-05-21 09:16:51.554+00	2022-10-07 09:16:51.554+00
122	00428777642cb39830c51b7f26a943ff364fe97fc0c89660d263f1d1ff789d95	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204e616e6f4e6562756c61206170702729	2024-05-21 09:16:51.554+00	2022-10-07 09:16:51.554+00
123	7d50e7f55e8f6bae1508493325f7f6ec1d0d5a8972b35a11d6e338a512a1f564	\\x7b226e616d65223a22456c6563747261456e636c617665222c226465736372697074696f6e223a2255736520456c6563747261456e636c61766520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2254656368546f726e61646f222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032332d30372d32315430323a33313a34382e3138345a222c22757064617465645f6174223a22323032332d30372d32315430323a33313a34382e3138345a227d	2023-07-21 02:31:48.184+00	2023-07-21 02:31:48.184+00
124	0f6aa20a34aae328af3ddd39d34fb3a153a992dff42a97f1005e57f2e36916b6	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520456c6563747261456e636c617665206170702729	2023-07-21 02:31:48.184+00	2023-07-21 02:31:48.184+00
125	40a4961d04c8844e8ef0dcfaf6bb3302fb5dfcef417d9e7ccd42a160278b5c96	\\x7b226e616d65223a2247616d6547697a6d6f222c226465736372697074696f6e223a225573652047616d6547697a6d6f20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22436f64654372616674736d616e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30332d31395430323a31383a33382e3039365a222c22757064617465645f6174223a22323032312d30382d31385430323a31383a33382e3039365a227d	2024-03-19 02:18:38.096+00	2021-08-18 02:18:38.096+00
126	f9f014ed3f4ea7605ef1b1d6d0ef07dea9a58e881ec0f52b159289415f7b08ce	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652047616d6547697a6d6f206170702729	2024-03-19 02:18:38.096+00	2021-08-18 02:18:38.096+00
127	0bfcfc15c8bd90c3592f7577e70cb3ac6d9062a5d95a7b81939466e2860f3f38	\\x7b226e616d65223a22506978656c506c616e6574222c226465736372697074696f6e223a224d616b6520736f6d65206d616769632068617070656e207769746820506978656c506c616e65742e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22436f6465436f6e717565726f72222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2247616d6573222c22637265617465645f6174223a22323032342d30362d32345432313a35373a33362e3439345a222c22757064617465645f6174223a22323032322d30352d31345432313a35373a33362e3439345a227d	2024-06-24 21:57:36.494+00	2022-05-14 21:57:36.494+00
128	9a963bf1d01609f2028433a80a4c1eefb3459672f10cfc58b519ea984ac010b6	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520506978656c506c616e6574206170702729	2024-06-24 21:57:36.494+00	2022-05-14 21:57:36.494+00
129	e512795311be3706e9dfe52c3abb9e8e20ea20771d0038510fe2e45beace3537	\\x7b226e616d65223a224c6f6769634c6f756e6765222c226465736372697074696f6e223a22557365204c6f6769634c6f756e676520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22436f64654361707461696e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032342d30382d30395431343a32333a32352e3735325a222c22757064617465645f6174223a22323032312d31322d30335431343a32333a32352e3735325a227d	2024-08-09 14:23:25.752+00	2021-12-03 14:23:25.752+00
130	6bb37c106cc14e53fb51ed81f698f45239c8f3b1c7acc245ada72dc18e0f011d	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204c6f6769634c6f756e6765206170702729	2024-08-09 14:23:25.752+00	2021-12-03 14:23:25.752+00
131	50e6e72c7c26fd453b5d77019784ba0c3328c18ee2654ea0e50b9d25b6ec1d25	\\x7b226e616d65223a2242797465426561636f6e222c226465736372697074696f6e223a225573652042797465426561636f6e20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22506978656c5061746866696e646572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d31322d31395432303a31393a31302e3839365a222c22757064617465645f6174223a22323032332d30312d30315432303a31393a31302e3839365a227d	2024-12-19 20:19:10.896+00	2023-01-01 20:19:10.896+00
132	18af3a74174426196a58c0222acf937ac7d30d2fdae4ac597ceeba38f989b5a5	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652042797465426561636f6e206170702729	2024-12-19 20:19:10.896+00	2023-01-01 20:19:10.896+00
133	c267c974784e7ecff27d3255c7f24b7c6cfacf28203ed819bdff62cb72046c57	\\x7b226e616d65223a22436f6465436972637573222c226465736372697074696f6e223a2255736520436f646543697263757320666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224469676974616c447265616d6572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224164756c74222c22637265617465645f6174223a22323032342d30392d31315431393a34393a32382e3332345a222c22757064617465645f6174223a22323032332d30372d32375431393a34393a32382e3332345a227d	2024-09-11 19:49:28.324+00	2023-07-27 19:49:28.324+00
134	4181a072cf3ac464f32d6155bce4ab9672ff4c24a939d3af9c0dbf815d6885ce	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f6465436972637573206170702729	2024-09-11 19:49:28.324+00	2023-07-27 19:49:28.324+00
135	bef48c39781e98db0492f2cd0993d3042ff5c76f7cb094ad3cee4a55146c79d2	\\x7b226e616d65223a224e616e6f4e6f6f6b222c226465736372697074696f6e223a22557365204e616e6f4e6f6f6b20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224e616e6f4e696e6a61222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30322d31325432303a34363a32382e3131325a222c22757064617465645f6174223a22323032332d31312d31345432303a34363a32382e3131325a227d	2024-02-12 20:46:28.112+00	2023-11-14 20:46:28.112+00
136	595601465bd3833f10707800b5fc56925d2dbc0d71f9455c38384c7b16a650f4	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204e616e6f4e6f6f6b206170702729	2024-02-12 20:46:28.112+00	2023-11-14 20:46:28.112+00
137	24bea9765cb1f5285b52abb325af8e791beba962ae596871c766fa2ed2be0585	\\x7b226e616d65223a22456c6563747261456c797369756d222c226465736372697074696f6e223a2255736520456c6563747261456c797369756d20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224c6f6769634c6f7265222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032332d31322d30335430373a33303a33332e3230385a222c22757064617465645f6174223a22323032332d30382d31375430373a33303a33332e3230385a227d	2023-12-03 07:30:33.208+00	2023-08-17 07:30:33.208+00
138	81072032b736af0ab4262580b7f01f77bdd3d78ac31a38dc223cff8bd4605e23	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520456c6563747261456c797369756d206170702729	2023-12-03 07:30:33.208+00	2023-08-17 07:30:33.208+00
139	54fa606b0116ba89f88bfb563627f0b2eeca61a5fb3f0dfd09a046128fac57c8	\\x7b226e616d65223a2247616d65476c696d707365222c226465736372697074696f6e223a225573652047616d65476c696d70736520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22506978656c50696c6f74222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032342d31322d31305430333a34373a33302e3530345a222c22757064617465645f6174223a22323032322d31302d30325430333a34373a33302e3530345a227d	2024-12-10 03:47:30.504+00	2022-10-02 03:47:30.504+00
140	8696676a5eb919fe6a9b64614214886dc4352ff0d62975ee78ea821ba41d2d7f	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652047616d65476c696d707365206170702729	2024-12-10 03:47:30.504+00	2022-10-02 03:47:30.504+00
141	1162ad57f708ed97e44c27d8aaff01a39c9f21ba6bb489e38cb6ff9515fbf268	\\x7b226e616d65223a22506978656c5061726164697365222c226465736372697074696f6e223a2255736520506978656c506172616469736520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22436972637569744361707461696e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032332d31302d33305430303a30393a34302e3337365a222c22757064617465645f6174223a22323032322d30312d30365430303a30393a34302e3337365a227d	2023-10-30 00:09:40.376+00	2022-01-06 00:09:40.376+00
142	7938a97199eee293bf5cac71e31dcdbdc7e321d98059351225d260ac5fddc088	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520506978656c5061726164697365206170702729	2023-10-30 00:09:40.376+00	2022-01-06 00:09:40.376+00
143	1beb2cde9f5310d2ebeb5f4e0db9ef37b4e826bc4be9d4980bd6704b415d129b	\\x7b226e616d65223a22436f6465436f617374222c226465736372697074696f6e223a2255736520436f6465436f61737420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2243697263756974436f6d6d616e646572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032342d30332d32315431333a32343a34392e3532385a222c22757064617465645f6174223a22323032332d30352d30325431333a32343a34392e3532385a227d	2024-03-21 13:24:49.528+00	2023-05-02 13:24:49.528+00
144	28b64f0ce701ddf289d03b5a3ef0674bbd50a6e6fffc55e3c5b45f3f3715f273	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f6465436f617374206170702729	2024-03-21 13:24:49.528+00	2023-05-02 13:24:49.528+00
145	209bbc910ec3dcb0aabd4befd3a3613fbc65e7ee2eb9c0d5d319ea7cf3dcb5aa	\\x7b226e616d65223a224e616e6f4e697276616e61222c226465736372697074696f6e223a22557365204e616e6f4e697276616e6120666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22456c656374726f6e45787065646974696f6e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30392d31375431353a34343a30382e3637325a222c22757064617465645f6174223a22323032322d30392d32325431353a34343a30382e3637325a227d	2024-09-17 15:44:08.672+00	2022-09-22 15:44:08.672+00
146	f9e8c7db9f201b98aa2b79a4254c25723f9db416497e0a5b2d7a6b1ddd9df91e	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204e616e6f4e697276616e61206170702729	2024-09-17 15:44:08.672+00	2022-09-22 15:44:08.672+00
147	8cc00818e64140db9ef0dd3bc20bba7908f62f956ca933b4b20603f077e23661	\\x7b226e616d65223a22456c656374726145646966696365222c226465736372697074696f6e223a2255736520456c65637472614564696669636520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22456c656374726f6e4561676c65222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032342d30322d30365431353a30363a32372e3833325a222c22757064617465645f6174223a22323032342d30322d30365431353a30363a32372e3833325a227d	2024-02-06 15:06:27.832+00	2024-02-06 15:06:27.832+00
148	6a7087ed5f4a1b8d1a1e1fdfc9dc6aee880c437ab802dced59b2847823e7892e	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520456c656374726145646966696365206170702729	2024-02-06 15:06:27.832+00	2024-02-06 15:06:27.832+00
149	bf24270c9379705fa556cf94a89c78c436d1d80cb88c1e8d005e3e09490d5ca1	\\x7b226e616d65223a2247616d6547656e222c226465736372697074696f6e223a225573652047616d6547656e20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2247616d6547757275222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d31312d30345430393a33303a33302e3732305a222c22757064617465645f6174223a22323032312d31312d31365430393a33303a33302e3732305a227d	2024-11-04 09:30:30.72+00	2021-11-16 09:30:30.72+00
150	4dba8d670aa18bfafd092ed9bdb05b84bf2e3d7893cde361df931fc4f2d46359	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652047616d6547656e206170702729	2024-11-04 09:30:30.72+00	2021-11-16 09:30:30.72+00
151	2e8ba44c34500c7ae5c25d0cd728fa4b256a1d80fe92da614a94f282b7c70795	\\x7b226e616d65223a22506978656c50616e64656d6f6e69756d222c226465736372697074696f6e223a2255736520506978656c50616e64656d6f6e69756d20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22506978656c50696c6f74222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d31302d32365431303a31313a34382e3932385a222c22757064617465645f6174223a22323032332d30372d32325431303a31313a34382e3932385a227d	2023-10-26 10:11:48.928+00	2023-07-22 10:11:48.928+00
152	936a2c7790fbe46763b8b28c662ddb4da6a375a263dea71473a1c5501b939569	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520506978656c50616e64656d6f6e69756d206170702729	2023-10-26 10:11:48.928+00	2023-07-22 10:11:48.928+00
153	5fa165e2823a38176d730263acfb83b0d4c9c6c3e8b78fee78da95c1b3fa5dbd	\\x7b226e616d65223a224c6f6769634c61676f6f6e222c226465736372697074696f6e223a224d616b6520736f6d65206d616769632068617070656e2077697468204c6f6769634c61676f6f6e2e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2247616d6547757275222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a225765617261626c65222c22637265617465645f6174223a22323032342d30362d31335432333a33313a33302e3031305a222c22757064617465645f6174223a22323032322d30312d32335432333a33313a33302e3031305a227d	2024-06-13 23:31:30.01+00	2022-01-23 23:31:30.01+00
154	fca41a7f0aa6a83fd44c8aa67414841f5bb7f1b7b7b4b2c0c3fa92668c49dae5	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204c6f6769634c61676f6f6e206170702729	2024-06-13 23:31:30.01+00	2022-01-23 23:31:30.01+00
155	fcab64060f9c15b31f7443323c61d841adbfd5dff9e9bd1b0a44d5174f9bf7da	\\x7b226e616d65223a2242797465426c617a65222c226465736372697074696f6e223a225573652042797465426c617a6520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22436972637569744368616d70222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224861726477617265222c22637265617465645f6174223a22323032342d30382d32315430303a30343a31392e3231325a222c22757064617465645f6174223a22323032332d31312d31395430303a30343a31392e3231325a227d	2024-08-21 00:04:19.212+00	2023-11-19 00:04:19.212+00
156	1a5f59cfb4f864a6aaf638f94834ed1e33d810617fb85524fb6555d29cd1e87d	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652042797465426c617a65206170702729	2024-08-21 00:04:19.212+00	2023-11-19 00:04:19.212+00
157	ba6452719a39c861e03817263cf19aa41362ed2e13d07d4a9c43dad3461c4945	\\x7b226e616d65223a22436f6465436f727269646f72222c226465736372697074696f6e223a2255736520436f6465436f727269646f7220666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2254656368547261696c626c617a6572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d31312d30385430363a31363a30392e3332385a222c22757064617465645f6174223a22323032342d30342d33305430363a31363a30392e3332385a227d	2024-11-08 06:16:09.328+00	2024-04-30 06:16:09.328+00
158	1df62b4ba6be0d38231cfd284df235ea5b82f836e36a9aad4f1a2a2e09967c3e	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f6465436f727269646f72206170702729	2024-11-08 06:16:09.328+00	2024-04-30 06:16:09.328+00
159	6089a874b7d34ace9e310ed96b5987f2d5c70f5edc9d41feda864dc25af0c328	\\x7b226e616d65223a224861636b53696d756c61746f72222c226465736372697074696f6e223a22557365204861636b53696d756c61746f7220666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22436f64654372616674736d616e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224164756c74222c22637265617465645f6174223a22323032332d30372d32355431363a33373a30322e3930305a222c22757064617465645f6174223a22323032322d31322d30395431363a33373a30322e3930305a227d	2023-07-25 16:37:02.9+00	2022-12-09 16:37:02.9+00
160	4348b45e8dda4ab0f6195f1840e2765771fa2d6b51f0355b93f432d4df118fa3	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204861636b53696d756c61746f72206170702729	2023-07-25 16:37:02.9+00	2022-12-09 16:37:02.9+00
161	a7bbd9ff8c7bfb4841892bac567418ebd6de8dac220cab594be9cbd3b542a21d	\\x7b226e616d65223a22436f64654372756e6368222c226465736372697074696f6e223a2255736520436f64654372756e636820666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2243796265725361767679222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30322d30385432313a32303a33392e3339325a222c22757064617465645f6174223a22323032312d31322d33305432313a32303a33392e3339325a227d	2024-02-08 21:20:39.392+00	2021-12-30 21:20:39.392+00
162	f208c9f2d6dcc003fb3a896c8e66377e92ca86ea6fd8e9bac021989f615888e5	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f64654372756e6368206170702729	2024-02-08 21:20:39.392+00	2021-12-30 21:20:39.392+00
163	70986c09bbe77b58b78df1c91b11ef98974a44d78b8fab1a52e5dff5224728b2	\\x7b226e616d65223a225365637572654372616674222c226465736372697074696f6e223a2255736520536563757265437261667420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22456c656374726f6e4563686f222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30372d30335430303a33303a34312e3736305a222c22757064617465645f6174223a22323032322d31312d31375430303a33303a34312e3736305a227d	2024-07-03 00:30:41.76+00	2022-11-17 00:30:41.76+00
164	fae3aefade81eb10b9ea0374dc66853a5005aadb179139934f9e5294c4d91aab	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865205365637572654372616674206170702729	2024-07-03 00:30:41.76+00	2022-11-17 00:30:41.76+00
165	5c35248dc48491e17dc138238435456254b281793fcf34dee5308a64ef2e1612	\\x7b226e616d65223a2243727970746f50756c7365222c226465736372697074696f6e223a225573652043727970746f50756c736520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22427974654275646479222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30382d32385431333a32383a31302e3635365a222c22757064617465645f6174223a22323032342d30382d30325431333a32383a31302e3635365a227d	2024-08-28 13:28:10.656+00	2024-08-02 13:28:10.656+00
166	2ee69c2783edeaa28e5f02d6869c5dca87858160de785647a370b97cffe1defc	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652043727970746f50756c7365206170702729	2024-08-28 13:28:10.656+00	2024-08-02 13:28:10.656+00
167	55ff02068bb494ed1910cee8899844d91846117e5aced13c7cf2c7d07f26fa08	\\x7b226e616d65223a2244617461466f726765222c226465736372697074696f6e223a225573652044617461466f72676520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22427974654275646479222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032332d30352d31395432333a31373a34392e3234305a222c22757064617465645f6174223a22323032332d30352d31395432333a31373a34392e3234305a227d	2023-05-19 23:17:49.24+00	2023-05-19 23:17:49.24+00
168	0192c9c46c8e325d5b3e14ee04ae44fd95479d2aeb3af2bd571839796c49b8de	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652044617461466f726765206170702729	2023-05-19 23:17:49.24+00	2023-05-19 23:17:49.24+00
169	8a6de6d6cbe580f9fa63dd24d545a8bd1a7e2204b4588e4f010daac6b90f221e	\\x7b226e616d65223a224369706865725175657374222c226465736372697074696f6e223a2255736520436970686572517565737420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22436f646543726166746572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d31312d31345430313a32373a34382e3632345a222c22757064617465645f6174223a22323032322d31312d31315430313a32373a34382e3632345a227d	2023-11-14 01:27:48.624+00	2022-11-11 01:27:48.624+00
170	7d67ad149f3a761bb8469e50c44920b0de2be3570a46f806aa6cec210950fb82	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204369706865725175657374206170702729	2023-11-14 01:27:48.624+00	2022-11-11 01:27:48.624+00
171	636b6b0bb15bbae9e036e485dc387a399a9047be3703160a9a1bc768c281952b	\\x7b226e616d65223a224861636b5175657374222c226465736372697074696f6e223a22557365204861636b517565737420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22436f64654372757361646572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d30352d32385432323a30353a33382e3838305a222c22757064617465645f6174223a22323032322d31312d30395432323a30353a33382e3838305a227d	2023-05-28 22:05:38.88+00	2022-11-09 22:05:38.88+00
172	77b01f39a2edefccd41f8fb2fbb0a4ea7fa5cfbcbf9530ee81b4119970d41759	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204861636b5175657374206170702729	2023-05-28 22:05:38.88+00	2022-11-09 22:05:38.88+00
173	37eb7545346e3008a3c380080a3fd953927212594b1d38e33007ab8d43b4ca94	\\x7b226e616d65223a22536563757265537068657265222c226465736372697074696f6e223a225573652053656375726553706865726520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22436f64654372757361646572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d31322d30325431353a31383a32352e3538345a222c22757064617465645f6174223a22323032332d30392d31335431353a31383a32352e3538345a227d	2024-12-02 15:18:25.584+00	2023-09-13 15:18:25.584+00
174	0372f6128e21d37905c799ccc3247caab8e32f894901fe246f187622001b9318	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520536563757265537068657265206170702729	2024-12-02 15:18:25.584+00	2023-09-13 15:18:25.584+00
179	2a9420c98ee74c874bbdb017660bc36e2b0a3aa1e0d347495dfc585c99f9ea49	\\x7b226e616d65223a224e616e6f47616d6573222c226465736372697074696f6e223a22557365204e616e6f47616d657320666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22436972637569744361707461696e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d30372d31345431363a34353a33352e3438385a222c22757064617465645f6174223a22323032332d30372d31345431363a34353a33352e3438385a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2023-07-14 16:45:35.488+00	2023-07-14 16:45:35.488+00
184	1c30c89068a71c00b03b3f8b67cb610bfd1a8476e4ca44f3910003c2e650b1a0	\\x7b226e616d65223a2243697263756974466f726765222c226465736372697074696f6e223a225573652043697263756974466f72676520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2247616d65476c61646961746f72222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224164756c74222c22637265617465645f6174223a22323032332d31312d31375432333a32333a32332e3633365a222c22757064617465645f6174223a22323032332d30322d32365432333a32333a32332e3633365a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2023-11-17 23:23:23.636+00	2023-02-26 23:23:23.636+00
194	0aad7d7faf26f13ef30ad7a534f274ed05c860c9e38ee97a7237d7bc7691deb7	\\x7b226e616d65223a224e616e6f4e6574222c226465736372697074696f6e223a22557365204e616e6f4e657420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22506978656c50726f222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224164756c74222c22637265617465645f6174223a22323032332d31322d30315431393a30363a32342e3430345a222c22757064617465645f6174223a22323032312d31312d31395431393a30363a32342e3430345a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2023-12-01 19:06:24.404+00	2021-11-19 19:06:24.404+00
206	df6e3519916da6ef75678b330eb135b69f4a0ba43facef04dbcc42807aa29b73	\\x7b226e616d65223a22436f646543726166746572222c226465736372697074696f6e223a2255736520436f64654372616674657220666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22436f64654361707461696e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032342d31312d31325431383a35313a30392e3934345a222c22757064617465645f6174223a22323032342d30382d31385431383a35313a30392e3934345a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-11-12 18:51:09.944+00	2024-08-18 18:51:09.944+00
223	06be8a9070b4dc6e8bb61b38f0d5617291979120319d788b703dfc900117507f	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204e616e6f47616d657320617070302e302e312729	2023-07-14 16:45:35.488+00	2023-07-14 16:45:35.488+00
231	caacea4cb68d883be471155049ceb52f67f07e7fcbe24679ff1b4bb96aa3b7aa	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f64655761766520617070302e302e312729	2023-12-21 17:42:11.64+00	2022-09-21 17:42:11.64+00
175	75c895affbbc385de1b3d8e03c43040ab91c21efc8c8acd42d93082b88c0ff6e	\\x7b226e616d65223a22436f64654372617a65222c226465736372697074696f6e223a2255736520436f64654372617a6520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22456c656374726f6e4563686f222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d31302d33305430323a34363a35312e3336305a222c22757064617465645f6174223a22323032312d31312d30395430323a34363a35312e3336305a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-10-30 02:46:51.36+00	2021-11-09 02:46:51.36+00
182	7eca2d6f7f8bfaddf95b49d188fce64f4cf5eeed8f68c69b243b4028563ddb7f	\\x7b226e616d65223a22426974426c617374222c226465736372697074696f6e223a2255736520426974426c61737420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2247616d65477561726469616e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30312d31355430363a31353a30352e3639365a222c22757064617465645f6174223a22323032312d31302d32355430363a31353a30352e3639365a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-01-15 06:15:05.696+00	2021-10-25 06:15:05.696+00
193	a8875ab2fda1f8bd078272796fef118f68b561d90cd472a807efb6bbb3b1c0ea	\\x7b226e616d65223a22436f646543616e766173222c226465736372697074696f6e223a2255736520436f646543616e76617320666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224c6f6769634c61627972696e7468222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d31322d31335431353a35333a35362e3330345a222c22757064617465645f6174223a22323032322d30362d30375431353a35333a35362e3330345a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2023-12-13 15:53:56.304+00	2022-06-07 15:53:56.304+00
202	1de047db554028339fec7fc10d454dc9c31b5553b005d96b331fd71f11f0f301	\\x7b226e616d65223a22436f646543697479222c226465736372697074696f6e223a2255736520436f64654369747920666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22506978656c50756c7365222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032342d30312d32355431313a30323a30352e3234305a222c22757064617465645f6174223a22323032312d30392d31315431313a30323a30352e3234305a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-01-25 11:02:05.24+00	2021-09-11 11:02:05.24+00
212	86d9f87d6066b002fb4e194cb054a14d6672477ee737b1ed22addeab481242fb	\\x7b226e616d65223a22456c65637472614564656e222c226465736372697074696f6e223a2255736520456c65637472614564656e20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2242797465426c617a65222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032342d30372d30315431303a35313a33302e3834305a222c22757064617465645f6174223a22323032322d30352d32315431303a35313a33302e3834305a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-07-01 10:51:30.84+00	2022-05-21 10:51:30.84+00
224	83b565d57bd5f3ea3c939738f35ceff9f32d7d943f06e09d110763be04547f83	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520426974426c61737420617070302e302e312729	2024-01-15 06:15:05.696+00	2021-10-25 06:15:05.696+00
232	4b66d712ccaa4d8cfd5799c122177e4dedc88820b944c4f1a966ec31481f5ec5	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520537061726b53637269707420617070302e302e312729	2024-05-18 00:02:21.456+00	2023-10-13 00:02:21.456+00
243	49d5966c499ae897db9396cb90a4b51e3e7cfea17fa1055ccd7cba9647649637	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f64654372616674657220617070302e302e312729	2024-11-12 18:51:09.944+00	2024-08-18 18:51:09.944+00
257	b769e0614b80143d870a1771cf7d52e1a682cec1229d985a9691c244b3d20750	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f6465436f6d657420617070302e302e312729	2023-11-23 09:45:55.072+00	2023-11-23 09:45:55.072+00
176	2948e99d22d5ac2de50a5c6a785008bcf1eda516d3e047b15e402706fbcba4e1	\\x7b226e616d65223a224d6963726f417263616465222c226465736372697074696f6e223a22557365204d6963726f41726361646520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22506978656c50616c6164696e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224164756c74222c22637265617465645f6174223a22323032332d31312d30335431313a32383a31322e3734305a222c22757064617465645f6174223a22323032332d31312d30335431313a32383a31322e3734305a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2023-11-03 11:28:12.74+00	2023-11-03 11:28:12.74+00
185	7109f7dd7de17e573aa6ad0c3d164588ef3ca74b0a501fcc913e10dade3f78c7	\\x7b226e616d65223a22537061726b536372697074222c226465736372697074696f6e223a2255736520537061726b53637269707420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2247616d6547697a6d6f222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30352d31385430303a30323a32312e3435365a222c22757064617465645f6174223a22323032332d31302d31335430303a30323a32312e3435365a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-05-18 00:02:21.456+00	2023-10-13 00:02:21.456+00
190	2d6b717fe7b67fdd6381145feac7e936728569503ff2eef0f1f3cbdf0be76d60	\\x7b226e616d65223a22436972637569744372616674222c226465736372697074696f6e223a225573652043697263756974437261667420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22506978656c50756c7365222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d30392d32395430333a32393a34372e3639365a222c22757064617465645f6174223a22323032332d30392d32395430333a32393a34372e3639365a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2023-09-29 03:29:47.696+00	2023-09-29 03:29:47.696+00
201	6cfbce48f06809b84984ff5d2ee8f5f0be8d623b24420cd3db6fc29e71f7f3b5	\\x7b226e616d65223a22436f646557617665222c226465736372697074696f6e223a2255736520436f64655761766520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224279746542616e646974222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032332d31322d32315431373a34323a31312e3634305a222c22757064617465645f6174223a22323032322d30392d32315431373a34323a31312e3634305a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2023-12-21 17:42:11.64+00	2022-09-21 17:42:11.64+00
219	3dd37d327367cda17065811c80b9bdd95929b74867f3deac0542665cf10d57bb	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652043697263756974466f72676520617070302e302e312729	2023-11-17 23:23:23.636+00	2023-02-26 23:23:23.636+00
230	c2817d22e9cd6fc3e635cf0dfe98065c109cc98dc11dff4e7028476230b46f75	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204d6963726f41726361646520617070302e302e312729	2023-11-03 11:28:12.74+00	2023-11-03 11:28:12.74+00
234	c650c2c8d58deaa6ba2103173ddfc68bfd9384dfdeaffc355c1906aa2bc25df0	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204c6f6769634c6f6f6d20617070302e302e312729	2024-08-22 14:13:04.708+00	2023-10-15 14:13:04.708+00
245	0e05f466b44d016968ff2bc98fd736091277ca471450af863f16a7d9657d6cf2	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520456c656374726f6e45726120617070302e302e312729	2024-10-14 10:09:17.8+00	2024-10-14 10:09:17.8+00
252	4486567630b385b39ecbcc7f16e313ff4382f3bf2e9fa46667106196d8085dcc	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652047616d654772696420617070302e302e312729	2023-06-14 14:37:26.096+00	2022-08-14 14:37:26.096+00
255	5b9922bc97b874c243709f73a7df4ce53363303d33241ee0727bd5daca9e9aee	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204279746542757374657220617070302e302e312729	2024-08-30 08:26:56.096+00	2021-09-05 08:26:56.096+00
183	0ad1cfbc9e092c07b42f5b792cf350ae98abeb7f58b17fa540f73d2cb3234419	\\x7b226e616d65223a22506978656c50756c7365222c226465736372697074696f6e223a2255736520506978656c50756c736520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224e616e6f4e6176696761746f72222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d31312d33305430303a35313a35342e3131325a222c22757064617465645f6174223a22323032322d30342d32315430303a35313a35342e3131325a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2023-11-30 00:51:54.112+00	2022-04-21 00:51:54.112+00
195	b1864705ab0c8db704b75bf2da8be65fb0d8a4f0ee1a09e721c333329d8cc0e9	\\x7b226e616d65223a22506978656c506c617a61222c226465736372697074696f6e223a2255736520506978656c506c617a6120666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22456c656374726f6e45787065646974696f6e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224861726477617265222c22637265617465645f6174223a22323032342d31312d30335432303a30333a31362e3036305a222c22757064617465645f6174223a22323032332d30312d33315432303a30333a31362e3036305a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-11-03 20:03:16.06+00	2023-01-31 20:03:16.06+00
204	abe9d5ecbe2d8264397ff7b093c351ba049b91bc72b74df483bde7afb2fc1840	\\x7b226e616d65223a22426974426f78222c226465736372697074696f6e223a2255736520426974426f7820666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224e616e6f4e696e6a61222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224164756c74222c22637265617465645f6174223a22323032342d31302d31305431383a31333a30362e3833365a222c22757064617465645f6174223a22323032322d30342d31365431383a31333a30362e3833365a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-10-10 18:13:06.836+00	2022-04-16 18:13:06.836+00
211	3766e620f2c078a1b8d0a1a6d28043c1e1d0d630b2de109247d13d4eec9e8072	\\x7b226e616d65223a22436f6465436c616e222c226465736372697074696f6e223a2255736520436f6465436c616e20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22506978656c50616c6164696e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032342d30392d32315430343a30333a31312e3034385a222c22757064617465645f6174223a22323032332d31322d32385430343a30333a31312e3034385a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-09-21 04:03:11.048+00	2023-12-28 04:03:11.048+00
240	702a43148b9d07ea886b9e6159fcfd92cb74431dc5cd7445c9793293ea323889	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520426974426f7820617070302e302e312729	2024-10-10 18:13:06.836+00	2022-04-16 18:13:06.836+00
253	60c9504633d3e1d0981d89287de54473e50b7a6e0a85c4734e5d71d53ccf6ff4	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f6465436c616e20617070302e302e312729	2024-09-21 04:03:11.048+00	2023-12-28 04:03:11.048+00
177	1f4d5b318a2139beec2517700780dc8c22ece9dda55a3f0b1a7dc0761d14dce4	\\x7b226e616d65223a22436f64654372616674222c226465736372697074696f6e223a2255736520436f6465437261667420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224e616e6f4e6176696761746f72222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d31312d30315431333a31323a31392e3337365a222c22757064617465645f6174223a22323032322d30392d30355431333a31323a31392e3337365a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-11-01 13:12:19.376+00	2022-09-05 13:12:19.376+00
220	5995a2e39ebebbbd06de5673ae97b05148195b1f153efd18df093c0a33144e7b	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f64654372617a6520617070302e302e312729	2024-10-30 02:46:51.36+00	2021-11-09 02:46:51.36+00
244	b018db3f7742e6f4627662fe6cd31509b485bd2b13be4001457e61b6a1f0503a	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204e616e6f4e6f76656c20617070302e302e312729	2024-01-25 00:59:51.064+00	2022-06-04 00:59:51.064+00
235	ad6552f342cc31db10df955e1c5848019ade9be1522321cdce5528eee0798925	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520506978656c50696f6e65657220617070302e302e312729	2024-11-07 01:09:31.666+00	2024-04-27 01:09:31.666+00
256	8b214968aa5463a3dabb46405f845cbd1aaf53fb50ef3dde762d95f1fa570542	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204e616e6f41726361646520617070302e302e312729	2024-03-03 03:17:23.68+00	2024-03-03 03:17:23.68+00
178	8ce0bbf3dc35f30a495e16192c116fbdf633f08fbac948d9fcb46593f8542664	\\x7b226e616d65223a2247616d6547656e697573222c226465736372697074696f6e223a225573652047616d6547656e69757320666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22436f646543726166746572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224164756c74222c22637265617465645f6174223a22323032332d30362d30375430363a34393a35362e3737325a222c22757064617465645f6174223a22323032332d30322d31395430363a34393a35362e3737325a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2023-06-07 06:49:56.772+00	2023-02-19 06:49:56.772+00
191	56109b8c5acd60f9be54411bf7264c1d3b7bdb845a8226dc272f40289b58b3d0	\\x7b226e616d65223a22506978656c50696f6e656572222c226465736372697074696f6e223a224d616b6520736f6d65206d616769632068617070656e207769746820506978656c50696f6e6565722e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224469676974616c447265616d6572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253414f222c22637265617465645f6174223a22323032342d31312d30375430313a30393a33312e3636365a222c22757064617465645f6174223a22323032342d30342d32375430313a30393a33312e3636365a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-11-07 01:09:31.666+00	2024-04-27 01:09:31.666+00
198	0a4d25fbc763e453ccf9ea2529fad57dda180094b3a8d0f461ac1024a356f6f1	\\x7b226e616d65223a2247616d6547726964222c226465736372697074696f6e223a225573652047616d654772696420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2247616d65476c69646572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d30362d31345431343a33373a32362e3039365a222c22757064617465645f6174223a22323032322d30382d31345431343a33373a32362e3039365a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2023-06-14 14:37:26.096+00	2022-08-14 14:37:26.096+00
214	31a74d98630785670ff67dcdc7910da412180c8bb0d86d18385c5c160f143646	\\x7b226e616d65223a224c6f6769634c6567656e6473222c226465736372697074696f6e223a22557365204c6f6769634c6567656e647320666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2243697263756974436f6d6d616e646572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224164756c74222c22637265617465645f6174223a22323032332d31302d31395432303a31393a32302e3636305a222c22757064617465645f6174223a22323032322d31312d31395432303a31393a32302e3636305a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2023-10-19 20:19:20.66+00	2022-11-19 20:19:20.66+00
217	430dc8e7f8e2478304091076be9e36439b00a60aed86e3053bb9b028d5f9f198	\\x7b226e616d65223a22436f6465436f6d6574222c226465736372697074696f6e223a2255736520436f6465436f6d657420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2243697263756974436f6e6e6f697373657572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d31312d32335430393a34353a35352e3037325a222c22757064617465645f6174223a22323032332d31312d32335430393a34353a35352e3037325a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2023-11-23 09:45:55.072+00	2023-11-23 09:45:55.072+00
258	a60ca3d84158cfca37a76e0d94d202f90da78559ab053c52afef2647097671f9	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520456c65637472614564656e20617070302e302e312729	2024-07-01 10:51:30.84+00	2022-05-21 10:51:30.84+00
222	d530a490e57073b18cca9383f14ad9ef9a72fa485988b0ea501d5d284c3b6af9	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520506978656c50756c736520617070302e302e312729	2023-11-30 00:51:54.112+00	2022-04-21 00:51:54.112+00
226	0134dc43b24704e67f022f16c6758dea460b4fa6523db780984efe6f28d8792d	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f6465517565737420617070302e302e312729	2024-02-02 22:52:43.168+00	2022-06-10 22:52:43.168+00
236	a2e8a9c7bb44eb942e3a916c41dabf639615ae62e1e6879eba3607b2e45e3616	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520456c656374726f6e69636120617070302e302e312729	2023-11-24 22:55:24.164+00	2021-09-01 22:55:24.164+00
242	c9baa6a954aa021dd0c176ae20c5630dadff634d5eabbd3f5ca5dd6a22b8e8ba	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204c6f6769634c616220617070302e302e312729	2024-10-22 09:43:30.528+00	2023-11-19 09:43:30.528+00
250	d2346b56f64ef0590e2e8d9c5beda5f753d76d674ea172ecf2aa72518d760509	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520427974654265617420617070302e302e312729	2023-06-19 17:13:46.448+00	2023-06-19 17:13:46.448+00
180	dea20e4ca92fee8d5246516751a9bf0e55c1316f0f9340eb8678f2d8a3ad142b	\\x7b226e616d65223a224c6f6769634c616e64222c226465736372697074696f6e223a22557365204c6f6769634c616e6420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2242797465426c69747a222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30382d31365432313a33303a35342e3235365a222c22757064617465645f6174223a22323032322d31312d32335432313a33303a35342e3235365a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-08-16 21:30:54.256+00	2022-11-23 21:30:54.256+00
189	9b85d4516f18a14dd35aa574c1d59215305a57e1cbaa5781dbec753eb47754d2	\\x7b226e616d65223a224279746542617368222c226465736372697074696f6e223a2255736520427974654261736820666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a225465636854696e6b6572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032332d30372d31375431343a32373a32392e3436345a222c22757064617465645f6174223a22323032332d30372d31375431343a32373a32392e3436345a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2023-07-17 14:27:29.464+00	2023-07-17 14:27:29.464+00
199	2ef4f62c266a037f70d4e9fb8e8f41cff9e6c3a247be95ac56267d0120ab7a8e	\\x7b226e616d65223a2242797465426c69747a222c226465736372697074696f6e223a225573652042797465426c69747a20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2247616d6547697a6d6f222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30352d30375430363a31393a31372e3731325a222c22757064617465645f6174223a22323032332d30342d31395430363a31393a31372e3731325a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-05-07 06:19:17.712+00	2023-04-19 06:19:17.712+00
209	966e2bc2b609ada5a384009161cb813ef04f116cff1dde6918984d46f968a947	\\x7b226e616d65223a22436972637569744372617a65222c226465736372697074696f6e223a2255736520436972637569744372617a6520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22506978656c50756c7365222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d30372d30345432303a33363a30322e3732305a222c22757064617465645f6174223a22323032332d30372d30345432303a33363a30322e3732305a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2023-07-04 20:36:02.72+00	2023-07-04 20:36:02.72+00
215	8404b997c8f4136c0e610302f4596908a112062d384f0cc3313cfcdaff6058a1	\\x7b226e616d65223a22506978656c506f7274616c222c226465736372697074696f6e223a2255736520506978656c506f7274616c20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2243796265724372616674222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224861726477617265222c22637265617465645f6174223a22323032342d30352d32335431373a32363a30342e3636385a222c22757064617465645f6174223a22323032342d30322d31335431373a32363a30342e3636385a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-05-23 17:26:04.668+00	2024-02-13 17:26:04.668+00
181	f3259f0118306aa4a6631a940e47679bfec886b034403f7df2dd2d2b1f0883b4	\\x7b226e616d65223a22506978656c50616c222c226465736372697074696f6e223a2255736520506978656c50616c20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224c6f6769634c756d696e617279222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d30372d32395431313a31343a32302e3232345a222c22757064617465645f6174223a22323032332d30372d32395431313a31343a32302e3232345a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2023-07-29 11:14:20.224+00	2023-07-29 11:14:20.224+00
188	dcb4642bd5291c2d319435c3f86a8158cb910ba0cbf66e44fc182742b311a764	\\x7b226e616d65223a22456c6563747261506c6179222c226465736372697074696f6e223a2255736520456c6563747261506c617920666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2247616d6547617a6572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30332d33305431343a34303a35322e3936305a222c22757064617465645f6174223a22323032312d31302d31365431343a34303a35322e3936305a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-03-30 14:40:52.96+00	2021-10-16 14:40:52.96+00
205	0c3977ab059c87b97967d4219fea79aa1b4de2d4f8969801d2c37a34b2c4128b	\\x7b226e616d65223a2242697442617a616172222c226465736372697074696f6e223a225573652042697442617a61617220666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224c6f6769634c6f7265222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d31312d30335430353a30353a34372e3530345a222c22757064617465645f6174223a22323032332d30392d32325430353a30353a34372e3530345a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2023-11-03 05:05:47.504+00	2023-09-22 05:05:47.504+00
196	5799522bdfcc463d2216bc24faac505f4330491f89ba9fdbfaa87a5185081b38	\\x7b226e616d65223a224c6f6769634c6f6f6d222c226465736372697074696f6e223a22557365204c6f6769634c6f6f6d20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224e616e6f4e6f6d6164222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224164756c74222c22637265617465645f6174223a22323032342d30382d32325431343a31333a30342e3730385a222c22757064617465645f6174223a22323032332d31302d31355431343a31333a30342e3730385a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-08-22 14:13:04.708+00	2023-10-15 14:13:04.708+00
208	9ba7fc37497a1ff66f8a0b4d43529f01e9c93e87dc5e32633302d28763741910	\\x7b226e616d65223a22456c656374726f6e457261222c226465736372697074696f6e223a2255736520456c656374726f6e45726120666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2247616d65476c6f626574726f74746572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032342d31302d31345431303a30393a31372e3830305a222c22757064617465645f6174223a22323032342d31302d31345431303a30393a31372e3830305a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-10-14 10:09:17.8+00	2024-10-14 10:09:17.8+00
228	8a0f66fd92bb888c9fca54ad993b083dcf046587dfc392b51e02966fb6eb4527	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f6465437261667420617070302e302e312729	2024-11-01 13:12:19.376+00	2022-09-05 13:12:19.376+00
239	e0c404801037f32774858e363678c4ec7979aedd552d291dbd95445b5c05d196	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520456c6563747261466f72676520617070302e302e312729	2024-09-17 05:22:36.352+00	2023-05-18 05:22:36.352+00
248	8b77c6f42292391766efbbab3af4127c11793e024c40e5ebe777033724462c99	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520506978656c506c617a6120617070302e302e312729	2024-11-03 20:03:16.06+00	2023-01-31 20:03:16.06+00
186	5e6d84a2610f3cb301880ff80e3b7595f1f0256c74d8c0d9fad6a523f97acc04	\\x7b226e616d65223a224279746542656174222c226465736372697074696f6e223a2255736520427974654265617420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2242797465426c617a65222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032332d30362d31395431373a31333a34362e3434385a222c22757064617465645f6174223a22323032332d30362d31395431373a31333a34362e3434385a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2023-06-19 17:13:46.448+00	2023-06-19 17:13:46.448+00
200	78713bc1e450432e134209d6ca97ef457356079e304f42a88ab29fd10d782bac	\\x7b226e616d65223a22456c6563747261466f726765222c226465736372697074696f6e223a2255736520456c6563747261466f72676520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22456c656374726f6e456d7065726f72222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30392d31375430353a32323a33362e3335325a222c22757064617465645f6174223a22323032332d30352d31385430353a32323a33362e3335325a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-09-17 05:22:36.352+00	2023-05-18 05:22:36.352+00
210	01502c8b3b9c077179a50c518bcbde93dcce97f2ef7423efc64869a5092eb271	\\x7b226e616d65223a22436972637569744368616f73222c226465736372697074696f6e223a2255736520436972637569744368616f7320666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22436972637569744368616d70222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224861726477617265222c22637265617465645f6174223a22323032342d30382d31365430333a30373a35372e3735365a222c22757064617465645f6174223a22323032342d30382d31365430333a30373a35372e3735365a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-08-16 03:07:57.756+00	2024-08-16 03:07:57.756+00
218	a938bf6644bc468b6f0315a07322f9cd659f7940a641e0b6a28a66f0d20b443f	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652047616d6547656e69757320617070302e302e312729	2023-06-07 06:49:56.772+00	2023-02-19 06:49:56.772+00
227	4070416c66c9d17e9226406ca53f473d7aa7503af7022a899bc9dac4c5e7b478	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520456c6563747261506c617920617070302e302e312729	2024-03-30 14:40:52.96+00	2021-10-16 14:40:52.96+00
238	ee9172c740c482e526dfc81882febbafd26435cbc07508db20de7b3eed189e60	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652042797465426c69747a20617070302e302e312729	2024-05-07 06:19:17.712+00	2023-04-19 06:19:17.712+00
249	8fee76935452d51549e75a4de4b0383dcf3f556faed30869f592ab0ea3ba9075	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436972637569744368616f7320617070302e302e312729	2024-08-16 03:07:57.756+00	2024-08-16 03:07:57.756+00
187	9811d9f234d45b1655576d07fca6d016311452ddc1bc57b9a606b81f9f7579b3	\\x7b226e616d65223a22436f64655175657374222c226465736372697074696f6e223a2255736520436f6465517565737420666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2254656368547261696c626c617a6572222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30322d30325432323a35323a34332e3136385a222c22757064617465645f6174223a22323032322d30362d31305432323a35323a34332e3136385a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-02-02 22:52:43.168+00	2022-06-10 22:52:43.168+00
192	64190cc23ed042c8e529e3d576b62379f33c0d7cc87ef7dd44f22d8bd1032cac	\\x7b226e616d65223a224c6f6769634c6162222c226465736372697074696f6e223a22557365204c6f6769634c616220666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22506978656c50696c6f74222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d31302d32325430393a34333a33302e3532385a222c22757064617465645f6174223a22323032332d31312d31395430393a34333a33302e3532385a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-10-22 09:43:30.528+00	2023-11-19 09:43:30.528+00
203	aa041073f33e321bd3c2df28e806e2ecfe3475a408bbe1999271552a3bb2dd99	\\x7b226e616d65223a224e616e6f417263616465222c226465736372697074696f6e223a22557365204e616e6f41726361646520666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2254656368546f726e61646f222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30332d30335430333a31373a32332e3638305a222c22757064617465645f6174223a22323032342d30332d30335430333a31373a32332e3638305a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-03-03 03:17:23.68+00	2024-03-03 03:17:23.68+00
216	8a3a6980bad76d56078113353eea27437cde2df5ec03def7fd7ce91e8e41762e	\\x7b226e616d65223a2242797465427573746572222c226465736372697074696f6e223a22557365204279746542757374657220666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224c6f6769634c696f6e6865617274222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d30382d33305430383a32363a35362e3039365a222c22757064617465645f6174223a22323032312d30392d30355430383a32363a35362e3039365a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-08-30 08:26:56.096+00	2021-09-05 08:26:56.096+00
221	a61c8a8a21d97d5f10b3cf2c359ac64cfb3dbf56b018f7fb3647180d7411814a	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652043697263756974437261667420617070302e302e312729	2023-09-29 03:29:47.696+00	2023-09-29 03:29:47.696+00
225	4eb615ed7c49a77dac448d2628d2627277826a837bcfe387cb2739cd975fc441	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520427974654261736820617070302e302e312729	2023-07-17 14:27:29.464+00	2023-07-17 14:27:29.464+00
233	3bdb7ca7a34cae73645fcb0d4c5c9bfa20c467a3343f6bf40502b2c629a0524e	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436f646543616e76617320617070302e302e312729	2023-12-13 15:53:56.304+00	2022-06-07 15:53:56.304+00
241	d85e38261ef68818507a77cadf22802fc4c9e674c9e138518cd60c71586e4f55	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520436972637569744372617a6520617070302e302e312729	2023-07-04 20:36:02.72+00	2023-07-04 20:36:02.72+00
251	a411da82f0003e47b51912624fe5ce40ce9d3a8225d74fe5500eefe2e75cffc6	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204e616e6f4e657420617070302e302e312729	2023-12-01 19:06:24.404+00	2021-11-19 19:06:24.404+00
259	efc9bc1a44ef97cfbbbcecbd9e018bc625dc3d5d83b523eec7d7ad7a9d4a1841	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204c6f6769634c6567656e647320617070302e302e312729	2023-10-19 20:19:20.66+00	2022-11-19 20:19:20.66+00
260	575b4644695bd14f158ac81013ee96ea1ad96e69cec11e007a2ecf85f19e5eee	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520506978656c506f7274616c20617070302e302e312729	2024-05-23 17:26:04.668+00	2024-02-13 17:26:04.668+00
197	3692491b65fc06792ba0270691569d53d72ba9ff8a6292d03046664497b4e3a2	\\x7b226e616d65223a22456c656374726f6e696361222c226465736372697074696f6e223a2255736520456c656374726f6e69636120666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a2243796265724372616674736d616e222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a224164756c74222c22637265617465645f6174223a22323032332d31312d32345432323a35353a32342e3136345a222c22757064617465645f6174223a22323032312d30392d30315432323a35353a32342e3136345a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2023-11-24 22:55:24.164+00	2021-09-01 22:55:24.164+00
207	426a34fd63046b179e3e2f64294ffcf436db5af5b86f6bfdc0502563fba6bf3e	\\x7b226e616d65223a224e616e6f4e6f76656c222c226465736372697074696f6e223a22557365204e616e6f4e6f76656c20666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a22506978656c50726f64696779222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a2253696c6c79222c22637265617465645f6174223a22323032342d30312d32355430303a35393a35312e3036345a222c22757064617465645f6174223a22323032322d30362d30345430303a35393a35312e3036345a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-01-25 00:59:51.064+00	2022-06-04 00:59:51.064+00
213	64d602ba0b24c0d4203f53ed496ee3433d8c1e8ecdfd19f23079c3f8e0a96d63	\\x7b226e616d65223a224e616e6f4e65787573222c226465736372697074696f6e223a22557365204e616e6f4e6578757320666f7220736f6d6520636f6f6c2067726170686963616c20656666656374732e222c22696e746572707265746572223a22707974686f6e222c22617574686f72223a224c6f6769634c61627972696e7468222c226c6963656e73655f66696c65223a224d4954222c2263617465676f7279223a22556e63617465676f7269736564222c22637265617465645f6174223a22323032342d31302d32315431363a32363a33332e3933365a222c22757064617465645f6174223a22323032332d30352d31385431363a32363a33332e3933365a222c2273656d616e7469635f76657273696f6e223a22302e302e31227d	2024-10-21 16:26:33.936+00	2023-05-18 16:26:33.936+00
229	270e3449aeb1ba6e0fd6f34528f16099af7dc385cad560a02f78a838c8b0d579	\\x7072696e74282748656c6c6f20776f726c642066726f6d2074686520506978656c50616c20617070302e302e312729	2023-07-29 11:14:20.224+00	2023-07-29 11:14:20.224+00
237	a69d84232969e740f87fad3c27daaa7fb77c244d38eea2e8aa536d35118e7a6e	\\x7072696e74282748656c6c6f20776f726c642066726f6d207468652042697442617a61617220617070302e302e312729	2023-11-03 05:05:47.504+00	2023-09-22 05:05:47.504+00
247	b8f5e2627f1de0b6a2970f69a0b6bf9c8f827c9200f664a6215580331c71f6b5	\\x7072696e74282748656c6c6f20776f726c642066726f6d20746865204c6f6769634c616e6420617070302e302e312729	2024-08-16 21:30:54.256+00	2022-11-23 21:30:54.256+00
\.


--
-- Data for Name: files; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.files (id, version_id, dir, name, ext, mimetype, size_of_content, sha256, created_at, updated_at, deleted_at) FROM stdin;
1	1		metadata	.json	application/json	259	d1010a609b51931a168bd38aedbdb952ca51b3f05505f3a4f5fd2ad604f66a23	2024-11-01 13:12:19.376+00	2022-09-05 13:12:19.376+00	\N
2	1		__init__	.py	text/x-python-script	43	4028201b6ebf876b3ee30462c4d170146a2d3d92c5aca9fefc5e3d1a0508f5df	2024-11-01 13:12:19.376+00	2022-09-05 13:12:19.376+00	\N
3	2		metadata	.json	application/json	261	7e05683fdade2a6d33d4bebaabb8ccea1215dce6c6b9c9da89ffd2514a799384	2023-11-30 00:51:54.112+00	2022-04-21 00:51:54.112+00	\N
4	2		__init__	.py	text/x-python-script	44	9aa3814437e99d152b55e8d30785ae282f4ace6d5b47371690f27571174641ba	2023-11-30 00:51:54.112+00	2022-04-21 00:51:54.112+00	\N
5	3		metadata	.json	application/json	256	28fe8a2b3715b7149ea57fea66cdb5a7afa902267a251e3a757427bd4d7ec1e8	2024-01-15 06:15:05.696+00	2021-10-25 06:15:05.696+00	\N
6	3		__init__	.py	text/x-python-script	42	49b72397cd8e216aaf79fe5588c549c3d0345a9a4a557116de55e25ff02261b7	2024-01-15 06:15:05.696+00	2021-10-25 06:15:05.696+00	\N
7	4		metadata	.json	application/json	260	15b9100b8e870a99ae40cd64bd477d7786fa0304b1ae4cacfe169cee792dd047	2023-07-14 16:45:35.488+00	2023-07-14 16:45:35.488+00	\N
8	4		__init__	.py	text/x-python-script	43	5e785c38408783e0c19e21d247aed30e7756e473a8b717c8ed76987134781f9e	2023-07-14 16:45:35.488+00	2023-07-14 16:45:35.488+00	\N
9	5		metadata	.json	application/json	259	b898b75196f09feb0a92ea6eb1ef38647d8e86241c58125c10ca245ac2fcdcaa	2024-03-30 14:40:52.96+00	2021-10-16 14:40:52.96+00	\N
10	5		__init__	.py	text/x-python-script	45	a0cf3ab0dde63421421a47268941bf6dcbd2d5046a82edf532951b8619e04168	2024-03-30 14:40:52.96+00	2021-10-16 14:40:52.96+00	\N
11	6		metadata	.json	application/json	257	5bee104781bcf61f6d196a3ab4d482c2810a6f11500dec7dee3855288b3022df	2023-11-17 23:23:23.636+00	2023-02-26 23:23:23.636+00	\N
12	6		__init__	.py	text/x-python-script	46	3c374193e3ec95322be1d5e5c569c3a7514a4dbf169d9ae7d494bb6911dc2bf6	2023-11-17 23:23:23.636+00	2023-02-26 23:23:23.636+00	\N
13	7		metadata	.json	application/json	246	bf972080fed2dd169323b6f9919d7074c05d70be082da5865ff9ff92e762499a	2023-07-17 14:27:29.464+00	2023-07-17 14:27:29.464+00	\N
14	7		__init__	.py	text/x-python-script	42	c4b9c74fa92f14325701797e6a063ee0658a942a48b5130aedb64bb2b910b132	2023-07-17 14:27:29.464+00	2023-07-17 14:27:29.464+00	\N
15	8		metadata	.json	application/json	262	2de9fec337ea8de11e7b341bc87d6b087117f82260d0aa4d2d3d66680844d59b	2023-12-13 15:53:56.304+00	2022-06-07 15:53:56.304+00	\N
16	8		__init__	.py	text/x-python-script	44	96308cdc9e544da17073506cec8066e7dd19634f8544c38cae0b35b7f8071a01	2023-12-13 15:53:56.304+00	2022-06-07 15:53:56.304+00	\N
17	9		metadata	.json	application/json	259	40632e6eabab00764f21b56c2b20fd3426f63eb2055819b98228d963f9c39cb8	2024-05-18 00:02:21.456+00	2023-10-13 00:02:21.456+00	\N
18	9		__init__	.py	text/x-python-script	45	d9978aacdb1ac896d1842a76af206475750d37832758cbd4fb6d1f4a2a6ee2c7	2024-05-18 00:02:21.456+00	2023-10-13 00:02:21.456+00	\N
19	10		metadata	.json	application/json	255	a0372510e24a324c461f8c23535877c350b7bd3bfe9a3d839ddccfe28b489b8c	2024-08-16 21:30:54.256+00	2022-11-23 21:30:54.256+00	\N
20	10		__init__	.py	text/x-python-script	43	11e20b405e3d7a1ced041746672eb8b7a51dfe1f79f3403ab31e08c57c3311fa	2024-08-16 21:30:54.256+00	2022-11-23 21:30:54.256+00	\N
21	11		metadata	.json	application/json	254	93d9864ef5b92c13da634f3437247a3e9e6ff0e97fb07ccc8f766a8c721dcbaa	2023-11-03 11:28:12.74+00	2023-11-03 11:28:12.74+00	\N
22	11		__init__	.py	text/x-python-script	45	12b73cdd685d319fd31d2f22a2219cda722f172c53aa0a68933b57e4ffe55183	2023-11-03 11:28:12.74+00	2023-11-03 11:28:12.74+00	\N
23	12		metadata	.json	application/json	258	504aa1fda79f122cde8702e8b303e70f9ad1f322c6e1be768f3c36b7bf1c4a0c	2024-10-30 02:46:51.36+00	2021-11-09 02:46:51.36+00	\N
24	12		__init__	.py	text/x-python-script	43	b82df97bdcc0b1cef23111b62764dc082145dbec8e6334a593c0170f6ef61857	2024-10-30 02:46:51.36+00	2021-11-09 02:46:51.36+00	\N
25	13		metadata	.json	application/json	251	4c6afc488fcea9f59f151689d6e729c534f380298873518c4b347f6f06120d27	2023-06-07 06:49:56.772+00	2023-02-19 06:49:56.772+00	\N
26	13		__init__	.py	text/x-python-script	44	89f2eab3a286770d3329b931085227c17964449ab1aed5a7d36ad6dcd5895d60	2023-06-07 06:49:56.772+00	2023-02-19 06:49:56.772+00	\N
27	14		metadata	.json	application/json	257	a7bccba18283b69f823ec3362a484409aba960cbf121b8e78d06b86863b162c9	2023-07-29 11:14:20.224+00	2023-07-29 11:14:20.224+00	\N
28	14		__init__	.py	text/x-python-script	42	3c2a3ed74b13094a58bc12b16f806ccb4ad4d65f29d2c7cc9f988fb6d73e2118	2023-07-29 11:14:20.224+00	2023-07-29 11:14:20.224+00	\N
29	15		metadata	.json	application/json	256	08fed01b0a9713a266865ae255e2018dc972d14f133ceafb02f092bb1aed6215	2023-11-24 22:55:24.164+00	2021-09-01 22:55:24.164+00	\N
30	15		__init__	.py	text/x-python-script	45	656e3f5da029c38e116fdb96451ee053f78bf8673dbf86d7ccfc87df62dfce64	2023-11-24 22:55:24.164+00	2021-09-01 22:55:24.164+00	\N
31	16		metadata	.json	application/json	261	954ad6cbe60cce8b1f47027f49a540c0d2274584eef7873f171be5d20d49091e	2024-02-02 22:52:43.168+00	2022-06-10 22:52:43.168+00	\N
32	16		__init__	.py	text/x-python-script	43	ea8e580ec6d0a25e8a646fdc234570c7f178eb783808766e6467a75b5666b72e	2024-02-02 22:52:43.168+00	2022-06-10 22:52:43.168+00	\N
33	17		metadata	.json	application/json	262	8b8d9d2d21930e1e9ea59937c199561489f91b2ee62e4823c183fbe51e5c5a4a	2023-09-29 03:29:47.696+00	2023-09-29 03:29:47.696+00	\N
34	17		__init__	.py	text/x-python-script	46	9c5ad176a1421fb4518bda694005ffa8e8450eae6d497eeb30dfeb880a60f9e5	2023-09-29 03:29:47.696+00	2023-09-29 03:29:47.696+00	\N
35	18		metadata	.json	application/json	253	61fa2e9b4ba0ea304163f8fc84fbe6a5f6fd9cc85c3ac76524ed40f61ce0f62e	2023-06-19 17:13:46.448+00	2023-06-19 17:13:46.448+00	\N
36	18		__init__	.py	text/x-python-script	42	311fe9d1fa6e3b32dcbb1c00bf06cebd2c34e9a448dc1d0170f427ec7d9f14ba	2023-06-19 17:13:46.448+00	2023-06-19 17:13:46.448+00	\N
37	19		metadata	.json	application/json	260	3062c3944beb106bd36d8a5cafa587437f5b71bee3ae6d243bc94656c93e1677	2024-10-21 16:26:33.936+00	2023-05-18 16:26:33.936+00	\N
38	19		__init__	.py	text/x-python-script	43	db0635cc4c7bc58a20f8112a63b3e0e4f8ade8c29b33a320a90e11a725240ed4	2024-10-21 16:26:33.936+00	2023-05-18 16:26:33.936+00	\N
39	20		metadata	.json	application/json	241	9ffcab2222e8e4a3cfca098a72160259fde76718fa154c9986f8621f051689e8	2024-10-10 18:13:06.836+00	2022-04-16 18:13:06.836+00	\N
40	20		__init__	.py	text/x-python-script	40	0be82bd8ab1b6926799dbb3ffbaa889c01f12c8be5e5cc06ec53b453399f4f6f	2024-10-10 18:13:06.836+00	2022-04-16 18:13:06.836+00	\N
41	21		metadata	.json	application/json	259	6dc277a961260ccfe58d797da99ee9bce3063ec48a19ccd101c3afe80996926a	2024-08-16 03:07:57.756+00	2024-08-16 03:07:57.756+00	\N
42	21		__init__	.py	text/x-python-script	46	6f92441881943cf29cd88682b7bcfd77160a54086d26cc21e9bb8363b5f20f06	2024-08-16 03:07:57.756+00	2024-08-16 03:07:57.756+00	\N
43	22		metadata	.json	application/json	253	0ffa6ab90673477becb1ba6ce41e32c60e91d52e5adc2e47df8d89c685521522	2024-11-12 18:51:09.944+00	2024-08-18 18:51:09.944+00	\N
44	22		__init__	.py	text/x-python-script	45	3d1851a1085a775b2fac2ec8bf7d438c52c28afd1d7ede65b7156eb9097d26bb	2024-11-12 18:51:09.944+00	2024-08-18 18:51:09.944+00	\N
45	23		metadata	.json	application/json	248	1cdecf846dc91ba93606b438f3e44d17d2e3c88483a893774ff040d24a37d5f2	2024-11-07 01:09:31.666+00	2024-04-27 01:09:31.666+00	\N
46	23		__init__	.py	text/x-python-script	46	8788d5a25c4df605562437cd2f4a345b5c9f5ef0624fc9dfc5f74f96d9a01565	2024-11-07 01:09:31.666+00	2024-04-27 01:09:31.666+00	\N
47	24		metadata	.json	application/json	254	4a7069707c46debeaa59d9a7fc87961af41027b334678fc5efef09f3db39d089	2024-10-22 09:43:30.528+00	2023-11-19 09:43:30.528+00	\N
48	24		__init__	.py	text/x-python-script	42	aa89bad5fd2e9a5a426f2f219e254b29f2f88373be02f46ca35036699300fb16	2024-10-22 09:43:30.528+00	2023-11-19 09:43:30.528+00	\N
49	25		metadata	.json	application/json	255	0de3957fe34179f45dbede36d041758d89be2ac3e79cf969c13418a0dab8f62a	2024-05-07 06:19:17.712+00	2023-04-19 06:19:17.712+00	\N
50	25		__init__	.py	text/x-python-script	43	80adf6f9ad455acb1259c72fbc7732d11b8a303bf32a47baebad59a9862c8c5a	2024-05-07 06:19:17.712+00	2023-04-19 06:19:17.712+00	\N
51	26		metadata	.json	application/json	246	94a9a2693feca91fb1b104f7162bc6774cc2cd3cdd6e8e4dd2dd9058a96152d1	2023-12-21 17:42:11.64+00	2022-09-21 17:42:11.64+00	\N
52	26		__init__	.py	text/x-python-script	42	5d7aae0024b1997bb653822f25e8972ca2cde4a98621feaf5fcfac591c20dde9	2023-12-21 17:42:11.64+00	2022-09-21 17:42:11.64+00	\N
53	27		metadata	.json	application/json	242	f34cdee96c2e8ded06cf6bf0ca49dd2601aae7cbf6e68c78a2c3caa997879123	2023-12-01 19:06:24.404+00	2021-11-19 19:06:24.404+00	\N
54	27		__init__	.py	text/x-python-script	41	3071bf13cbdf540815345b2a9ef3d59d4439b0bb0456729b3df8af45c2c3802c	2023-12-01 19:06:24.404+00	2021-11-19 19:06:24.404+00	\N
55	28		metadata	.json	application/json	267	e8724bc2bd817154f3fd8a5908c651cf9d48599c6c0c8f319e36d8238ac13ee4	2024-09-17 05:22:36.352+00	2023-05-18 05:22:36.352+00	\N
56	28		__init__	.py	text/x-python-script	46	398b24b1f29327b0ec9dbf63c5d2673a02cc06dd741a3571d1ea72e43b6e3db8	2024-09-17 05:22:36.352+00	2023-05-18 05:22:36.352+00	\N
57	29		metadata	.json	application/json	254	70594d4ea26eb4b286c34c56d44f9874f025a32916478fd11e5708d110f0d013	2023-06-14 14:37:26.096+00	2022-08-14 14:37:26.096+00	\N
58	29		__init__	.py	text/x-python-script	42	918aae5ccf3988bcff6383167b4977c3038cea3a60da35c663c7f97333d53aaa	2023-06-14 14:37:26.096+00	2022-08-14 14:37:26.096+00	\N
59	30		metadata	.json	application/json	247	712c3725923a54ccf312a9ed4b8d3195a3d066c2d4a8c97969a090a4ff6e4634	2024-08-22 14:13:04.708+00	2023-10-15 14:13:04.708+00	\N
60	30		__init__	.py	text/x-python-script	43	7df619c50ac341c729bb865c642c15940de0ad496122d14f1051caefee8c4233	2024-08-22 14:13:04.708+00	2023-10-15 14:13:04.708+00	\N
61	31		metadata	.json	application/json	261	243a4a3e4adbcec8303d5b6b3b3425bc25979906696b7a05dead5d3b65366cd2	2024-11-03 20:03:16.06+00	2023-01-31 20:03:16.06+00	\N
62	31		__init__	.py	text/x-python-script	44	b537c8a50136df4284723697305ba0f00e52f2541a9c8690abaaa0db98001d18	2024-11-03 20:03:16.06+00	2023-01-31 20:03:16.06+00	\N
63	32		metadata	.json	application/json	246	ea43508b9af13edff59cebb86f0faf1837c742ad0307387e782f521dfa71dd95	2024-01-25 11:02:05.24+00	2021-09-11 11:02:05.24+00	\N
64	32		__init__	.py	text/x-python-script	42	760ea0d98cd8e3757c11d4ac73462be5064f4485119e916e4fbc005aa9326dad	2024-01-25 11:02:05.24+00	2021-09-11 11:02:05.24+00	\N
65	33		metadata	.json	application/json	259	1c335ebcb09d8c75665b2a39b57c477e25689e3c8aeef49b5e0afa14bfe50376	2024-03-03 03:17:23.68+00	2024-03-03 03:17:23.68+00	\N
66	33		__init__	.py	text/x-python-script	44	f7bc3ef2e7f414f4f17b2cf67bd2610ea80ba047789243547e4e051cadac5b6a	2024-03-03 03:17:23.68+00	2024-03-03 03:17:23.68+00	\N
67	34		metadata	.json	application/json	258	b4f95d665780c254dab0be9185bb31ad5d6f47ed65172b97f2421713ba3973da	2024-10-14 10:09:17.8+00	2024-10-14 10:09:17.8+00	\N
68	34		__init__	.py	text/x-python-script	45	cb39a9e8828263ae885799354626520f13834032bc558ef163c91952192b3b3c	2024-10-14 10:09:17.8+00	2024-10-14 10:09:17.8+00	\N
69	35		metadata	.json	application/json	255	ba7573140c57c73af42ba828742f8f8837b3438635f80d812504ba2d7335bcbe	2023-11-03 05:05:47.504+00	2023-09-22 05:05:47.504+00	\N
70	35		__init__	.py	text/x-python-script	43	ce63d83ead08212fd0cf698658dab22240a40bcbca0518cf7fd84375771ba978	2023-11-03 05:05:47.504+00	2023-09-22 05:05:47.504+00	\N
71	36		metadata	.json	application/json	260	a0a564793f4f6748a8e5f8a0ffbff9e677f8db8cd537919b33f11557789d15a0	2023-10-19 20:19:20.66+00	2022-11-19 20:19:20.66+00	\N
72	36		__init__	.py	text/x-python-script	46	ff81bb8a38d778b22ac126fb629a90090e89680f341d3ed2627ccbf18f2d1ac1	2023-10-19 20:19:20.66+00	2022-11-19 20:19:20.66+00	\N
73	37		metadata	.json	application/json	248	dc98a37ab06b38e985e9c6911e028bd47b39dead4335cc46ca7a8f691a12ce68	2024-09-21 04:03:11.048+00	2023-12-28 04:03:11.048+00	\N
74	37		__init__	.py	text/x-python-script	42	d02191d847a994ea25b7bd986b75ba4f03410a13fe5d4acddb69348551f96489	2024-09-21 04:03:11.048+00	2023-12-28 04:03:11.048+00	\N
75	38		metadata	.json	application/json	255	afb7da0abc4d57c6d4b3b91aeb84b362c4d01fe5449403a5160d216696af9eba	2024-05-23 17:26:04.668+00	2024-02-13 17:26:04.668+00	\N
76	38		__init__	.py	text/x-python-script	45	11eceeb4781496e9741c97e6745a7c4eee1ff0135588902cbf3ecb1cf50385ef	2024-05-23 17:26:04.668+00	2024-02-13 17:26:04.668+00	\N
77	39		metadata	.json	application/json	262	6e93ba3f5fa225b9f0d99d1451bea6d8d8f783dde4fd8c348a8f01371b095a10	2023-07-04 20:36:02.72+00	2023-07-04 20:36:02.72+00	\N
78	39		__init__	.py	text/x-python-script	46	b7976ad99a92849942b8e63e5f55d6779aaa55c5e2399d9af4efd69a236c2947	2023-07-04 20:36:02.72+00	2023-07-04 20:36:02.72+00	\N
79	40		metadata	.json	application/json	262	4efae41c8897a8f11923e8d0c7e1558ca84d1ef01e7f89e9f3887ebbb00ff886	2024-08-30 08:26:56.096+00	2021-09-05 08:26:56.096+00	\N
80	40		__init__	.py	text/x-python-script	44	6bbc5ee37b74e55bb30a8c02ece279acb2c7b1cf9411c758b5cfe3e37c5d014c	2024-08-30 08:26:56.096+00	2021-09-05 08:26:56.096+00	\N
81	41		metadata	.json	application/json	250	84e2523314728a9d1d680ebb156e56c3f092b4a93d1dad7411e7dd1f8b065e44	2024-01-25 00:59:51.064+00	2022-06-04 00:59:51.064+00	\N
82	41		__init__	.py	text/x-python-script	43	dd5b3e78ee8784eaa5cb2980b1239bc686f7d81f19f683afd4dba76b3fefcbbd	2024-01-25 00:59:51.064+00	2022-06-04 00:59:51.064+00	\N
83	42		metadata	.json	application/json	251	6ee7fe69d30922aad1de55e931cf5f020455a23a87fffb1470cdb00b10ae4e0c	2024-07-01 10:51:30.84+00	2022-05-21 10:51:30.84+00	\N
84	42		__init__	.py	text/x-python-script	45	4ccae50446870c56e5690f1d28a84e5b7fb705ca6c60cee90e7c3b0c79adfd7b	2024-07-01 10:51:30.84+00	2022-05-21 10:51:30.84+00	\N
85	43		metadata	.json	application/json	264	0aac1c808a8557b3aa9962553a605026cae4f0955987f64fc8a0ba17dbac4d02	2023-11-23 09:45:55.072+00	2023-11-23 09:45:55.072+00	\N
86	43		__init__	.py	text/x-python-script	43	0d79605e578a4b1047d2b25cd98f703f9f7222164b81525f4847e5e60b1b0ac0	2023-11-23 09:45:55.072+00	2023-11-23 09:45:55.072+00	\N
87	44		metadata	.json	application/json	272	6cbc90231e32d2b876b723dce9447ac2f1c237a1217191487b986ec9e484a84a	2024-12-31 18:26:24.784+00	2024-07-24 18:26:24.784+00	\N
88	44		__init__	.py	text/x-python-script	49	bf27c558940e1d2839f6be84c192caecc16431e88efb1dbbc234e4755e99e687	2024-12-31 18:26:24.784+00	2024-07-24 18:26:24.784+00	\N
89	45		metadata	.json	application/json	266	d890bb21eb6ccb1b93d0e158d5b4c67e596b4fb9b876591d8d3fd382ef4ee26f	2024-04-14 08:17:02.24+00	2022-10-10 08:17:02.24+00	\N
90	45		__init__	.py	text/x-python-script	45	0d13a0db9e75bd50aea04f83309d015f66a652977dd6d6875ca03f7a498993e3	2024-04-14 08:17:02.24+00	2022-10-10 08:17:02.24+00	\N
91	46		metadata	.json	application/json	258	91256a2ff937d2f97c9f9576d33437c6097af65705eb68710603d7e6fd549fe0	2024-05-21 07:52:12.792+00	2023-05-19 07:52:12.792+00	\N
92	46		__init__	.py	text/x-python-script	44	f9eb1b945f387e09e98869ec7d2de4c19d72b66e5085796c64e0ce1bea83488b	2024-05-21 07:52:12.792+00	2023-05-19 07:52:12.792+00	\N
93	47		metadata	.json	application/json	262	97b42f86f44b6537da276d1f48f3487915352ad36fe638ad77233a22735fe200	2024-02-05 07:45:38.824+00	2024-02-05 07:45:38.824+00	\N
94	47		__init__	.py	text/x-python-script	49	09ff5b49da0828569ea5c49e18d163c2186763502bd4f7e440107cd46b55a915	2024-02-05 07:45:38.824+00	2024-02-05 07:45:38.824+00	\N
95	48		metadata	.json	application/json	257	25a58de7b963488dbaaa21b7f5cbee5b8d43a4004a6f156a28d2971ca38bc97a	2024-03-12 09:05:08.976+00	2024-03-12 09:05:08.976+00	\N
96	48		__init__	.py	text/x-python-script	42	df429492023867526959b63fe50a18b8e6361a8a270bc31f472934192ecbd102	2024-03-12 09:05:08.976+00	2024-03-12 09:05:08.976+00	\N
97	49		metadata	.json	application/json	256	31e800b96b92e3472059a8455711e1c7196378732359daf9c18ef47aa54932de	2023-11-13 08:24:15.072+00	2023-10-20 08:24:15.072+00	\N
98	49		__init__	.py	text/x-python-script	42	eef072abc987a307e85cc0731e60917a6bf99c8e9f8541766cca3d6ef9088411	2023-11-13 08:24:15.072+00	2023-10-20 08:24:15.072+00	\N
99	50		metadata	.json	application/json	273	140ad61be45d50c3c213880ef6bd7d776e7663011dc5fe44afb2dd77c31795a8	2023-12-22 05:37:15.504+00	2022-01-29 05:37:15.504+00	\N
100	50		__init__	.py	text/x-python-script	50	c65110ef76cfbffc2bc3fe1e2251a337efc50b8f64be2b1e0a5cdffc0de63a5c	2023-12-22 05:37:15.504+00	2022-01-29 05:37:15.504+00	\N
101	51		metadata	.json	application/json	261	2907044868a7ebcad94f8d02bbdf95b3da44222f2adb10ec538023f4ab69ea95	2024-10-28 19:46:23.904+00	2022-10-17 19:46:23.904+00	\N
102	51		__init__	.py	text/x-python-script	44	b6194d9e4ba967dc71de7acf058b181ed085eb9cdb4e35f3a00f5d8302c81fb7	2024-10-28 19:46:23.904+00	2022-10-17 19:46:23.904+00	\N
103	52		metadata	.json	application/json	260	508cfd732e3100ec14d893428144149aae26483dd1618048ecb671ffd86b36f2	2024-10-25 17:33:41.688+00	2021-12-14 17:33:41.688+00	\N
104	52		__init__	.py	text/x-python-script	48	a3778a531b89ef556b00953336c8085cca9aaa0e4e49eaeb0e98240bedc6860d	2024-10-25 17:33:41.688+00	2021-12-14 17:33:41.688+00	\N
105	53		metadata	.json	application/json	256	f9f2930cf1e6912bd708d2db43d99b6758d479801b4dc71940476ba0cf0c21f3	2024-05-30 11:28:58.68+00	2022-05-01 11:28:58.68+00	\N
106	53		__init__	.py	text/x-python-script	45	bb489356808ea265850c04aa391a0736c784392cc4c9d4899b98391badada12e	2024-05-30 11:28:58.68+00	2022-05-01 11:28:58.68+00	\N
107	54		metadata	.json	application/json	258	93665eabe60a0a9302154e99d769ca1a5081c5b273009cf9636b34282084f060	2024-08-04 15:22:58.712+00	2023-01-26 15:22:58.712+00	\N
108	54		__init__	.py	text/x-python-script	45	ff8b16479077c522308c3b2e96d40396c064a7da291d6ec3f691278183d650f6	2024-08-04 15:22:58.712+00	2023-01-26 15:22:58.712+00	\N
109	55		metadata	.json	application/json	263	8842d3e8e8c4ea639853d8347abf214b26a5fa919785d8193df6268f9f659f7f	2024-05-20 22:09:19.664+00	2022-02-22 22:09:19.664+00	\N
110	55		__init__	.py	text/x-python-script	44	367c213d7ce87ad07d70c732baf2477636f8710a7580ee6edfc22780e82b805b	2024-05-20 22:09:19.664+00	2022-02-22 22:09:19.664+00	\N
111	56		metadata	.json	application/json	255	8bbba5c7843f1391cd21bf62fd1394095f3e5630bd0894b69ea86f5068dd3950	2023-07-09 21:46:04.968+00	2023-07-09 21:46:04.968+00	\N
112	56		__init__	.py	text/x-python-script	47	889360c69a1ab25536eb69b2bada125e0e21abe0138faaaca732b39666ce1c93	2023-07-09 21:46:04.968+00	2023-07-09 21:46:04.968+00	\N
113	57		metadata	.json	application/json	263	d2a0af2cc0e2aba4358eee161bc2c9c968033bbcbb72843dbe24c70a939bd42f	2024-11-05 09:02:28.784+00	2024-07-04 09:02:28.784+00	\N
114	57		__init__	.py	text/x-python-script	44	d49bd8e9c65cb1e2d0e87e437a167472ffe8fa5d706b6541d4656dffebe61fea	2024-11-05 09:02:28.784+00	2024-07-04 09:02:28.784+00	\N
115	58		metadata	.json	application/json	256	4c4d5eba6c3f1556d89ad870305cb8e11fd6632f56b4222cc5a83d1802af426f	2024-02-09 16:13:44.876+00	2022-05-14 16:13:44.876+00	\N
116	58		__init__	.py	text/x-python-script	43	e2a3dfea029502ade1cb5a130057fa4e3fc274553b40d6f5f341200423d81b4b	2024-02-09 16:13:44.876+00	2022-05-14 16:13:44.876+00	\N
117	59		metadata	.json	application/json	263	f3e9a5ea5ffd9de172c282c77a562fefe55f277611dfb7b81f76d6dde28aa964	2023-09-02 22:18:08.44+00	2023-09-02 22:18:08.44+00	\N
118	59		__init__	.py	text/x-python-script	50	c8dbc7924e72eb2a83aa055ea974b17aa87118e3daf111a3f55ce66641304126	2023-09-02 22:18:08.44+00	2023-09-02 22:18:08.44+00	\N
119	60		metadata	.json	application/json	259	392b730600f3c34f5b8006bb4fcb9e476284dd86fac47ee19217de6eeed22b6c	2023-12-05 03:41:56.192+00	2022-04-28 03:41:56.192+00	\N
120	60		__init__	.py	text/x-python-script	45	b45bd0c4dff69bde68bc493e39c737e4156ba179179662fb959f4e558366f1a1	2023-12-05 03:41:56.192+00	2022-04-28 03:41:56.192+00	\N
121	61		metadata	.json	application/json	244	9da105ff3401a9c20698d32bf0ee79ff81b03ed1169421a9599d6ab05ab721f3	2024-05-21 09:16:51.554+00	2022-10-07 09:16:51.554+00	\N
122	61		__init__	.py	text/x-python-script	44	00428777642cb39830c51b7f26a943ff364fe97fc0c89660d263f1d1ff789d95	2024-05-21 09:16:51.554+00	2022-10-07 09:16:51.554+00	\N
123	62		metadata	.json	application/json	259	7d50e7f55e8f6bae1508493325f7f6ec1d0d5a8972b35a11d6e338a512a1f564	2023-07-21 02:31:48.184+00	2023-07-21 02:31:48.184+00	\N
124	62		__init__	.py	text/x-python-script	48	0f6aa20a34aae328af3ddd39d34fb3a153a992dff42a97f1005e57f2e36916b6	2023-07-21 02:31:48.184+00	2023-07-21 02:31:48.184+00	\N
125	63		metadata	.json	application/json	259	40a4961d04c8844e8ef0dcfaf6bb3302fb5dfcef417d9e7ccd42a160278b5c96	2024-03-19 02:18:38.096+00	2021-08-18 02:18:38.096+00	\N
126	63		__init__	.py	text/x-python-script	43	f9f014ed3f4ea7605ef1b1d6d0ef07dea9a58e881ec0f52b159289415f7b08ce	2024-03-19 02:18:38.096+00	2021-08-18 02:18:38.096+00	\N
127	64		metadata	.json	application/json	247	0bfcfc15c8bd90c3592f7577e70cb3ac6d9062a5d95a7b81939466e2860f3f38	2024-06-24 21:57:36.494+00	2022-05-14 21:57:36.494+00	\N
128	64		__init__	.py	text/x-python-script	45	9a963bf1d01609f2028433a80a4c1eefb3459672f10cfc58b519ea984ac010b6	2024-06-24 21:57:36.494+00	2022-05-14 21:57:36.494+00	\N
129	65		metadata	.json	application/json	253	e512795311be3706e9dfe52c3abb9e8e20ea20771d0038510fe2e45beace3537	2024-08-09 14:23:25.752+00	2021-12-03 14:23:25.752+00	\N
130	65		__init__	.py	text/x-python-script	45	6bb37c106cc14e53fb51ed81f698f45239c8f3b1c7acc245ada72dc18e0f011d	2024-08-09 14:23:25.752+00	2021-12-03 14:23:25.752+00	\N
131	66		metadata	.json	application/json	263	50e6e72c7c26fd453b5d77019784ba0c3328c18ee2654ea0e50b9d25b6ec1d25	2024-12-19 20:19:10.896+00	2023-01-01 20:19:10.896+00	\N
132	66		__init__	.py	text/x-python-script	44	18af3a74174426196a58c0222acf937ac7d30d2fdae4ac597ceeba38f989b5a5	2024-12-19 20:19:10.896+00	2023-01-01 20:19:10.896+00	\N
133	67		metadata	.json	application/json	254	c267c974784e7ecff27d3255c7f24b7c6cfacf28203ed819bdff62cb72046c57	2024-09-11 19:49:28.324+00	2023-07-27 19:49:28.324+00	\N
134	67		__init__	.py	text/x-python-script	44	4181a072cf3ac464f32d6155bce4ab9672ff4c24a939d3af9c0dbf815d6885ce	2024-09-11 19:49:28.324+00	2023-07-27 19:49:28.324+00	\N
135	68		metadata	.json	application/json	253	bef48c39781e98db0492f2cd0993d3042ff5c76f7cb094ad3cee4a55146c79d2	2024-02-12 20:46:28.112+00	2023-11-14 20:46:28.112+00	\N
136	68		__init__	.py	text/x-python-script	42	595601465bd3833f10707800b5fc56925d2dbc0d71f9455c38384c7b16a650f4	2024-02-12 20:46:28.112+00	2023-11-14 20:46:28.112+00	\N
137	69		metadata	.json	application/json	257	24bea9765cb1f5285b52abb325af8e791beba962ae596871c766fa2ed2be0585	2023-12-03 07:30:33.208+00	2023-08-17 07:30:33.208+00	\N
138	69		__init__	.py	text/x-python-script	48	81072032b736af0ab4262580b7f01f77bdd3d78ac31a38dc223cff8bd4605e23	2023-12-03 07:30:33.208+00	2023-08-17 07:30:33.208+00	\N
139	70		metadata	.json	application/json	252	54fa606b0116ba89f88bfb563627f0b2eeca61a5fb3f0dfd09a046128fac57c8	2024-12-10 03:47:30.504+00	2022-10-02 03:47:30.504+00	\N
140	70		__init__	.py	text/x-python-script	45	8696676a5eb919fe6a9b64614214886dc4352ff0d62975ee78ea821ba41d2d7f	2024-12-10 03:47:30.504+00	2022-10-02 03:47:30.504+00	\N
141	71		metadata	.json	application/json	260	1162ad57f708ed97e44c27d8aaff01a39c9f21ba6bb489e38cb6ff9515fbf268	2023-10-30 00:09:40.376+00	2022-01-06 00:09:40.376+00	\N
142	71		__init__	.py	text/x-python-script	47	7938a97199eee293bf5cac71e31dcdbdc7e321d98059351225d260ac5fddc088	2023-10-30 00:09:40.376+00	2022-01-06 00:09:40.376+00	\N
143	72		metadata	.json	application/json	254	1beb2cde9f5310d2ebeb5f4e0db9ef37b4e826bc4be9d4980bd6704b415d129b	2024-03-21 13:24:49.528+00	2023-05-02 13:24:49.528+00	\N
144	72		__init__	.py	text/x-python-script	43	28b64f0ce701ddf289d03b5a3ef0674bbd50a6e6fffc55e3c5b45f3f3715f273	2024-03-21 13:24:49.528+00	2023-05-02 13:24:49.528+00	\N
145	73		metadata	.json	application/json	268	209bbc910ec3dcb0aabd4befd3a3613fbc65e7ee2eb9c0d5d319ea7cf3dcb5aa	2024-09-17 15:44:08.672+00	2022-09-22 15:44:08.672+00	\N
146	73		__init__	.py	text/x-python-script	45	f9e8c7db9f201b98aa2b79a4254c25723f9db416497e0a5b2d7a6b1ddd9df91e	2024-09-17 15:44:08.672+00	2022-09-22 15:44:08.672+00	\N
147	74		metadata	.json	application/json	261	8cc00818e64140db9ef0dd3bc20bba7908f62f956ca933b4b20603f077e23661	2024-02-06 15:06:27.832+00	2024-02-06 15:06:27.832+00	\N
148	74		__init__	.py	text/x-python-script	48	6a7087ed5f4a1b8d1a1e1fdfc9dc6aee880c437ab802dced59b2847823e7892e	2024-02-06 15:06:27.832+00	2024-02-06 15:06:27.832+00	\N
149	75		metadata	.json	application/json	250	bf24270c9379705fa556cf94a89c78c436d1d80cb88c1e8d005e3e09490d5ca1	2024-11-04 09:30:30.72+00	2021-11-16 09:30:30.72+00	\N
150	75		__init__	.py	text/x-python-script	41	4dba8d670aa18bfafd092ed9bdb05b84bf2e3d7893cde361df931fc4f2d46359	2024-11-04 09:30:30.72+00	2021-11-16 09:30:30.72+00	\N
151	76		metadata	.json	application/json	270	2e8ba44c34500c7ae5c25d0cd728fa4b256a1d80fe92da614a94f282b7c70795	2023-10-26 10:11:48.928+00	2023-07-22 10:11:48.928+00	\N
152	76		__init__	.py	text/x-python-script	50	936a2c7790fbe46763b8b28c662ddb4da6a375a263dea71473a1c5501b939569	2023-10-26 10:11:48.928+00	2023-07-22 10:11:48.928+00	\N
153	77		metadata	.json	application/json	245	5fa165e2823a38176d730263acfb83b0d4c9c6c3e8b78fee78da95c1b3fa5dbd	2024-06-13 23:31:30.01+00	2022-01-23 23:31:30.01+00	\N
154	77		__init__	.py	text/x-python-script	45	fca41a7f0aa6a83fd44c8aa67414841f5bb7f1b7b7b4b2c0c3fa92668c49dae5	2024-06-13 23:31:30.01+00	2022-01-23 23:31:30.01+00	\N
155	78		metadata	.json	application/json	253	fcab64060f9c15b31f7443323c61d841adbfd5dff9e9bd1b0a44d5174f9bf7da	2024-08-21 00:04:19.212+00	2023-11-19 00:04:19.212+00	\N
156	78		__init__	.py	text/x-python-script	43	1a5f59cfb4f864a6aaf638f94834ed1e33d810617fb85524fb6555d29cd1e87d	2024-08-21 00:04:19.212+00	2023-11-19 00:04:19.212+00	\N
157	79		metadata	.json	application/json	267	ba6452719a39c861e03817263cf19aa41362ed2e13d07d4a9c43dad3461c4945	2024-11-08 06:16:09.328+00	2024-04-30 06:16:09.328+00	\N
158	79		__init__	.py	text/x-python-script	46	1df62b4ba6be0d38231cfd284df235ea5b82f836e36a9aad4f1a2a2e09967c3e	2024-11-08 06:16:09.328+00	2024-04-30 06:16:09.328+00	\N
159	80		metadata	.json	application/json	259	6089a874b7d34ace9e310ed96b5987f2d5c70f5edc9d41feda864dc25af0c328	2023-07-25 16:37:02.9+00	2022-12-09 16:37:02.9+00	\N
160	80		__init__	.py	text/x-python-script	47	4348b45e8dda4ab0f6195f1840e2765771fa2d6b51f0355b93f432d4df118fa3	2023-07-25 16:37:02.9+00	2022-12-09 16:37:02.9+00	\N
161	81		metadata	.json	application/json	258	a7bbd9ff8c7bfb4841892bac567418ebd6de8dac220cab594be9cbd3b542a21d	2024-02-08 21:20:39.392+00	2021-12-30 21:20:39.392+00	\N
162	81		__init__	.py	text/x-python-script	44	f208c9f2d6dcc003fb3a896c8e66377e92ca86ea6fd8e9bac021989f615888e5	2024-02-08 21:20:39.392+00	2021-12-30 21:20:39.392+00	\N
163	82		metadata	.json	application/json	262	70986c09bbe77b58b78df1c91b11ef98974a44d78b8fab1a52e5dff5224728b2	2024-07-03 00:30:41.76+00	2022-11-17 00:30:41.76+00	\N
164	82		__init__	.py	text/x-python-script	45	fae3aefade81eb10b9ea0374dc66853a5005aadb179139934f9e5294c4d91aab	2024-07-03 00:30:41.76+00	2022-11-17 00:30:41.76+00	\N
165	83		metadata	.json	application/json	259	5c35248dc48491e17dc138238435456254b281793fcf34dee5308a64ef2e1612	2024-08-28 13:28:10.656+00	2024-08-02 13:28:10.656+00	\N
166	83		__init__	.py	text/x-python-script	45	2ee69c2783edeaa28e5f02d6869c5dca87858160de785647a370b97cffe1defc	2024-08-28 13:28:10.656+00	2024-08-02 13:28:10.656+00	\N
167	84		metadata	.json	application/json	247	55ff02068bb494ed1910cee8899844d91846117e5aced13c7cf2c7d07f26fa08	2023-05-19 23:17:49.24+00	2023-05-19 23:17:49.24+00	\N
168	84		__init__	.py	text/x-python-script	43	0192c9c46c8e325d5b3e14ee04ae44fd95479d2aeb3af2bd571839796c49b8de	2023-05-19 23:17:49.24+00	2023-05-19 23:17:49.24+00	\N
169	85		metadata	.json	application/json	261	8a6de6d6cbe580f9fa63dd24d545a8bd1a7e2204b4588e4f010daac6b90f221e	2023-11-14 01:27:48.624+00	2022-11-11 01:27:48.624+00	\N
170	85		__init__	.py	text/x-python-script	45	7d67ad149f3a761bb8469e50c44920b0de2be3570a46f806aa6cec210950fb82	2023-11-14 01:27:48.624+00	2022-11-11 01:27:48.624+00	\N
171	86		metadata	.json	application/json	258	636b6b0bb15bbae9e036e485dc387a399a9047be3703160a9a1bc768c281952b	2023-05-28 22:05:38.88+00	2022-11-09 22:05:38.88+00	\N
172	86		__init__	.py	text/x-python-script	43	77b01f39a2edefccd41f8fb2fbb0a4ea7fa5cfbcbf9530ee81b4119970d41759	2023-05-28 22:05:38.88+00	2022-11-09 22:05:38.88+00	\N
173	87		metadata	.json	application/json	264	37eb7545346e3008a3c380080a3fd953927212594b1d38e33007ab8d43b4ca94	2024-12-02 15:18:25.584+00	2023-09-13 15:18:25.584+00	\N
174	87		__init__	.py	text/x-python-script	46	0372f6128e21d37905c799ccc3247caab8e32f894901fe246f187622001b9318	2024-12-02 15:18:25.584+00	2023-09-13 15:18:25.584+00	\N
180	90		metadata	.json	application/json	285	75c895affbbc385de1b3d8e03c43040ab91c21efc8c8acd42d93082b88c0ff6e	2024-10-30 02:46:51.36+00	2021-11-09 02:46:51.36+00	\N
182	91		metadata	.json	application/json	278	8ce0bbf3dc35f30a495e16192c116fbdf633f08fbac948d9fcb46593f8542664	2023-06-07 06:49:56.772+00	2023-02-19 06:49:56.772+00	\N
178	89		metadata	.json	application/json	281	2948e99d22d5ac2de50a5c6a785008bcf1eda516d3e047b15e402706fbcba4e1	2023-11-03 11:28:12.74+00	2023-11-03 11:28:12.74+00	\N
176	88		metadata	.json	application/json	286	1f4d5b318a2139beec2517700780dc8c22ece9dda55a3f0b1a7dc0761d14dce4	2024-11-01 13:12:19.376+00	2022-09-05 13:12:19.376+00	\N
190	95		metadata	.json	application/json	284	f3259f0118306aa4a6631a940e47679bfec886b034403f7df2dd2d2b1f0883b4	2023-07-29 11:14:20.224+00	2023-07-29 11:14:20.224+00	\N
244	122		metadata	.json	application/json	282	0c3977ab059c87b97967d4219fea79aa1b4de2d4f8969801d2c37a34b2c4128b	2023-11-03 05:05:47.504+00	2023-09-22 05:05:47.504+00	\N
200	100		metadata	.json	application/json	280	5e6d84a2610f3cb301880ff80e3b7595f1f0256c74d8c0d9fad6a523f97acc04	2023-06-19 17:13:46.448+00	2023-06-19 17:13:46.448+00	\N
216	108		metadata	.json	application/json	286	01502c8b3b9c077179a50c518bcbde93dcce97f2ef7423efc64869a5092eb271	2024-08-16 03:07:57.756+00	2024-08-16 03:07:57.756+00	\N
181	91		__init__	.py	text/x-python-script	49	a938bf6644bc468b6f0315a07322f9cd659f7940a641e0b6a28a66f0d20b443f	2023-06-07 06:49:56.772+00	2023-02-19 06:49:56.772+00	\N
175	88		__init__	.py	text/x-python-script	48	8a0f66fd92bb888c9fca54ad993b083dcf046587dfc392b51e02966fb6eb4527	2024-11-01 13:12:19.376+00	2022-09-05 13:12:19.376+00	\N
189	95		__init__	.py	text/x-python-script	47	270e3449aeb1ba6e0fd6f34528f16099af7dc385cad560a02f78a838c8b0d579	2023-07-29 11:14:20.224+00	2023-07-29 11:14:20.224+00	\N
179	90		__init__	.py	text/x-python-script	48	5995a2e39ebebbbd06de5673ae97b05148195b1f153efd18df093c0a33144e7b	2024-10-30 02:46:51.36+00	2021-11-09 02:46:51.36+00	\N
177	89		__init__	.py	text/x-python-script	50	c2817d22e9cd6fc3e635cf0dfe98065c109cc98dc11dff4e7028476230b46f75	2023-11-03 11:28:12.74+00	2023-11-03 11:28:12.74+00	\N
243	122		__init__	.py	text/x-python-script	48	a69d84232969e740f87fad3c27daaa7fb77c244d38eea2e8aa536d35118e7a6e	2023-11-03 05:05:47.504+00	2023-09-22 05:05:47.504+00	\N
215	108		__init__	.py	text/x-python-script	51	8fee76935452d51549e75a4de4b0383dcf3f556faed30869f592ab0ea3ba9075	2024-08-16 03:07:57.756+00	2024-08-16 03:07:57.756+00	\N
199	100		__init__	.py	text/x-python-script	47	d2346b56f64ef0590e2e8d9c5beda5f753d76d674ea172ecf2aa72518d760509	2023-06-19 17:13:46.448+00	2023-06-19 17:13:46.448+00	\N
184	92		metadata	.json	application/json	284	1c30c89068a71c00b03b3f8b67cb610bfd1a8476e4ca44f3910003c2e650b1a0	2023-11-17 23:23:23.636+00	2023-02-26 23:23:23.636+00	\N
214	107		metadata	.json	application/json	288	9811d9f234d45b1655576d07fca6d016311452ddc1bc57b9a606b81f9f7579b3	2024-02-02 22:52:43.168+00	2022-06-10 22:52:43.168+00	\N
222	111		metadata	.json	application/json	281	64190cc23ed042c8e529e3d576b62379f33c0d7cc87ef7dd44f22d8bd1032cac	2024-10-22 09:43:30.528+00	2023-11-19 09:43:30.528+00	\N
254	127		metadata	.json	application/json	277	426a34fd63046b179e3e2f64294ffcf436db5af5b86f6bfdc0502563fba6bf3e	2024-01-25 00:59:51.064+00	2022-06-04 00:59:51.064+00	\N
239	119		metadata	.json	application/json	273	1de047db554028339fec7fc10d454dc9c31b5553b005d96b331fd71f11f0f301	2024-01-25 11:02:05.24+00	2021-09-11 11:02:05.24+00	\N
183	92		__init__	.py	text/x-python-script	51	3dd37d327367cda17065811c80b9bdd95929b74867f3deac0542665cf10d57bb	2023-11-17 23:23:23.636+00	2023-02-26 23:23:23.636+00	\N
212	107		__init__	.py	text/x-python-script	48	0134dc43b24704e67f022f16c6758dea460b4fa6523db780984efe6f28d8792d	2024-02-02 22:52:43.168+00	2022-06-10 22:52:43.168+00	\N
253	127		__init__	.py	text/x-python-script	48	b018db3f7742e6f4627662fe6cd31509b485bd2b13be4001457e61b6a1f0503a	2024-01-25 00:59:51.064+00	2022-06-04 00:59:51.064+00	\N
237	119		__init__	.py	text/x-python-script	47	9d1fcf7acd50934cf26f3c525e40fa356fe239538730c3adca0be308095f63d1	2024-01-25 11:02:05.24+00	2021-09-11 11:02:05.24+00	\N
221	111		__init__	.py	text/x-python-script	47	c9baa6a954aa021dd0c176ae20c5630dadff634d5eabbd3f5ca5dd6a22b8e8ba	2024-10-22 09:43:30.528+00	2023-11-19 09:43:30.528+00	\N
186	93		metadata	.json	application/json	287	2a9420c98ee74c874bbdb017660bc36e2b0a3aa1e0d347495dfc585c99f9ea49	2023-07-14 16:45:35.488+00	2023-07-14 16:45:35.488+00	\N
204	102		metadata	.json	application/json	283	3692491b65fc06792ba0270691569d53d72ba9ff8a6292d03046664497b4e3a2	2023-11-24 22:55:24.164+00	2021-09-01 22:55:24.164+00	\N
231	116		metadata	.json	application/json	288	b1864705ab0c8db704b75bf2da8be65fb0d8a4f0ee1a09e721c333329d8cc0e9	2024-11-03 20:03:16.06+00	2023-01-31 20:03:16.06+00	\N
256	128		metadata	.json	application/json	275	3766e620f2c078a1b8d0a1a6d28043c1e1d0d630b2de109247d13d4eec9e8072	2024-09-21 04:03:11.048+00	2023-12-28 04:03:11.048+00	\N
185	93		__init__	.py	text/x-python-script	48	06be8a9070b4dc6e8bb61b38f0d5617291979120319d788b703dfc900117507f	2023-07-14 16:45:35.488+00	2023-07-14 16:45:35.488+00	\N
203	102		__init__	.py	text/x-python-script	50	a2e8a9c7bb44eb942e3a916c41dabf639615ae62e1e6879eba3607b2e45e3616	2023-11-24 22:55:24.164+00	2021-09-01 22:55:24.164+00	\N
227	116		__init__	.py	text/x-python-script	49	8b77c6f42292391766efbbab3af4127c11793e024c40e5ebe777033724462c99	2024-11-03 20:03:16.06+00	2023-01-31 20:03:16.06+00	\N
255	128		__init__	.py	text/x-python-script	47	60c9504633d3e1d0981d89287de54473e50b7a6e0a85c4734e5d71d53ccf6ff4	2024-09-21 04:03:11.048+00	2023-12-28 04:03:11.048+00	\N
206	103		metadata	.json	application/json	289	2d6b717fe7b67fdd6381145feac7e936728569503ff2eef0f1f3cbdf0be76d60	2023-09-29 03:29:47.696+00	2023-09-29 03:29:47.696+00	\N
188	94		metadata	.json	application/json	282	dea20e4ca92fee8d5246516751a9bf0e55c1316f0f9340eb8678f2d8a3ad142b	2024-08-16 21:30:54.256+00	2022-11-23 21:30:54.256+00	\N
233	115		metadata	.json	application/json	281	0a4d25fbc763e453ccf9ea2529fad57dda180094b3a8d0f461ac1024a356f6f1	2023-06-14 14:37:26.096+00	2022-08-14 14:37:26.096+00	\N
252	126		metadata	.json	application/json	289	966e2bc2b609ada5a384009161cb813ef04f116cff1dde6918984d46f968a947	2023-07-04 20:36:02.72+00	2023-07-04 20:36:02.72+00	\N
205	103		__init__	.py	text/x-python-script	51	a61c8a8a21d97d5f10b3cf2c359ac64cfb3dbf56b018f7fb3647180d7411814a	2023-09-29 03:29:47.696+00	2023-09-29 03:29:47.696+00	\N
251	126		__init__	.py	text/x-python-script	51	d85e38261ef68818507a77cadf22802fc4c9e674c9e138518cd60c71586e4f55	2023-07-04 20:36:02.72+00	2023-07-04 20:36:02.72+00	\N
187	94		__init__	.py	text/x-python-script	48	b8f5e2627f1de0b6a2970f69a0b6bf9c8f827c9200f664a6215580331c71f6b5	2024-08-16 21:30:54.256+00	2022-11-23 21:30:54.256+00	\N
229	115		__init__	.py	text/x-python-script	47	4486567630b385b39ecbcc7f16e313ff4382f3bf2e9fa46667106196d8085dcc	2023-06-14 14:37:26.096+00	2022-08-14 14:37:26.096+00	\N
192	96		metadata	.json	application/json	286	7109f7dd7de17e573aa6ad0c3d164588ef3ca74b0a501fcc913e10dade3f78c7	2024-05-18 00:02:21.456+00	2023-10-13 00:02:21.456+00	\N
240	120		metadata	.json	application/json	282	2ef4f62c266a037f70d4e9fb8e8f41cff9e6c3a247be95ac56267d0120ab7a8e	2024-05-07 06:19:17.712+00	2023-04-19 06:19:17.712+00	\N
213	106		metadata	.json	application/json	280	df6e3519916da6ef75678b330eb135b69f4a0ba43facef04dbcc42807aa29b73	2024-11-12 18:51:09.944+00	2024-08-18 18:51:09.944+00	\N
258	129		metadata	.json	application/json	289	8a3a6980bad76d56078113353eea27437cde2df5ec03def7fd7ce91e8e41762e	2024-08-30 08:26:56.096+00	2021-09-05 08:26:56.096+00	\N
211	106		__init__	.py	text/x-python-script	50	49d5966c499ae897db9396cb90a4b51e3e7cfea17fa1055ccd7cba9647649637	2024-11-12 18:51:09.944+00	2024-08-18 18:51:09.944+00	\N
191	96		__init__	.py	text/x-python-script	50	4b66d712ccaa4d8cfd5799c122177e4dedc88820b944c4f1a966ec31481f5ec5	2024-05-18 00:02:21.456+00	2023-10-13 00:02:21.456+00	\N
238	120		__init__	.py	text/x-python-script	48	ee9172c740c482e526dfc81882febbafd26435cbc07508db20de7b3eed189e60	2024-05-07 06:19:17.712+00	2023-04-19 06:19:17.712+00	\N
257	129		__init__	.py	text/x-python-script	49	5b9922bc97b874c243709f73a7df4ce53363303d33241ee0727bd5daca9e9aee	2024-08-30 08:26:56.096+00	2021-09-05 08:26:56.096+00	\N
194	97		metadata	.json	application/json	283	7eca2d6f7f8bfaddf95b49d188fce64f4cf5eeed8f68c69b243b4028563ddb7f	2024-01-15 06:15:05.696+00	2021-10-25 06:15:05.696+00	\N
232	114		metadata	.json	application/json	273	6cfbce48f06809b84984ff5d2ee8f5f0be8d623b24420cd3db6fc29e71f7f3b5	2023-12-21 17:42:11.64+00	2022-09-21 17:42:11.64+00	\N
210	105		metadata	.json	application/json	287	64d602ba0b24c0d4203f53ed496ee3433d8c1e8ecdfd19f23079c3f8e0a96d63	2024-10-21 16:26:33.936+00	2023-05-18 16:26:33.936+00	\N
260	130		metadata	.json	application/json	291	430dc8e7f8e2478304091076be9e36439b00a60aed86e3053bb9b028d5f9f198	2023-11-23 09:45:55.072+00	2023-11-23 09:45:55.072+00	\N
193	97		__init__	.py	text/x-python-script	47	83b565d57bd5f3ea3c939738f35ceff9f32d7d943f06e09d110763be04547f83	2024-01-15 06:15:05.696+00	2021-10-25 06:15:05.696+00	\N
228	114		__init__	.py	text/x-python-script	47	caacea4cb68d883be471155049ceb52f67f07e7fcbe24679ff1b4bb96aa3b7aa	2023-12-21 17:42:11.64+00	2022-09-21 17:42:11.64+00	\N
209	105		__init__	.py	text/x-python-script	48	6856aaa3543631f1281aaa540d842d43cd6c203af258379ee407f574f382d430	2024-10-21 16:26:33.936+00	2023-05-18 16:26:33.936+00	\N
259	130		__init__	.py	text/x-python-script	48	b769e0614b80143d870a1771cf7d52e1a682cec1229d985a9691c244b3d20750	2023-11-23 09:45:55.072+00	2023-11-23 09:45:55.072+00	\N
196	98		metadata	.json	application/json	273	9b85d4516f18a14dd35aa574c1d59215305a57e1cbaa5781dbec753eb47754d2	2023-07-17 14:27:29.464+00	2023-07-17 14:27:29.464+00	\N
218	109		metadata	.json	application/json	275	56109b8c5acd60f9be54411bf7264c1d3b7bdb845a8226dc272f40289b58b3d0	2024-11-07 01:09:31.666+00	2024-04-27 01:09:31.666+00	\N
226	113		metadata	.json	application/json	274	5799522bdfcc463d2216bc24faac505f4330491f89ba9fdbfaa87a5185081b38	2024-08-22 14:13:04.708+00	2023-10-15 14:13:04.708+00	\N
246	123		metadata	.json	application/json	287	31a74d98630785670ff67dcdc7910da412180c8bb0d86d18385c5c160f143646	2023-10-19 20:19:20.66+00	2022-11-19 20:19:20.66+00	\N
195	98		__init__	.py	text/x-python-script	47	4eb615ed7c49a77dac448d2628d2627277826a837bcfe387cb2739cd975fc441	2023-07-17 14:27:29.464+00	2023-07-17 14:27:29.464+00	\N
225	113		__init__	.py	text/x-python-script	48	c650c2c8d58deaa6ba2103173ddfc68bfd9384dfdeaffc355c1906aa2bc25df0	2024-08-22 14:13:04.708+00	2023-10-15 14:13:04.708+00	\N
217	109		__init__	.py	text/x-python-script	51	ad6552f342cc31db10df955e1c5848019ade9be1522321cdce5528eee0798925	2024-11-07 01:09:31.666+00	2024-04-27 01:09:31.666+00	\N
245	123		__init__	.py	text/x-python-script	51	efc9bc1a44ef97cfbbbcecbd9e018bc625dc3d5d83b523eec7d7ad7a9d4a1841	2023-10-19 20:19:20.66+00	2022-11-19 20:19:20.66+00	\N
198	99		metadata	.json	application/json	288	0ad1cfbc9e092c07b42f5b792cf350ae98abeb7f58b17fa540f73d2cb3234419	2023-11-30 00:51:54.112+00	2022-04-21 00:51:54.112+00	\N
208	104		metadata	.json	application/json	268	abe9d5ecbe2d8264397ff7b093c351ba049b91bc72b74df483bde7afb2fc1840	2024-10-10 18:13:06.836+00	2022-04-16 18:13:06.836+00	\N
224	112		metadata	.json	application/json	269	0aad7d7faf26f13ef30ad7a534f274ed05c860c9e38ee97a7237d7bc7691deb7	2023-12-01 19:06:24.404+00	2021-11-19 19:06:24.404+00	\N
242	121		metadata	.json	application/json	285	9ba7fc37497a1ff66f8a0b4d43529f01e9c93e87dc5e32633302d28763741910	2024-10-14 10:09:17.8+00	2024-10-14 10:09:17.8+00	\N
197	99		__init__	.py	text/x-python-script	49	d530a490e57073b18cca9383f14ad9ef9a72fa485988b0ea501d5d284c3b6af9	2023-11-30 00:51:54.112+00	2022-04-21 00:51:54.112+00	\N
241	121		__init__	.py	text/x-python-script	50	0e05f466b44d016968ff2bc98fd736091277ca471450af863f16a7d9657d6cf2	2024-10-14 10:09:17.8+00	2024-10-14 10:09:17.8+00	\N
223	112		__init__	.py	text/x-python-script	46	a411da82f0003e47b51912624fe5ce40ce9d3a8225d74fe5500eefe2e75cffc6	2023-12-01 19:06:24.404+00	2021-11-19 19:06:24.404+00	\N
207	104		__init__	.py	text/x-python-script	45	702a43148b9d07ea886b9e6159fcfd92cb74431dc5cd7445c9793293ea323889	2024-10-10 18:13:06.836+00	2022-04-16 18:13:06.836+00	\N
202	101		metadata	.json	application/json	286	dcb4642bd5291c2d319435c3f86a8158cb910ba0cbf66e44fc182742b311a764	2024-03-30 14:40:52.96+00	2021-10-16 14:40:52.96+00	\N
235	117		metadata	.json	application/json	294	78713bc1e450432e134209d6ca97ef457356079e304f42a88ab29fd10d782bac	2024-09-17 05:22:36.352+00	2023-05-18 05:22:36.352+00	\N
250	125		metadata	.json	application/json	282	8404b997c8f4136c0e610302f4596908a112062d384f0cc3313cfcdaff6058a1	2024-05-23 17:26:04.668+00	2024-02-13 17:26:04.668+00	\N
201	101		__init__	.py	text/x-python-script	50	4070416c66c9d17e9226406ca53f473d7aa7503af7022a899bc9dac4c5e7b478	2024-03-30 14:40:52.96+00	2021-10-16 14:40:52.96+00	\N
230	117		__init__	.py	text/x-python-script	51	e0c404801037f32774858e363678c4ec7979aedd552d291dbd95445b5c05d196	2024-09-17 05:22:36.352+00	2023-05-18 05:22:36.352+00	\N
248	125		__init__	.py	text/x-python-script	50	575b4644695bd14f158ac81013ee96ea1ad96e69cec11e007a2ecf85f19e5eee	2024-05-23 17:26:04.668+00	2024-02-13 17:26:04.668+00	\N
220	110		metadata	.json	application/json	289	a8875ab2fda1f8bd078272796fef118f68b561d90cd472a807efb6bbb3b1c0ea	2023-12-13 15:53:56.304+00	2022-06-07 15:53:56.304+00	\N
249	124		metadata	.json	application/json	278	86d9f87d6066b002fb4e194cb054a14d6672477ee737b1ed22addeab481242fb	2024-07-01 10:51:30.84+00	2022-05-21 10:51:30.84+00	\N
236	118		metadata	.json	application/json	286	aa041073f33e321bd3c2df28e806e2ecfe3475a408bbe1999271552a3bb2dd99	2024-03-03 03:17:23.68+00	2024-03-03 03:17:23.68+00	\N
219	110		__init__	.py	text/x-python-script	49	3bdb7ca7a34cae73645fcb0d4c5c9bfa20c467a3343f6bf40502b2c629a0524e	2023-12-13 15:53:56.304+00	2022-06-07 15:53:56.304+00	\N
234	118		__init__	.py	text/x-python-script	49	8b214968aa5463a3dabb46405f845cbd1aaf53fb50ef3dde762d95f1fa570542	2024-03-03 03:17:23.68+00	2024-03-03 03:17:23.68+00	\N
247	124		__init__	.py	text/x-python-script	50	a60ca3d84158cfca37a76e0d94d202f90da78559ab053c52afef2647097671f9	2024-07-01 10:51:30.84+00	2022-05-21 10:51:30.84+00	\N
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.migrations (id, name, run_on) FROM stdin;
1	/20241116085102-initialize	2025-01-19 18:31:41.991
2	/20250113193413-files-table	2025-01-19 18:31:41.996
4	/20250316100239-store-file-data-in-db	2025-03-16 16:02:53.917
6	/20250411184700-latest-version	2025-04-13 07:31:17.787
7	/20250419173018-cleanup-deleted-at	2025-04-21 09:24:13.806
\.


--
-- Data for Name: project_statuses_on_badges; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.project_statuses_on_badges (id, project_slug, badge_slug, status, created_at, updated_at) FROM stdin;
1	codecraft	why2025	\N	2024-11-07 20:01:14.388+00	2022-05-18 20:01:14.388+00
2	pixelpulse	troopers23	\N	2023-12-10 10:43:55.368+00	2023-08-14 10:43:55.368+00
3	bitblast	why2025	\N	2024-07-25 06:33:51.392+00	2023-02-07 06:33:51.392+00
4	nanogames	why2025	\N	2024-08-05 08:59:47.656+00	2024-08-05 08:59:47.656+00
5	electraplay	mch2022	\N	2023-06-09 19:55:48.12+00	2023-06-09 19:55:48.12+00
6	circuitforge	mch2022	\N	2023-06-15 12:00:26.696+00	2023-06-15 12:00:26.696+00
7	bytebash	mch2022	\N	2023-12-11 12:03:17.632+00	2021-09-10 12:03:17.632+00
8	codecanvas	troopers23	\N	2024-06-11 23:48:14.539+00	2022-08-07 23:48:14.539+00
9	sparkscript	troopers23	\N	2024-04-13 20:12:45.59+00	2023-05-05 20:12:45.59+00
10	logicland	mch2022	\N	2023-12-11 04:19:14.792+00	2023-12-11 04:19:14.792+00
11	microarcade	troopers23	\N	2024-01-30 20:04:11.248+00	2023-08-21 20:04:11.248+00
12	codecraze	mch2022	\N	2024-09-21 01:22:30.832+00	2024-06-19 01:22:30.832+00
13	gamegenius	troopers23	\N	2024-04-17 03:54:00.902+00	2024-04-17 03:54:00.902+00
14	pixelpal	why2025	\N	2023-09-29 06:43:43.152+00	2023-09-29 06:43:43.152+00
15	electronica	mch2022	\N	2023-06-17 18:50:17.408+00	2022-11-11 18:50:17.408+00
16	codequest	mch2022	\N	2024-03-10 03:12:04.579+00	2022-06-17 03:12:04.579+00
17	circuitcraft	troopers23	\N	2024-09-08 18:29:58.832+00	2024-04-21 18:29:58.832+00
18	bytebeat	troopers23	\N	2024-12-19 05:39:43.208+00	2023-02-10 05:39:43.208+00
19	nanonexus	mch2022	\N	2023-12-28 14:52:17.408+00	2023-02-01 14:52:17.408+00
20	bitbox	troopers23	\N	2024-04-10 16:50:34.478+00	2023-02-19 16:50:34.478+00
21	circuitchaos	troopers23	\N	2024-06-01 02:20:39.728+00	2024-06-01 02:20:39.728+00
22	codecrafter	why2025	\N	2024-04-02 08:12:55.4+00	2023-12-22 08:12:55.4+00
23	pixelpioneer	why2025	\N	2024-11-18 21:19:06.592+00	2024-11-18 21:19:06.592+00
24	logiclab	why2025	\N	2024-07-20 03:27:57.68+00	2022-03-05 03:27:57.68+00
25	byteblitz	why2025	\N	2024-12-29 13:14:11.264+00	2022-01-12 13:14:11.264+00
26	codewave	mch2022	\N	2023-07-03 18:29:30.064+00	2023-03-13 18:29:30.064+00
27	nanonet	why2025	\N	2023-11-14 14:04:15.904+00	2022-09-16 14:04:15.904+00
28	electraforge	troopers23	\N	2023-12-27 23:09:16.064+00	2022-03-25 23:09:16.064+00
29	gamegrid	why2025	\N	2023-12-12 01:57:31.408+00	2023-03-15 01:57:31.408+00
30	logicloom	mch2022	\N	2023-07-06 21:00:46.512+00	2022-12-02 21:00:46.512+00
31	pixelplaza	mch2022	\N	2024-09-07 03:30:31.748+00	2022-11-05 03:30:31.748+00
32	codecity	troopers23	\N	2023-12-04 16:58:11.922+00	2021-09-19 16:58:11.922+00
33	nanoarcade	mch2022	\N	2024-12-04 16:56:56.28+00	2022-03-30 16:56:56.28+00
34	electronera	troopers23	\N	2024-04-12 13:13:14.032+00	2023-12-12 13:13:14.032+00
35	bitbazaar	mch2022	\N	2023-08-29 08:16:32.216+00	2021-12-15 08:16:32.216+00
36	logiclegends	mch2022	\N	2023-05-29 06:01:08.68+00	2023-05-29 06:01:08.68+00
37	codeclan	troopers23	\N	2024-02-29 23:41:42.936+00	2023-03-16 23:41:42.936+00
38	pixelportal	troopers23	\N	2024-08-18 17:15:06.796+00	2022-10-22 17:15:06.796+00
39	circuitcraze	mch2022	\N	2024-11-26 02:48:17.168+00	2022-11-17 02:48:17.168+00
40	bytebuster	mch2022	\N	2024-03-07 23:04:32.056+00	2024-03-07 23:04:32.056+00
41	nanonovel	mch2022	\N	2024-10-31 14:27:21.008+00	2023-08-12 14:27:21.008+00
42	electraeden	why2025	\N	2024-04-12 14:05:40.384+00	2023-06-29 14:05:40.384+00
43	codecomet	troopers23	\N	2023-05-31 06:49:10.1+00	2023-05-31 06:49:10.1+00
44	pixelplayground	mch2022	\N	2023-09-02 17:47:37.36+00	2023-08-05 17:47:37.36+00
45	logiclandia	troopers23	\N	2024-03-03 20:57:31.089+00	2024-03-03 20:57:31.089+00
46	bytebounce	why2025	\N	2024-04-29 23:26:06.16+00	2022-12-08 23:26:06.16+00
47	circuitcarnival	mch2022	\N	2024-01-25 18:23:29.568+00	2022-03-04 18:23:29.568+00
48	codecove	troopers23	\N	2023-10-24 05:12:26.596+00	2022-05-26 05:12:26.596+00
49	nanonest	mch2022	\N	2023-05-23 14:44:11.008+00	2023-01-23 14:44:11.008+00
50	electraentertain	troopers23	\N	2024-05-25 23:22:46.863+00	2022-07-09 23:22:46.863+00
51	gamegalaxy	why2025	\N	2024-03-01 03:17:17.016+00	2023-02-05 03:17:17.016+00
52	logiclabyrinth	mch2022	\N	2024-10-18 14:25:10.464+00	2023-07-04 14:25:10.464+00
53	byteblaster	why2025	\N	2023-10-25 21:03:03.235+00	2022-07-02 21:03:03.235+00
54	codecompass	troopers23	\N	2024-11-22 04:55:43.36+00	2023-04-24 04:55:43.36+00
55	nanonation	mch2022	\N	2024-01-27 21:20:11.08+00	2023-01-30 21:20:11.08+00
56	electraempire	mch2022	\N	2023-07-21 21:29:11.92+00	2022-05-11 21:29:11.92+00
57	gamegarden	why2025	\N	2023-12-16 17:35:05.576+00	2023-10-31 17:35:05.576+00
58	pixelpeak	mch2022	\N	2024-02-24 22:18:34.504+00	2023-08-24 22:18:34.504+00
59	circuitcelestial	troopers23	\N	2023-06-17 08:27:24.68+00	2023-06-17 08:27:24.68+00
60	codecrusade	mch2022	\N	2024-04-26 12:39:35.448+00	2023-02-19 12:39:35.448+00
61	nanonebula	mch2022	\N	2024-09-26 10:13:37.032+00	2024-09-26 10:13:37.032+00
62	electraenclave	why2025	\N	2024-12-01 08:15:50.832+00	2024-01-24 08:15:50.832+00
63	gamegizmo	troopers23	\N	2023-11-22 09:22:44.216+00	2023-02-01 09:22:44.216+00
64	pixelplanet	troopers23	\N	2024-09-22 13:39:03.864+00	2022-03-11 13:39:03.864+00
65	logiclounge	why2025	\N	2023-08-10 21:03:30.104+00	2022-11-01 21:03:30.104+00
66	bytebeacon	why2025	\N	2023-12-26 11:52:34.192+00	2023-12-26 11:52:34.192+00
67	codecircus	why2025	\N	2023-09-09 05:56:05.296+00	2022-02-28 05:56:05.296+00
68	nanonook	mch2022	\N	2024-07-14 02:11:15.752+00	2023-07-30 02:11:15.752+00
69	electraelysium	why2025	\N	2023-10-22 19:28:44.032+00	2023-10-04 19:28:44.032+00
70	gameglimpse	troopers23	\N	2024-03-28 04:53:31.368+00	2024-03-28 04:53:31.368+00
71	pixelparadise	mch2022	\N	2023-11-20 13:17:16.312+00	2023-11-20 13:17:16.312+00
72	codecoast	mch2022	\N	2023-10-15 07:25:47.224+00	2022-10-26 07:25:47.224+00
73	nanonirvana	why2025	\N	2023-09-13 05:15:34.664+00	2023-09-13 05:15:34.664+00
74	electraedifice	troopers23	\N	2024-06-05 16:47:24.008+00	2024-01-19 16:47:24.008+00
75	gamegen	troopers23	\N	2024-10-01 12:10:29.672+00	2024-02-14 12:10:29.672+00
76	pixelpandemonium	mch2022	\N	2023-10-26 19:28:52.784+00	2022-05-22 19:28:52.784+00
77	logiclagoon	mch2022	\N	2024-10-15 04:58:56.68+00	2024-04-24 04:58:56.68+00
78	byteblaze	mch2022	\N	2024-06-16 21:39:16.968+00	2024-03-08 21:39:16.968+00
79	codecorridor	mch2022	\N	2023-12-03 20:29:53.224+00	2023-12-03 20:29:53.224+00
80	hacksimulator	why2025	\N	2024-05-08 11:29:05.864+00	2023-09-15 11:29:05.864+00
81	codecrunch	mch2022	\N	2023-06-04 17:17:03.48+00	2023-06-04 17:17:03.48+00
82	securecraft	troopers23	\N	2023-12-27 08:04:32.152+00	2023-12-01 08:04:32.152+00
83	cryptopulse	troopers23	\N	2023-07-15 13:58:07.04+00	2023-07-15 13:58:07.04+00
84	dataforge	why2025	\N	2023-10-27 16:42:58.4+00	2023-03-09 16:42:58.4+00
85	cipherquest	troopers23	\N	2023-06-06 06:43:53.32+00	2021-08-17 06:43:53.32+00
86	hackquest	why2025	\N	2023-08-14 16:53:58.984+00	2023-08-14 16:53:58.984+00
87	securesphere	troopers23	\N	2024-07-16 15:58:59.816+00	2022-06-29 15:58:59.816+00
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.projects (created_at, updated_at, deleted_at, user_id, slug, git, allow_team_fixes, latest_revision, draft_revision) FROM stdin;
2024-02-02 22:52:43.168+00	2022-06-10 22:52:43.168+00	\N	60	codequest	\N	\N	0	1
2024-10-10 18:13:06.836+00	2022-04-16 18:13:06.836+00	\N	15	bitbox	\N	\N	0	1
2024-08-16 03:07:57.756+00	2024-08-16 03:07:57.756+00	\N	57	circuitchaos	\N	\N	0	1
2024-01-25 11:02:05.24+00	2021-09-11 11:02:05.24+00	\N	12	codecity	\N	\N	0	1
2024-05-07 06:19:17.712+00	2023-04-19 06:19:17.712+00	\N	58	byteblitz	\N	\N	0	1
2024-10-14 10:09:17.8+00	2024-10-14 10:09:17.8+00	\N	67	electronera	\N	\N	0	1
2024-12-31 18:26:24.784+00	2024-07-24 18:26:24.784+00	\N	63	pixelplayground	\N	\N	\N	0
2024-04-14 08:17:02.24+00	2022-10-10 08:17:02.24+00	\N	67	logiclandia	\N	\N	\N	0
2024-05-21 07:52:12.792+00	2023-05-19 07:52:12.792+00	\N	42	bytebounce	\N	\N	\N	0
2024-02-05 07:45:38.824+00	2024-02-05 07:45:38.824+00	\N	6	circuitcarnival	\N	\N	\N	0
2024-03-12 09:05:08.976+00	2024-03-12 09:05:08.976+00	\N	4	codecove	\N	\N	\N	0
2023-11-13 08:24:15.072+00	2023-10-20 08:24:15.072+00	\N	20	nanonest	\N	\N	\N	0
2023-12-22 05:37:15.504+00	2022-01-29 05:37:15.504+00	\N	10	electraentertain	\N	\N	\N	0
2024-10-28 19:46:23.904+00	2022-10-17 19:46:23.904+00	\N	10	gamegalaxy	\N	\N	\N	0
2024-10-25 17:33:41.688+00	2021-12-14 17:33:41.688+00	\N	20	logiclabyrinth	\N	\N	\N	0
2024-05-30 11:28:58.68+00	2022-05-01 11:28:58.68+00	\N	69	byteblaster	\N	\N	\N	0
2024-08-04 15:22:58.712+00	2023-01-26 15:22:58.712+00	\N	23	codecompass	\N	\N	\N	0
2024-05-20 22:09:19.664+00	2022-02-22 22:09:19.664+00	\N	56	nanonation	\N	\N	\N	0
2023-07-09 21:46:04.968+00	2023-07-09 21:46:04.968+00	\N	3	electraempire	\N	\N	\N	0
2024-11-05 09:02:28.784+00	2024-07-04 09:02:28.784+00	\N	62	gamegarden	\N	\N	\N	0
2024-02-09 16:13:44.876+00	2022-05-14 16:13:44.876+00	\N	16	pixelpeak	\N	\N	\N	0
2023-09-02 22:18:08.44+00	2023-09-02 22:18:08.44+00	\N	61	circuitcelestial	\N	\N	\N	0
2023-12-05 03:41:56.192+00	2022-04-28 03:41:56.192+00	\N	3	codecrusade	\N	\N	\N	0
2024-05-21 09:16:51.554+00	2022-10-07 09:16:51.554+00	\N	41	nanonebula	\N	\N	\N	0
2023-07-21 02:31:48.184+00	2023-07-21 02:31:48.184+00	\N	19	electraenclave	\N	\N	\N	0
2024-03-19 02:18:38.096+00	2021-08-18 02:18:38.096+00	\N	53	gamegizmo	\N	\N	\N	0
2024-06-24 21:57:36.494+00	2022-05-14 21:57:36.494+00	\N	38	pixelplanet	\N	\N	\N	0
2024-08-09 14:23:25.752+00	2021-12-03 14:23:25.752+00	\N	61	logiclounge	\N	\N	\N	0
2024-12-19 20:19:10.896+00	2023-01-01 20:19:10.896+00	\N	62	bytebeacon	\N	\N	\N	0
2024-09-11 19:49:28.324+00	2023-07-27 19:49:28.324+00	\N	28	codecircus	\N	\N	\N	0
2024-02-12 20:46:28.112+00	2023-11-14 20:46:28.112+00	\N	15	nanonook	\N	\N	\N	0
2023-12-03 07:30:33.208+00	2023-08-17 07:30:33.208+00	\N	40	electraelysium	\N	\N	\N	0
2024-12-10 03:47:30.504+00	2022-10-02 03:47:30.504+00	\N	2	gameglimpse	\N	\N	\N	0
2023-10-30 00:09:40.376+00	2022-01-06 00:09:40.376+00	\N	34	pixelparadise	\N	\N	\N	0
2024-03-21 13:24:49.528+00	2023-05-02 13:24:49.528+00	\N	66	codecoast	\N	\N	\N	0
2024-09-17 15:44:08.672+00	2022-09-22 15:44:08.672+00	\N	64	nanonirvana	\N	\N	\N	0
2024-02-06 15:06:27.832+00	2024-02-06 15:06:27.832+00	\N	48	electraedifice	\N	\N	\N	0
2024-11-04 09:30:30.72+00	2021-11-16 09:30:30.72+00	\N	26	gamegen	\N	\N	\N	0
2023-10-26 10:11:48.928+00	2023-07-22 10:11:48.928+00	\N	2	pixelpandemonium	\N	\N	\N	0
2024-06-13 23:31:30.01+00	2022-01-23 23:31:30.01+00	\N	26	logiclagoon	\N	\N	\N	0
2024-08-21 00:04:19.212+00	2023-11-19 00:04:19.212+00	\N	57	byteblaze	\N	\N	\N	0
2024-11-08 06:16:09.328+00	2024-04-30 06:16:09.328+00	\N	60	codecorridor	\N	\N	\N	0
2023-07-25 16:37:02.9+00	2022-12-09 16:37:02.9+00	\N	53	hacksimulator	\N	\N	\N	0
2024-02-08 21:20:39.392+00	2021-12-30 21:20:39.392+00	\N	52	codecrunch	\N	\N	\N	0
2024-07-03 00:30:41.76+00	2022-11-17 00:30:41.76+00	\N	14	securecraft	\N	\N	\N	0
2024-08-28 13:28:10.656+00	2024-08-02 13:28:10.656+00	\N	18	cryptopulse	\N	\N	\N	0
2023-05-19 23:17:49.24+00	2023-05-19 23:17:49.24+00	\N	18	dataforge	\N	\N	\N	0
2023-11-14 01:27:48.624+00	2022-11-11 01:27:48.624+00	\N	1	cipherquest	\N	\N	\N	0
2023-05-28 22:05:38.88+00	2022-11-09 22:05:38.88+00	\N	46	hackquest	\N	\N	\N	0
2024-12-02 15:18:25.584+00	2023-09-13 15:18:25.584+00	\N	46	securesphere	\N	\N	\N	0
2024-11-01 13:12:19.376+00	2022-09-05 13:12:19.376+00	\N	24	codecraft	\N	\N	0	1
2023-11-03 11:28:12.74+00	2023-11-03 11:28:12.74+00	\N	39	microarcade	\N	\N	0	1
2024-10-30 02:46:51.36+00	2021-11-09 02:46:51.36+00	\N	14	codecraze	\N	\N	0	1
2023-06-07 06:49:56.772+00	2023-02-19 06:49:56.772+00	\N	1	gamegenius	\N	\N	0	1
2023-11-17 23:23:23.636+00	2023-02-26 23:23:23.636+00	\N	50	circuitforge	\N	\N	0	1
2023-07-14 16:45:35.488+00	2023-07-14 16:45:35.488+00	\N	34	nanogames	\N	\N	0	1
2024-08-16 21:30:54.256+00	2022-11-23 21:30:54.256+00	\N	51	logicland	\N	\N	0	1
2023-07-29 11:14:20.224+00	2023-07-29 11:14:20.224+00	\N	13	pixelpal	\N	\N	0	1
2024-05-18 00:02:21.456+00	2023-10-13 00:02:21.456+00	\N	58	sparkscript	\N	\N	0	1
2024-01-15 06:15:05.696+00	2021-10-25 06:15:05.696+00	\N	43	bitblast	\N	\N	0	1
2023-07-17 14:27:29.464+00	2023-07-17 14:27:29.464+00	\N	45	bytebash	\N	\N	0	1
2023-11-30 00:51:54.112+00	2022-04-21 00:51:54.112+00	\N	24	pixelpulse	\N	\N	0	1
2023-06-19 17:13:46.448+00	2023-06-19 17:13:46.448+00	\N	27	bytebeat	\N	\N	0	1
2024-03-30 14:40:52.96+00	2021-10-16 14:40:52.96+00	\N	17	electraplay	\N	\N	0	1
2023-11-24 22:55:24.164+00	2021-09-01 22:55:24.164+00	\N	69	electronica	\N	\N	0	1
2023-09-29 03:29:47.696+00	2023-09-29 03:29:47.696+00	\N	12	circuitcraft	\N	\N	0	1
2024-10-21 16:26:33.936+00	2023-05-18 16:26:33.936+00	\N	22	nanonexus	\N	\N	0	1
2024-11-12 18:51:09.944+00	2024-08-18 18:51:09.944+00	\N	61	codecrafter	\N	\N	0	1
2024-11-07 01:09:31.666+00	2024-04-27 01:09:31.666+00	\N	28	pixelpioneer	\N	\N	0	1
2023-12-13 15:53:56.304+00	2022-06-07 15:53:56.304+00	\N	22	codecanvas	\N	\N	0	1
2024-10-22 09:43:30.528+00	2023-11-19 09:43:30.528+00	\N	2	logiclab	\N	\N	0	1
2023-12-01 19:06:24.404+00	2021-11-19 19:06:24.404+00	\N	54	nanonet	\N	\N	0	1
2024-08-22 14:13:04.708+00	2023-10-15 14:13:04.708+00	\N	5	logicloom	\N	\N	0	1
2023-12-21 17:42:11.64+00	2022-09-21 17:42:11.64+00	\N	44	codewave	\N	\N	0	1
2024-11-03 20:03:16.06+00	2023-01-31 20:03:16.06+00	\N	64	pixelplaza	\N	\N	0	1
2023-06-14 14:37:26.096+00	2022-08-14 14:37:26.096+00	\N	7	gamegrid	\N	\N	0	1
2024-09-17 05:22:36.352+00	2023-05-18 05:22:36.352+00	\N	56	electraforge	\N	\N	0	1
2024-03-03 03:17:23.68+00	2024-03-03 03:17:23.68+00	\N	19	nanoarcade	\N	\N	0	1
2023-11-03 05:05:47.504+00	2023-09-22 05:05:47.504+00	\N	40	bitbazaar	\N	\N	0	1
2023-10-19 20:19:20.66+00	2022-11-19 20:19:20.66+00	\N	66	logiclegends	\N	\N	0	1
2024-07-01 10:51:30.84+00	2022-05-21 10:51:30.84+00	\N	27	electraeden	\N	\N	0	1
2023-07-04 20:36:02.72+00	2023-07-04 20:36:02.72+00	\N	12	circuitcraze	\N	\N	0	1
2024-01-25 00:59:51.064+00	2022-06-04 00:59:51.064+00	\N	21	nanonovel	\N	\N	0	1
2024-09-21 04:03:11.048+00	2023-12-28 04:03:11.048+00	\N	39	codeclan	\N	\N	0	1
2024-08-30 08:26:56.096+00	2021-09-05 08:26:56.096+00	\N	63	bytebuster	\N	\N	0	1
2024-05-23 17:26:04.668+00	2024-02-13 17:26:04.668+00	\N	9	pixelportal	\N	\N	0	1
2023-11-23 09:45:55.072+00	2023-11-23 09:45:55.072+00	\N	42	codecomet	\N	\N	0	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.users (id, email, admin, name, password, remember_token, editor, public, show_projects, email_verified_at, created_at, updated_at, deleted_at) FROM stdin;
0	techtinkerer@gmail.com	t	TechTinkerer	****	\N	\N	f	f	\N	2023-11-10 22:39:37.16+00	2023-04-24 22:39:37.16+00	\N
1	codecrafter@gmail.com	f	CodeCrafter	****	\N	\N	t	t	\N	2024-11-12 18:51:09.944+00	2024-08-18 18:51:09.944+00	\N
2	pixelpilot@gmail.com	f	PixelPilot	****	\N	\N	t	t	\N	2023-07-27 02:44:53.144+00	2022-12-27 02:44:53.144+00	\N
3	logiclion@techinc.nl	f	LogicLion	****	\N	\N	t	t	\N	2023-07-17 21:36:27.784+00	2022-04-09 21:36:27.784+00	\N
4	electroneager@gmail.com	f	ElectronEager	****	\N	\N	t	t	\N	2024-11-02 00:56:37.988+00	2022-02-28 00:56:37.988+00	\N
5	nanonomad@techinc.nl	f	NanoNomad	****	\N	\N	t	t	\N	2023-12-20 16:31:10.504+00	2023-12-20 16:31:10.504+00	\N
6	circuitcraze@gmail.com	t	CircuitCraze	****	\N	\N	f	f	\N	2023-07-04 20:36:02.72+00	2023-07-04 20:36:02.72+00	\N
7	gameglider@gmail.com	f	GameGlider	****	\N	\N	t	t	\N	2024-09-01 01:27:11.744+00	2023-04-18 01:27:11.744+00	\N
8	byteblast@bitlair.nl	f	ByteBlast	****	\N	\N	t	t	\N	2023-09-29 21:34:30.864+00	2021-11-26 21:34:30.864+00	\N
9	cybercraft@techinc.nl	f	CyberCraft	****	\N	\N	t	t	\N	2023-06-25 06:39:28.432+00	2023-06-25 06:39:28.432+00	\N
10	digitaldynamo@gmail.com	t	DigitalDynamo	****	\N	\N	f	f	\N	2023-07-07 03:27:55.52+00	2023-06-21 03:27:55.52+00	\N
11	codecreator@bitlair.nl	f	CodeCreator	****	\N	\N	t	t	\N	2023-11-03 03:32:27.984+00	2023-03-06 03:32:27.984+00	\N
12	pixelpulse@techinc.nl	f	PixelPulse	****	\N	\N	t	t	\N	2023-11-30 00:51:54.112+00	2022-04-21 00:51:54.112+00	\N
13	logicluminary@gmail.com	f	LogicLuminary	****	\N	\N	t	t	\N	2024-09-27 12:43:50.288+00	2024-08-26 12:43:50.288+00	\N
14	electronecho@bitlair.nl	f	ElectronEcho	****	\N	\N	t	t	\N	2023-09-11 04:20:16.056+00	2022-12-05 04:20:16.056+00	\N
15	nanoninja@gmail.com	f	NanoNinja	****	\N	\N	t	t	\N	2024-12-08 19:38:28.424+00	2022-11-07 19:38:28.424+00	\N
16	circuitchampion@techinc.nl	f	CircuitChampion	****	\N	\N	t	t	\N	2023-07-15 03:32:48.088+00	2023-06-11 03:32:48.088+00	\N
17	gamegazer@bitlair.nl	t	GameGazer	****	\N	\N	f	f	\N	2023-08-26 19:55:28.08+00	2023-08-26 19:55:28.08+00	\N
18	bytebuddy@bitlair.nl	f	ByteBuddy	****	\N	\N	t	t	\N	2024-10-18 20:33:42.684+00	2024-10-18 20:33:42.684+00	\N
19	techtornado@bitlair.nl	f	TechTornado	****	\N	\N	t	t	\N	2023-10-30 19:39:23.076+00	2023-10-30 19:39:23.076+00	\N
20	codechampion@techinc.nl	f	CodeChampion	****	\N	\N	t	t	\N	2024-01-04 02:28:46.516+00	2023-08-27 02:28:46.516+00	\N
21	pixelprodigy@bitlair.nl	f	PixelProdigy	****	\N	\N	t	t	\N	2023-07-14 06:00:35.178+00	2023-07-14 06:00:35.178+00	\N
22	logiclabyrinth@bitlair.nl	f	LogicLabyrinth	****	\N	\N	t	t	\N	2024-10-25 17:33:41.688+00	2021-12-14 17:33:41.688+00	\N
23	electronexplorer@gmail.com	f	ElectronExplorer	****	\N	\N	t	t	\N	2024-04-24 20:05:20.372+00	2022-02-22 20:05:20.372+00	\N
24	nanonavigator@bitlair.nl	f	NanoNavigator	****	\N	\N	t	t	\N	2023-10-06 07:13:10.212+00	2023-10-06 07:13:10.212+00	\N
25	circuitcatalyst@gmail.com	f	CircuitCatalyst	****	\N	\N	t	t	\N	2023-11-15 05:57:47.936+00	2022-01-02 05:57:47.936+00	\N
26	gameguru@bitlair.nl	f	GameGuru	****	\N	\N	t	t	\N	2024-08-13 13:29:52.872+00	2024-04-21 13:29:52.872+00	\N
27	byteblaze@bitlair.nl	f	ByteBlaze	****	\N	\N	t	t	\N	2024-08-21 00:04:19.212+00	2023-11-19 00:04:19.212+00	\N
28	digitaldreamer@bitlair.nl	f	DigitalDreamer	****	\N	\N	t	t	\N	2023-07-17 16:22:09.456+00	2022-04-11 16:22:09.456+00	\N
29	codecommander@techinc.nl	f	CodeCommander	****	\N	\N	t	t	\N	2023-09-21 21:35:31.546+00	2023-09-21 21:35:31.546+00	\N
30	pixelpioneer@techinc.nl	f	PixelPioneer	****	\N	\N	t	t	\N	2024-11-07 01:09:31.666+00	2024-04-27 01:09:31.666+00	\N
31	logiclegend@bitlair.nl	t	LogicLegend	****	\N	\N	f	f	\N	2024-07-17 02:47:49.62+00	2022-05-11 02:47:49.62+00	\N
32	electronelite@bitlair.nl	t	ElectronElite	****	\N	\N	f	f	\N	2024-12-23 13:47:16.68+00	2022-02-13 13:47:16.68+00	\N
33	nanonerd@bitlair.nl	f	NanoNerd	****	\N	\N	t	t	\N	2024-12-21 23:57:32.604+00	2023-04-05 23:57:32.604+00	\N
34	circuitcaptain@techinc.nl	f	CircuitCaptain	****	\N	\N	t	t	\N	2024-11-06 13:34:48.784+00	2024-11-06 13:34:48.784+00	\N
35	gamegenius@bitlair.nl	f	GameGenius	****	\N	\N	t	t	\N	2023-06-07 06:49:56.772+00	2023-02-19 06:49:56.772+00	\N
36	bytebolt@bitlair.nl	f	ByteBolt	****	\N	\N	t	t	\N	2023-07-24 14:10:39.648+00	2022-06-03 14:10:39.648+00	\N
37	cybercipher@techinc.nl	f	CyberCipher	****	\N	\N	t	t	\N	2024-08-24 04:44:29.368+00	2023-03-01 04:44:29.368+00	\N
38	codeconqueror@techinc.nl	f	CodeConqueror	****	\N	\N	t	t	\N	2023-10-30 11:09:57.184+00	2022-06-13 11:09:57.184+00	\N
39	pixelpaladin@gmail.com	f	PixelPaladin	****	\N	\N	t	t	\N	2024-01-27 15:50:06.452+00	2022-02-14 15:50:06.452+00	\N
40	logiclore@bitlair.nl	t	LogicLore	****	\N	\N	f	f	\N	2024-05-08 06:54:41.88+00	2023-08-30 06:54:41.88+00	\N
41	electronenigma@bitlair.nl	f	ElectronEnigma	****	\N	\N	t	t	\N	2024-05-29 09:57:04.146+00	2023-02-24 09:57:04.146+00	\N
42	circuitconnoisseur@gmail.com	t	CircuitConnoisseur	****	\N	\N	f	f	\N	2024-05-06 04:05:57.44+00	2024-05-06 04:05:57.44+00	\N
43	gameguardian@gmail.com	f	GameGuardian	****	\N	\N	t	t	\N	2024-02-19 09:10:38.072+00	2024-02-19 09:10:38.072+00	\N
44	bytebandit@gmail.com	f	ByteBandit	****	\N	\N	t	t	\N	2023-11-04 10:35:51.764+00	2021-10-21 10:35:51.764+00	\N
45	techtinker@gmail.com	t	TechTinker	****	\N	\N	f	f	\N	2024-08-08 04:24:20+00	2022-02-06 04:24:20+00	\N
46	codecrusader@gmail.com	t	CodeCrusader	****	\N	\N	f	f	\N	2024-07-21 14:48:48.68+00	2023-11-24 14:48:48.68+00	\N
47	pixelpirate@gmail.com	f	PixelPirate	****	\N	\N	t	t	\N	2024-12-26 12:38:16.664+00	2021-12-22 12:38:16.664+00	\N
48	electroneagle@techinc.nl	f	ElectronEagle	****	\N	\N	t	t	\N	2024-11-05 18:29:02.128+00	2023-04-07 18:29:02.128+00	\N
49	circuitsavant@bitlair.nl	f	CircuitSavant	****	\N	\N	t	t	\N	2023-07-04 03:01:41.916+00	2023-07-04 03:01:41.916+00	\N
50	gamegladiator@bitlair.nl	f	GameGladiator	****	\N	\N	t	t	\N	2024-08-02 12:33:41.892+00	2022-12-11 12:33:41.892+00	\N
51	byteblitz@bitlair.nl	f	ByteBlitz	****	\N	\N	t	t	\N	2024-05-07 06:19:17.712+00	2023-04-19 06:19:17.712+00	\N
52	cybersavvy@bitlair.nl	f	CyberSavvy	****	\N	\N	t	t	\N	2023-10-05 03:07:37.896+00	2023-10-05 03:07:37.896+00	\N
53	codecraftsman@gmail.com	f	CodeCraftsman	****	\N	\N	t	t	\N	2024-10-13 10:03:12.416+00	2022-03-08 10:03:12.416+00	\N
54	pixelpro@techinc.nl	f	PixelPro	****	\N	\N	t	t	\N	2023-12-22 14:05:04.864+00	2023-11-12 14:05:04.864+00	\N
55	logicloremaster@gmail.com	f	LogicLoreMaster	****	\N	\N	t	t	\N	2024-07-17 15:38:02.816+00	2021-09-21 15:38:02.816+00	\N
56	electronemperor@techinc.nl	f	ElectronEmperor	****	\N	\N	t	t	\N	2023-05-15 01:22:53.968+00	2023-05-15 01:22:53.968+00	\N
57	circuitchamp@gmail.com	f	CircuitChamp	****	\N	\N	t	t	\N	2023-05-20 04:55:53.192+00	2023-05-20 04:55:53.192+00	\N
58	gamegizmo@gmail.com	f	GameGizmo	****	\N	\N	t	t	\N	2024-03-19 02:18:38.096+00	2021-08-18 02:18:38.096+00	\N
59	bytebrawler@gmail.com	f	ByteBrawler	****	\N	\N	t	t	\N	2024-10-03 03:22:09.344+00	2023-07-29 03:22:09.344+00	\N
60	techtrailblazer@hack42.nl	f	TechTrailblazer	****	\N	\N	t	t	\N	2024-03-26 00:17:08.433+00	2022-07-03 00:17:08.433+00	\N
61	codecaptain@gmail.com	t	CodeCaptain	****	\N	\N	f	f	\N	2023-07-18 09:12:00.2+00	2023-07-18 09:12:00.2+00	\N
62	pixelpathfinder@techinc.nl	t	PixelPathfinder	****	\N	\N	f	f	\N	2023-05-16 23:51:13.9+00	2023-05-16 23:51:13.9+00	\N
63	logiclionheart@bitlair.nl	f	LogicLionheart	****	\N	\N	t	t	\N	2024-10-30 12:37:18.144+00	2024-10-30 12:37:18.144+00	\N
64	electronexpedition@bitlair.nl	f	ElectronExpedition	****	\N	\N	t	t	\N	2024-07-23 14:18:32.112+00	2024-07-23 14:18:32.112+00	\N
65	nanonoble@bitlair.nl	f	NanoNoble	****	\N	\N	t	t	\N	2023-08-25 22:46:49.752+00	2023-08-25 22:46:49.752+00	\N
66	circuitcommander@gmail.com	t	CircuitCommander	****	\N	\N	f	f	\N	2023-05-30 10:39:26.48+00	2023-05-30 10:39:26.48+00	\N
67	gameglobetrotter@techinc.nl	f	GameGlobetrotter	****	\N	\N	t	t	\N	2024-02-11 21:33:27.304+00	2023-11-07 21:33:27.304+00	\N
68	cybersherpa@gmail.com	t	CyberSherpa	****	\N	\N	f	f	\N	2024-02-26 05:16:20+00	2023-06-15 05:16:20+00	\N
69	cybercraftsman@techinc.nl	f	CyberCraftsman	****	\N	\N	t	t	\N	2023-11-26 18:29:01.192+00	2023-11-26 18:29:01.192+00	\N
70	codeconnoisseur@techinc.nl	f	CodeConnoisseur	****	\N	\N	t	t	\N	2024-03-28 14:34:53.152+00	2023-05-09 14:34:53.152+00	\N
\.


--
-- Data for Name: versioned_dependencies; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.versioned_dependencies (id, project_slug, depends_on_project_slug, semantic_version_range, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: versions; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.versions (id, project_slug, app_metadata_json_id, revision, semantic_version, zip, size_of_zip, git_commit_id, published_at, download_count, created_at, updated_at) FROM stdin;
10	logicland	10	0	\N	\N	\N	\N	2022-11-24 21:30:54.256+00	0	2024-08-16 21:30:54.256+00	2022-11-23 21:30:54.256+00
94	logicland	94	1	\N	\N	\N	\N	\N	0	2022-11-24 21:30:54.256+00	2022-11-24 21:30:54.256+00
3	bitblast	3	0	\N	\N	\N	\N	2021-10-26 06:15:05.696+00	0	2024-01-15 06:15:05.696+00	2021-10-25 06:15:05.696+00
97	bitblast	97	1	\N	\N	\N	\N	\N	0	2021-10-26 06:15:05.696+00	2021-10-26 06:15:05.696+00
17	circuitcraft	17	0	\N	\N	\N	\N	2023-09-30 03:29:47.696+00	0	2023-09-29 03:29:47.696+00	2023-09-29 03:29:47.696+00
103	circuitcraft	103	1	\N	\N	\N	\N	\N	0	2023-09-30 03:29:47.696+00	2023-09-30 03:29:47.696+00
19	nanonexus	19	0	\N	\N	\N	\N	2023-05-19 16:26:33.936+00	0	2024-10-21 16:26:33.936+00	2023-05-18 16:26:33.936+00
105	nanonexus	105	1	\N	\N	\N	\N	\N	0	2023-05-19 16:26:33.936+00	2023-05-19 16:26:33.936+00
110	codecanvas	110	1	\N	\N	\N	\N	\N	0	2022-06-08 15:53:56.304+00	2022-06-08 15:53:56.304+00
114	codewave	114	1	\N	\N	\N	\N	\N	0	2022-09-22 17:42:11.64+00	2022-09-22 17:42:11.64+00
115	gamegrid	115	1	\N	\N	\N	\N	\N	0	2022-08-15 14:37:26.096+00	2022-08-15 14:37:26.096+00
33	nanoarcade	33	0	\N	\N	\N	\N	2024-03-04 03:17:23.68+00	0	2024-03-03 03:17:23.68+00	2024-03-03 03:17:23.68+00
118	nanoarcade	118	1	\N	\N	\N	\N	\N	0	2024-03-04 03:17:23.68+00	2024-03-04 03:17:23.68+00
124	electraeden	124	1	\N	\N	\N	\N	\N	0	2022-05-22 10:51:30.84+00	2022-05-22 10:51:30.84+00
126	circuitcraze	126	1	\N	\N	\N	\N	\N	0	2023-07-05 20:36:02.72+00	2023-07-05 20:36:02.72+00
130	codecomet	130	1	\N	\N	\N	\N	\N	0	2023-11-24 09:45:55.072+00	2023-11-24 09:45:55.072+00
44	pixelplayground	44	0	\N	\N	\N	\N	\N	0	2024-12-31 18:26:24.784+00	2024-07-24 18:26:24.784+00
45	logiclandia	45	0	\N	\N	\N	\N	\N	0	2024-04-14 08:17:02.24+00	2022-10-10 08:17:02.24+00
46	bytebounce	46	0	\N	\N	\N	\N	\N	0	2024-05-21 07:52:12.792+00	2023-05-19 07:52:12.792+00
47	circuitcarnival	47	0	\N	\N	\N	\N	\N	0	2024-02-05 07:45:38.824+00	2024-02-05 07:45:38.824+00
48	codecove	48	0	\N	\N	\N	\N	\N	0	2024-03-12 09:05:08.976+00	2024-03-12 09:05:08.976+00
49	nanonest	49	0	\N	\N	\N	\N	\N	0	2023-11-13 08:24:15.072+00	2023-10-20 08:24:15.072+00
50	electraentertain	50	0	\N	\N	\N	\N	\N	0	2023-12-22 05:37:15.504+00	2022-01-29 05:37:15.504+00
51	gamegalaxy	51	0	\N	\N	\N	\N	\N	0	2024-10-28 19:46:23.904+00	2022-10-17 19:46:23.904+00
52	logiclabyrinth	52	0	\N	\N	\N	\N	\N	0	2024-10-25 17:33:41.688+00	2021-12-14 17:33:41.688+00
53	byteblaster	53	0	\N	\N	\N	\N	\N	0	2024-05-30 11:28:58.68+00	2022-05-01 11:28:58.68+00
54	codecompass	54	0	\N	\N	\N	\N	\N	0	2024-08-04 15:22:58.712+00	2023-01-26 15:22:58.712+00
55	nanonation	55	0	\N	\N	\N	\N	\N	0	2024-05-20 22:09:19.664+00	2022-02-22 22:09:19.664+00
56	electraempire	56	0	\N	\N	\N	\N	\N	0	2023-07-09 21:46:04.968+00	2023-07-09 21:46:04.968+00
57	gamegarden	57	0	\N	\N	\N	\N	\N	0	2024-11-05 09:02:28.784+00	2024-07-04 09:02:28.784+00
58	pixelpeak	58	0	\N	\N	\N	\N	\N	0	2024-02-09 16:13:44.876+00	2022-05-14 16:13:44.876+00
59	circuitcelestial	59	0	\N	\N	\N	\N	\N	0	2023-09-02 22:18:08.44+00	2023-09-02 22:18:08.44+00
60	codecrusade	60	0	\N	\N	\N	\N	\N	0	2023-12-05 03:41:56.192+00	2022-04-28 03:41:56.192+00
61	nanonebula	61	0	\N	\N	\N	\N	\N	0	2024-05-21 09:16:51.554+00	2022-10-07 09:16:51.554+00
62	electraenclave	62	0	\N	\N	\N	\N	\N	0	2023-07-21 02:31:48.184+00	2023-07-21 02:31:48.184+00
63	gamegizmo	63	0	\N	\N	\N	\N	\N	0	2024-03-19 02:18:38.096+00	2021-08-18 02:18:38.096+00
64	pixelplanet	64	0	\N	\N	\N	\N	\N	0	2024-06-24 21:57:36.494+00	2022-05-14 21:57:36.494+00
65	logiclounge	65	0	\N	\N	\N	\N	\N	0	2024-08-09 14:23:25.752+00	2021-12-03 14:23:25.752+00
66	bytebeacon	66	0	\N	\N	\N	\N	\N	0	2024-12-19 20:19:10.896+00	2023-01-01 20:19:10.896+00
67	codecircus	67	0	\N	\N	\N	\N	\N	0	2024-09-11 19:49:28.324+00	2023-07-27 19:49:28.324+00
68	nanonook	68	0	\N	\N	\N	\N	\N	0	2024-02-12 20:46:28.112+00	2023-11-14 20:46:28.112+00
69	electraelysium	69	0	\N	\N	\N	\N	\N	0	2023-12-03 07:30:33.208+00	2023-08-17 07:30:33.208+00
70	gameglimpse	70	0	\N	\N	\N	\N	\N	0	2024-12-10 03:47:30.504+00	2022-10-02 03:47:30.504+00
71	pixelparadise	71	0	\N	\N	\N	\N	\N	0	2023-10-30 00:09:40.376+00	2022-01-06 00:09:40.376+00
72	codecoast	72	0	\N	\N	\N	\N	\N	0	2024-03-21 13:24:49.528+00	2023-05-02 13:24:49.528+00
73	nanonirvana	73	0	\N	\N	\N	\N	\N	0	2024-09-17 15:44:08.672+00	2022-09-22 15:44:08.672+00
74	electraedifice	74	0	\N	\N	\N	\N	\N	0	2024-02-06 15:06:27.832+00	2024-02-06 15:06:27.832+00
75	gamegen	75	0	\N	\N	\N	\N	\N	0	2024-11-04 09:30:30.72+00	2021-11-16 09:30:30.72+00
76	pixelpandemonium	76	0	\N	\N	\N	\N	\N	0	2023-10-26 10:11:48.928+00	2023-07-22 10:11:48.928+00
77	logiclagoon	77	0	\N	\N	\N	\N	\N	0	2024-06-13 23:31:30.01+00	2022-01-23 23:31:30.01+00
78	byteblaze	78	0	\N	\N	\N	\N	\N	0	2024-08-21 00:04:19.212+00	2023-11-19 00:04:19.212+00
79	codecorridor	79	0	\N	\N	\N	\N	\N	0	2024-11-08 06:16:09.328+00	2024-04-30 06:16:09.328+00
80	hacksimulator	80	0	\N	\N	\N	\N	\N	0	2023-07-25 16:37:02.9+00	2022-12-09 16:37:02.9+00
81	codecrunch	81	0	\N	\N	\N	\N	\N	0	2024-02-08 21:20:39.392+00	2021-12-30 21:20:39.392+00
82	securecraft	82	0	\N	\N	\N	\N	\N	0	2024-07-03 00:30:41.76+00	2022-11-17 00:30:41.76+00
83	cryptopulse	83	0	\N	\N	\N	\N	\N	0	2024-08-28 13:28:10.656+00	2024-08-02 13:28:10.656+00
84	dataforge	84	0	\N	\N	\N	\N	\N	0	2023-05-19 23:17:49.24+00	2023-05-19 23:17:49.24+00
85	cipherquest	85	0	\N	\N	\N	\N	\N	0	2023-11-14 01:27:48.624+00	2022-11-11 01:27:48.624+00
86	hackquest	86	0	\N	\N	\N	\N	\N	0	2023-05-28 22:05:38.88+00	2022-11-09 22:05:38.88+00
87	securesphere	87	0	\N	\N	\N	\N	\N	0	2024-12-02 15:18:25.584+00	2023-09-13 15:18:25.584+00
1	codecraft	1	0	\N	\N	\N	\N	2022-09-06 13:12:19.376+00	0	2024-11-01 13:12:19.376+00	2022-09-05 13:12:19.376+00
88	codecraft	88	1	\N	\N	\N	\N	\N	0	2022-09-06 13:12:19.376+00	2022-09-06 13:12:19.376+00
11	microarcade	11	0	\N	\N	\N	\N	2023-11-04 11:28:12.74+00	0	2023-11-03 11:28:12.74+00	2023-11-03 11:28:12.74+00
89	microarcade	89	1	\N	\N	\N	\N	\N	0	2023-11-04 11:28:12.74+00	2023-11-04 11:28:12.74+00
12	codecraze	12	0	\N	\N	\N	\N	2021-11-10 02:46:51.36+00	0	2024-10-30 02:46:51.36+00	2021-11-09 02:46:51.36+00
90	codecraze	90	1	\N	\N	\N	\N	\N	0	2021-11-10 02:46:51.36+00	2021-11-10 02:46:51.36+00
13	gamegenius	13	0	\N	\N	\N	\N	2023-02-20 06:49:56.772+00	0	2023-06-07 06:49:56.772+00	2023-02-19 06:49:56.772+00
91	gamegenius	91	1	\N	\N	\N	\N	\N	0	2023-02-20 06:49:56.772+00	2023-02-20 06:49:56.772+00
6	circuitforge	6	0	\N	\N	\N	\N	2023-02-27 23:23:23.636+00	0	2023-11-17 23:23:23.636+00	2023-02-26 23:23:23.636+00
23	pixelpioneer	23	0	\N	\N	\N	\N	2024-04-28 01:09:31.666+00	0	2024-11-07 01:09:31.666+00	2024-04-27 01:09:31.666+00
8	codecanvas	8	0	\N	\N	\N	\N	2022-06-08 15:53:56.304+00	0	2023-12-13 15:53:56.304+00	2022-06-07 15:53:56.304+00
24	logiclab	24	0	\N	\N	\N	\N	2023-11-20 09:43:30.528+00	0	2024-10-22 09:43:30.528+00	2023-11-19 09:43:30.528+00
27	nanonet	27	0	\N	\N	\N	\N	2021-11-20 19:06:24.404+00	0	2023-12-01 19:06:24.404+00	2021-11-19 19:06:24.404+00
26	codewave	26	0	\N	\N	\N	\N	2022-09-22 17:42:11.64+00	0	2023-12-21 17:42:11.64+00	2022-09-21 17:42:11.64+00
30	logicloom	30	0	\N	\N	\N	\N	2023-10-16 14:13:04.708+00	0	2024-08-22 14:13:04.708+00	2023-10-15 14:13:04.708+00
31	pixelplaza	31	0	\N	\N	\N	\N	2023-02-01 20:03:16.06+00	0	2024-11-03 20:03:16.06+00	2023-01-31 20:03:16.06+00
29	gamegrid	29	0	\N	\N	\N	\N	2022-08-15 14:37:26.096+00	0	2023-06-14 14:37:26.096+00	2022-08-14 14:37:26.096+00
32	codecity	32	0	\N	\N	\N	\N	2021-09-12 11:02:05.24+00	0	2024-01-25 11:02:05.24+00	2021-09-11 11:02:05.24+00
42	electraeden	42	0	\N	\N	\N	\N	2022-05-22 10:51:30.84+00	0	2024-07-01 10:51:30.84+00	2022-05-21 10:51:30.84+00
38	pixelportal	38	0	\N	\N	\N	\N	2024-02-14 17:26:04.668+00	0	2024-05-23 17:26:04.668+00	2024-02-13 17:26:04.668+00
39	circuitcraze	39	0	\N	\N	\N	\N	2023-07-05 20:36:02.72+00	0	2023-07-04 20:36:02.72+00	2023-07-04 20:36:02.72+00
41	nanonovel	41	0	\N	\N	\N	\N	2022-06-05 00:59:51.064+00	0	2024-01-25 00:59:51.064+00	2022-06-04 00:59:51.064+00
37	codeclan	37	0	\N	\N	\N	\N	2023-12-29 04:03:11.048+00	0	2024-09-21 04:03:11.048+00	2023-12-28 04:03:11.048+00
40	bytebuster	40	0	\N	\N	\N	\N	2021-09-06 08:26:56.096+00	0	2024-08-30 08:26:56.096+00	2021-09-05 08:26:56.096+00
43	codecomet	43	0	\N	\N	\N	\N	2023-11-24 09:45:55.072+00	0	2023-11-23 09:45:55.072+00	2023-11-23 09:45:55.072+00
92	circuitforge	92	1	\N	\N	\N	\N	\N	0	2023-02-27 23:23:23.636+00	2023-02-27 23:23:23.636+00
14	pixelpal	14	0	\N	\N	\N	\N	2023-07-30 11:14:20.224+00	0	2023-07-29 11:14:20.224+00	2023-07-29 11:14:20.224+00
95	pixelpal	95	1	\N	\N	\N	\N	\N	0	2023-07-30 11:14:20.224+00	2023-07-30 11:14:20.224+00
7	bytebash	7	0	\N	\N	\N	\N	2023-07-18 14:27:29.464+00	0	2023-07-17 14:27:29.464+00	2023-07-17 14:27:29.464+00
98	bytebash	98	1	\N	\N	\N	\N	\N	0	2023-07-18 14:27:29.464+00	2023-07-18 14:27:29.464+00
18	bytebeat	18	0	\N	\N	\N	\N	2023-06-20 17:13:46.448+00	0	2023-06-19 17:13:46.448+00	2023-06-19 17:13:46.448+00
100	bytebeat	100	1	\N	\N	\N	\N	\N	0	2023-06-20 17:13:46.448+00	2023-06-20 17:13:46.448+00
21	circuitchaos	21	0	\N	\N	\N	\N	2024-08-17 03:07:57.756+00	0	2024-08-16 03:07:57.756+00	2024-08-16 03:07:57.756+00
16	codequest	16	0	\N	\N	\N	\N	2022-06-11 22:52:43.168+00	0	2024-02-02 22:52:43.168+00	2022-06-10 22:52:43.168+00
107	codequest	107	1	\N	\N	\N	\N	\N	0	2022-06-11 22:52:43.168+00	2022-06-11 22:52:43.168+00
108	circuitchaos	108	1	\N	\N	\N	\N	\N	0	2024-08-17 03:07:57.756+00	2024-08-17 03:07:57.756+00
109	pixelpioneer	109	1	\N	\N	\N	\N	\N	0	2024-04-28 01:09:31.666+00	2024-04-28 01:09:31.666+00
111	logiclab	111	1	\N	\N	\N	\N	\N	0	2023-11-20 09:43:30.528+00	2023-11-20 09:43:30.528+00
113	logicloom	113	1	\N	\N	\N	\N	\N	0	2023-10-16 14:13:04.708+00	2023-10-16 14:13:04.708+00
35	bitbazaar	35	0	\N	\N	\N	\N	2023-09-23 05:05:47.504+00	0	2023-11-03 05:05:47.504+00	2023-09-22 05:05:47.504+00
119	codecity	119	1	\N	\N	\N	\N	\N	0	2021-09-12 11:02:05.24+00	2021-09-12 11:02:05.24+00
122	bitbazaar	122	1	\N	\N	\N	\N	\N	0	2023-09-23 05:05:47.504+00	2023-09-23 05:05:47.504+00
36	logiclegends	36	0	\N	\N	\N	\N	2022-11-20 20:19:20.66+00	0	2023-10-19 20:19:20.66+00	2022-11-19 20:19:20.66+00
123	logiclegends	123	1	\N	\N	\N	\N	\N	0	2022-11-20 20:19:20.66+00	2022-11-20 20:19:20.66+00
127	nanonovel	127	1	\N	\N	\N	\N	\N	0	2022-06-05 00:59:51.064+00	2022-06-05 00:59:51.064+00
4	nanogames	4	0	\N	\N	\N	\N	2023-07-15 16:45:35.488+00	0	2023-07-14 16:45:35.488+00	2023-07-14 16:45:35.488+00
93	nanogames	93	1	\N	\N	\N	\N	\N	0	2023-07-15 16:45:35.488+00	2023-07-15 16:45:35.488+00
9	sparkscript	9	0	\N	\N	\N	\N	2023-10-14 00:02:21.456+00	0	2024-05-18 00:02:21.456+00	2023-10-13 00:02:21.456+00
96	sparkscript	96	1	\N	\N	\N	\N	\N	0	2023-10-14 00:02:21.456+00	2023-10-14 00:02:21.456+00
2	pixelpulse	2	0	\N	\N	\N	\N	2022-04-22 00:51:54.112+00	0	2023-11-30 00:51:54.112+00	2022-04-21 00:51:54.112+00
5	electraplay	5	0	\N	\N	\N	\N	2021-10-17 14:40:52.96+00	0	2024-03-30 14:40:52.96+00	2021-10-16 14:40:52.96+00
99	pixelpulse	99	1	\N	\N	\N	\N	\N	0	2022-04-22 00:51:54.112+00	2022-04-22 00:51:54.112+00
101	electraplay	101	1	\N	\N	\N	\N	\N	0	2021-10-17 14:40:52.96+00	2021-10-17 14:40:52.96+00
15	electronica	15	0	\N	\N	\N	\N	2021-09-02 22:55:24.164+00	0	2023-11-24 22:55:24.164+00	2021-09-01 22:55:24.164+00
102	electronica	102	1	\N	\N	\N	\N	\N	0	2021-09-02 22:55:24.164+00	2021-09-02 22:55:24.164+00
20	bitbox	20	0	\N	\N	\N	\N	2022-04-17 18:13:06.836+00	0	2024-10-10 18:13:06.836+00	2022-04-16 18:13:06.836+00
104	bitbox	104	1	\N	\N	\N	\N	\N	0	2022-04-17 18:13:06.836+00	2022-04-17 18:13:06.836+00
22	codecrafter	22	0	\N	\N	\N	\N	2024-08-19 18:51:09.944+00	0	2024-11-12 18:51:09.944+00	2024-08-18 18:51:09.944+00
106	codecrafter	106	1	\N	\N	\N	\N	\N	0	2024-08-19 18:51:09.944+00	2024-08-19 18:51:09.944+00
112	nanonet	112	1	\N	\N	\N	\N	\N	0	2021-11-20 19:06:24.404+00	2021-11-20 19:06:24.404+00
116	pixelplaza	116	1	\N	\N	\N	\N	\N	0	2023-02-01 20:03:16.06+00	2023-02-01 20:03:16.06+00
28	electraforge	28	0	\N	\N	\N	\N	2023-05-19 05:22:36.352+00	0	2024-09-17 05:22:36.352+00	2023-05-18 05:22:36.352+00
117	electraforge	117	1	\N	\N	\N	\N	\N	0	2023-05-19 05:22:36.352+00	2023-05-19 05:22:36.352+00
34	electronera	34	0	\N	\N	\N	\N	2024-10-15 10:09:17.8+00	0	2024-10-14 10:09:17.8+00	2024-10-14 10:09:17.8+00
25	byteblitz	25	0	\N	\N	\N	\N	2023-04-20 06:19:17.712+00	0	2024-05-07 06:19:17.712+00	2023-04-19 06:19:17.712+00
120	byteblitz	120	1	\N	\N	\N	\N	\N	0	2023-04-20 06:19:17.712+00	2023-04-20 06:19:17.712+00
121	electronera	121	1	\N	\N	\N	\N	\N	0	2024-10-15 10:09:17.8+00	2024-10-15 10:09:17.8+00
125	pixelportal	125	1	\N	\N	\N	\N	\N	0	2024-02-14 17:26:04.668+00	2024-02-14 17:26:04.668+00
128	codeclan	128	1	\N	\N	\N	\N	\N	0	2023-12-29 04:03:11.048+00	2023-12-29 04:03:11.048+00
129	bytebuster	129	1	\N	\N	\N	\N	\N	0	2021-09-06 08:26:56.096+00	2021-09-06 08:26:56.096+00
\.


--
-- Name: app_metadata_jsons_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.app_metadata_jsons_id_seq', 130, true);


--
-- Name: file_data_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.file_data_id_seq', 260, true);


--
-- Name: files_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.files_id_seq', 346, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.migrations_id_seq', 7, true);


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

SELECT pg_catalog.setval('badgehub.versions_id_seq', 130, true);


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
-- Name: file_data file_data_pkey; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.file_data
    ADD CONSTRAINT file_data_pkey PRIMARY KEY (id);


--
-- Name: file_data file_data_sha256_key; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.file_data
    ADD CONSTRAINT file_data_sha256_key UNIQUE (sha256);


--
-- Name: files files_pkey; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);


--
-- Name: files files_unique_constraint; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.files
    ADD CONSTRAINT files_unique_constraint UNIQUE (version_id, dir, name, ext);


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
-- Name: versions versions_project_revision_unique; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.versions
    ADD CONSTRAINT versions_project_revision_unique UNIQUE (project_slug, revision);


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
-- Name: idx_categories_name; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_categories_name ON badgehub.categories USING btree (name);


--
-- Name: idx_file_data_sha256; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_file_data_sha256 ON badgehub.file_data USING btree (sha256);


--
-- Name: idx_files_sha256; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_files_sha256 ON badgehub.files USING btree (sha256);


--
-- Name: idx_user_id; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_user_id ON badgehub.projects USING btree (user_id);


--
-- Name: idx_versions_project_revision; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_versions_project_revision ON badgehub.versions USING btree (project_slug, revision);


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
-- Name: projects fk_project_draft_revision; Type: FK CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.projects
    ADD CONSTRAINT fk_project_draft_revision FOREIGN KEY (slug, draft_revision) REFERENCES badgehub.versions(project_slug, revision) ON DELETE SET NULL;


--
-- Name: projects fk_project_latest_revision; Type: FK CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.projects
    ADD CONSTRAINT fk_project_latest_revision FOREIGN KEY (slug, latest_revision) REFERENCES badgehub.versions(project_slug, revision) ON DELETE SET NULL;


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

