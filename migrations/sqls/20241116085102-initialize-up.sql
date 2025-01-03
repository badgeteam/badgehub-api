-- back up with old schema
alter schema badgehub rename to badgehub_old;
create schema badgehub;

-- Recfreate badgehub.migrations
CREATE TABLE badgehub.migrations (
                                         id serial NOT NULL,
                                         name character varying(255) NOT NULL,
                                         run_on timestamp without time zone NOT NULL
);

-- create tables

create table badges
(
    slug       text not null primary key,
    name       text,
    created_at timestamptz default now(), -- creation timestamp
    updated_at timestamptz default now(), -- update timestamp
    deleted_at timestamptz                -- soft delete timestamp (nullable)
);

create table users
(
    id                serial primary key,
    email             text unique,
    admin             boolean,
    name              text not null,
    password          text not null,
    remember_token    text,
    editor            text,
    public            boolean,
    show_projects     boolean,
    email_verified_at timestamptz,               -- email verification timestamp
    created_at        timestamptz default now(), -- to capture creation timestamps
    updated_at        timestamptz default now(), -- to track updates
    deleted_at        timestamptz                -- soft delete timestamp (nullable)
);

create table projects
(
    created_at       timestamptz not null default now(),
    updated_at       timestamptz not null default now(),
    deleted_at       timestamptz,
    version_id       integer,
    user_id          integer        not null,
    slug             text        not null primary key,
    git              text,
    allow_team_fixes boolean,
    constraint projects_user_id_fk foreign key (user_id) references users (id) on delete cascade -- if a user is deleted from the database, the projects associated with that user should also be deleted
);

create index idx_user_id on projects (user_id); -- allow searching projects by user_id efficiently


create table categories
(
    slug       text not null primary key, -- category slug
    name       text not null unique,      -- category name
    created_at timestamptz default now(), -- creation timestamp
    updated_at timestamptz default now(), -- update timestamp
    deleted_at timestamptz                -- soft delete timestamp (nullable)
);

-- index for faster lookups and soft delete queries
create index idx_categories_name on categories (name);
create index idx_categories_deleted_at on categories (deleted_at);


create table app_metadata_jsons
(
    id                        serial primary key,          -- unique identifier
    category                  text,                        -- fk to categories slug
    name                      text,                        -- app name
    description               text,                        -- optional description
    author                    text,                        -- optional user_name name
    icon                      text,                        -- optional relative path for the icon
    license_file              text,                        -- optional license file path or type name
    is_library                boolean,                     -- whether the app is a library
    is_hidden                 boolean,                     -- whether the app is hidden in the launcher
    semantic_version          text,                        -- semantic version
    interpreter               text,                        -- interpreter (e.g., 'python')
    main_executable           text,                        -- main executable path
    main_executable_overrides jsonb,                       -- overrides for the main executable
    file_mappings             jsonb,                       -- file mappings
    file_mappings_overrides   jsonb,                       -- overrides or additions for file mappings
    created_at                timestamptz default now(),   -- record creation timestamp
    updated_at                timestamptz default now(),   -- record update timestamp
    deleted_at                timestamptz,                 -- soft delete timestamp (nullable)
    constraint app_metadata_jsons_category_fk foreign key (category)
        references categories (name) on delete set default -- categorySlug relation
);

create index idx_app_metadata_jsons_name on app_metadata_jsons (name);
create index idx_app_metadata_jsons_is_hidden on app_metadata_jsons (is_hidden);
create index idx_app_metadata_jsons_category on app_metadata_jsons (category);


create table versions
(
    id                   serial primary key,             -- auto-incrementing unique identifier
    project_slug         text    not null,               -- fk to projects
    app_metadata_json_id integer not null,               -- fk to metadata files
    revision             integer not null default 0,     -- version revision number
    semantic_version     text,                           -- optional semantic version
    zip                  text,                           -- optional zip file name or path
    size_of_zip          bigint,                         -- optional size of the zip file
    git_commit_id        text,                           -- optional git commit id
    published_at         timestamptz,                    -- required publish timestamp
    download_count       bigint           default 0,     -- download count with default value
    created_at           timestamptz      default now(), -- track creation time
    updated_at           timestamptz      default now(), -- track updates
    deleted_at           timestamptz,                    -- soft delete timestamp (nullable)
    constraint versions_project_slug_fk foreign key (project_slug) references projects (slug) on delete cascade,
    constraint versions_app_metadata_json_id_fk foreign key (app_metadata_json_id) references app_metadata_jsons (id) on delete cascade
);
alter table projects
    add constraint projects_version_id_fk foreign key (version_id) references versions (id) on delete set null;

create index idx_versions_project_slug on versions (project_slug);
create index idx_versions_published_at on versions (published_at);

-- Copy data from old schema to new schema
INSERT INTO badgehub.badges (name, slug, deleted_at, created_at, updated_at)
SELECT name, slug, deleted_at, created_at, updated_at
FROM badgehub_old.badges;

INSERT INTO badgehub.categories (name, slug, deleted_at, created_at, updated_at)
SELECT name, slug, deleted_at, created_at, updated_at
FROM badgehub_old.categories;

INSERT INTO badgehub.users (id, admin, name, email, email_verified_at, password, remember_token, editor, public,
                            show_projects, deleted_at, created_at, updated_at)
SELECT id,
       admin,
       name,
       email,
       email_verified_at,
       password,
       remember_token,
       editor,
       public,
       show_projects,
       deleted_at,
       created_at,
       updated_at
FROM badgehub_old.users;

with spo as (select po.slug,
                    po.name,
                    po.description,
                    po.project_type,
                    po.user_id,
                    po.license,
                    po.download_counter,
                    po.created_at,
                    po.published_at,
                    po.updated_at,
                    po.deleted_at,
                    c.name as category,
                    u.name as author
             from badgehub_old.projects po
                      left join badgehub_old.categories c on po.category_id = c.id
                      left join badgehub_old.users u on po.user_id = u.id),
     inserted_app_metadata as (insert
         into app_metadata_jsons (category,
                                  name,
                                  description,
                                  author,
                                  license_file,
                                  interpreter,
                                  created_at,
                                  updated_at,
                                  deleted_at)
             select category,
                    name,
                    description,
                    author,
                    license,
                    project_type,
                    created_at,
                    updated_at,
                    deleted_at
             from spo
             returning id, name)
        ,
     inserted_project as (
         insert
             into badgehub.projects (slug,
                                     user_id,
                                     created_at,
                                     updated_at,
                                     deleted_at)
                 select slug,
                        user_id,
                        created_at,
                        updated_at,
                        deleted_at
                 from spo)

insert
into versions (project_slug,
               app_metadata_json_id,
               download_count,
               published_at,
               created_at,
               updated_at,
               deleted_at)
select slug,
       id,
       download_counter,
       published_at,
       created_at,
       updated_at,
       deleted_at
from spo
         JOIN inserted_app_metadata m ON spo.name = m.name;

update projects
set version_id = versions.id
from versions
where versions.project_slug = projects.slug
  and projects.version_id is null;

create table versioned_dependencies
(
    id                      serial primary key,
    project_slug            text not null,
    depends_on_project_slug text not null,
    semantic_version_range  text,
    created_at              timestamptz default now(), -- record creation timestamp
    updated_at              timestamptz default now(), -- record update timestamp
    deleted_at              timestamptz,               -- soft delete timestamp (nullable)    constraint versioned_dependency_depends_on_project_slug_fk foreign key (depends_on_project_slug) references projects (slug) on delete cascade,
    constraint versioned_dependency_project_slug_fk foreign key (project_slug) references projects (slug) on delete cascade
);

with old_dependencies as (select depends_on_project_id,
                                 po.slug  as project_slug,
                                 dpo.slug as depends_on_project_slug,
                                 project_id,
                                 badgehub_old.dependencies.created_at,
                                 badgehub_old.dependencies.updated_at
                          from badgehub_old.dependencies
                                   left join badgehub_old.projects po on project_id = po.id
                                   left join badgehub_old.projects dpo on depends_on_project_id = dpo.id)
insert
into badgehub.versioned_dependencies (depends_on_project_slug, project_slug, created_at, updated_at)
select depends_on_project_slug, project_slug, created_at, updated_at
from old_dependencies;


create table project_statuses_on_badges
(
    id           serial primary key,
    project_slug text not null,
    badge_slug   text not null,
    status       text,
    created_at   timestamptz default now(),
    updated_at   timestamptz default now(),
    deleted_at   timestamptz,
    constraint project_statuses_on_badges_project_slug_fk foreign key (project_slug) references projects (slug) on delete cascade,
    constraint project_statuses_on_badges_badge_slug_fk foreign key (badge_slug) references badges (slug) on delete cascade
);

with old_statuses as (select project_id,
                             badge_id,
                             b.slug as badge_slug,
                             p.slug as project_slug,
                             status,
                             bp.created_at,
                             bp.updated_at
                      from badgehub_old.badge_project bp
                               left join badgehub_old.badges b on badge_id  = b.id
                               left join badgehub_old.projects p on project_id = p.id)
insert
into badgehub.project_statuses_on_badges (project_slug, badge_slug, status, created_at, updated_at)
select project_slug, badge_slug, status, created_at, updated_at
from old_statuses;
