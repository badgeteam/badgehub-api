alter table file_data drop column deleted_at;
alter table badges drop column deleted_at;
alter table app_metadata_jsons drop column deleted_at;
alter table versions drop column deleted_at;
alter table versioned_dependencies drop column deleted_at;
alter table project_statuses_on_badges drop column deleted_at;
alter table categories drop column deleted_at;
