-- 6
alter table projects
    add column version_id integer;

-- 5
update projects
set version_id = (select id from versions where revision = draft_revision and project_slug = slug)
where draft_revision is not null;

-- 4.1
alter table projects
    drop constraint fk_project_latest_revision;
alter table projects
    drop constraint fk_project_draft_revision;

-- 4
alter table projects
    drop column latest_revision;
alter table projects
    drop column draft_revision;

-- 3
drop index idx_versions_project_revision;

-- 2
alter table versions
    drop constraint versions_project_revision_unique;

-- 1
alter table projects
    add constraint projects_version_id_fk foreign key (version_id) references versions (id) on delete set null;

-- 0 cleanup
alter table files
    add column confirmed_in_sync_with_file_data boolean default false;
