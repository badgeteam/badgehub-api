-- Rename the user_id column to idp_user_id in the projects table
ALTER TABLE projects
    ADD COLUMN idp_user_id text;

-- noinspection SqlWithoutWhere
UPDATE projects
SET idp_user_id = (SELECT name FROM users WHERE users.id = projects.user_id);

-- Remove the foreign key constraint from projects table
ALTER TABLE projects
    DROP CONSTRAINT IF EXISTS projects_user_id_fk;

-- Alter the user_id column in projects table from integer to text
ALTER TABLE projects
    DROP COLUMN user_id;

-- Drop the users table
DROP TABLE IF EXISTS users cascade;
