/* Replace with your SQL commands */
update versions v set published_at = now() where published_at is null and exists (
  select 1 from projects where latest_revision = v.revision
)
