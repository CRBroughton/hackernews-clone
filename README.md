# Hackernews clone

This is a basic Hackernews / Reddit clone using Prisma, PostgreSQL and GraphQL Nexus. Included is an [Insomnia](https://insomnia.rest/) file for the API collection.

For information on the front end side of the stack, see the README.md in the ui folder.

Looking to test? Checkout the release branch as this branch is considered 'stable'.

## Installation

To install dependances, run:

```
pnpm i && cd ui && pnpm i && cd ..
```

Then copy the `.env.example` file to `.env` and customise the variables.

Then run:

```
npx prisma generate
```

Then run the below to build the Docker containers:

```
docker-compose up -d && cd ui && docker-compose up -d && cd ..
```

To start database and run existing migrations

```
npx prisma migrate deploy
```

To test the database, start Altair and run the 'Query Database' query
, which should return an empty array.


## Common Commands

To seed and reset the database, run:

```
npx prisma migrate reset
```

To create a new migration:

```
npx prisma migrate dev
```

To run Prisma Studio: 

```
npx prisma studio
```

If .env variables aren't working:

```
npx prisma generate
```

## Docker

To create the Docker containers, first copy .env.example to .env and modify the .env variables.

Then run:

```
docker-compose up -d && cd ui && docker-compose up -d
```

The entire application (minus the schema) are hot-reloading.

## Documentation

To generate Prisma doumentation, run:

```
npx prisma-docs-generator serve
```

