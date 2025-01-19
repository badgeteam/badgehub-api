-- cleanup db
do
$$
declare
tbl_name text;
begin
for tbl_name in
select tablename
from pg_tables
where schemaname = 'badgehub'
  and tablename != 'migrations'
    loop
        execute format('drop table if exists %I cascade', tbl_name);
end loop;
end $$;

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
    user_id          integer     not null,
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
