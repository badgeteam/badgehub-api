
create table files
(
    version_id      integer not null,                   -- foreign key to versions table (optional)
    dir       text   not null,           -- directory of the file in the project, empty string if top level
    name       text   not null,           -- file name without extension
    ext       text   not null,           -- file extension
    confirmed_in_sync_on_disk boolean default false, -- whether the file in the state that is in the metadata here has been written to disk successfully. This system is not so important for new files, but it is important for making sure that the file has not been possibly altered.
    mimetype            text not null,                      -- mime type (can include programming language info)
    size_of_content bigint not null,           -- size of the file content in bytes
    sha256          text   not null,           -- sha-256 hash for content verification
    created_at      timestamptz not null default now(), -- track creation time
    updated_at      timestamptz not null default now(), -- track updates
    deleted_at      timestamptz,               -- soft delete timestamp (nullable)
    constraint files_version_id_fk foreign key (version_id) references versions (id) on delete cascade, -- in the version gets removed, the files should be removed as well
    primary key(version_id, dir, name, ext)
);

create index idx_files_sha256 on files (sha256);
