# Typescript Apollo Tutorial

To install deps:

```
pnpm i
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

If you want to use prisma studio, first spin up your docker containers, then change the 'db' path in the DATABASE_URL to localhost