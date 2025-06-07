alter table file_data add column deleted_at timestamptz;
alter table badges add column deleted_at timestamptz;
alter table app_metadata_jsons add column deleted_at timestamptz;
alter table versions add column deleted_at timestamptz;
alter table versioned_dependencies add column deleted_at timestamptz;
alter table project_statuses_on_badges add column deleted_at timestamptz;
alter table categories add column deleted_at timestamptz;
