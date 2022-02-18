import type { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    id: '97527cbe-2de0-40cd-a953-8caae780e66e',
    name: 'Alice',
    email: 'alice@prisma.io',
    password: 'mypassword',
    banned: false,
    banReason: null,
    posts: {
      create: [
        {
          id: '16e11628-462a-4235-afb2-21c0db7425ba',
          createdAt: '2022-02-15T20:24:21.706Z',
          description: 'Code-First GraphQL schemas for JavaScript/TypeScript',
          url: 'https://nexusjs.org',
          topic: 'General',
        },
        {
          id: '2df7837b-788d-4410-aa65-919da54f7175',
          createdAt: '2022-02-15T20:24:21.706Z',
          description: 'My Portfolio',
          url: 'https://crbroughton.me',
          topic: 'General',
        },
        {
          id: '040688e1-c08f-4752-8d5f-888ffb36ef02',
          createdAt: '2022-02-15T20:24:21.706Z',
          description: 'Vite.js',
          url: 'https://vitejs.dev',
          topic: 'General',
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
