# Hackernews clone

This is a basic Hackernews / Reddit clone using Prisma, PostgreSQL and GraphQL Nexus. Included is an Altair file for the API collection.

For information on the front end side of the stack, see the README.md in the ui folder.

To install dependances, run:

```
pnpm i && cd ui && pnpm i && cd ..
```

To start database and run existing migrations

```
npx prisma migrate deploy
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