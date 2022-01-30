# Hackernews clone

This is a basic Hackernews clone

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
npx prisma migrate dev --name
```

To run Prisma Studio: 

```
npx prisma studio
```

If .env variables aren't working:

```
npx prisma generate
```