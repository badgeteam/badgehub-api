do
$$
declare
tbl_name text;
begin
for tbl_name in
select tablename
from pg_tables
where schemaname = 'badgehub'
  and tablename != 'migrations'
    loop
        execute format('drop table if exists %I cascade', tbl_name);
end loop;
end $$;
