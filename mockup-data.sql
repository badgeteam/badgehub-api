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
556	5	0	unknown	\N	\N
557	2	0	unknown	\N	\N
558	5	1	unknown	\N	\N
559	5	2	unknown	\N	\N
560	1	3	unknown	\N	\N
561	2	3	unknown	\N	\N
562	2	4	unknown	\N	\N
563	2	5	unknown	\N	\N
564	1	6	unknown	\N	\N
565	2	7	unknown	\N	\N
566	5	8	unknown	\N	\N
567	5	9	unknown	\N	\N
568	2	10	unknown	\N	\N
569	2	11	unknown	\N	\N
570	1	12	unknown	\N	\N
571	2	12	unknown	\N	\N
572	2	13	unknown	\N	\N
573	2	14	unknown	\N	\N
574	5	15	unknown	\N	\N
575	1	16	unknown	\N	\N
576	5	17	unknown	\N	\N
577	2	17	unknown	\N	\N
578	1	18	unknown	\N	\N
579	5	18	unknown	\N	\N
580	1	19	unknown	\N	\N
581	2	20	unknown	\N	\N
582	5	20	unknown	\N	\N
583	1	21	unknown	\N	\N
584	2	22	unknown	\N	\N
585	5	23	unknown	\N	\N
586	2	24	unknown	\N	\N
587	5	24	unknown	\N	\N
588	1	25	unknown	\N	\N
589	2	25	unknown	\N	\N
590	5	26	unknown	\N	\N
591	5	27	unknown	\N	\N
592	1	27	unknown	\N	\N
593	2	28	unknown	\N	\N
594	2	29	unknown	\N	\N
595	2	30	unknown	\N	\N
596	5	31	unknown	\N	\N
597	1	32	unknown	\N	\N
598	5	33	unknown	\N	\N
599	5	34	unknown	\N	\N
600	2	35	unknown	\N	\N
601	5	36	unknown	\N	\N
602	1	36	unknown	\N	\N
603	2	37	unknown	\N	\N
604	5	38	unknown	\N	\N
605	1	39	unknown	\N	\N
606	1	40	unknown	\N	\N
607	2	41	unknown	\N	\N
608	1	41	unknown	\N	\N
609	1	42	unknown	\N	\N
610	5	43	unknown	\N	\N
611	5	44	unknown	\N	\N
612	1	45	unknown	\N	\N
613	5	45	unknown	\N	\N
614	1	46	unknown	\N	\N
615	1	47	unknown	\N	\N
616	2	47	unknown	\N	\N
617	5	48	unknown	\N	\N
618	5	49	unknown	\N	\N
619	1	50	unknown	\N	\N
620	5	51	unknown	\N	\N
621	1	52	unknown	\N	\N
622	2	53	unknown	\N	\N
623	1	54	unknown	\N	\N
624	5	55	unknown	\N	\N
625	1	55	unknown	\N	\N
626	2	56	unknown	\N	\N
627	2	57	unknown	\N	\N
628	1	57	unknown	\N	\N
629	1	58	unknown	\N	\N
630	5	59	unknown	\N	\N
631	5	60	unknown	\N	\N
632	2	61	unknown	\N	\N
633	5	62	unknown	\N	\N
634	1	63	unknown	\N	\N
635	2	64	unknown	\N	\N
636	5	65	unknown	\N	\N
637	1	66	unknown	\N	\N
638	5	67	unknown	\N	\N
639	1	67	unknown	\N	\N
640	2	68	unknown	\N	\N
641	1	69	unknown	\N	\N
642	1	70	unknown	\N	\N
643	5	70	unknown	\N	\N
644	2	71	unknown	\N	\N
645	5	72	unknown	\N	\N
646	5	73	unknown	\N	\N
647	1	74	unknown	\N	\N
648	5	74	unknown	\N	\N
649	2	75	unknown	\N	\N
650	1	76	unknown	\N	\N
651	5	77	unknown	\N	\N
652	1	78	unknown	\N	\N
653	1	79	unknown	\N	\N
654	1	80	unknown	\N	\N
655	2	81	unknown	\N	\N
656	2	82	unknown	\N	\N
657	1	83	unknown	\N	\N
658	5	84	unknown	\N	\N
659	5	85	unknown	\N	\N
660	5	86	unknown	\N	\N
\.


--
-- Data for Name: badges; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.badges (id, name, slug, constraints, commands, deleted_at, created_at, updated_at) FROM stdin;
1	mch2022	mch2022	\N	\N	\N	2022-06-12 16:41:34+00	2022-06-12 16:41:48+00
2	troopers23	troopers23	\N	\N	\N	2023-06-19 17:48:13+00	2023-06-19 17:48:13+00
5	WHY2025	why2025	\N	\N	\N	2024-05-22 11:17:11.441719+00	2024-05-22 11:17:11.441719+00
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
0	9	67	CodeCraft	codecraft	\N	\N	\N	\N	\N	\N	2024-01-05 11:29:07.05+00	2024-03-20 11:29:07.05+00	0	t	python	MIT	Make some magic happen with CodeCraft.
1	3	58	PixelPulse	pixelpulse	\N	\N	\N	\N	\N	\N	2023-08-30 11:29:07.053+00	2023-10-29 11:29:07.053+00	0	t	python	MIT	Make some magic happen with PixelPulse.
2	2	43	BitBlast	bitblast	\N	\N	\N	\N	\N	\N	2023-09-22 11:29:07.055+00	2023-11-13 11:29:07.055+00	0	t	python	MIT	Make some magic happen with BitBlast.
3	2	10	NanoGames	nanogames	\N	\N	\N	\N	\N	\N	2022-10-24 11:29:07.056+00	2023-01-02 11:29:07.057+00	0	t	python	MIT	Make some magic happen with NanoGames.
4	12	47	ElectraPlay	electraplay	\N	\N	\N	\N	\N	\N	2023-09-04 11:29:07.058+00	2023-10-06 11:29:07.058+00	0	t	python	MIT	With ElectraPlay, you can do interesting things with the sensors.
5	15	54	CircuitForge	circuitforge	\N	\N	\N	\N	\N	\N	2023-01-28 11:29:07.06+00	2023-04-24 11:29:07.06+00	0	t	python	MIT	With CircuitForge, you can do interesting things with the sensors.
6	2	38	ByteBash	bytebash	\N	\N	\N	\N	\N	\N	2023-08-02 11:29:07.061+00	2023-10-27 11:29:07.061+00	0	t	python	MIT	Use ByteBash for some cool graphical effects.
7	13	19	CodeCanvas	codecanvas	\N	\N	\N	\N	\N	\N	2023-12-31 11:29:07.063+00	2024-02-09 11:29:07.063+00	0	t	python	MIT	With CodeCanvas, you can do interesting things with the sensors.
8	12	23	SparkScript	sparkscript	\N	\N	\N	\N	\N	\N	2022-12-13 11:29:07.064+00	2023-01-13 11:29:07.064+00	0	t	python	MIT	Make some magic happen with SparkScript.
9	8	38	LogicLand	logicland	\N	\N	\N	\N	\N	\N	2023-02-05 11:29:07.066+00	2023-05-13 11:29:07.066+00	0	t	python	MIT	Use LogicLand for some cool graphical effects.
10	2	13	MicroArcade	microarcade	\N	\N	\N	\N	\N	\N	2024-01-05 11:29:07.069+00	2024-03-01 11:29:07.069+00	0	t	python	MIT	MicroArcade is just some silly test app.
11	15	11	CodeCraze	codecraze	\N	\N	\N	\N	\N	\N	2024-05-07 11:29:07.071+00	2024-07-22 11:29:07.071+00	0	t	python	MIT	Use CodeCraze for some cool graphical effects.
12	15	23	GameGenius	gamegenius	\N	\N	\N	\N	\N	\N	2023-12-14 11:29:07.073+00	2024-01-22 11:29:07.073+00	0	t	python	MIT	GameGenius is just some silly test app.
13	7	54	PixelPal	pixelpal	\N	\N	\N	\N	\N	\N	2023-08-10 11:29:07.075+00	2023-10-23 11:29:07.075+00	0	t	python	MIT	Make some magic happen with PixelPal.
14	4	15	Electronica	electronica	\N	\N	\N	\N	\N	\N	2024-02-26 11:29:07.078+00	2024-04-29 11:29:07.078+00	0	t	python	MIT	Use Electronica for some cool graphical effects.
15	2	22	CodeQuest	codequest	\N	\N	\N	\N	\N	\N	2023-05-15 11:29:07.08+00	2023-07-04 11:29:07.08+00	0	t	python	MIT	Use CodeQuest for some cool graphical effects.
16	11	7	CircuitCraft	circuitcraft	\N	\N	\N	\N	\N	\N	2023-06-19 11:29:07.082+00	2023-07-20 11:29:07.083+00	0	t	python	MIT	Make some magic happen with CircuitCraft.
17	11	56	ByteBeat	bytebeat	\N	\N	\N	\N	\N	\N	2023-06-07 11:29:07.084+00	2023-07-30 11:29:07.084+00	0	t	python	MIT	ByteBeat is just some silly test app.
18	8	59	NanoNexus	nanonexus	\N	\N	\N	\N	\N	\N	2023-06-28 11:29:07.087+00	2023-07-16 11:29:07.087+00	0	t	python	MIT	With NanoNexus, you can do interesting things with the sensors.
19	2	16	BitBox	bitbox	\N	\N	\N	\N	\N	\N	2023-10-15 11:29:07.089+00	2023-10-21 11:29:07.089+00	0	t	python	MIT	With BitBox, you can do interesting things with the sensors.
20	12	38	CircuitChaos	circuitchaos	\N	\N	\N	\N	\N	\N	2023-02-08 11:29:07.09+00	2023-03-11 11:29:07.09+00	0	t	python	MIT	Use CircuitChaos for some cool graphical effects.
21	8	34	CodeCrafter	codecrafter	\N	\N	\N	\N	\N	\N	2024-04-16 11:29:07.092+00	2024-04-28 11:29:07.092+00	0	t	python	MIT	Use CodeCrafter for some cool graphical effects.
22	14	65	PixelPioneer	pixelpioneer	\N	\N	\N	\N	\N	\N	2022-12-07 11:29:07.094+00	2023-02-18 11:29:07.094+00	0	t	python	MIT	PixelPioneer is just some silly test app.
23	12	17	LogicLab	logiclab	\N	\N	\N	\N	\N	\N	2023-05-14 11:29:07.096+00	2023-08-16 11:29:07.096+00	0	t	python	MIT	Use LogicLab for some cool graphical effects.
24	8	31	ByteBlitz	byteblitz	\N	\N	\N	\N	\N	\N	2024-03-29 11:29:07.099+00	2024-05-23 11:29:07.099+00	0	t	python	MIT	Make some magic happen with ByteBlitz.
25	14	17	CodeWave	codewave	\N	\N	\N	\N	\N	\N	2024-03-09 11:29:07.1+00	2024-06-07 11:29:07.1+00	0	t	python	MIT	Use CodeWave for some cool graphical effects.
26	2	64	NanoNet	nanonet	\N	\N	\N	\N	\N	\N	2023-11-16 11:29:07.102+00	2024-01-16 11:29:07.102+00	0	t	python	MIT	NanoNet is just some silly test app.
27	7	64	ElectraForge	electraforge	\N	\N	\N	\N	\N	\N	2023-04-21 11:29:07.103+00	2023-06-29 11:29:07.104+00	0	t	python	MIT	Make some magic happen with ElectraForge.
28	7	4	GameGrid	gamegrid	\N	\N	\N	\N	\N	\N	2022-10-22 11:29:07.105+00	2022-12-09 11:29:07.105+00	0	t	python	MIT	With GameGrid, you can do interesting things with the sensors.
29	9	15	LogicLoom	logicloom	\N	\N	\N	\N	\N	\N	2023-08-28 11:29:07.106+00	2023-10-03 11:29:07.106+00	0	t	python	MIT	With LogicLoom, you can do interesting things with the sensors.
30	9	2	PixelPlaza	pixelplaza	\N	\N	\N	\N	\N	\N	2023-06-27 11:29:07.108+00	2023-06-28 11:29:07.108+00	0	t	python	MIT	Use PixelPlaza for some cool graphical effects.
31	2	58	CodeCity	codecity	\N	\N	\N	\N	\N	\N	2022-10-01 11:29:07.11+00	2022-10-27 11:29:07.11+00	0	t	python	MIT	CodeCity is just some silly test app.
32	11	12	NanoArcade	nanoarcade	\N	\N	\N	\N	\N	\N	2023-07-24 11:29:07.112+00	2023-08-11 11:29:07.112+00	0	t	python	MIT	Use NanoArcade for some cool graphical effects.
33	13	14	ElectronEra	electronera	\N	\N	\N	\N	\N	\N	2023-11-12 11:29:07.114+00	2024-01-17 11:29:07.114+00	0	t	python	MIT	With ElectronEra, you can do interesting things with the sensors.
34	11	7	BitBazaar	bitbazaar	\N	\N	\N	\N	\N	\N	2022-12-12 11:29:07.115+00	2023-02-13 11:29:07.115+00	0	t	python	MIT	Make some magic happen with BitBazaar.
35	15	44	LogicLegends	logiclegends	\N	\N	\N	\N	\N	\N	2023-03-16 11:29:07.116+00	2023-05-22 11:29:07.116+00	0	t	python	MIT	LogicLegends is just some silly test app.
36	8	33	CodeClan	codeclan	\N	\N	\N	\N	\N	\N	2023-11-28 11:29:07.118+00	2024-01-06 11:29:07.118+00	0	t	python	MIT	Use CodeClan for some cool graphical effects.
37	13	2	PixelPortal	pixelportal	\N	\N	\N	\N	\N	\N	2024-02-12 11:29:07.119+00	2024-04-25 11:29:07.119+00	0	t	python	MIT	PixelPortal is just some silly test app.
38	13	7	CircuitCraze	circuitcraze	\N	\N	\N	\N	\N	\N	2022-11-04 11:29:07.12+00	2023-01-22 11:29:07.12+00	0	t	python	MIT	With CircuitCraze, you can do interesting things with the sensors.
39	6	69	ByteBuster	bytebuster	\N	\N	\N	\N	\N	\N	2022-12-09 11:29:07.122+00	2022-12-24 11:29:07.122+00	0	t	python	MIT	With ByteBuster, you can do interesting things with the sensors.
40	9	12	NanoNovel	nanonovel	\N	\N	\N	\N	\N	\N	2024-03-17 11:29:07.123+00	2024-05-14 11:29:07.123+00	0	t	python	MIT	Make some magic happen with NanoNovel.
41	3	46	ElectraEden	electraeden	\N	\N	\N	\N	\N	\N	2023-05-19 11:29:07.125+00	2023-06-03 11:29:07.125+00	0	t	python	MIT	Use ElectraEden for some cool graphical effects.
42	13	34	CodeComet	codecomet	\N	\N	\N	\N	\N	\N	2024-02-25 11:29:07.126+00	2024-03-05 11:29:07.126+00	0	t	python	MIT	With CodeComet, you can do interesting things with the sensors.
43	15	28	PixelPlayground	pixelplayground	\N	\N	\N	\N	\N	\N	2023-02-15 11:29:07.128+00	2023-05-12 11:29:07.128+00	0	t	python	MIT	Make some magic happen with PixelPlayground.
44	1	70	LogicLandia	logiclandia	\N	\N	\N	\N	\N	\N	2023-08-10 11:29:07.129+00	2023-09-23 11:29:07.129+00	0	t	python	MIT	Use LogicLandia for some cool graphical effects.
45	9	7	ByteBounce	bytebounce	\N	\N	\N	\N	\N	\N	2024-03-02 11:29:07.13+00	2024-05-15 11:29:07.13+00	0	t	python	MIT	With ByteBounce, you can do interesting things with the sensors.
46	3	40	CircuitCarnival	circuitcarnival	\N	\N	\N	\N	\N	\N	2023-02-03 11:29:07.131+00	2023-03-10 11:29:07.131+00	0	t	python	MIT	Make some magic happen with CircuitCarnival.
47	15	48	CodeCove	codecove	\N	\N	\N	\N	\N	\N	2022-10-15 11:29:07.132+00	2022-12-05 11:29:07.132+00	0	t	python	MIT	Use CodeCove for some cool graphical effects.
48	3	16	NanoNest	nanonest	\N	\N	\N	\N	\N	\N	2023-10-05 11:29:07.133+00	2023-11-12 11:29:07.134+00	0	t	python	MIT	With NanoNest, you can do interesting things with the sensors.
49	1	48	ElectraEntertain	electraentertain	\N	\N	\N	\N	\N	\N	2023-07-11 11:29:07.135+00	2023-09-21 11:29:07.135+00	0	t	python	MIT	ElectraEntertain is just some silly test app.
50	13	50	GameGalaxy	gamegalaxy	\N	\N	\N	\N	\N	\N	2024-02-02 11:29:07.136+00	2024-05-05 11:29:07.136+00	0	t	python	MIT	Use GameGalaxy for some cool graphical effects.
51	12	3	LogicLabyrinth	logiclabyrinth	\N	\N	\N	\N	\N	\N	2024-01-04 11:29:07.138+00	2024-01-04 11:29:07.138+00	0	t	python	MIT	Make some magic happen with LogicLabyrinth.
52	12	28	ByteBlaster	byteblaster	\N	\N	\N	\N	\N	\N	2022-10-12 11:29:07.14+00	2022-11-07 11:29:07.14+00	0	t	python	MIT	ByteBlaster is just some silly test app.
53	8	6	CodeCompass	codecompass	\N	\N	\N	\N	\N	\N	2023-02-18 11:29:07.142+00	2023-03-20 11:29:07.142+00	0	t	python	MIT	CodeCompass is just some silly test app.
54	9	26	NanoNation	nanonation	\N	\N	\N	\N	\N	\N	2024-03-06 11:29:07.143+00	2024-06-11 11:29:07.143+00	0	t	python	MIT	Use NanoNation for some cool graphical effects.
55	9	37	ElectraEmpire	electraempire	\N	\N	\N	\N	\N	\N	2023-04-17 11:29:07.144+00	2023-06-14 11:29:07.145+00	0	t	python	MIT	ElectraEmpire is just some silly test app.
56	13	3	GameGarden	gamegarden	\N	\N	\N	\N	\N	\N	2024-04-04 11:29:07.146+00	2024-04-29 11:29:07.146+00	0	t	python	MIT	Make some magic happen with GameGarden.
57	4	34	PixelPeak	pixelpeak	\N	\N	\N	\N	\N	\N	2023-06-13 11:29:07.147+00	2023-07-13 11:29:07.147+00	0	t	python	MIT	With PixelPeak, you can do interesting things with the sensors.
58	3	55	CircuitCelestial	circuitcelestial	\N	\N	\N	\N	\N	\N	2023-07-14 11:29:07.149+00	2023-07-19 11:29:07.149+00	0	t	python	MIT	CircuitCelestial is just some silly test app.
59	5	30	CodeCrusade	codecrusade	\N	\N	\N	\N	\N	\N	2023-10-09 11:29:07.15+00	2023-12-23 11:29:07.15+00	0	t	python	MIT	CodeCrusade is just some silly test app.
60	12	16	NanoNebula	nanonebula	\N	\N	\N	\N	\N	\N	2023-03-03 11:29:07.151+00	2023-05-22 11:29:07.151+00	0	t	python	MIT	NanoNebula is just some silly test app.
61	6	3	ElectraEnclave	electraenclave	\N	\N	\N	\N	\N	\N	2023-09-18 11:29:07.153+00	2023-10-07 11:29:07.153+00	0	t	python	MIT	Use ElectraEnclave for some cool graphical effects.
62	4	7	GameGizmo	gamegizmo	\N	\N	\N	\N	\N	\N	2023-12-04 11:29:07.155+00	2024-01-17 11:29:07.155+00	0	t	python	MIT	Use GameGizmo for some cool graphical effects.
63	15	57	PixelPlanet	pixelplanet	\N	\N	\N	\N	\N	\N	2023-02-04 11:29:07.156+00	2023-04-06 11:29:07.156+00	0	t	python	MIT	With PixelPlanet, you can do interesting things with the sensors.
64	4	55	LogicLounge	logiclounge	\N	\N	\N	\N	\N	\N	2022-12-24 11:29:07.157+00	2023-03-02 11:29:07.157+00	0	t	python	MIT	Make some magic happen with LogicLounge.
65	9	9	ByteBeacon	bytebeacon	\N	\N	\N	\N	\N	\N	2024-01-25 11:29:07.158+00	2024-02-04 11:29:07.158+00	0	t	python	MIT	Use ByteBeacon for some cool graphical effects.
66	5	52	CodeCircus	codecircus	\N	\N	\N	\N	\N	\N	2023-07-04 11:29:07.16+00	2023-08-14 11:29:07.16+00	0	t	python	MIT	CodeCircus is just some silly test app.
67	13	41	NanoNook	nanonook	\N	\N	\N	\N	\N	\N	2022-12-14 11:29:07.161+00	2023-03-12 11:29:07.161+00	0	t	python	MIT	Make some magic happen with NanoNook.
68	1	55	ElectraElysium	electraelysium	\N	\N	\N	\N	\N	\N	2023-06-25 11:29:07.163+00	2023-07-28 11:29:07.163+00	0	t	python	MIT	Make some magic happen with ElectraElysium.
69	4	51	GameGlimpse	gameglimpse	\N	\N	\N	\N	\N	\N	2023-01-24 11:29:07.164+00	2023-03-12 11:29:07.164+00	0	t	python	MIT	GameGlimpse is just some silly test app.
70	14	38	PixelParadise	pixelparadise	\N	\N	\N	\N	\N	\N	2023-03-02 11:29:07.165+00	2023-03-22 11:29:07.165+00	0	t	python	MIT	PixelParadise is just some silly test app.
71	15	59	CodeCoast	codecoast	\N	\N	\N	\N	\N	\N	2024-01-18 11:29:07.167+00	2024-02-04 11:29:07.167+00	0	t	python	MIT	With CodeCoast, you can do interesting things with the sensors.
72	6	59	NanoNirvana	nanonirvana	\N	\N	\N	\N	\N	\N	2023-06-18 11:29:07.168+00	2023-07-18 11:29:07.168+00	0	t	python	MIT	NanoNirvana is just some silly test app.
73	6	55	ElectraEdifice	electraedifice	\N	\N	\N	\N	\N	\N	2022-11-15 11:29:07.17+00	2022-11-25 11:29:07.17+00	0	t	python	MIT	Make some magic happen with ElectraEdifice.
74	10	55	GameGen	gamegen	\N	\N	\N	\N	\N	\N	2023-01-16 11:29:07.171+00	2023-03-02 11:29:07.171+00	0	t	python	MIT	GameGen is just some silly test app.
75	7	44	PixelPandemonium	pixelpandemonium	\N	\N	\N	\N	\N	\N	2023-12-21 11:29:07.172+00	2024-03-23 11:29:07.172+00	0	t	python	MIT	Make some magic happen with PixelPandemonium.
76	9	46	LogicLagoon	logiclagoon	\N	\N	\N	\N	\N	\N	2023-11-25 11:29:07.174+00	2023-12-13 11:29:07.174+00	0	t	python	MIT	Use LogicLagoon for some cool graphical effects.
77	3	3	ByteBlaze	byteblaze	\N	\N	\N	\N	\N	\N	2023-03-20 11:29:07.175+00	2023-04-05 11:29:07.175+00	0	t	python	MIT	With ByteBlaze, you can do interesting things with the sensors.
78	9	46	CodeCorridor	codecorridor	\N	\N	\N	\N	\N	\N	2023-05-18 11:29:07.176+00	2023-07-21 11:29:07.176+00	0	t	python	MIT	CodeCorridor is just some silly test app.
79	9	37	HackSimulator	hacksimulator	\N	\N	\N	\N	\N	\N	2023-01-31 11:29:07.177+00	2023-03-06 11:29:07.177+00	0	t	python	MIT	With HackSimulator, you can do interesting things with the sensors.
80	6	45	CodeCrunch	codecrunch	\N	\N	\N	\N	\N	\N	2023-02-21 11:29:07.178+00	2023-05-27 11:29:07.178+00	0	t	python	MIT	With CodeCrunch, you can do interesting things with the sensors.
81	1	23	SecureCraft	securecraft	\N	\N	\N	\N	\N	\N	2024-01-29 11:29:07.179+00	2024-03-16 11:29:07.179+00	0	t	python	MIT	With SecureCraft, you can do interesting things with the sensors.
82	15	12	CryptoPulse	cryptopulse	\N	\N	\N	\N	\N	\N	2023-01-18 11:29:07.181+00	2023-04-16 11:29:07.181+00	0	t	python	MIT	With CryptoPulse, you can do interesting things with the sensors.
83	4	12	DataForge	dataforge	\N	\N	\N	\N	\N	\N	2023-07-15 11:29:07.182+00	2023-07-24 11:29:07.182+00	0	t	python	MIT	With DataForge, you can do interesting things with the sensors.
84	6	50	CipherQuest	cipherquest	\N	\N	\N	\N	\N	\N	2022-12-14 11:29:07.183+00	2022-12-24 11:29:07.183+00	0	t	python	MIT	With CipherQuest, you can do interesting things with the sensors.
85	5	37	HackQuest	hackquest	\N	\N	\N	\N	\N	\N	2023-08-16 11:29:07.185+00	2023-08-18 11:29:07.185+00	0	t	python	MIT	With HackQuest, you can do interesting things with the sensors.
86	14	54	SecureSphere	securesphere	\N	\N	\N	\N	\N	\N	2023-12-26 11:29:07.186+00	2024-03-15 11:29:07.186+00	0	t	python	MIT	Use SecureSphere for some cool graphical effects.
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.users (id, admin, name, email, email_verified_at, password, remember_token, editor, public, show_projects, google2fa_enabled, google2fa_secret, deleted_at, created_at, updated_at) FROM stdin;
0	f	TechTinkerer	techtinkerer@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-06-01 11:29:06.891+00	2023-08-19 11:29:06.9+00
1	f	CodeCrafter	codecrafter@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-12-19 11:29:06.912+00	2024-01-07 11:29:06.913+00
2	f	PixelPilot	pixelpilot@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2022-11-29 11:29:06.917+00	2023-01-17 11:29:06.918+00
3	f	LogicLion	logiclion@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2024-02-14 11:29:06.92+00	2024-03-20 11:29:06.921+00
4	f	ElectronEager	electroneager@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2024-02-08 11:29:06.923+00	2024-02-26 11:29:06.924+00
5	f	NanoNomad	nanonomad@hack42.nl	\N	****	\N	default	f	t	f	\N	\N	2024-05-13 11:29:06.927+00	2024-06-13 11:29:06.927+00
6	t	CircuitCraze	circuitcraze@hotmail.com	\N	****	\N	default	t	f	f	\N	\N	2024-01-27 11:29:06.931+00	2024-03-14 11:29:06.932+00
7	f	GameGlider	gameglider@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2023-09-14 11:29:06.934+00	2023-11-27 11:29:06.934+00
8	f	ByteBlast	byteblast@hotmail.com	\N	****	\N	default	t	f	f	\N	\N	2022-11-20 11:29:06.937+00	2022-12-05 11:29:06.937+00
9	f	CyberCraft	cybercraft@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-03-11 11:29:06.94+00	2023-05-14 11:29:06.941+00
10	f	DigitalDynamo	digitaldynamo@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2024-04-15 11:29:06.944+00	2024-04-22 11:29:06.944+00
11	f	CodeCreator	codecreator@hotmail.com	\N	****	\N	default	t	f	f	\N	\N	2023-10-12 11:29:06.946+00	2023-12-11 11:29:06.946+00
12	f	PixelPulse	pixelpulse@gmail.com	\N	****	\N	default	f	f	f	\N	\N	2024-03-27 11:29:06.948+00	2024-05-08 11:29:06.948+00
13	t	LogicLuminary	logicluminary@hack42.nl	\N	****	\N	default	t	t	f	\N	\N	2022-12-18 11:29:06.949+00	2023-02-16 11:29:06.949+00
14	f	ElectronEcho	electronecho@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2024-03-08 11:29:06.951+00	2024-06-04 11:29:06.951+00
15	f	NanoNinja	nanoninja@bitlair.nl	\N	****	\N	default	f	t	f	\N	\N	2023-03-29 11:29:06.953+00	2023-06-26 11:29:06.953+00
16	f	CircuitChampion	circuitchampion@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2024-01-05 11:29:06.955+00	2024-01-19 11:29:06.955+00
17	t	GameGazer	gamegazer@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2022-11-23 11:29:06.956+00	2023-02-08 11:29:06.956+00
18	f	ByteBuddy	bytebuddy@hack42.nl	\N	****	\N	default	t	t	f	\N	\N	2022-12-08 11:29:06.957+00	2023-01-28 11:29:06.957+00
19	f	TechTornado	techtornado@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2023-08-20 11:29:06.959+00	2023-11-27 11:29:06.959+00
20	f	CodeChampion	codechampion@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2022-11-10 11:29:06.96+00	2022-11-20 11:29:06.961+00
21	t	PixelProdigy	pixelprodigy@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2023-11-01 11:29:06.962+00	2023-12-06 11:29:06.962+00
22	f	LogicLabyrinth	logiclabyrinth@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2024-05-21 11:29:06.963+00	2024-06-04 11:29:06.964+00
23	f	ElectronExplorer	electronexplorer@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2023-04-01 11:29:06.965+00	2023-05-25 11:29:06.965+00
24	f	NanoNavigator	nanonavigator@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2022-10-02 11:29:06.967+00	2022-10-04 11:29:06.967+00
25	f	CircuitCatalyst	circuitcatalyst@bitlair.nl	\N	****	\N	default	f	t	f	\N	\N	2023-05-16 11:29:06.968+00	2023-08-13 11:29:06.968+00
26	f	GameGuru	gameguru@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2024-05-18 11:29:06.97+00	2024-07-15 11:29:06.97+00
27	f	ByteBlaze	byteblaze@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-12-29 11:29:06.971+00	2024-01-22 11:29:06.971+00
28	f	DigitalDreamer	digitaldreamer@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2024-03-24 11:29:06.973+00	2024-04-08 11:29:06.973+00
29	f	CodeCommander	codecommander@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2022-11-16 11:29:06.974+00	2023-01-05 11:29:06.974+00
30	f	PixelPioneer	pixelpioneer@bitlair.nl	\N	****	\N	default	f	t	f	\N	\N	2023-08-09 11:29:06.976+00	2023-11-06 11:29:06.976+00
31	f	LogicLegend	logiclegend@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2024-01-07 11:29:06.977+00	2024-03-14 11:29:06.977+00
32	f	ElectronElite	electronelite@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-12-30 11:29:06.978+00	2024-01-07 11:29:06.978+00
33	f	NanoNerd	nanonerd@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-11-04 11:29:06.98+00	2023-11-04 11:29:06.98+00
34	f	CircuitCaptain	circuitcaptain@hack42.nl	\N	****	\N	default	t	t	f	\N	\N	2024-01-19 11:29:06.981+00	2024-04-12 11:29:06.981+00
35	f	GameGenius	gamegenius@gmail.com	\N	****	\N	default	t	f	f	\N	\N	2023-06-11 11:29:06.983+00	2023-09-14 11:29:06.983+00
36	f	ByteBolt	bytebolt@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2023-12-11 11:29:06.984+00	2024-01-14 11:29:06.984+00
37	f	CyberCipher	cybercipher@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2022-10-01 11:29:06.986+00	2022-10-05 11:29:06.986+00
38	f	CodeConqueror	codeconqueror@hack42.nl	\N	****	\N	default	f	t	f	\N	\N	2023-09-26 11:29:06.988+00	2023-10-18 11:29:06.988+00
39	f	PixelPaladin	pixelpaladin@hack42.nl	\N	****	\N	default	t	t	f	\N	\N	2022-11-02 11:29:06.989+00	2022-12-24 11:29:06.99+00
40	f	LogicLore	logiclore@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2024-04-15 11:29:06.992+00	2024-07-01 11:29:06.992+00
41	f	ElectronEnigma	electronenigma@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2022-10-01 11:29:06.993+00	2022-10-24 11:29:06.993+00
42	f	CircuitConnoisseur	circuitconnoisseur@gmail.com	\N	****	\N	default	f	t	f	\N	\N	2022-10-26 11:29:06.996+00	2022-12-16 11:29:06.996+00
43	f	GameGuardian	gameguardian@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2023-07-16 11:29:06.998+00	2023-10-11 11:29:06.998+00
44	f	ByteBandit	bytebandit@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-01-08 11:29:07+00	2023-01-15 11:29:07+00
45	t	TechTinker	techtinker@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2023-10-05 11:29:07.002+00	2023-11-17 11:29:07.002+00
46	f	CodeCrusader	codecrusader@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2024-02-23 11:29:07.004+00	2024-05-19 11:29:07.004+00
47	f	PixelPirate	pixelpirate@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-09-30 11:29:07.006+00	2023-10-02 11:29:07.006+00
48	f	ElectronEagle	electroneagle@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2023-03-19 11:29:07.007+00	2023-06-10 11:29:07.007+00
49	t	CircuitSavant	circuitsavant@hackalot.nl	\N	****	\N	default	f	t	f	\N	\N	2024-02-08 11:29:07.009+00	2024-05-16 11:29:07.009+00
50	f	GameGladiator	gamegladiator@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2023-07-09 11:29:07.011+00	2023-09-15 11:29:07.011+00
51	f	ByteBlitz	byteblitz@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2024-03-18 11:29:07.013+00	2024-04-19 11:29:07.013+00
52	f	CyberSavvy	cybersavvy@bitlair.nl	\N	****	\N	default	t	f	f	\N	\N	2023-09-06 11:29:07.015+00	2023-11-15 11:29:07.015+00
53	f	CodeCraftsman	codecraftsman@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2023-03-02 11:29:07.017+00	2023-06-01 11:29:07.017+00
54	f	PixelPro	pixelpro@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-05-21 11:29:07.018+00	2023-06-05 11:29:07.018+00
55	f	LogicLoreMaster	logicloremaster@hackalot.nl	\N	****	\N	default	t	f	f	\N	\N	2023-03-24 11:29:07.02+00	2023-05-10 11:29:07.02+00
56	f	ElectronEmperor	electronemperor@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2023-05-11 11:29:07.022+00	2023-08-14 11:29:07.022+00
57	f	CircuitChamp	circuitchamp@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-10-21 11:29:07.024+00	2024-01-03 11:29:07.024+00
58	f	GameGizmo	gamegizmo@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-06-04 11:29:07.026+00	2023-08-24 11:29:07.026+00
59	f	ByteBrawler	bytebrawler@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2023-12-20 11:29:07.028+00	2024-01-23 11:29:07.028+00
60	f	TechTrailblazer	techtrailblazer@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-10-25 11:29:07.029+00	2023-11-19 11:29:07.029+00
61	f	CodeCaptain	codecaptain@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2023-01-03 11:29:07.031+00	2023-01-06 11:29:07.031+00
62	f	PixelPathfinder	pixelpathfinder@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-03-07 11:29:07.033+00	2023-03-26 11:29:07.033+00
63	f	LogicLionheart	logiclionheart@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2024-01-02 11:29:07.035+00	2024-03-31 11:29:07.035+00
64	f	ElectronExpedition	electronexpedition@hack42.nl	\N	****	\N	default	t	t	f	\N	\N	2023-10-20 11:29:07.036+00	2023-11-30 11:29:07.036+00
65	f	NanoNoble	nanonoble@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2022-11-14 11:29:07.037+00	2023-01-12 11:29:07.038+00
66	f	CircuitCommander	circuitcommander@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2023-01-26 11:29:07.039+00	2023-02-28 11:29:07.039+00
67	f	GameGlobetrotter	gameglobetrotter@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2023-01-05 11:29:07.04+00	2023-02-16 11:29:07.04+00
68	f	CyberSherpa	cybersherpa@hack42.nl	\N	****	\N	default	f	t	f	\N	\N	2023-03-19 11:29:07.042+00	2023-04-24 11:29:07.042+00
69	f	CyberCraftsman	cybercraftsman@bitlair.nl	\N	****	\N	default	t	f	f	\N	\N	2024-04-26 11:29:07.044+00	2024-05-08 11:29:07.044+00
70	f	CodeConnoisseur	codeconnoisseur@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-01-22 11:29:07.047+00	2023-04-20 11:29:07.047+00
\.


--
-- Name: badge_project_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.badge_project_id_seq', 660, true);


--
-- Name: badges_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.badges_id_seq', 5, true);


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

