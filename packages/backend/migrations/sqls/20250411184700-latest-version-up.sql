-- 0 cleanup
alter table files
    drop column confirmed_in_sync_with_file_data;

-- 1
alter table projects
    drop constraint projects_version_id_fk;

-- 2
alter table versions
    add constraint versions_project_revision_unique unique (project_slug, revision);

-- 3
create index idx_versions_project_revision on versions (project_slug, revision);

-- 4
alter table projects
    add column latest_revision integer;
alter table projects
    add column draft_revision integer;

-- 4.1
alter table projects
    add constraint fk_project_latest_revision
        foreign key (slug, latest_revision)
            references versions (project_slug, revision)
            on delete set null;
alter table projects
    add constraint fk_project_draft_revision
        foreign key (slug, draft_revision)
            references versions (project_slug, revision)
            on delete set null;


-- 5
update projects
set latest_revision = (select revision from versions where id = version_id),
    draft_revision  = (select revision from versions where id = version_id)
where version_id is not null;

alter table projects
    drop column version_id;
