alter table projects
    drop column latest_version_id;

alter table projects
    rename column draft_version_id to version_id;

alter table files
    add column confirmed_in_sync_with_file_data boolean default false;
