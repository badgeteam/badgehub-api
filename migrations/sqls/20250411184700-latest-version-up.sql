alter table projects
    add column latest_version_id integer references versions (id) on delete set null;

alter table projects
    rename column version_id to draft_version_id;

alter table files
    drop column confirmed_in_sync_with_file_data;
