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
-- Name: files; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.files (
    id bigint NOT NULL,
    user_id bigint,
    version_id bigint NOT NULL,
    name character varying(191) NOT NULL,
    content bytea,
    deleted_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE badgehub.files OWNER TO badgehub;

--
-- Name: files_id_seq; Type: SEQUENCE; Schema: badgehub; Owner: badgehub
--

CREATE SEQUENCE badgehub.files_id_seq
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
-- Name: jobs; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.jobs (
    id bigint NOT NULL,
    queue character varying(191) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at bigint,
    available_at bigint NOT NULL,
    created_at bigint NOT NULL
);


ALTER TABLE badgehub.jobs OWNER TO badgehub;

--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: badgehub; Owner: badgehub
--

CREATE SEQUENCE badgehub.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE badgehub.jobs_id_seq OWNER TO badgehub;

--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: badgehub; Owner: badgehub
--

ALTER SEQUENCE badgehub.jobs_id_seq OWNED BY badgehub.jobs.id;


--
-- Name: migrations; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.migrations (
    id bigint NOT NULL,
    migration character varying(191) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE badgehub.migrations OWNER TO badgehub;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: badgehub; Owner: badgehub
--

CREATE SEQUENCE badgehub.migrations_id_seq
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
-- Name: password_resets; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.password_resets (
    email character varying(191) NOT NULL,
    token character varying(191) NOT NULL,
    created_at timestamp with time zone
);


ALTER TABLE badgehub.password_resets OWNER TO badgehub;

--
-- Name: project_user; Type: TABLE; Schema: badgehub; Owner: badgehub
--

CREATE TABLE badgehub.project_user (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    project_id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE badgehub.project_user OWNER TO badgehub;

--
-- Name: project_user_id_seq; Type: SEQUENCE; Schema: badgehub; Owner: badgehub
--

CREATE SEQUENCE badgehub.project_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE badgehub.project_user_id_seq OWNER TO badgehub;

--
-- Name: project_user_id_seq; Type: SEQUENCE OWNED BY; Schema: badgehub; Owner: badgehub
--

ALTER SEQUENCE badgehub.project_user_id_seq OWNED BY badgehub.project_user.id;


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
    license character varying(191) DEFAULT 'MIT'::character varying NOT NULL
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
-- Name: files id; Type: DEFAULT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.files ALTER COLUMN id SET DEFAULT nextval('badgehub.files_id_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.jobs ALTER COLUMN id SET DEFAULT nextval('badgehub.jobs_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.migrations ALTER COLUMN id SET DEFAULT nextval('badgehub.migrations_id_seq'::regclass);


--
-- Name: project_user id; Type: DEFAULT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.project_user ALTER COLUMN id SET DEFAULT nextval('badgehub.project_user_id_seq'::regclass);


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
-- Data for Name: files; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.files (id, user_id, version_id, name, content, deleted_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.jobs (id, queue, payload, attempts, reserved_at, available_at, created_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.migrations (id, migration, batch) FROM stdin;
\.


--
-- Data for Name: password_resets; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.password_resets (email, token, created_at) FROM stdin;
\.


--
-- Data for Name: project_user; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.project_user (id, user_id, project_id, created_at, updated_at) FROM stdin;
0	50	10	2024-02-17 16:28:01.025+00	2024-05-23 16:28:01.025+00
1	10	4	2023-02-13 16:28:01.025+00	2023-03-13 16:28:01.025+00
2	69	71	2022-12-03 16:28:01.025+00	2022-12-08 16:28:01.025+00
3	16	22	2023-05-10 16:28:01.026+00	2023-08-02 16:28:01.026+00
4	15	76	2023-09-19 16:28:01.026+00	2023-09-22 16:28:01.026+00
5	37	56	2023-06-12 16:28:01.026+00	2023-08-11 16:28:01.026+00
6	55	14	2022-10-16 16:28:01.026+00	2022-11-15 16:28:01.026+00
7	4	32	2023-12-15 16:28:01.026+00	2024-03-15 16:28:01.026+00
8	14	81	2023-10-09 16:28:01.027+00	2023-10-09 16:28:01.027+00
9	14	81	2022-11-29 16:28:01.027+00	2023-01-18 16:28:01.027+00
10	25	24	2023-02-26 16:28:01.027+00	2023-04-08 16:28:01.027+00
11	43	84	2024-02-17 16:28:01.027+00	2024-05-26 16:28:01.027+00
12	10	65	2023-09-17 16:28:01.027+00	2023-10-26 16:28:01.027+00
13	65	80	2022-09-28 16:28:01.028+00	2022-11-20 16:28:01.028+00
14	65	43	2023-12-30 16:28:01.028+00	2024-02-04 16:28:01.028+00
15	26	83	2022-12-21 16:28:01.028+00	2023-03-11 16:28:01.028+00
16	25	7	2024-04-25 16:28:01.028+00	2024-06-09 16:28:01.028+00
17	7	4	2023-01-07 16:28:01.028+00	2023-02-24 16:28:01.028+00
18	3	55	2023-06-17 16:28:01.029+00	2023-06-17 16:28:01.029+00
19	70	1	2023-07-08 16:28:01.029+00	2023-10-10 16:28:01.029+00
20	38	66	2022-12-29 16:28:01.029+00	2023-03-27 16:28:01.029+00
21	64	40	2023-07-27 16:28:01.029+00	2023-09-11 16:28:01.029+00
22	43	23	2022-12-18 16:28:01.029+00	2023-01-29 16:28:01.029+00
23	27	27	2023-12-09 16:28:01.03+00	2024-03-16 16:28:01.03+00
24	17	5	2024-04-10 16:28:01.03+00	2024-04-26 16:28:01.03+00
25	38	10	2022-09-23 16:28:01.03+00	2022-11-29 16:28:01.03+00
26	8	5	2024-02-11 16:28:01.03+00	2024-05-17 16:28:01.03+00
27	63	44	2022-11-22 16:28:01.03+00	2023-02-13 16:28:01.03+00
28	50	7	2024-01-14 16:28:01.031+00	2024-03-25 16:28:01.031+00
29	12	18	2023-06-23 16:28:01.031+00	2023-06-27 16:28:01.031+00
30	66	1	2022-09-16 16:28:01.031+00	2022-12-18 16:28:01.031+00
31	16	84	2022-09-15 16:28:01.031+00	2022-10-23 16:28:01.031+00
32	60	40	2024-01-14 16:28:01.031+00	2024-03-25 16:28:01.031+00
33	67	30	2023-07-29 16:28:01.032+00	2023-10-23 16:28:01.032+00
34	62	24	2023-04-13 16:28:01.032+00	2023-04-27 16:28:01.032+00
35	43	44	2022-11-28 16:28:01.032+00	2023-02-28 16:28:01.032+00
36	35	62	2023-07-31 16:28:01.032+00	2023-10-30 16:28:01.032+00
37	69	41	2023-11-11 16:28:01.033+00	2024-01-31 16:28:01.033+00
38	9	49	2023-12-25 16:28:01.033+00	2024-03-25 16:28:01.033+00
39	21	9	2022-11-02 16:28:01.033+00	2022-11-22 16:28:01.033+00
40	19	84	2022-12-29 16:28:01.033+00	2023-02-20 16:28:01.033+00
41	12	49	2023-10-24 16:28:01.034+00	2023-11-17 16:28:01.034+00
42	51	42	2023-09-27 16:28:01.034+00	2023-11-09 16:28:01.034+00
43	52	8	2024-01-27 16:28:01.035+00	2024-03-09 16:28:01.035+00
44	16	10	2022-11-18 16:28:01.035+00	2022-11-26 16:28:01.035+00
45	26	15	2023-10-21 16:28:01.035+00	2023-12-03 16:28:01.035+00
46	6	53	2023-08-14 16:28:01.035+00	2023-10-21 16:28:01.035+00
47	51	53	2024-02-26 16:28:01.036+00	2024-04-19 16:28:01.036+00
48	67	18	2023-01-28 16:28:01.036+00	2023-03-20 16:28:01.036+00
49	34	38	2023-02-25 16:28:01.036+00	2023-04-24 16:28:01.036+00
50	35	5	2023-09-23 16:28:01.036+00	2023-12-08 16:28:01.036+00
51	24	63	2024-03-29 16:28:01.037+00	2024-06-09 16:28:01.037+00
52	59	65	2022-11-27 16:28:01.037+00	2023-01-15 16:28:01.037+00
53	36	67	2023-10-24 16:28:01.037+00	2023-11-09 16:28:01.037+00
54	3	31	2024-04-06 16:28:01.037+00	2024-04-06 16:28:01.037+00
55	58	40	2023-11-25 16:28:01.038+00	2023-12-19 16:28:01.038+00
56	35	16	2023-12-17 16:28:01.038+00	2024-02-18 16:28:01.038+00
57	57	35	2023-10-13 16:28:01.038+00	2023-11-11 16:28:01.038+00
58	19	20	2024-04-24 16:28:01.038+00	2024-07-09 16:28:01.038+00
59	0	30	2024-03-15 16:28:01.038+00	2024-04-17 16:28:01.038+00
60	53	4	2022-12-25 16:28:01.039+00	2022-12-27 16:28:01.039+00
61	20	34	2022-11-11 16:28:01.039+00	2022-11-22 16:28:01.039+00
62	60	43	2022-11-21 16:28:01.039+00	2022-12-23 16:28:01.039+00
63	54	53	2023-09-10 16:28:01.039+00	2023-10-27 16:28:01.039+00
64	37	38	2023-12-27 16:28:01.039+00	2024-02-01 16:28:01.039+00
65	22	12	2023-06-20 16:28:01.04+00	2023-09-07 16:28:01.04+00
66	50	10	2023-11-06 16:28:01.04+00	2023-12-27 16:28:01.04+00
67	65	79	2023-11-18 16:28:01.04+00	2023-12-05 16:28:01.04+00
68	61	34	2023-04-19 16:28:01.04+00	2023-05-09 16:28:01.04+00
69	50	60	2023-04-05 16:28:01.04+00	2023-05-25 16:28:01.04+00
70	69	21	2024-04-10 16:28:01.041+00	2024-06-02 16:28:01.041+00
71	31	64	2023-11-09 16:28:01.041+00	2024-02-10 16:28:01.041+00
72	48	85	2023-09-28 16:28:01.041+00	2023-11-22 16:28:01.041+00
73	27	60	2023-05-01 16:28:01.041+00	2023-07-10 16:28:01.041+00
74	11	65	2023-11-17 16:28:01.041+00	2024-01-17 16:28:01.041+00
75	22	14	2023-04-30 16:28:01.042+00	2023-05-02 16:28:01.042+00
76	69	81	2022-11-03 16:28:01.042+00	2022-11-15 16:28:01.042+00
77	59	17	2024-04-10 16:28:01.042+00	2024-06-05 16:28:01.042+00
78	38	44	2023-06-23 16:28:01.042+00	2023-08-03 16:28:01.042+00
79	0	83	2024-03-13 16:28:01.042+00	2024-04-29 16:28:01.042+00
80	3	10	2023-05-28 16:28:01.042+00	2023-08-10 16:28:01.042+00
81	63	54	2024-03-20 16:28:01.043+00	2024-05-07 16:28:01.043+00
82	65	1	2024-03-09 16:28:01.043+00	2024-06-05 16:28:01.043+00
83	15	82	2022-12-30 16:28:01.043+00	2023-02-20 16:28:01.043+00
84	36	19	2023-05-19 16:28:01.043+00	2023-06-20 16:28:01.043+00
85	52	48	2023-08-11 16:28:01.043+00	2023-09-21 16:28:01.043+00
86	48	69	2023-08-15 16:28:01.044+00	2023-10-05 16:28:01.044+00
87	12	13	2023-01-08 16:28:01.044+00	2023-02-17 16:28:01.044+00
88	53	19	2024-04-11 16:28:01.044+00	2024-05-22 16:28:01.044+00
89	17	64	2022-10-14 16:28:01.044+00	2022-11-01 16:28:01.044+00
90	29	25	2023-01-23 16:28:01.044+00	2023-03-16 16:28:01.044+00
91	49	73	2023-02-02 16:28:01.045+00	2023-03-05 16:28:01.045+00
92	14	83	2023-09-12 16:28:01.045+00	2023-09-26 16:28:01.045+00
93	15	30	2023-02-08 16:28:01.045+00	2023-04-19 16:28:01.045+00
94	64	75	2023-07-25 16:28:01.045+00	2023-09-29 16:28:01.045+00
95	1	38	2023-12-22 16:28:01.046+00	2024-02-25 16:28:01.046+00
96	67	74	2023-04-17 16:28:01.046+00	2023-07-12 16:28:01.046+00
97	37	81	2023-05-19 16:28:01.046+00	2023-08-12 16:28:01.046+00
98	45	59	2023-02-11 16:28:01.046+00	2023-03-28 16:28:01.046+00
99	6	4	2023-05-13 16:28:01.046+00	2023-05-30 16:28:01.046+00
100	3	72	2023-09-23 16:28:01.047+00	2023-10-12 16:28:01.047+00
101	11	57	2023-09-24 16:28:01.047+00	2023-12-29 16:28:01.047+00
102	43	27	2022-12-06 16:28:01.047+00	2022-12-21 16:28:01.047+00
103	27	77	2024-03-17 16:28:01.047+00	2024-06-15 16:28:01.047+00
104	10	22	2023-01-29 16:28:01.047+00	2023-02-09 16:28:01.047+00
105	55	20	2022-10-30 16:28:01.047+00	2023-01-11 16:28:01.047+00
106	40	84	2023-09-21 16:28:01.048+00	2023-12-27 16:28:01.048+00
107	46	1	2024-04-07 16:28:01.048+00	2024-05-17 16:28:01.048+00
108	30	61	2023-04-14 16:28:01.048+00	2023-06-04 16:28:01.048+00
109	28	77	2024-04-23 16:28:01.048+00	2024-05-30 16:28:01.048+00
110	57	64	2023-05-27 16:28:01.049+00	2023-06-13 16:28:01.049+00
111	20	22	2023-07-10 16:28:01.049+00	2023-09-15 16:28:01.049+00
112	36	65	2023-10-07 16:28:01.049+00	2023-11-12 16:28:01.049+00
113	45	3	2023-02-06 16:28:01.049+00	2023-05-09 16:28:01.049+00
114	15	73	2023-05-31 16:28:01.049+00	2023-06-02 16:28:01.049+00
115	37	22	2022-12-17 16:28:01.05+00	2023-03-25 16:28:01.05+00
116	13	32	2023-10-12 16:28:01.05+00	2023-11-04 16:28:01.05+00
117	60	79	2024-01-18 16:28:01.05+00	2024-02-01 16:28:01.05+00
118	26	38	2022-09-08 16:28:01.05+00	2022-11-13 16:28:01.05+00
119	24	70	2023-04-13 16:28:01.05+00	2023-07-20 16:28:01.05+00
120	12	69	2022-11-30 16:28:01.051+00	2023-02-20 16:28:01.051+00
121	20	75	2023-12-02 16:28:01.051+00	2024-01-27 16:28:01.051+00
122	15	5	2024-03-22 16:28:01.051+00	2024-05-06 16:28:01.051+00
123	8	22	2023-10-06 16:28:01.051+00	2023-11-16 16:28:01.051+00
124	15	11	2023-01-01 16:28:01.052+00	2023-02-14 16:28:01.052+00
125	5	0	2023-03-06 16:28:01.052+00	2023-03-23 16:28:01.052+00
126	53	40	2022-09-23 16:28:01.052+00	2022-11-18 16:28:01.052+00
127	70	45	2023-02-24 16:28:01.052+00	2023-03-31 16:28:01.052+00
128	39	66	2022-11-16 16:28:01.052+00	2023-02-01 16:28:01.052+00
129	41	24	2023-11-02 16:28:01.053+00	2023-12-19 16:28:01.053+00
130	14	79	2023-03-17 16:28:01.053+00	2023-06-24 16:28:01.053+00
131	56	47	2023-01-31 16:28:01.053+00	2023-05-10 16:28:01.053+00
132	58	51	2022-11-06 16:28:01.053+00	2023-02-02 16:28:01.053+00
133	38	29	2023-11-14 16:28:01.054+00	2023-12-11 16:28:01.054+00
134	43	64	2023-01-28 16:28:01.054+00	2023-03-18 16:28:01.054+00
135	50	33	2024-02-02 16:28:01.054+00	2024-02-24 16:28:01.054+00
136	34	3	2022-10-28 16:28:01.054+00	2023-01-04 16:28:01.054+00
137	7	4	2022-10-27 16:28:01.054+00	2023-01-05 16:28:01.054+00
138	44	69	2023-01-21 16:28:01.055+00	2023-04-07 16:28:01.055+00
139	51	52	2022-11-27 16:28:01.055+00	2023-01-08 16:28:01.055+00
140	35	12	2023-12-07 16:28:01.055+00	2024-03-09 16:28:01.055+00
141	16	82	2023-12-18 16:28:01.055+00	2024-02-14 16:28:01.055+00
142	69	82	2022-10-24 16:28:01.055+00	2022-12-26 16:28:01.055+00
143	50	66	2024-02-11 16:28:01.056+00	2024-05-06 16:28:01.056+00
144	12	64	2023-08-02 16:28:01.056+00	2023-10-06 16:28:01.056+00
145	49	49	2022-11-07 16:28:01.056+00	2022-11-23 16:28:01.056+00
146	38	84	2023-03-16 16:28:01.056+00	2023-03-28 16:28:01.056+00
147	55	31	2023-12-14 16:28:01.056+00	2024-02-03 16:28:01.056+00
148	2	44	2023-12-12 16:28:01.056+00	2024-03-09 16:28:01.056+00
149	55	47	2023-05-27 16:28:01.057+00	2023-06-18 16:28:01.057+00
150	38	12	2023-08-13 16:28:01.057+00	2023-09-30 16:28:01.057+00
151	39	37	2024-03-06 16:28:01.057+00	2024-04-04 16:28:01.057+00
152	42	2	2023-10-19 16:28:01.057+00	2023-12-17 16:28:01.057+00
153	46	65	2024-01-26 16:28:01.057+00	2024-02-28 16:28:01.057+00
154	56	64	2024-04-06 16:28:01.058+00	2024-05-10 16:28:01.058+00
155	32	75	2024-03-08 16:28:01.058+00	2024-03-24 16:28:01.058+00
156	1	76	2022-11-26 16:28:01.058+00	2023-01-31 16:28:01.058+00
157	56	65	2024-03-16 16:28:01.058+00	2024-04-16 16:28:01.058+00
158	37	75	2024-01-03 16:28:01.058+00	2024-03-26 16:28:01.058+00
159	22	54	2023-11-05 16:28:01.059+00	2023-12-17 16:28:01.059+00
160	33	56	2023-05-28 16:28:01.059+00	2023-06-07 16:28:01.059+00
161	68	42	2023-08-06 16:28:01.059+00	2023-09-21 16:28:01.059+00
162	21	37	2023-09-26 16:28:01.06+00	2023-12-30 16:28:01.06+00
163	25	21	2023-01-18 16:28:01.06+00	2023-02-08 16:28:01.06+00
164	13	8	2022-12-29 16:28:01.06+00	2023-02-20 16:28:01.06+00
165	1	22	2024-04-16 16:28:01.061+00	2024-05-07 16:28:01.061+00
166	34	63	2023-03-19 16:28:01.061+00	2023-04-18 16:28:01.061+00
167	9	70	2023-04-20 16:28:01.061+00	2023-06-05 16:28:01.061+00
168	61	30	2023-02-12 16:28:01.061+00	2023-04-12 16:28:01.061+00
169	4	23	2023-11-17 16:28:01.061+00	2023-12-18 16:28:01.061+00
170	11	36	2023-03-20 16:28:01.062+00	2023-06-03 16:28:01.062+00
171	32	69	2024-01-19 16:28:01.062+00	2024-02-17 16:28:01.062+00
172	65	32	2023-01-31 16:28:01.062+00	2023-01-31 16:28:01.062+00
173	6	47	2024-03-31 16:28:01.062+00	2024-06-25 16:28:01.062+00
174	45	35	2023-01-06 16:28:01.062+00	2023-02-26 16:28:01.062+00
175	20	18	2023-07-26 16:28:01.062+00	2023-08-08 16:28:01.062+00
176	12	80	2024-01-23 16:28:01.063+00	2024-04-09 16:28:01.063+00
177	15	62	2023-05-21 16:28:01.063+00	2023-05-31 16:28:01.063+00
178	18	43	2022-09-21 16:28:01.063+00	2022-12-15 16:28:01.063+00
179	32	29	2023-03-11 16:28:01.063+00	2023-04-27 16:28:01.063+00
180	44	22	2022-12-05 16:28:01.064+00	2023-01-11 16:28:01.064+00
181	31	30	2023-09-08 16:28:01.064+00	2023-12-10 16:28:01.064+00
182	20	32	2022-12-17 16:28:01.065+00	2022-12-27 16:28:01.065+00
183	22	66	2022-11-16 16:28:01.065+00	2023-02-09 16:28:01.065+00
184	65	61	2023-09-30 16:28:01.065+00	2023-10-17 16:28:01.065+00
185	1	72	2022-10-17 16:28:01.066+00	2022-12-22 16:28:01.066+00
186	9	30	2023-03-17 16:28:01.066+00	2023-03-17 16:28:01.066+00
187	22	48	2023-10-30 16:28:01.066+00	2023-11-18 16:28:01.066+00
188	30	42	2023-08-19 16:28:01.066+00	2023-11-17 16:28:01.066+00
189	69	5	2024-02-13 16:28:01.067+00	2024-04-04 16:28:01.067+00
190	30	68	2023-10-29 16:28:01.067+00	2023-11-18 16:28:01.067+00
191	18	38	2023-08-20 16:28:01.067+00	2023-10-29 16:28:01.067+00
192	8	45	2023-02-26 16:28:01.068+00	2023-04-29 16:28:01.068+00
193	69	21	2023-12-02 16:28:01.068+00	2024-02-01 16:28:01.068+00
194	49	7	2022-10-24 16:28:01.068+00	2022-10-28 16:28:01.068+00
195	2	52	2022-10-12 16:28:01.069+00	2022-11-06 16:28:01.069+00
196	52	0	2023-05-01 16:28:01.069+00	2023-06-01 16:28:01.069+00
197	29	24	2023-12-06 16:28:01.069+00	2023-12-21 16:28:01.069+00
198	66	38	2023-05-25 16:28:01.07+00	2023-08-28 16:28:01.07+00
199	70	71	2023-04-07 16:28:01.07+00	2023-07-01 16:28:01.07+00
200	8	2	2022-10-05 16:28:01.071+00	2022-12-17 16:28:01.071+00
201	17	10	2023-07-08 16:28:01.071+00	2023-08-08 16:28:01.071+00
202	32	51	2024-02-20 16:28:01.071+00	2024-05-13 16:28:01.071+00
203	63	15	2023-03-06 16:28:01.071+00	2023-04-09 16:28:01.071+00
204	7	10	2023-01-11 16:28:01.071+00	2023-02-11 16:28:01.071+00
205	20	57	2023-10-06 16:28:01.072+00	2023-12-06 16:28:01.072+00
206	5	59	2023-12-08 16:28:01.072+00	2024-02-28 16:28:01.072+00
207	11	38	2023-10-24 16:28:01.072+00	2023-12-22 16:28:01.072+00
208	64	4	2022-12-26 16:28:01.072+00	2023-02-05 16:28:01.072+00
209	10	11	2023-08-15 16:28:01.073+00	2023-10-09 16:28:01.073+00
210	6	16	2024-03-25 16:28:01.073+00	2024-04-26 16:28:01.073+00
211	13	50	2023-10-12 16:28:01.073+00	2023-12-04 16:28:01.073+00
212	65	13	2023-01-17 16:28:01.073+00	2023-03-08 16:28:01.073+00
213	8	71	2023-02-15 16:28:01.073+00	2023-04-02 16:28:01.073+00
214	69	35	2023-08-27 16:28:01.074+00	2023-11-14 16:28:01.074+00
215	11	35	2024-01-23 16:28:01.074+00	2024-02-27 16:28:01.074+00
216	58	76	2023-03-06 16:28:01.074+00	2023-05-28 16:28:01.074+00
217	8	36	2024-02-22 16:28:01.074+00	2024-05-01 16:28:01.074+00
218	62	43	2022-10-25 16:28:01.074+00	2023-01-25 16:28:01.074+00
219	38	54	2023-02-17 16:28:01.075+00	2023-03-28 16:28:01.075+00
220	54	64	2023-03-07 16:28:01.075+00	2023-05-12 16:28:01.075+00
221	30	69	2022-11-09 16:28:01.075+00	2023-02-02 16:28:01.075+00
222	62	78	2023-04-14 16:28:01.075+00	2023-07-22 16:28:01.075+00
223	6	68	2024-01-19 16:28:01.076+00	2024-01-24 16:28:01.076+00
224	4	56	2023-02-18 16:28:01.076+00	2023-03-10 16:28:01.076+00
225	21	70	2023-10-04 16:28:01.076+00	2023-12-31 16:28:01.076+00
226	6	58	2024-01-05 16:28:01.076+00	2024-02-06 16:28:01.076+00
227	41	54	2024-03-25 16:28:01.077+00	2024-05-05 16:28:01.077+00
228	13	9	2023-06-13 16:28:01.077+00	2023-09-05 16:28:01.077+00
229	11	76	2024-04-16 16:28:01.077+00	2024-05-22 16:28:01.077+00
230	14	7	2023-01-19 16:28:01.077+00	2023-03-18 16:28:01.077+00
231	39	68	2023-07-31 16:28:01.077+00	2023-10-09 16:28:01.077+00
232	23	76	2023-12-28 16:28:01.078+00	2024-01-27 16:28:01.078+00
233	21	59	2023-10-16 16:28:01.078+00	2023-11-08 16:28:01.078+00
234	30	22	2022-10-15 16:28:01.078+00	2022-11-30 16:28:01.078+00
235	48	36	2022-09-24 16:28:01.078+00	2022-10-11 16:28:01.078+00
236	27	64	2024-04-24 16:28:01.078+00	2024-04-26 16:28:01.078+00
237	70	23	2023-05-05 16:28:01.079+00	2023-06-05 16:28:01.079+00
238	65	32	2022-12-16 16:28:01.079+00	2022-12-28 16:28:01.079+00
239	18	21	2022-10-13 16:28:01.079+00	2022-11-24 16:28:01.079+00
240	44	81	2022-09-30 16:28:01.079+00	2022-10-16 16:28:01.079+00
241	40	64	2023-09-08 16:28:01.079+00	2023-11-27 16:28:01.079+00
242	51	40	2022-11-02 16:28:01.08+00	2022-11-11 16:28:01.08+00
243	67	4	2023-10-23 16:28:01.08+00	2024-01-07 16:28:01.08+00
244	31	75	2022-11-09 16:28:01.08+00	2023-01-21 16:28:01.08+00
245	15	37	2023-08-12 16:28:01.08+00	2023-11-11 16:28:01.08+00
246	41	38	2024-03-24 16:28:01.08+00	2024-04-09 16:28:01.08+00
247	66	13	2023-08-02 16:28:01.081+00	2023-08-10 16:28:01.081+00
248	12	15	2024-02-21 16:28:01.081+00	2024-05-20 16:28:01.081+00
249	5	40	2022-09-30 16:28:01.081+00	2022-12-01 16:28:01.081+00
250	1	16	2023-09-02 16:28:01.081+00	2023-09-29 16:28:01.081+00
251	33	76	2023-02-09 16:28:01.081+00	2023-03-23 16:28:01.081+00
252	51	71	2024-04-18 16:28:01.082+00	2024-04-27 16:28:01.082+00
253	14	31	2024-02-03 16:28:01.082+00	2024-02-17 16:28:01.082+00
254	46	10	2022-12-28 16:28:01.082+00	2023-03-10 16:28:01.082+00
255	4	55	2022-10-07 16:28:01.082+00	2022-12-12 16:28:01.082+00
256	58	66	2024-04-05 16:28:01.082+00	2024-06-30 16:28:01.082+00
257	33	82	2023-02-26 16:28:01.083+00	2023-04-13 16:28:01.083+00
258	13	55	2023-07-16 16:28:01.083+00	2023-09-07 16:28:01.083+00
259	5	55	2023-10-18 16:28:01.083+00	2024-01-03 16:28:01.083+00
260	45	86	2023-03-05 16:28:01.083+00	2023-04-21 16:28:01.083+00
261	3	30	2024-01-22 16:28:01.084+00	2024-02-08 16:28:01.084+00
262	25	32	2023-04-20 16:28:01.084+00	2023-06-12 16:28:01.084+00
263	18	80	2023-05-10 16:28:01.084+00	2023-06-25 16:28:01.084+00
264	0	48	2022-12-10 16:28:01.084+00	2023-02-13 16:28:01.084+00
265	19	26	2022-11-11 16:28:01.084+00	2022-11-18 16:28:01.084+00
266	14	79	2024-03-22 16:28:01.085+00	2024-06-20 16:28:01.085+00
267	6	16	2023-06-29 16:28:01.085+00	2023-07-20 16:28:01.085+00
268	32	76	2023-10-27 16:28:01.085+00	2024-01-11 16:28:01.085+00
269	32	50	2023-02-11 16:28:01.085+00	2023-03-23 16:28:01.085+00
270	19	48	2022-11-06 16:28:01.086+00	2022-11-12 16:28:01.086+00
271	44	83	2022-09-26 16:28:01.086+00	2022-10-22 16:28:01.086+00
272	47	3	2023-07-01 16:28:01.086+00	2023-09-10 16:28:01.086+00
273	48	16	2024-03-02 16:28:01.087+00	2024-04-07 16:28:01.087+00
274	51	27	2022-12-12 16:28:01.087+00	2023-02-23 16:28:01.087+00
275	60	24	2022-11-19 16:28:01.087+00	2023-02-07 16:28:01.087+00
276	6	42	2022-09-19 16:28:01.087+00	2022-10-25 16:28:01.087+00
277	32	5	2022-09-08 16:28:01.087+00	2022-11-01 16:28:01.087+00
278	50	0	2023-07-11 16:28:01.088+00	2023-08-30 16:28:01.088+00
279	29	20	2024-01-08 16:28:01.088+00	2024-03-22 16:28:01.088+00
280	61	66	2022-10-10 16:28:01.088+00	2022-12-08 16:28:01.088+00
281	5	26	2022-11-11 16:28:01.088+00	2022-12-31 16:28:01.088+00
282	11	30	2023-12-16 16:28:01.088+00	2023-12-22 16:28:01.088+00
283	70	51	2022-11-06 16:28:01.088+00	2022-12-16 16:28:01.088+00
284	36	4	2023-03-01 16:28:01.089+00	2023-03-22 16:28:01.089+00
285	19	61	2022-10-28 16:28:01.089+00	2022-11-29 16:28:01.089+00
286	34	17	2023-04-16 16:28:01.089+00	2023-05-27 16:28:01.089+00
287	13	9	2023-11-15 16:28:01.089+00	2024-01-24 16:28:01.089+00
288	68	27	2024-04-13 16:28:01.089+00	2024-07-03 16:28:01.089+00
289	26	18	2024-03-01 16:28:01.09+00	2024-05-12 16:28:01.09+00
290	17	50	2024-04-28 16:28:01.09+00	2024-06-28 16:28:01.09+00
291	25	13	2022-12-06 16:28:01.09+00	2023-01-31 16:28:01.09+00
292	26	7	2023-02-01 16:28:01.09+00	2023-02-11 16:28:01.09+00
293	60	70	2024-03-15 16:28:01.09+00	2024-03-25 16:28:01.09+00
294	28	80	2023-08-03 16:28:01.091+00	2023-09-26 16:28:01.091+00
295	0	85	2023-09-15 16:28:01.091+00	2023-12-15 16:28:01.091+00
296	11	56	2022-09-30 16:28:01.091+00	2022-10-26 16:28:01.091+00
297	13	65	2023-09-26 16:28:01.091+00	2023-12-02 16:28:01.091+00
298	14	13	2023-11-13 16:28:01.092+00	2023-12-25 16:28:01.092+00
299	63	56	2023-06-11 16:28:01.092+00	2023-07-01 16:28:01.092+00
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.projects (id, category_id, user_id, name, slug, min_firmware, max_firmware, git, git_commit_id, published_at, deleted_at, created_at, updated_at, download_counter, allow_team_fixes, project_type, license) FROM stdin;
0	10	54	CodeCraft	Make some magic happen with CodeCraft.	\N	\N	\N	\N	\N	\N	2023-10-02 16:28:01.004+00	2024-01-07 16:28:01.004+00	0	t	python	MIT
1	4	55	PixelPulse	Make some magic happen with PixelPulse.	\N	\N	\N	\N	\N	\N	2023-08-19 16:28:01.004+00	2023-11-15 16:28:01.004+00	0	t	python	MIT
2	15	17	BitBlast	With BitBlast, you can do interesting things with the sensors.	\N	\N	\N	\N	\N	\N	2022-09-19 16:28:01.005+00	2022-11-17 16:28:01.005+00	0	t	python	MIT
3	3	5	NanoGames	NanoGames is just some silly test app.	\N	\N	\N	\N	\N	\N	2023-02-16 16:28:01.005+00	2023-03-13 16:28:01.005+00	0	t	python	MIT
4	12	65	ElectraPlay	Use ElectraPlay for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2022-12-13 16:28:01.005+00	2022-12-13 16:28:01.005+00	0	t	python	MIT
5	3	61	CircuitForge	CircuitForge is just some silly test app.	\N	\N	\N	\N	\N	\N	2023-02-02 16:28:01.005+00	2023-04-25 16:28:01.005+00	0	t	python	MIT
6	15	18	ByteBash	ByteBash is just some silly test app.	\N	\N	\N	\N	\N	\N	2022-09-22 16:28:01.005+00	2022-11-13 16:28:01.005+00	0	t	python	MIT
7	13	54	CodeCanvas	With CodeCanvas, you can do interesting things with the sensors.	\N	\N	\N	\N	\N	\N	2023-09-04 16:28:01.006+00	2023-12-06 16:28:01.006+00	0	t	python	MIT
8	8	35	SparkScript	With SparkScript, you can do interesting things with the sensors.	\N	\N	\N	\N	\N	\N	2024-04-08 16:28:01.006+00	2024-04-11 16:28:01.006+00	0	t	python	MIT
9	8	58	LogicLand	Use LogicLand for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2023-09-07 16:28:01.006+00	2023-12-10 16:28:01.006+00	0	t	python	MIT
10	11	58	MicroArcade	Use MicroArcade for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2023-11-18 16:28:01.006+00	2024-02-15 16:28:01.006+00	0	t	python	MIT
11	9	26	CodeCraze	Use CodeCraze for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2023-06-07 16:28:01.006+00	2023-09-10 16:28:01.006+00	0	t	python	MIT
12	3	0	GameGenius	Make some magic happen with GameGenius.	\N	\N	\N	\N	\N	\N	2022-10-30 16:28:01.007+00	2022-11-14 16:28:01.007+00	0	t	python	MIT
13	4	55	PixelPal	PixelPal is just some silly test app.	\N	\N	\N	\N	\N	\N	2023-03-22 16:28:01.007+00	2023-06-21 16:28:01.007+00	0	t	python	MIT
14	5	10	Electronica	Electronica is just some silly test app.	\N	\N	\N	\N	\N	\N	2023-09-03 16:28:01.007+00	2023-11-02 16:28:01.007+00	0	t	python	MIT
15	13	9	CodeQuest	Use CodeQuest for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2024-01-13 16:28:01.007+00	2024-04-07 16:28:01.007+00	0	t	python	MIT
16	7	35	CircuitCraft	Use CircuitCraft for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2023-07-07 16:28:01.008+00	2023-10-06 16:28:01.008+00	0	t	python	MIT
17	13	47	ByteBeat	Use ByteBeat for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2022-10-27 16:28:01.008+00	2022-10-29 16:28:01.008+00	0	t	python	MIT
18	3	40	NanoNexus	Use NanoNexus for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2023-04-18 16:28:01.008+00	2023-05-15 16:28:01.008+00	0	t	python	MIT
19	2	48	BitBox	Make some magic happen with BitBox.	\N	\N	\N	\N	\N	\N	2023-05-07 16:28:01.008+00	2023-08-14 16:28:01.008+00	0	t	python	MIT
20	3	40	CircuitChaos	CircuitChaos is just some silly test app.	\N	\N	\N	\N	\N	\N	2023-08-03 16:28:01.009+00	2023-09-19 16:28:01.009+00	0	t	python	MIT
21	11	66	CodeCrafter	Use CodeCrafter for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2023-08-10 16:28:01.009+00	2023-10-01 16:28:01.009+00	0	t	python	MIT
22	13	37	PixelPioneer	Make some magic happen with PixelPioneer.	\N	\N	\N	\N	\N	\N	2024-03-03 16:28:01.009+00	2024-06-06 16:28:01.009+00	0	t	python	MIT
23	11	48	LogicLab	Make some magic happen with LogicLab.	\N	\N	\N	\N	\N	\N	2022-12-22 16:28:01.009+00	2023-02-17 16:28:01.009+00	0	t	python	MIT
24	15	65	ByteBlitz	ByteBlitz is just some silly test app.	\N	\N	\N	\N	\N	\N	2023-02-05 16:28:01.009+00	2023-04-05 16:28:01.009+00	0	t	python	MIT
25	8	35	CodeWave	Make some magic happen with CodeWave.	\N	\N	\N	\N	\N	\N	2023-01-25 16:28:01.01+00	2023-01-25 16:28:01.01+00	0	t	python	MIT
26	15	36	NanoNet	NanoNet is just some silly test app.	\N	\N	\N	\N	\N	\N	2023-10-23 16:28:01.01+00	2024-01-12 16:28:01.01+00	0	t	python	MIT
27	8	31	ElectraForge	Use ElectraForge for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2022-09-30 16:28:01.01+00	2022-11-19 16:28:01.01+00	0	t	python	MIT
28	15	37	GameGrid	GameGrid is just some silly test app.	\N	\N	\N	\N	\N	\N	2022-12-26 16:28:01.01+00	2023-01-08 16:28:01.01+00	0	t	python	MIT
29	4	46	LogicLoom	Make some magic happen with LogicLoom.	\N	\N	\N	\N	\N	\N	2024-02-09 16:28:01.01+00	2024-02-25 16:28:01.01+00	0	t	python	MIT
30	13	37	PixelPlaza	With PixelPlaza, you can do interesting things with the sensors.	\N	\N	\N	\N	\N	\N	2024-01-28 16:28:01.011+00	2024-02-15 16:28:01.011+00	0	t	python	MIT
31	3	64	CodeCity	Make some magic happen with CodeCity.	\N	\N	\N	\N	\N	\N	2024-04-07 16:28:01.011+00	2024-07-05 16:28:01.011+00	0	t	python	MIT
32	9	24	NanoArcade	Use NanoArcade for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2024-01-25 16:28:01.011+00	2024-02-05 16:28:01.011+00	0	t	python	MIT
33	9	34	ElectronEra	With ElectronEra, you can do interesting things with the sensors.	\N	\N	\N	\N	\N	\N	2023-09-01 16:28:01.011+00	2023-10-20 16:28:01.011+00	0	t	python	MIT
34	8	30	BitBazaar	BitBazaar is just some silly test app.	\N	\N	\N	\N	\N	\N	2023-06-14 16:28:01.012+00	2023-06-25 16:28:01.012+00	0	t	python	MIT
35	13	16	LogicLegends	Make some magic happen with LogicLegends.	\N	\N	\N	\N	\N	\N	2023-06-19 16:28:01.012+00	2023-07-29 16:28:01.012+00	0	t	python	MIT
36	6	29	CodeClan	Use CodeClan for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2022-11-09 16:28:01.012+00	2023-01-17 16:28:01.012+00	0	t	python	MIT
37	8	55	PixelPortal	PixelPortal is just some silly test app.	\N	\N	\N	\N	\N	\N	2023-10-21 16:28:01.012+00	2024-01-15 16:28:01.012+00	0	t	python	MIT
38	8	0	CircuitCraze	With CircuitCraze, you can do interesting things with the sensors.	\N	\N	\N	\N	\N	\N	2022-12-15 16:28:01.012+00	2023-03-01 16:28:01.012+00	0	t	python	MIT
39	1	2	ByteBuster	ByteBuster is just some silly test app.	\N	\N	\N	\N	\N	\N	2023-04-13 16:28:01.013+00	2023-06-23 16:28:01.013+00	0	t	python	MIT
40	5	28	NanoNovel	Use NanoNovel for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2023-04-02 16:28:01.013+00	2023-04-18 16:28:01.013+00	0	t	python	MIT
41	6	16	ElectraEden	ElectraEden is just some silly test app.	\N	\N	\N	\N	\N	\N	2023-10-25 16:28:01.013+00	2023-11-03 16:28:01.013+00	0	t	python	MIT
42	3	36	CodeComet	Use CodeComet for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2023-01-30 16:28:01.013+00	2023-04-13 16:28:01.013+00	0	t	python	MIT
43	12	31	PixelPlayground	PixelPlayground is just some silly test app.	\N	\N	\N	\N	\N	\N	2024-04-10 16:28:01.013+00	2024-07-06 16:28:01.013+00	0	t	python	MIT
44	9	63	LogicLandia	Make some magic happen with LogicLandia.	\N	\N	\N	\N	\N	\N	2024-03-28 16:28:01.014+00	2024-05-14 16:28:01.014+00	0	t	python	MIT
45	13	55	ByteBounce	Make some magic happen with ByteBounce.	\N	\N	\N	\N	\N	\N	2023-12-06 16:28:01.014+00	2024-02-11 16:28:01.014+00	0	t	python	MIT
46	6	12	CircuitCarnival	CircuitCarnival is just some silly test app.	\N	\N	\N	\N	\N	\N	2023-08-20 16:28:01.014+00	2023-10-09 16:28:01.014+00	0	t	python	MIT
47	8	52	CodeCove	With CodeCove, you can do interesting things with the sensors.	\N	\N	\N	\N	\N	\N	2023-09-07 16:28:01.014+00	2023-11-11 16:28:01.014+00	0	t	python	MIT
48	8	27	NanoNest	With NanoNest, you can do interesting things with the sensors.	\N	\N	\N	\N	\N	\N	2024-04-04 16:28:01.015+00	2024-07-06 16:28:01.015+00	0	t	python	MIT
49	3	23	ElectraEntertain	ElectraEntertain is just some silly test app.	\N	\N	\N	\N	\N	\N	2023-07-07 16:28:01.015+00	2023-09-04 16:28:01.015+00	0	t	python	MIT
50	6	30	GameGalaxy	GameGalaxy is just some silly test app.	\N	\N	\N	\N	\N	\N	2023-03-05 16:28:01.015+00	2023-05-26 16:28:01.015+00	0	t	python	MIT
51	6	23	LogicLabyrinth	Use LogicLabyrinth for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2023-03-25 16:28:01.016+00	2023-06-18 16:28:01.016+00	0	t	python	MIT
52	13	17	ByteBlaster	ByteBlaster is just some silly test app.	\N	\N	\N	\N	\N	\N	2023-05-04 16:28:01.016+00	2023-06-24 16:28:01.016+00	0	t	python	MIT
53	11	61	CodeCompass	With CodeCompass, you can do interesting things with the sensors.	\N	\N	\N	\N	\N	\N	2023-03-05 16:28:01.016+00	2023-03-15 16:28:01.016+00	0	t	python	MIT
54	14	68	NanoNation	Use NanoNation for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2023-04-20 16:28:01.017+00	2023-05-25 16:28:01.017+00	0	t	python	MIT
55	2	20	ElectraEmpire	Make some magic happen with ElectraEmpire.	\N	\N	\N	\N	\N	\N	2023-10-26 16:28:01.017+00	2023-11-03 16:28:01.017+00	0	t	python	MIT
56	13	10	GameGarden	Make some magic happen with GameGarden.	\N	\N	\N	\N	\N	\N	2024-04-21 16:28:01.017+00	2024-05-13 16:28:01.017+00	0	t	python	MIT
57	12	40	PixelPeak	Use PixelPeak for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2022-11-18 16:28:01.018+00	2022-12-06 16:28:01.018+00	0	t	python	MIT
58	10	63	CircuitCelestial	With CircuitCelestial, you can do interesting things with the sensors.	\N	\N	\N	\N	\N	\N	2022-11-18 16:28:01.018+00	2023-01-03 16:28:01.018+00	0	t	python	MIT
59	11	22	CodeCrusade	Use CodeCrusade for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2023-08-06 16:28:01.018+00	2023-09-02 16:28:01.018+00	0	t	python	MIT
60	6	24	NanoNebula	Use NanoNebula for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2023-02-28 16:28:01.018+00	2023-05-01 16:28:01.018+00	0	t	python	MIT
61	3	12	ElectraEnclave	ElectraEnclave is just some silly test app.	\N	\N	\N	\N	\N	\N	2023-07-21 16:28:01.019+00	2023-09-17 16:28:01.019+00	0	t	python	MIT
62	8	22	GameGizmo	With GameGizmo, you can do interesting things with the sensors.	\N	\N	\N	\N	\N	\N	2022-10-29 16:28:01.019+00	2022-12-18 16:28:01.019+00	0	t	python	MIT
63	14	13	PixelPlanet	Make some magic happen with PixelPlanet.	\N	\N	\N	\N	\N	\N	2022-09-22 16:28:01.019+00	2022-12-15 16:28:01.019+00	0	t	python	MIT
64	8	52	LogicLounge	Make some magic happen with LogicLounge.	\N	\N	\N	\N	\N	\N	2023-04-05 16:28:01.02+00	2023-05-30 16:28:01.02+00	0	t	python	MIT
65	12	10	ByteBeacon	With ByteBeacon, you can do interesting things with the sensors.	\N	\N	\N	\N	\N	\N	2023-02-04 16:28:01.02+00	2023-02-10 16:28:01.02+00	0	t	python	MIT
66	8	40	CodeCircus	With CodeCircus, you can do interesting things with the sensors.	\N	\N	\N	\N	\N	\N	2023-08-20 16:28:01.02+00	2023-09-24 16:28:01.02+00	0	t	python	MIT
67	13	3	NanoNook	Make some magic happen with NanoNook.	\N	\N	\N	\N	\N	\N	2022-10-11 16:28:01.02+00	2022-12-18 16:28:01.02+00	0	t	python	MIT
68	5	27	ElectraElysium	Use ElectraElysium for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2023-07-03 16:28:01.021+00	2023-07-20 16:28:01.021+00	0	t	python	MIT
69	12	55	GameGlimpse	GameGlimpse is just some silly test app.	\N	\N	\N	\N	\N	\N	2023-12-05 16:28:01.021+00	2023-12-26 16:28:01.021+00	0	t	python	MIT
70	10	28	PixelParadise	Use PixelParadise for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2023-11-22 16:28:01.021+00	2023-11-25 16:28:01.021+00	0	t	python	MIT
71	14	39	CodeCoast	With CodeCoast, you can do interesting things with the sensors.	\N	\N	\N	\N	\N	\N	2023-07-26 16:28:01.021+00	2023-07-30 16:28:01.021+00	0	t	python	MIT
72	2	49	NanoNirvana	NanoNirvana is just some silly test app.	\N	\N	\N	\N	\N	\N	2024-01-28 16:28:01.021+00	2024-02-25 16:28:01.021+00	0	t	python	MIT
73	14	13	ElectraEdifice	ElectraEdifice is just some silly test app.	\N	\N	\N	\N	\N	\N	2022-12-13 16:28:01.022+00	2023-01-10 16:28:01.022+00	0	t	python	MIT
74	13	34	GameGen	Make some magic happen with GameGen.	\N	\N	\N	\N	\N	\N	2023-01-19 16:28:01.022+00	2023-01-29 16:28:01.022+00	0	t	python	MIT
75	4	43	PixelPandemonium	Use PixelPandemonium for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2023-08-20 16:28:01.022+00	2023-09-05 16:28:01.022+00	0	t	python	MIT
76	10	6	LogicLagoon	Make some magic happen with LogicLagoon.	\N	\N	\N	\N	\N	\N	2024-04-20 16:28:01.022+00	2024-06-28 16:28:01.022+00	0	t	python	MIT
77	13	34	ByteBlaze	Make some magic happen with ByteBlaze.	\N	\N	\N	\N	\N	\N	2024-03-07 16:28:01.022+00	2024-05-26 16:28:01.022+00	0	t	python	MIT
78	15	70	CodeCorridor	With CodeCorridor, you can do interesting things with the sensors.	\N	\N	\N	\N	\N	\N	2023-12-27 16:28:01.023+00	2024-04-04 16:28:01.023+00	0	t	python	MIT
79	5	1	HackSimulator	Use HackSimulator for some cool graphical effects.	\N	\N	\N	\N	\N	\N	2023-11-20 16:28:01.023+00	2024-02-05 16:28:01.023+00	0	t	python	MIT
80	2	38	CodeCrunch	With CodeCrunch, you can do interesting things with the sensors.	\N	\N	\N	\N	\N	\N	2023-05-27 16:28:01.023+00	2023-08-28 16:28:01.023+00	0	t	python	MIT
81	7	44	SecureCraft	SecureCraft is just some silly test app.	\N	\N	\N	\N	\N	\N	2023-05-22 16:28:01.023+00	2023-07-03 16:28:01.023+00	0	t	python	MIT
82	14	52	CryptoPulse	With CryptoPulse, you can do interesting things with the sensors.	\N	\N	\N	\N	\N	\N	2023-06-28 16:28:01.023+00	2023-07-14 16:28:01.023+00	0	t	python	MIT
83	15	2	DataForge	With DataForge, you can do interesting things with the sensors.	\N	\N	\N	\N	\N	\N	2023-02-07 16:28:01.024+00	2023-04-19 16:28:01.024+00	0	t	python	MIT
84	7	32	CipherQuest	CipherQuest is just some silly test app.	\N	\N	\N	\N	\N	\N	2022-12-03 16:28:01.024+00	2023-01-19 16:28:01.024+00	0	t	python	MIT
85	7	39	HackQuest	With HackQuest, you can do interesting things with the sensors.	\N	\N	\N	\N	\N	\N	2023-03-15 16:28:01.024+00	2023-05-10 16:28:01.024+00	0	t	python	MIT
86	11	9	SecureSphere	SecureSphere is just some silly test app.	\N	\N	\N	\N	\N	\N	2022-12-27 16:28:01.025+00	2023-03-29 16:28:01.025+00	0	t	python	MIT
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: badgehub; Owner: badgehub
--

COPY badgehub.users (id, admin, name, email, email_verified_at, password, remember_token, editor, public, show_projects, google2fa_enabled, google2fa_secret, deleted_at, created_at, updated_at) FROM stdin;
0	f	TechTinkerer	techtinkerer@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2022-11-11 16:28:00.985+00	2022-12-15 16:28:00.985+00
1	f	CodeCrafter	codecrafter@ziggo.com	\N	****	\N	default	t	f	f	\N	\N	2022-10-06 16:28:00.986+00	2022-11-11 16:28:00.986+00
2	f	PixelPilot	pixelpilot@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2024-04-11 16:28:00.987+00	2024-05-02 16:28:00.987+00
3	f	LogicLion	logiclion@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2023-07-07 16:28:00.987+00	2023-08-07 16:28:00.987+00
4	f	ElectronEager	electroneager@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2022-10-30 16:28:00.988+00	2022-11-18 16:28:00.988+00
5	f	NanoNomad	nanonomad@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2023-12-20 16:28:00.988+00	2024-03-07 16:28:00.988+00
6	f	CircuitCraze	circuitcraze@bitlair.nl	\N	****	\N	default	f	t	f	\N	\N	2022-10-11 16:28:00.988+00	2023-01-16 16:28:00.988+00
7	t	GameGlider	gameglider@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2023-10-22 16:28:00.988+00	2023-11-14 16:28:00.988+00
8	t	ByteBlast	byteblast@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-07-30 16:28:00.989+00	2023-10-08 16:28:00.989+00
9	f	CyberCraft	cybercraft@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2022-10-10 16:28:00.989+00	2022-12-10 16:28:00.989+00
10	f	DigitalDynamo	digitaldynamo@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2022-12-21 16:28:00.989+00	2023-02-26 16:28:00.989+00
11	f	CodeCreator	codecreator@bitlair.nl	\N	****	\N	default	f	t	f	\N	\N	2022-11-16 16:28:00.989+00	2023-01-14 16:28:00.989+00
12	f	PixelPulse	pixelpulse@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-05-17 16:28:00.99+00	2023-08-05 16:28:00.99+00
13	f	LogicLuminary	logicluminary@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-02-05 16:28:00.99+00	2023-03-22 16:28:00.99+00
14	f	ElectronEcho	electronecho@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-06-20 16:28:00.99+00	2023-07-28 16:28:00.99+00
15	f	NanoNinja	nanoninja@hotmail.com	\N	****	\N	default	t	f	f	\N	\N	2023-04-10 16:28:00.991+00	2023-04-30 16:28:00.991+00
16	f	CircuitChampion	circuitchampion@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2022-10-23 16:28:00.991+00	2022-11-08 16:28:00.991+00
17	f	GameGazer	gamegazer@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2022-12-11 16:28:00.991+00	2023-02-24 16:28:00.991+00
18	f	ByteBuddy	bytebuddy@ziggo.com	\N	****	\N	default	t	t	f	\N	\N	2022-11-08 16:28:00.991+00	2022-11-11 16:28:00.991+00
19	f	TechTornado	techtornado@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-06-08 16:28:00.991+00	2023-07-19 16:28:00.991+00
20	f	CodeChampion	codechampion@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2024-02-14 16:28:00.992+00	2024-04-04 16:28:00.992+00
21	f	PixelProdigy	pixelprodigy@hotmail.com	\N	****	\N	default	f	t	f	\N	\N	2023-01-05 16:28:00.992+00	2023-02-17 16:28:00.992+00
22	f	LogicLabyrinth	logiclabyrinth@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-03-30 16:28:00.992+00	2023-06-15 16:28:00.992+00
23	f	ElectronExplorer	electronexplorer@hotmail.com	\N	****	\N	default	f	t	f	\N	\N	2024-04-13 16:28:00.992+00	2024-06-01 16:28:00.992+00
24	f	NanoNavigator	nanonavigator@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2024-01-17 16:28:00.993+00	2024-01-17 16:28:00.993+00
25	f	CircuitCatalyst	circuitcatalyst@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2023-03-05 16:28:00.993+00	2023-05-08 16:28:00.993+00
26	f	GameGuru	gameguru@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2023-02-27 16:28:00.993+00	2023-05-12 16:28:00.993+00
27	f	ByteBlaze	byteblaze@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-01-12 16:28:00.993+00	2023-02-12 16:28:00.993+00
28	f	DigitalDreamer	digitaldreamer@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2023-07-16 16:28:00.993+00	2023-10-22 16:28:00.993+00
29	f	CodeCommander	codecommander@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2022-12-13 16:28:00.994+00	2023-02-17 16:28:00.994+00
30	f	PixelPioneer	pixelpioneer@gmail.com	\N	****	\N	default	f	t	f	\N	\N	2023-07-26 16:28:00.994+00	2023-08-13 16:28:00.994+00
31	f	LogicLegend	logiclegend@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2022-10-14 16:28:00.994+00	2022-10-30 16:28:00.994+00
32	f	ElectronElite	electronelite@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-12-31 16:28:00.994+00	2024-03-09 16:28:00.994+00
33	f	NanoNerd	nanonerd@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2022-11-22 16:28:00.995+00	2023-01-26 16:28:00.995+00
34	f	CircuitCaptain	circuitcaptain@gmail.com	\N	****	\N	default	f	t	f	\N	\N	2022-11-11 16:28:00.995+00	2022-11-26 16:28:00.995+00
35	f	GameGenius	gamegenius@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2024-04-15 16:28:00.995+00	2024-06-01 16:28:00.995+00
36	f	ByteBolt	bytebolt@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-08-27 16:28:00.995+00	2023-08-29 16:28:00.995+00
37	f	CyberCipher	cybercipher@ziggo.com	\N	****	\N	default	t	t	f	\N	\N	2022-12-26 16:28:00.995+00	2023-03-14 16:28:00.995+00
38	f	CodeConqueror	codeconqueror@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2022-11-05 16:28:00.996+00	2022-11-22 16:28:00.996+00
39	t	PixelPaladin	pixelpaladin@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2024-03-17 16:28:00.996+00	2024-04-23 16:28:00.996+00
40	f	LogicLore	logiclore@ziggo.com	\N	****	\N	default	t	t	f	\N	\N	2023-10-23 16:28:00.996+00	2024-01-26 16:28:00.996+00
41	f	ElectronEnigma	electronenigma@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2024-03-19 16:28:00.996+00	2024-04-19 16:28:00.996+00
42	f	CircuitConnoisseur	circuitconnoisseur@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2023-09-06 16:28:00.997+00	2023-11-22 16:28:00.997+00
43	f	GameGuardian	gameguardian@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2023-03-15 16:28:00.997+00	2023-04-26 16:28:00.997+00
44	t	ByteBandit	bytebandit@ziggo.com	\N	****	\N	default	t	t	f	\N	\N	2022-12-08 16:28:00.997+00	2022-12-28 16:28:00.997+00
45	t	TechTinker	techtinker@ziggo.com	\N	****	\N	default	f	f	f	\N	\N	2024-01-08 16:28:00.997+00	2024-03-08 16:28:00.997+00
46	f	CodeCrusader	codecrusader@bitlair.nl	\N	****	\N	default	f	t	f	\N	\N	2023-02-09 16:28:00.997+00	2023-03-03 16:28:00.997+00
47	f	PixelPirate	pixelpirate@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-11-02 16:28:00.997+00	2024-01-06 16:28:00.997+00
48	f	ElectronEagle	electroneagle@hotmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-11-16 16:28:00.998+00	2024-01-05 16:28:00.998+00
49	f	CircuitSavant	circuitsavant@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2023-10-23 16:28:00.998+00	2023-12-04 16:28:00.998+00
50	f	GameGladiator	gamegladiator@ziggo.com	\N	****	\N	default	t	t	f	\N	\N	2022-11-12 16:28:00.998+00	2022-12-02 16:28:00.998+00
51	f	ByteBlitz	byteblitz@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2024-02-23 16:28:00.998+00	2024-03-07 16:28:00.998+00
52	t	CyberSavvy	cybersavvy@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2024-03-05 16:28:00.999+00	2024-05-05 16:28:00.999+00
53	f	CodeCraftsman	codecraftsman@ziggo.com	\N	****	\N	default	f	t	f	\N	\N	2023-02-06 16:28:00.999+00	2023-04-17 16:28:00.999+00
54	f	PixelPro	pixelpro@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2022-09-29 16:28:00.999+00	2022-11-23 16:28:00.999+00
55	f	LogicLoreMaster	logicloremaster@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2023-09-08 16:28:00.999+00	2023-10-09 16:28:00.999+00
56	f	ElectronEmperor	electronemperor@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-08-21 16:28:01+00	2023-09-08 16:28:01+00
57	f	CircuitChamp	circuitchamp@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2023-11-08 16:28:01+00	2023-12-03 16:28:01+00
58	f	GameGizmo	gamegizmo@ziggo.com	\N	****	\N	default	t	t	f	\N	\N	2023-02-09 16:28:01+00	2023-04-16 16:28:01+00
59	t	ByteBrawler	bytebrawler@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2023-09-01 16:28:01+00	2023-09-15 16:28:01+00
60	f	TechTrailblazer	techtrailblazer@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2024-03-28 16:28:01.001+00	2024-04-24 16:28:01.001+00
61	f	CodeCaptain	codecaptain@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2023-05-30 16:28:01.001+00	2023-07-12 16:28:01.001+00
62	f	PixelPathfinder	pixelpathfinder@hotmail.com	\N	****	\N	default	f	t	f	\N	\N	2022-12-07 16:28:01.001+00	2023-03-10 16:28:01.001+00
63	f	LogicLionheart	logiclionheart@techinc.nl	\N	****	\N	default	t	t	f	\N	\N	2022-10-23 16:28:01.002+00	2022-12-21 16:28:01.002+00
64	t	ElectronExpedition	electronexpedition@ziggo.com	\N	****	\N	default	t	t	f	\N	\N	2024-01-22 16:28:01.002+00	2024-04-13 16:28:01.002+00
65	f	NanoNoble	nanonoble@gmail.com	\N	****	\N	default	t	f	f	\N	\N	2023-04-05 16:28:01.002+00	2023-06-01 16:28:01.002+00
66	f	CircuitCommander	circuitcommander@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-10-11 16:28:01.003+00	2023-11-21 16:28:01.003+00
67	f	GameGlobetrotter	gameglobetrotter@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2023-02-03 16:28:01.003+00	2023-04-10 16:28:01.003+00
68	f	CyberSherpa	cybersherpa@hackalot.nl	\N	****	\N	default	t	t	f	\N	\N	2022-12-23 16:28:01.003+00	2023-02-01 16:28:01.003+00
69	f	CyberCraftsman	cybercraftsman@gmail.com	\N	****	\N	default	t	t	f	\N	\N	2023-05-16 16:28:01.003+00	2023-08-19 16:28:01.003+00
70	f	CodeConnoisseur	codeconnoisseur@bitlair.nl	\N	****	\N	default	t	t	f	\N	\N	2022-10-02 16:28:01.004+00	2022-10-24 16:28:01.004+00
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
-- Name: files_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.files_id_seq', 6763, true);


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.jobs_id_seq', 1, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.migrations_id_seq', 48, true);


--
-- Name: project_user_id_seq; Type: SEQUENCE SET; Schema: badgehub; Owner: badgehub
--

SELECT pg_catalog.setval('badgehub.project_user_id_seq', 70, true);


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
-- Name: files idx_24622_primary; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.files
    ADD CONSTRAINT idx_24622_primary PRIMARY KEY (id);


--
-- Name: jobs idx_24629_primary; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.jobs
    ADD CONSTRAINT idx_24629_primary PRIMARY KEY (id);


--
-- Name: migrations idx_24636_primary; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.migrations
    ADD CONSTRAINT idx_24636_primary PRIMARY KEY (id);


--
-- Name: project_user idx_24644_primary; Type: CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.project_user
    ADD CONSTRAINT idx_24644_primary PRIMARY KEY (id);


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
-- Name: idx_24622_files_user_id_foreign; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_24622_files_user_id_foreign ON badgehub.files USING btree (user_id);


--
-- Name: idx_24622_files_version_id_foreign; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_24622_files_version_id_foreign ON badgehub.files USING btree (version_id);


--
-- Name: idx_24629_jobs_queue_index; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_24629_jobs_queue_index ON badgehub.jobs USING btree (queue);


--
-- Name: idx_24640_password_resets_email_index; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_24640_password_resets_email_index ON badgehub.password_resets USING btree (email);


--
-- Name: idx_24644_project_user_project_id_foreign; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_24644_project_user_project_id_foreign ON badgehub.project_user USING btree (project_id);


--
-- Name: idx_24644_project_user_user_id_foreign; Type: INDEX; Schema: badgehub; Owner: badgehub
--

CREATE INDEX idx_24644_project_user_user_id_foreign ON badgehub.project_user USING btree (user_id);


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
-- Name: project_user project_user_project_id_foreign; Type: FK CONSTRAINT; Schema: badgehub; Owner: badgehub
--

ALTER TABLE ONLY badgehub.project_user
    ADD CONSTRAINT project_user_project_id_foreign FOREIGN KEY (project_id) REFERENCES badgehub.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

