-- restore old schema
insert into badgehub_old.migrations select * from badgehub.migrations;
drop schema badgehub cascade;
alter schema badgehub_old rename to badgehub;
