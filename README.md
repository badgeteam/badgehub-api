# BadgeHub API

> Node.js REST service for the BadgeHub

## - Development -

### Database Migrations

In order to make sure that we can keep track of the database schema, we use [db-migrate](https://db-migrate.readthedocs.io/en/latest/).
This allows us to track the database changes along with git and provide a framework for migrating data and rolling back changes.
So when a change to the database schema is needed, a new migration should be created instead of manually changing the database.
To create a new migration, follow the steps below.

#### Create a new migration

```bash
npm run db-migrate:create -- <migration-name>
```

This will create a new migration file in the `migrations` directory with the name `<timestamp>-<migration-name>.js` as well as 2 sql files, one for the up migration and one for the down migration.

#### Fill in the down and up migration sql files with the necessary changes to the database schema.

These sql commands should take care of changing the database schema as well as migrating the data if necessary.

#### Run the migration to test it.

```bash
npm run db-migrate:up
```

#### Create updated mock.sql

For the mock data, we always want up to date tables, so after you have done the migration on the mock data, you should re-export the database.
You can do this with the pg_dump command in the postgres container:

```bash
npm run overwrite-mockup-data
```

Note: you might have to change the db container name in the script. Eg on mac with podman its with underscores instead of dashes which makes the command:

```bash
docker exec -it badgehub-api_db_1 /usr/bin/pg_dump --username badgehub --schema badgehub badgehub > mockup-data.sql
```

#### Run the down migration to test it.

```bash
npm run db-migrate:down
```

#### Commit the migration files to git.

When the code is deployed, the up migrations will be run automatically before starting the server.

## Install

Make sure [Docker](https://www.docker.com/get-started/) is installed and running.

Before running, copy the `.env.example` into `.env`

```bash
cp .env.example .env
```

and fill out the details.

## Run

Then start the Docker containers by typing

```bash
docker compose up --detach
```

Then visit [http://localhost:8001/](http://localhost:8001/) for the development BadgeHub homepage.

Visit [http://localhost:8002/](http://localhost:8002/) for the pgAdmin interface.
Use password `badgehub` to connect to the BadgeHub database server.

Use the [OpenAPI (Swagger) documentation](/openapi) to interact with the REST API.

## Development

After setting up the development container, you can start it with

```bash
docker compose up --detach
```

The API should now be accessible through `localhost:8001`.

And to stop BadgeHub

```bash
docker compose down
```

Or, to stop BadgeHub and delete all volumes (to start fresh)

```bash
docker compose down --volumes
```

### Applying commands to only 1 container from the compose file

Container commands like `stop`, `start`, `restart` and `logs` can also be sent to one of the containers from the compose file. For example

```bash
docker compose restart node
```

will restart the node container only.

## Database schema

At the moment, this is the database schema:

[BadgeHub Schema](https://drawsql.app/teams/badge-team/diagrams/simplified-database)

## - Production -

In production, use the production docker compose file `docker-compose-production.yml`.
The `NODE_ENV` environment file is set to `production`, there's no watcher and
PM2 is used to run Node.js multithreaded.

The first time, a Docker container is created. Make sure the `dist` directory
contains the latest build to be copied to the container.
Also the `public` directory and `package.json` and `package-lock.json` will
be copied.

To start:

```bash
docker compose --file docker-compose-production.yml up --detach
```

Then visit [http://localhost:9001/](http://localhost:9001/) for the production BadgeHub homepage
and [http://localhost:9002/](http://localhost:9002/) for PG_Admin, the UI for the database.

To wind down:

```bash
docker compose --file docker-compose-production.yml down
```

## Tools used

- [Express](https://expressjs.com/), a framework for Node.js
- [tsoa](https://tsoa-community.github.io/docs/) for generating a swagger file from code
- [sql-template-tag](https://github.com/blakeembrey/sql-template-tag) for more easily writing SQL queries
- [db-migrate](https://db-migrate.readthedocs.io/en/latest/) for database migrations
- [tsx](https://tsx.is/) for watching TypeScript files in Node.js
- [PM2](https://pm2.keymetrics.io/) for managing Node.js processes
