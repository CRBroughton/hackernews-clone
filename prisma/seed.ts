import type { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { uuidGenerator } from '../src/utils/uuidGenerator'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    id: uuidGenerator(),
    name: 'Alice',
    email: 'alice@prisma.io',
    password: 'mypassword',
    posts: {
      create: [
        {
          id: uuidGenerator(),
          createdAt: new Date(),
          description: 'Code-First GraphQL schemas for JavaScript/TypeScript',
          url: 'https://nexusjs.org',
        },
      ],
    },
  },
]

async function main() {
  // eslint-disable-next-line no-console
  console.log('Start seeding ...')
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    // eslint-disable-next-line no-console
    console.log(`Created user with id: ${user.id}`)
  }
  // eslint-disable-next-line no-console
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async() => {
    await prisma.$disconnect()
  })
