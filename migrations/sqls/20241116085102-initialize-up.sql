-- back up with old schema
alter schema badgehub rename to badgehub_old;
create schema badgehub;
create table badgehub.migrations
(
    like badgehub_old.migrations including all
);

-- create tables

create table projects
(
    created_at       timestamptz not null default now(),
    updated_at       timestamptz not null default now(),
    deleted_at       timestamptz,
    version_id       INTEGER,
    user_email       text        not null,
    slug             text        not null primary key,
    git              text,
    allow_team_fixes boolean
);

CREATE INDEX idx_user_email ON projects (user_email); -- allow searching projects by user_email efficiently

