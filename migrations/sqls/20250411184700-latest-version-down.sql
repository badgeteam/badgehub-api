alter table projects
    drop column latest_version_id;

alter table projects
    rename column draft_version_id to version_id;
