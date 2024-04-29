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

## Install database

If not done before, you might want to populate the database with random dummy data.

[/api/v1/populate](http://localhost:8001/api/v1/populate)

## Run

Then start the Docker containers by typing

```bash
docker-compose up --detach
```

Then visit [http://localhost:8001/](http://localhost:8001/) for the BadgeHub homepage.

Visit [http://localhost:8002/](http://localhost:8002/) for the pgAdmin interface.
Use password `badgehub` to connect to the BadgeHub database server.

## Stop

To stop BadgeHub

```bash
docker-compose down
```

To stop BadgeHub and delete all volumes (to start fresh)

```bash
docker-compose down -v
```

## Database schema

At the moment, this is the database schema:

[BadgeHub Schema](https://drawsql.app/teams/badge-team/diagrams/badgehub)