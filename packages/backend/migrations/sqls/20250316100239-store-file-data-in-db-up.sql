alter table files rename column confirmed_in_sync_on_disk to confirmed_in_sync_with_file_data;

create table file_data (
                           id              SERIAL PRIMARY KEY,         -- new serial primary key
                           sha256          text not null unique,              -- foreign key to files table
                           content         bytea not null,             -- file content
                           created_at      timestamptz not null default now(), -- track creation time
                           updated_at      timestamptz not null default now(), -- track updates
                           deleted_at      timestamptz               -- soft delete timestamp (nullable)
);

create index idx_file_data_sha256 on file_data (sha256);
