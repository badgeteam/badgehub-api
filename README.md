# BadgeHub API

> Node project for the BadgeHub API

> [!NOTE]  
> Currently, this is for development only.

## Install

Make sure [Docker](https://www.docker.com/get-started/) is installed and running.

In the project directory, type

```bash
npm install
```

## Run

Then start the Docker containers by typing

```bash
docker-compose up --detach
```

Then visit [http://localhost:8001/](http://localhost:8001/) for the BadgeHub homepage.

Visit [http://localhost:8002/](http://localhost:8002/) for the pgAdmin interface.
Use password `badgehub` to connect to the BadgeHub database server.

Use the [OpenAPI (Swagger) documentation](/openapi) to interact with the REST API.

## Stop

To stop BadgeHub

```bash
docker-compose down
```

Or, to stop BadgeHub and delete all volumes (to start fresh)

```bash
docker-compose down --volumes
```

## Database schema

At the moment, this is the database schema:

[BadgeHub Schema](https://drawsql.app/teams/badge-team/diagrams/badgehub)