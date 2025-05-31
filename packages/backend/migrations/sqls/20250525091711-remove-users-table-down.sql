-- AI Generated
-- Start a transaction (optional, but recommended if your environment supports it for DDL)
-- BEGIN;

-- Step 1: Re-create the users table with its original structure (or as close as needed)
CREATE TABLE users
(
    id                SERIAL PRIMARY KEY,
    email             TEXT UNIQUE, -- We will generate placeholder unique emails
    admin             BOOLEAN DEFAULT FALSE,
    name              TEXT NOT NULL, -- This will store the idp_user_id string
    password          TEXT NOT NULL DEFAULT 'placeholder_password', -- Original passwords are lost
    remember_token    TEXT,
    editor            TEXT,
    public            BOOLEAN DEFAULT FALSE,
    show_projects     BOOLEAN DEFAULT FALSE,
    email_verified_at TIMESTAMPTZ,
    created_at        TIMESTAMPTZ DEFAULT NOW(),
    updated_at        TIMESTAMPTZ DEFAULT NOW(),
    deleted_at        TIMESTAMPTZ
);

-- Step 2: Populate the new users table
-- It takes each unique idp_user_id from the projects table,
-- uses it as the 'name', and creates a placeholder email.
INSERT INTO users (name, email)
SELECT DISTINCT
    p.idp_user_id,
    p.idp_user_id || '@placeholder.example.com' AS generated_email
FROM
    projects p
WHERE
    p.idp_user_id IS NOT NULL -- Ensure we only process non-null identifiers
ON CONFLICT (email) DO NOTHING; -- Should not happen if idp_user_ids are unique and non-null

-- Step 3: Add a temporary integer column to the projects table for the new user_id
ALTER TABLE projects
    ADD COLUMN temp_int_user_id INTEGER;

-- Step 4: Update this temporary column with the new integer IDs from the users table
-- This matches projects to the new users based on idp_user_id string (now in users.name)
UPDATE projects p
SET temp_int_user_id = u.id
FROM users u
WHERE p.idp_user_id = u.name;

-- Step 5: Ensure all projects have a valid new user ID.
-- If any temp_int_user_id is NULL here, it means an idp_user_id from projects
-- didn't get an entry in the users table, which would be an issue.
-- The original user_id was NOT NULL.
ALTER TABLE projects
    ALTER COLUMN temp_int_user_id SET NOT NULL;

-- Step 6: Drop the old text-based idp_user_id column
ALTER TABLE projects
    DROP COLUMN idp_user_id;

-- Step 7: Rename the temporary integer column to user_id
ALTER TABLE projects
    RENAME COLUMN temp_int_user_id TO user_id;

-- Step 8: Re-establish the foreign key constraint
ALTER TABLE projects
    ADD CONSTRAINT projects_user_id_fk
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Step 9: Re-create the index on projects.user_id
CREATE INDEX IF NOT EXISTS idx_user_id ON projects (user_id);

-- Commit the transaction (if started with BEGIN)
-- COMMIT;
