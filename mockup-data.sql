--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

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

--
-- Name: badge_project_status; Type: TYPE; Schema: badgehub; Owner: badgehub
--

CREATE TYPE badgehub.badge_project_status AS ENUM (
    'working',
    'in_progress',
    'broken',
    'unknown'
);


ALTER TYPE badgehub.badge_project_status OWNER TO badgehub;

--
-- Name: projects_project_type; Type: TYPE; Schema: badgehub; Owner: badgehub
--

CREATE TYPE badgehub.projects_project_type AS ENUM (
    'python',
    'esp32',
    'ice40'
);


ALTER TYPE badgehub.projects_project_type OWNER TO badgehub;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: badge_project; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.badge_project (
    id bigint NOT NULL,
    badge_id bigint NOT NULL,
    project_id bigint NOT NULL,
    status badgehub.badge_project_status DEFAULT 'unknown'::badgehub.badge_project_status NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE badgehub.badge_project OWNER TO badgehub;

--
-- Name: badge_project_id_seq; Type: SEQUENCE; Schema: badgehub; Owner: badgehub
--

CREATE SEQUENCE badgehub.badge_project_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE badgehub.badge_project_id_seq OWNER TO badgehub;

--
-- Name: badge_project_id_seq; Type: SEQUENCE OWNED BY; Schema: badgehub; Owner: badgehub
--

ALTER SEQUENCE badgehub.badge_project_id_seq OWNED BY badgehub.badge_project.id;


--
-- Name: badges; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.badges (
    id bigint NOT NULL,
    name character varying(191) NOT NULL,
    slug character varying(191) NOT NULL,
    constraints text,
    commands text,
    deleted_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE badgehub.badges OWNER TO badgehub;

--
-- Name: badges_id_seq; Type: SEQUENCE; Schema: badgehub; Owner: badgehub
--

CREATE SEQUENCE badgehub.badges_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE badgehub.badges_id_seq OWNER TO badgehub;

--
-- Name: badges_id_seq; Type: SEQUENCE OWNED BY; Schema: badgehub; Owner: badgehub
--

ALTER SEQUENCE badgehub.badges_id_seq OWNED BY badgehub.badges.id;


--
-- Name: categories; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.categories (
    id bigint NOT NULL,
    name character varying(191) NOT NULL,
    slug character varying(191) NOT NULL,
    deleted_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    hidden boolean DEFAULT false NOT NULL
);


ALTER TABLE badgehub.categories OWNER TO badgehub;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: badgehub; Owner: badgehub
--

CREATE SEQUENCE badgehub.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE badgehub.categories_id_seq OWNER TO badgehub;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: badgehub; Owner: badgehub
--

ALTER SEQUENCE badgehub.categories_id_seq OWNED BY badgehub.categories.id;


--
-- Name: dependencies; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.dependencies (
    project_id bigint,
    depends_on_project_id bigint,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE badgehub.dependencies OWNER TO badgehub;

--
-- Name: projects; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.projects (
    id bigint NOT NULL,
    category_id bigint DEFAULT '1'::bigint NOT NULL,
    user_id bigint NOT NULL,
    name character varying(191) NOT NULL,
    slug character varying(191),
    min_firmware bigint,
    max_firmware bigint,
    git character varying(191),
    git_commit_id character varying(191),
    published_at timestamp with time zone,
    deleted_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    download_counter bigint DEFAULT '0'::bigint NOT NULL,
    allow_team_fixes boolean DEFAULT true NOT NULL,
    project_type badgehub.projects_project_type DEFAULT 'python'::badgehub.projects_project_type NOT NULL,
    license character varying(191) DEFAULT 'MIT'::character varying NOT NULL,
    description character varying(500)
);


ALTER TABLE badgehub.projects OWNER TO badgehub;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: badgehub; Owner: badgehub
--

CREATE SEQUENCE badgehub.projects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE badgehub.projects_id_seq OWNER TO badgehub;

--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: badgehub; Owner: badgehub
--

ALTER SEQUENCE badgehub.projects_id_seq OWNED BY badgehub.projects.id;


--
-- Name: users; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.users (
    id bigint NOT NULL,
    admin boolean DEFAULT false NOT NULL,
    name character varying(191) NOT NULL,
    email character varying(191) NOT NULL,
    email_verified_at timestamp with time zone,
    password character varying(191) NOT NULL,
    remember_token character varying(100),
    editor character varying(80) DEFAULT 'default'::character varying NOT NULL,
    public boolean DEFAULT false NOT NULL,
    show_projects boolean DEFAULT true NOT NULL,
    google2fa_enabled boolean DEFAULT false NOT NULL,
    google2fa_secret text,
    deleted_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE badgehub.users OWNER TO badgehub;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: badgehub; Owner: badgehub
--

CREATE SEQUENCE badgehub.users_id_seq
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
-- Name: badge_project id; Type: DEFAULT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.badge_project ALTER COLUMN id SET DEFAULT nextval('badgehub.badge_project_id_seq'::regclass);


--
-- Name: badges id; Type: DEFAULT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.badges ALTER COLUMN id SET DEFAULT nextval('badgehub.badges_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.categories ALTER COLUMN id SET DEFAULT nextval('badgehub.categories_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.projects ALTER COLUMN id SET DEFAULT nextval('badgehub.projects_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.users ALTER COLUMN id SET DEFAULT nextval('badgehub.users_id_seq'::regclass);


--
-- Data for Name: badge_project; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.badge_project (id, badge_id, project_id, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: badges; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.badges (id, name, slug, constraints, commands, deleted_at, created_at, updated_at) FROM stdin;
1	mch2022	mch2022	\N	\N	\N	2022-06-12 16:41:34+00	2022-06-12 16:41:48+00
2	troopers23	troopers23	\N	\N	\N	2023-06-19 17:48:13+00	2023-06-19 17:48:13+00
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.categories (id, name, slug, deleted_at, created_at, updated_at, hidden) FROM stdin;
1	Uncategorised	uncategorised	\N	2022-06-27 17:06:25+00	2022-06-27 17:06:25+00	f
2	Event related	event_related	\N	2022-06-27 17:06:25+00	2022-06-27 17:06:25+00	f
3	Games	games	\N	2022-06-27 17:06:25+00	2022-06-27 17:06:25+00	f
4	Graphics	graphics	\N	2022-06-27 17:06:26+00	2022-06-27 17:06:26+00	f
5	Hardware	hardware	\N	2022-06-27 17:06:26+00	2022-06-27 17:06:26+00	f
6	Utility	utility	\N	2022-06-27 17:06:26+00	2022-06-27 17:06:26+00	f
7	Wearable	wearable	\N	2022-06-27 17:06:26+00	2022-06-27 17:06:26+00	f
8	Data	data	\N	2022-06-27 17:06:26+00	2022-06-27 17:06:26+00	f
9	Silly	silly	\N	2022-06-27 17:06:26+00	2022-06-27 17:06:26+00	f
10	Hacking	hacking	\N	2022-06-27 17:06:26+00	2022-06-27 17:06:26+00	f
11	Troll	troll	\N	2022-06-27 17:06:26+00	2022-06-27 17:06:26+00	f
12	Unusable	unusable	\N	2022-06-27 17:06:26+00	2022-06-27 17:06:26+00	f
13	Adult	adult	\N	2022-06-27 17:06:26+00	2022-06-27 17:06:26+00	f
14	Virus	virus	\N	2022-06-27 17:06:26+00	2022-06-27 17:06:26+00	f
15	SAO	sao	\N	\N	\N	f
\.


--
-- Data for Name: dependencies; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.dependencies (project_id, depends_on_project_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.projects (id, category_id, user_id, name, slug, min_firmware, max_firmware, git, git_commit_id, published_at, deleted_at, created_at, updated_at, download_counter, allow_team_fixes, project_type, license, description) FROM stdin;
0	10	29	CodeCraft	codecraft	\N	\N	\N	\N	\N	\N	2022-09-27 08:49:40.183+00	2022-11-04 08:49:40.183+00	0	t	python	MIT	With CodeCraft, you can do interesting things with the sensors.
1	9	31	PixelPulse	pixelpulse	\N	\N	\N	\N	\N	\N	2023-03-22 08:49:40.185+00	2023-06-29 08:49:40.185+00	0	t	python	MIT	With PixelPulse, you can do interesting things with the sensors.
2	4	26	BitBlast	bitblast	\N	\N	\N	\N	\N	\N	2023-09-25 08:49:40.186+00	2023-09-28 08:49:40.186+00	0	t	python	MIT	BitBlast is just some silly test app.
3	3	60	NanoGames	nanogames	\N	\N	\N	\N	\N	\N	2023-09-23 08:49:40.188+00	2023-10-17 08:49:40.188+00	0	t	python	MIT	Make some magic happen with NanoGames.
4	12	1	ElectraPlay	electraplay	\N	\N	\N	\N	\N	\N	2023-12-12 08:49:40.189+00	2024-01-14 08:49:40.189+00	0	t	python	MIT	Use ElectraPlay for some cool graphical effects.
5	3	11	CircuitForge	circuitforge	\N	\N	\N	\N	\N	\N	2023-05-05 08:49:40.19+00	2023-05-20 08:49:40.19+00	0	t	python	MIT	Make some magic happen with CircuitForge.
6	5	49	ByteBash	bytebash	\N	\N	\N	\N	\N	\N	2023-05-03 08:49:40.192+00	2023-07-01 08:49:40.192+00	0	t	python	MIT	ByteBash is just some silly test app.
7	10	44	CodeCanvas	codecanvas	\N	\N	\N	\N	\N	\N	2022-10-04 08:49:40.193+00	2022-10-28 08:49:40.193+00	0	t	python	MIT	Make some magic happen with CodeCanvas.
8	9	64	SparkScript	sparkscript	\N	\N	\N	\N	\N	\N	2022-10-17 08:49:40.195+00	2022-10-22 08:49:40.195+00	0	t	python	MIT	Use SparkScript for some cool graphical effects.
9	2	2	LogicLand	logicland	\N	\N	\N	\N	\N	\N	2023-01-13 08:49:40.196+00	2023-01-30 08:49:40.196+00	0	t	python	MIT	With LogicLand, you can do interesting things with the sensors.
10	8	66	MicroArcade	microarcade	\N	\N	\N	\N	\N	\N	2024-02-04 08:49:40.198+00	2024-04-26 08:49:40.198+00	0	t	python	MIT	Use MicroArcade for some cool graphical effects.
11	7	6	CodeCraze	codecraze	\N	\N	\N	\N	\N	\N	2024-03-02 08:49:40.2+00	2024-04-27 08:49:40.201+00	0	t	python	MIT	Make some magic happen with CodeCraze.
12	6	60	GameGenius	gamegenius	\N	\N	\N	\N	\N	\N	2023-04-15 08:49:40.202+00	2023-05-29 08:49:40.202+00	0	t	python	MIT	Make some magic happen with GameGenius.
13	6	0	PixelPal	pixelpal	\N	\N	\N	\N	\N	\N	2023-11-26 08:49:40.203+00	2024-01-31 08:49:40.203+00	0	t	python	MIT	With PixelPal, you can do interesting things with the sensors.
14	4	61	Electronica	electronica	\N	\N	\N	\N	\N	\N	2023-02-08 08:49:40.206+00	2023-02-15 08:49:40.206+00	0	t	python	MIT	With Electronica, you can do interesting things with the sensors.
15	2	36	CodeQuest	codequest	\N	\N	\N	\N	\N	\N	2022-10-26 08:49:40.207+00	2022-11-02 08:49:40.207+00	0	t	python	MIT	Use CodeQuest for some cool graphical effects.
16	12	56	CircuitCraft	circuitcraft	\N	\N	\N	\N	\N	\N	2023-12-06 08:49:40.21+00	2024-02-29 08:49:40.21+00	0	t	python	MIT	CircuitCraft is just some silly test app.
17	2	62	ByteBeat	bytebeat	\N	\N	\N	\N	\N	\N	2022-11-07 08:49:40.212+00	2022-11-24 08:49:40.212+00	0	t	python	MIT	With ByteBeat, you can do interesting things with the sensors.
18	7	4	NanoNexus	nanonexus	\N	\N	\N	\N	\N	\N	2022-10-04 08:49:40.213+00	2022-11-22 08:49:40.213+00	0	t	python	MIT	Make some magic happen with NanoNexus.
19	1	24	BitBox	bitbox	\N	\N	\N	\N	\N	\N	2023-09-06 08:49:40.216+00	2023-10-19 08:49:40.216+00	0	t	python	MIT	With BitBox, you can do interesting things with the sensors.
20	5	34	CircuitChaos	circuitchaos	\N	\N	\N	\N	\N	\N	2023-09-29 08:49:40.217+00	2023-12-12 08:49:40.217+00	0	t	python	MIT	Make some magic happen with CircuitChaos.
21	3	42	CodeCrafter	codecrafter	\N	\N	\N	\N	\N	\N	2023-11-13 08:49:40.22+00	2024-01-09 08:49:40.22+00	0	t	python	MIT	Make some magic happen with CodeCrafter.
22	1	46	PixelPioneer	pixelpioneer	\N	\N	\N	\N	\N	\N	2023-05-31 08:49:40.222+00	2023-07-20 08:49:40.222+00	0	t	python	MIT	Make some magic happen with PixelPioneer.
23	15	5	LogicLab	logiclab	\N	\N	\N	\N	\N	\N	2024-03-23 08:49:40.223+00	2024-05-30 08:49:40.223+00	0	t	python	MIT	With LogicLab, you can do interesting things with the sensors.
24	2	55	ByteBlitz	byteblitz	\N	\N	\N	\N	\N	\N	2022-11-02 08:49:40.227+00	2023-01-22 08:49:40.227+00	0	t	python	MIT	Use ByteBlitz for some cool graphical effects.
25	13	68	CodeWave	codewave	\N	\N	\N	\N	\N	\N	2023-07-05 08:49:40.228+00	2023-08-23 08:49:40.228+00	0	t	python	MIT	CodeWave is just some silly test app.
26	13	14	NanoNet	nanonet	\N	\N	\N	\N	\N	\N	2023-10-25 08:49:40.23+00	2024-01-30 08:49:40.23+00	0	t	python	MIT	NanoNet is just some silly test app.
27	9	32	ElectraForge	electraforge	\N	\N	\N	\N	\N	\N	2023-12-07 08:49:40.231+00	2023-12-31 08:49:40.231+00	0	t	python	MIT	Use ElectraForge for some cool graphical effects.
28	2	21	GameGrid	gamegrid	\N	\N	\N	\N	\N	\N	2023-11-29 08:49:40.232+00	2024-02-19 08:49:40.232+00	0	t	python	MIT	Use GameGrid for some cool graphical effects.
29	14	42	LogicLoom	logicloom	\N	\N	\N	\N	\N	\N	2023-03-17 08:49:40.234+00	2023-03-22 08:49:40.234+00	0	t	python	MIT	Use LogicLoom for some cool graphical effects.
30	1	5	PixelPlaza	pixelplaza	\N	\N	\N	\N	\N	\N	2022-11-28 08:49:40.236+00	2023-01-15 08:49:40.236+00	0	t	python	MIT	Make some magic happen with PixelPlaza.
31	5	67	CodeCity	codecity	\N	\N	\N	\N	\N	\N	2023-12-03 08:49:40.237+00	2023-12-05 08:49:40.237+00	0	t	python	MIT	With CodeCity, you can do interesting things with the sensors.
32	11	18	NanoArcade	nanoarcade	\N	\N	\N	\N	\N	\N	2024-02-03 08:49:40.239+00	2024-05-04 08:49:40.239+00	0	t	python	MIT	Make some magic happen with NanoArcade.
33	6	28	ElectronEra	electronera	\N	\N	\N	\N	\N	\N	2024-02-29 08:49:40.241+00	2024-04-26 08:49:40.241+00	0	t	python	MIT	ElectronEra is just some silly test app.
34	1	37	BitBazaar	bitbazaar	\N	\N	\N	\N	\N	\N	2023-03-24 08:49:40.242+00	2023-04-01 08:49:40.242+00	0	t	python	MIT	BitBazaar is just some silly test app.
35	11	34	LogicLegends	logiclegends	\N	\N	\N	\N	\N	\N	2023-01-07 08:49:40.244+00	2023-01-12 08:49:40.244+00	0	t	python	MIT	Make some magic happen with LogicLegends.
36	12	19	CodeClan	codeclan	\N	\N	\N	\N	\N	\N	2023-11-22 08:49:40.245+00	2023-12-28 08:49:40.245+00	0	t	python	MIT	CodeClan is just some silly test app.
37	5	70	PixelPortal	pixelportal	\N	\N	\N	\N	\N	\N	2022-12-20 08:49:40.246+00	2023-03-17 08:49:40.246+00	0	t	python	MIT	PixelPortal is just some silly test app.
38	4	35	CircuitCraze	circuitcraze	\N	\N	\N	\N	\N	\N	2024-02-22 08:49:40.247+00	2024-05-06 08:49:40.247+00	0	t	python	MIT	Make some magic happen with CircuitCraze.
39	9	60	ByteBuster	bytebuster	\N	\N	\N	\N	\N	\N	2024-04-14 08:49:40.249+00	2024-07-06 08:49:40.249+00	0	t	python	MIT	Make some magic happen with ByteBuster.
40	6	22	NanoNovel	nanonovel	\N	\N	\N	\N	\N	\N	2024-05-01 08:49:40.25+00	2024-07-06 08:49:40.25+00	0	t	python	MIT	With NanoNovel, you can do interesting things with the sensors.
41	3	17	ElectraEden	electraeden	\N	\N	\N	\N	\N	\N	2023-12-28 08:49:40.252+00	2024-02-08 08:49:40.252+00	0	t	python	MIT	ElectraEden is just some silly test app.
42	2	11	CodeComet	codecomet	\N	\N	\N	\N	\N	\N	2023-08-04 08:49:40.254+00	2023-09-05 08:49:40.254+00	0	t	python	MIT	Use CodeComet for some cool graphical effects.
43	5	41	PixelPlayground	pixelplayground	\N	\N	\N	\N	\N	\N	2022-10-24 08:49:40.255+00	2022-12-27 08:49:40.255+00	0	t	python	MIT	With PixelPlayground, you can do interesting things with the sensors.
44	1	40	LogicLandia	logiclandia	\N	\N	\N	\N	\N	\N	2023-06-01 08:49:40.256+00	2023-07-18 08:49:40.256+00	0	t	python	MIT	Use LogicLandia for some cool graphical effects.
45	6	44	ByteBounce	bytebounce	\N	\N	\N	\N	\N	\N	2023-02-28 08:49:40.257+00	2023-05-01 08:49:40.257+00	0	t	python	MIT	With ByteBounce, you can do interesting things with the sensors.
46	14	31	CircuitCarnival	circuitcarnival	\N	\N	\N	\N	\N	\N	2023-08-23 08:49:40.259+00	2023-11-23 08:49:40.259+00	0	t	python	MIT	Use CircuitCarnival for some cool graphical effects.
47	15	41	CodeCove	codecove	\N	\N	\N	\N	\N	\N	2023-12-18 08:49:40.26+00	2024-01-18 08:49:40.26+00	0	t	python	MIT	With CodeCove, you can do interesting things with the sensors.
48	7	55	NanoNest	nanonest	\N	\N	\N	\N	\N	\N	2023-04-30 08:49:40.262+00	2023-06-10 08:49:40.262+00	0	t	python	MIT	With NanoNest, you can do interesting things with the sensors.
49	5	19	ElectraEntertain	electraentertain	\N	\N	\N	\N	\N	\N	2023-12-29 08:49:40.263+00	2024-03-30 08:49:40.263+00	0	t	python	MIT	ElectraEntertain is just some silly test app.
50	6	0	GameGalaxy	gamegalaxy	\N	\N	\N	\N	\N	\N	2022-10-05 08:49:40.265+00	2022-10-10 08:49:40.265+00	0	t	python	MIT	Use GameGalaxy for some cool graphical effects.
51	10	44	LogicLabyrinth	logiclabyrinth	\N	\N	\N	\N	\N	\N	2022-12-29 08:49:40.267+00	2023-03-26 08:49:40.267+00	0	t	python	MIT	With LogicLabyrinth, you can do interesting things with the sensors.
52	3	4	ByteBlaster	byteblaster	\N	\N	\N	\N	\N	\N	2022-12-21 08:49:40.269+00	2023-02-05 08:49:40.269+00	0	t	python	MIT	Use ByteBlaster for some cool graphical effects.
53	14	15	CodeCompass	codecompass	\N	\N	\N	\N	\N	\N	2023-10-23 08:49:40.27+00	2023-11-08 08:49:40.27+00	0	t	python	MIT	Use CodeCompass for some cool graphical effects.
54	15	65	NanoNation	nanonation	\N	\N	\N	\N	\N	\N	2022-12-14 08:49:40.271+00	2022-12-26 08:49:40.271+00	0	t	python	MIT	NanoNation is just some silly test app.
55	10	27	ElectraEmpire	electraempire	\N	\N	\N	\N	\N	\N	2023-05-13 08:49:40.273+00	2023-08-14 08:49:40.273+00	0	t	python	MIT	Make some magic happen with ElectraEmpire.
56	6	23	GameGarden	gamegarden	\N	\N	\N	\N	\N	\N	2023-01-16 08:49:40.274+00	2023-04-05 08:49:40.274+00	0	t	python	MIT	With GameGarden, you can do interesting things with the sensors.
57	7	40	PixelPeak	pixelpeak	\N	\N	\N	\N	\N	\N	2024-01-26 08:49:40.276+00	2024-02-25 08:49:40.276+00	0	t	python	MIT	With PixelPeak, you can do interesting things with the sensors.
58	14	30	CircuitCelestial	circuitcelestial	\N	\N	\N	\N	\N	\N	2024-01-19 08:49:40.278+00	2024-02-27 08:49:40.278+00	0	t	python	MIT	CircuitCelestial is just some silly test app.
59	7	53	CodeCrusade	codecrusade	\N	\N	\N	\N	\N	\N	2024-05-13 08:49:40.279+00	2024-07-16 08:49:40.279+00	0	t	python	MIT	With CodeCrusade, you can do interesting things with the sensors.
60	14	62	NanoNebula	nanonebula	\N	\N	\N	\N	\N	\N	2023-12-07 08:49:40.28+00	2024-03-14 08:49:40.281+00	0	t	python	MIT	NanoNebula is just some silly test app.
61	2	61	ElectraEnclave	electraenclave	\N	\N	\N	\N	\N	\N	2023-06-22 08:49:40.282+00	2023-08-15 08:49:40.282+00	0	t	python	MIT	Make some magic happen with ElectraEnclave.
62	8	3	GameGizmo	gamegizmo	\N	\N	\N	\N	\N	\N	2023-07-16 08:49:40.284+00	2023-09-15 08:49:40.284+00	0	t	python	MIT	Make some magic happen with GameGizmo.
63	4	54	PixelPlanet	pixelplanet	\N	\N	\N	\N	\N	\N	2023-08-11 08:49:40.285+00	2023-10-23 08:49:40.285+00	0	t	python	MIT	PixelPlanet is just some silly test app.
64	1	5	LogicLounge	logiclounge	\N	\N	\N	\N	\N	\N	2023-01-16 08:49:40.286+00	2023-01-16 08:49:40.286+00	0	t	python	MIT	With LogicLounge, you can do interesting things with the sensors.
65	15	0	ByteBeacon	bytebeacon	\N	\N	\N	\N	\N	\N	2024-02-12 08:49:40.288+00	2024-04-13 08:49:40.288+00	0	t	python	MIT	With ByteBeacon, you can do interesting things with the sensors.
66	4	67	CodeCircus	codecircus	\N	\N	\N	\N	\N	\N	2023-04-22 08:49:40.289+00	2023-05-12 08:49:40.289+00	0	t	python	MIT	Use CodeCircus for some cool graphical effects.
67	8	32	NanoNook	nanonook	\N	\N	\N	\N	\N	\N	2023-11-09 08:49:40.291+00	2023-11-12 08:49:40.291+00	0	t	python	MIT	Use NanoNook for some cool graphical effects.
68	8	66	ElectraElysium	electraelysium	\N	\N	\N	\N	\N	\N	2023-01-15 08:49:40.292+00	2023-02-17 08:49:40.292+00	0	t	python	MIT	Make some magic happen with ElectraElysium.
69	8	21	GameGlimpse	gameglimpse	\N	\N	\N	\N	\N	\N	2023-07-19 08:49:40.294+00	2023-08-29 08:49:40.294+00	0	t	python	MIT	With GameGlimpse, you can do interesting things with the sensors.
70	11	8	PixelParadise	pixelparadise	\N	\N	\N	\N	\N	\N	2024-04-26 08:49:40.295+00	2024-07-17 08:49:40.295+00	0	t	python	MIT	Make some magic happen with PixelParadise.
71	10	31	CodeCoast	codecoast	\N	\N	\N	\N	\N	\N	2022-10-16 08:49:40.296+00	2022-12-26 08:49:40.296+00	0	t	python	MIT	Make some magic happen with CodeCoast.
72	6	28	NanoNirvana	nanonirvana	\N	\N	\N	\N	\N	\N	2023-03-21 08:49:40.297+00	2023-05-20 08:49:40.297+00	0	t	python	MIT	Use NanoNirvana for some cool graphical effects.
73	7	50	ElectraEdifice	electraedifice	\N	\N	\N	\N	\N	\N	2024-05-01 08:49:40.299+00	2024-06-26 08:49:40.299+00	0	t	python	MIT	ElectraEdifice is just some silly test app.
74	4	47	GameGen	gamegen	\N	\N	\N	\N	\N	\N	2022-09-27 08:49:40.3+00	2022-12-04 08:49:40.3+00	0	t	python	MIT	Use GameGen for some cool graphical effects.
75	7	49	PixelPandemonium	pixelpandemonium	\N	\N	\N	\N	\N	\N	2023-09-14 08:49:40.301+00	2023-11-29 08:49:40.301+00	0	t	python	MIT	PixelPandemonium is just some silly test app.
76	10	63	LogicLagoon	logiclagoon	\N	\N	\N	\N	\N	\N	2023-12-17 08:49:40.302+00	2024-02-16 08:49:40.302+00	0	t	python	MIT	LogicLagoon is just some silly test app.
77	11	63	ByteBlaze	byteblaze	\N	\N	\N	\N	\N	\N	2024-01-24 08:49:40.303+00	2024-04-19 08:49:40.304+00	0	t	python	MIT	Use ByteBlaze for some cool graphical effects.
78	2	1	CodeCorridor	codecorridor	\N	\N	\N	\N	\N	\N	2023-01-26 08:49:40.305+00	2023-03-22 08:49:40.305+00	0	t	python	MIT	CodeCorridor is just some silly test app.
79	2	6	HackSimulator	hacksimulator	\N	\N	\N	\N	\N	\N	2023-10-06 08:49:40.306+00	2023-12-05 08:49:40.306+00	0	t	python	MIT	HackSimulator is just some silly test app.
80	10	37	CodeCrunch	codecrunch	\N	\N	\N	\N	\N	\N	2023-04-04 08:49:40.307+00	2023-05-01 08:49:40.307+00	0	t	python	MIT	Use CodeCrunch for some cool graphical effects.
81	6	59	SecureCraft	securecraft	\N	\N	\N	\N	\N	\N	2023-05-07 08:49:40.308+00	2023-07-12 08:49:40.308+00	0	t	python	MIT	SecureCraft is just some silly test app.
82	8	37	CryptoPulse	cryptopulse	\N	\N	\N	\N	\N	\N	2023-10-05 08:49:40.31+00	2023-11-10 08:49:40.31+00	0	t	python	MIT	Make some magic happen with CryptoPulse.
83	12	45	DataForge	dataforge	\N	\N	\N	\N	\N	\N	2023-10-20 08:49:40.312+00	2023-11-17 08:49:40.312+00	0	t	python	MIT	Use DataForge for some cool graphical effects.
84	4	67	CipherQuest	cipherquest	\N	\N	\N	\N	\N	\N	2024-03-15 08:49:40.313+00	2024-04-25 08:49:40.313+00	0	t	python	MIT	Make some magic happen with CipherQuest.
85	8	10	HackQuest	hackquest	\N	\N	\N	\N	\N	\N	2023-02-22 08:49:40.314+00	2023-05-23 08:49:40.314+00	0	t	python	MIT	With HackQuest, you can do interesting things with the sensors.
86	13	48	SecureSphere	securesphere	\N	\N	\N	\N	\N	\N	2023-11-22 08:49:40.315+00	2024-01-24 08:49:40.315+00	0	t	python	MIT	With SecureSphere, you can do interesting things with the sensors.
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.users (id, admin, name, email, email_verified_at, password, remember_token, editor, public, show_projects, google2fa_enabled, google2fa_secret, deleted_at, created_at, updated_at) FROM stdin;
0	f	TechTinkerer	techtinkerer@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2023-12-08 08:49:40.039+00	2024-02-09 08:49:40.048+00
1	t	CodeCrafter	codecrafter@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2024-02-15 08:49:40.059+00	2024-05-01 08:49:40.06+00
2	f	PixelPilot	pixelpilot@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2024-03-13 08:49:40.064+00	2024-06-19 08:49:40.064+00
3	f	LogicLion	logiclion@hotmail.com	\N	****	\N	default	f	t	f	\N	\N	2024-02-25 08:49:40.066+00	2024-04-10 08:49:40.066+00
4	f	ElectronEager	electroneager@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-02-16 08:49:40.069+00	2023-05-12 08:49:40.069+00
5	f	NanoNomad	nanonomad@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2023-11-30 08:49:40.071+00	2023-12-17 08:49:40.072+00
6	f	CircuitCraze	circuitcraze@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2022-09-27 08:49:40.075+00	2022-11-16 08:49:40.075+00
7	f	GameGlider	gameglider@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2023-09-26 08:49:40.077+00	2023-10-03 08:49:40.077+00
8	f	ByteBlast	byteblast@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2023-10-12 08:49:40.08+00	2023-10-27 08:49:40.08+00
9	f	CyberCraft	cybercraft@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-06-30 08:49:40.083+00	2023-10-04 08:49:40.083+00
10	f	DigitalDynamo	digitaldynamo@hackalot.nl	\N	****	\N	default	t	f	f	\N	\N	2023-11-26 08:49:40.086+00	2024-01-07 08:49:40.086+00
11	f	CodeCreator	codecreator@hack42.nl	\N	****	\N	default	t	t	f	\N	\N	2022-09-26 08:49:40.089+00	2022-11-29 08:49:40.089+00
12	f	PixelPulse	pixelpulse@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2022-12-26 08:49:40.09+00	2023-03-24 08:49:40.09+00
13	t	LogicLuminary	logicluminary@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2023-10-15 08:49:40.092+00	2023-12-03 08:49:40.092+00
14	f	ElectronEcho	electronecho@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2023-07-31 08:49:40.093+00	2023-11-07 08:49:40.093+00
15	f	NanoNinja	nanoninja@hack42.nl	\N	****	\N	default	t	t	f	\N	\N	2022-12-20 08:49:40.095+00	2023-01-12 08:49:40.095+00
16	f	CircuitChampion	circuitchampion@hack42.nl	\N	****	\N	default	t	t	f	\N	\N	2023-09-12 08:49:40.096+00	2023-10-05 08:49:40.096+00
17	f	GameGazer	gamegazer@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2024-02-23 08:49:40.098+00	2024-03-24 08:49:40.098+00
18	f	ByteBuddy	bytebuddy@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2023-06-18 08:49:40.099+00	2023-09-07 08:49:40.099+00
19	f	TechTornado	techtornado@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2024-03-03 08:49:40.101+00	2024-03-24 08:49:40.101+00
20	t	CodeChampion	codechampion@hack42.nl	\N	****	\N	default	f	t	f	\N	\N	2023-02-18 08:49:40.102+00	2023-03-26 08:49:40.102+00
21	f	PixelProdigy	pixelprodigy@gmail.com	\N	****	\N	default	f	t	f	\N	\N	2023-02-23 08:49:40.103+00	2023-05-17 08:49:40.103+00
22	f	LogicLabyrinth	logiclabyrinth@hack42.nl	\N	****	\N	default	t	t	f	\N	\N	2023-03-25 08:49:40.105+00	2023-04-15 08:49:40.105+00
23	f	ElectronExplorer	electronexplorer@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2023-02-25 08:49:40.106+00	2023-03-14 08:49:40.106+00
24	t	NanoNavigator	nanonavigator@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-07-10 08:49:40.107+00	2023-09-08 08:49:40.107+00
25	f	CircuitCatalyst	circuitcatalyst@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2023-06-20 08:49:40.108+00	2023-07-26 08:49:40.108+00
26	f	GameGuru	gameguru@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2022-12-28 08:49:40.11+00	2023-01-26 08:49:40.11+00
27	f	ByteBlaze	byteblaze@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-01-27 08:49:40.111+00	2023-03-02 08:49:40.111+00
28	f	DigitalDreamer	digitaldreamer@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2024-03-07 08:49:40.113+00	2024-06-02 08:49:40.113+00
29	f	CodeCommander	codecommander@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-02-14 08:49:40.114+00	2023-03-12 08:49:40.114+00
30	f	PixelPioneer	pixelpioneer@bitlair.nl	\N	****	\N	default	f	t	f	\N	\N	2024-02-22 08:49:40.115+00	2024-05-26 08:49:40.115+00
31	f	LogicLegend	logiclegend@techinc.nl	\N	****	\N	default	f	f	f	\N	\N	2023-12-01 08:49:40.116+00	2023-12-14 08:49:40.116+00
32	f	ElectronElite	electronelite@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2023-12-24 08:49:40.118+00	2024-02-26 08:49:40.118+00
33	f	NanoNerd	nanonerd@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2024-05-14 08:49:40.119+00	2024-06-12 08:49:40.119+00
34	f	CircuitCaptain	circuitcaptain@hack42.nl	\N	****	\N	default	t	t	f	\N	\N	2023-07-31 08:49:40.12+00	2023-08-06 08:49:40.12+00
35	f	GameGenius	gamegenius@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-01-08 08:49:40.122+00	2023-01-22 08:49:40.122+00
36	f	ByteBolt	bytebolt@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-01-24 08:49:40.123+00	2023-04-23 08:49:40.123+00
37	f	CyberCipher	cybercipher@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2022-12-19 08:49:40.125+00	2023-01-30 08:49:40.125+00
38	f	CodeConqueror	codeconqueror@hack42.nl	\N	****	\N	default	t	f	f	\N	\N	2022-11-08 08:49:40.127+00	2022-11-10 08:49:40.127+00
39	f	PixelPaladin	pixelpaladin@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2023-06-21 08:49:40.129+00	2023-06-25 08:49:40.129+00
40	t	LogicLore	logiclore@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-07-11 08:49:40.131+00	2023-07-14 08:49:40.131+00
41	f	ElectronEnigma	electronenigma@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2024-05-02 08:49:40.132+00	2024-07-22 08:49:40.132+00
42	t	CircuitConnoisseur	circuitconnoisseur@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-04-12 08:49:40.134+00	2023-05-19 08:49:40.134+00
43	f	GameGuardian	gameguardian@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2023-12-28 08:49:40.136+00	2024-03-15 08:49:40.136+00
44	f	ByteBandit	bytebandit@techinc.nl	\N	****	\N	default	f	t	f	\N	\N	2023-06-28 08:49:40.137+00	2023-09-29 08:49:40.137+00
45	f	TechTinker	techtinker@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2023-05-18 08:49:40.139+00	2023-07-07 08:49:40.139+00
46	f	CodeCrusader	codecrusader@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-09-04 08:49:40.14+00	2023-09-18 08:49:40.14+00
47	f	PixelPirate	pixelpirate@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-09-24 08:49:40.142+00	2023-09-27 08:49:40.142+00
48	f	ElectronEagle	electroneagle@techinc.nl	\N	****	\N	default	t	f	f	\N	\N	2023-09-29 08:49:40.143+00	2023-10-26 08:49:40.143+00
49	f	CircuitSavant	circuitsavant@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2024-04-24 08:49:40.145+00	2024-05-18 08:49:40.145+00
50	f	GameGladiator	gamegladiator@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2023-05-02 08:49:40.147+00	2023-05-03 08:49:40.147+00
51	f	ByteBlitz	byteblitz@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-07-25 08:49:40.148+00	2023-09-11 08:49:40.148+00
52	f	CyberSavvy	cybersavvy@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2023-09-15 08:49:40.149+00	2023-10-05 08:49:40.149+00
53	f	CodeCraftsman	codecraftsman@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2024-01-31 08:49:40.151+00	2024-05-01 08:49:40.151+00
54	f	PixelPro	pixelpro@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-03-25 08:49:40.152+00	2023-06-28 08:49:40.152+00
55	f	LogicLoreMaster	logicloremaster@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2024-04-12 08:49:40.154+00	2024-05-29 08:49:40.154+00
56	f	ElectronEmperor	electronemperor@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2024-04-15 08:49:40.155+00	2024-06-14 08:49:40.155+00
57	f	CircuitChamp	circuitchamp@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2022-12-02 08:49:40.158+00	2022-12-04 08:49:40.158+00
58	f	GameGizmo	gamegizmo@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2024-04-19 08:49:40.159+00	2024-07-25 08:49:40.159+00
59	f	ByteBrawler	bytebrawler@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2023-10-28 08:49:40.161+00	2023-10-31 08:49:40.161+00
60	f	TechTrailblazer	techtrailblazer@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2022-10-13 08:49:40.162+00	2022-11-26 08:49:40.162+00
61	f	CodeCaptain	codecaptain@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2023-12-15 08:49:40.164+00	2024-03-17 08:49:40.164+00
62	f	PixelPathfinder	pixelpathfinder@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2022-12-13 08:49:40.166+00	2023-03-04 08:49:40.166+00
63	f	LogicLionheart	logiclionheart@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-08-11 08:49:40.168+00	2023-08-30 08:49:40.168+00
64	f	ElectronExpedition	electronexpedition@hack42.nl	\N	****	\N	default	t	t	f	\N	\N	2023-05-25 08:49:40.169+00	2023-06-28 08:49:40.169+00
65	f	NanoNoble	nanonoble@bitlair.nl	\N	****	\N	default	f	t	f	\N	\N	2023-05-25 08:49:40.171+00	2023-08-21 08:49:40.171+00
66	f	CircuitCommander	circuitcommander@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2023-09-18 08:49:40.172+00	2023-12-06 08:49:40.172+00
67	f	GameGlobetrotter	gameglobetrotter@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2023-11-27 08:49:40.174+00	2024-02-05 08:49:40.174+00
68	f	CyberSherpa	cybersherpa@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-07-19 08:49:40.175+00	2023-10-10 08:49:40.175+00
69	f	CyberCraftsman	cybercraftsman@hack42.nl	\N	****	\N	default	t	t	f	\N	\N	2023-11-18 08:49:40.178+00	2024-01-29 08:49:40.178+00
70	f	CodeConnoisseur	codeconnoisseur@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2022-12-17 08:49:40.18+00	2023-01-08 08:49:40.18+00
\.


--
-- Name: badge_project_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.badge_project_id_seq', 555, true);


--
-- Name: badges_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.badges_id_seq', 2, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.categories_id_seq', 15, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.projects_id_seq', 189, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.users_id_seq', 1, true);


--
-- Name: badge_project idx_24600_primary; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.badge_project
    ADD CONSTRAINT idx_24600_primary PRIMARY KEY (id);


--
-- Name: badges idx_24606_primary; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.badges
    ADD CONSTRAINT idx_24606_primary PRIMARY KEY (id);


--
-- Name: categories idx_24613_primary; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.categories
    ADD CONSTRAINT idx_24613_primary PRIMARY KEY (id);


--
-- Name: projects idx_24649_primary; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.projects
    ADD CONSTRAINT idx_24649_primary PRIMARY KEY (id);


--
-- Name: users idx_24661_primary; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.users
    ADD CONSTRAINT idx_24661_primary PRIMARY KEY (id);


--
-- Name: idx_24600_badge_project_badge_id_foreign; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_24600_badge_project_badge_id_foreign ON badgehub.badge_project USING btree (badge_id);


--
-- Name: idx_24600_badge_project_project_id_foreign; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_24600_badge_project_project_id_foreign ON badgehub.badge_project USING btree (project_id);


--
-- Name: idx_24606_badges_slug_unique; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE UNIQUE INDEX idx_24606_badges_slug_unique ON badgehub.badges USING btree (slug);


--
-- Name: idx_24613_categories_name_unique; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE UNIQUE INDEX idx_24613_categories_name_unique ON badgehub.categories USING btree (name);


--
-- Name: idx_24618_dependencies_depends_on_project_id_foreign; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_24618_dependencies_depends_on_project_id_foreign ON badgehub.dependencies USING btree (depends_on_project_id);


--
-- Name: idx_24618_dependencies_project_id_foreign; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_24618_dependencies_project_id_foreign ON badgehub.dependencies USING btree (project_id);


--
-- Name: idx_24649_projects_name_unique; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE UNIQUE INDEX idx_24649_projects_name_unique ON badgehub.projects USING btree (name);


--
-- Name: idx_24649_projects_slug_unique; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE UNIQUE INDEX idx_24649_projects_slug_unique ON badgehub.projects USING btree (slug);


--
-- Name: idx_24649_projects_user_id_foreign; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_24649_projects_user_id_foreign ON badgehub.projects USING btree (user_id);


--
-- Name: idx_24661_users_email_unique; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE UNIQUE INDEX idx_24661_users_email_unique ON badgehub.users USING btree (email);


--
-- Name: badge_project badge_project_badge_id_foreign; Type: FK CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.badge_project
    ADD CONSTRAINT badge_project_badge_id_foreign FOREIGN KEY (badge_id) REFERENCES badgehub.badges(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: badge_project badge_project_project_id_foreign; Type: FK CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.badge_project
    ADD CONSTRAINT badge_project_project_id_foreign FOREIGN KEY (project_id) REFERENCES badgehub.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: dependencies dependencies_depends_on_project_id_foreign; Type: FK CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.dependencies
    ADD CONSTRAINT dependencies_depends_on_project_id_foreign FOREIGN KEY (depends_on_project_id) REFERENCES badgehub.projects(id) ON DELETE CASCADE;


--
-- Name: dependencies dependencies_project_id_foreign; Type: FK CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.dependencies
    ADD CONSTRAINT dependencies_project_id_foreign FOREIGN KEY (project_id) REFERENCES badgehub.projects(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

