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
    end
$$;

-- noinspection SqlWithoutWhere
delete
from migrations;

create table file_data
(
    id         serial
        primary key,
    sha256     text                                   not null
        unique,
    content    bytea                                  not null,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_file_data_sha256
    on file_data (sha256);

create table projects
(
    created_at       timestamp with time zone default now() not null,
    updated_at       timestamp with time zone default now() not null,
    deleted_at       timestamp with time zone,
    slug             text                                   not null
        primary key,
    git              text,
    latest_revision  integer,
    draft_revision   integer not null,
    idp_user_id      text not null
);

create table versions
(
    id               serial
        primary key,
    project_slug     text                               not null
        constraint versions_project_slug_fk
            references projects
            on delete cascade,
    app_metadata     jsonb                              not null,
    revision         integer                  default 0 not null,
    zip              text,
    size_of_zip      bigint,
    git_commit_id    text,
    published_at     timestamp with time zone,
    download_count   bigint                   default 0,
    created_at       timestamp with time zone default now(),
    updated_at       timestamp with time zone default now(),
    constraint versions_project_revision_unique
        unique (project_slug, revision)
);

create table files
(
    id              serial
        primary key,
    version_id      integer                                not null
        constraint files_version_id_fk
            references versions
            on delete cascade,
    dir             text                                   not null,
    name            text                                   not null,
    ext             text                                   not null,
    mimetype        text                                   not null,
    size_of_content bigint                                 not null,
    sha256          text                                   not null,
    created_at      timestamp with time zone default now() not null,
    updated_at      timestamp with time zone default now() not null,
    deleted_at      timestamp with time zone,
    constraint files_unique_constraint
        unique (version_id, dir, name, ext)
);

create index idx_files_sha256
    on files (sha256);

alter table projects
    add constraint fk_project_draft_revision
        foreign key (slug, draft_revision) references versions (project_slug, revision)
            on delete set null;

alter table projects
    add constraint fk_project_latest_revision
        foreign key (slug, latest_revision) references versions (project_slug, revision)
            on delete set null;

create index idx_versions_project_revision
    on versions (project_slug, revision);

create index idx_versions_project_slug
    on versions (project_slug);

create index idx_versions_published_at
    on versions (published_at);




CREATE OR REPLACE VIEW project_latest_categories AS
SELECT
    p.slug AS project_slug,
    -- Extracts each text element from the 'categories' JSONB array into its own row
    jsonb_array_elements_text(v.app_metadata -> 'categories') AS category_name
FROM
    projects p
-- Join 'versions' on the composite key of slug and the specific 'latest_revision'
        JOIN
    versions v ON p.slug = v.project_slug AND p.latest_revision = v.revision
WHERE
  -- Ensure we only process projects that have a 'latest_revision' set
    p.latest_revision IS NOT NULL
  -- This filter ensures we only process rows where the 'categories' key exists and is a non-empty array
  AND jsonb_typeof(v.app_metadata -> 'categories') = 'array'
  AND jsonb_array_length(v.app_metadata -> 'categories') > 0;

CREATE OR REPLACE VIEW project_latest_badges AS
SELECT
    p.slug AS project_slug,
    -- Extracts each text element from the 'badges' JSONB array into its own row
    jsonb_array_elements_text(v.app_metadata -> 'badges') AS badge_slug
FROM
    projects p
-- Join 'versions' on the composite key of slug and the specific 'latest_revision'
        JOIN
    versions v ON p.slug = v.project_slug AND p.latest_revision = v.revision
WHERE
  -- Ensure we only process projects that have a 'latest_revision' set
    p.latest_revision IS NOT NULL
  -- This filter ensures we only process rows where the 'badges' key exists and is a non-empty array
  AND jsonb_typeof(v.app_metadata -> 'badges') = 'array'
  AND jsonb_array_length(v.app_metadata -> 'badges') > 0;