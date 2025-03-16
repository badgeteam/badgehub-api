alter table files rename column confirmed_in_sync_with_file_data to confirmed_in_sync_on_disk;
drop index idx_file_data_sha256;
drop table file_data;
