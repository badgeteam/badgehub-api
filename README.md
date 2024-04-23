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

Download `pg_badgehub_no_users.sql` from the BadgeHub NextCloud and save it to the project root.

After startup, the PostgreSQL volume will be created with this database.

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

