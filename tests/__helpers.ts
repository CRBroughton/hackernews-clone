// tests/__helpers.ts
import { execSync } from 'child_process'
import { join } from 'path'
import { PrismaClient } from '@prisma/client'
import type { ServerInfo } from 'apollo-server'
import getPort, { makeRange } from 'get-port'
import { GraphQLClient } from 'graphql-request'
import prisma from '../src/client'
import { server } from '../src'
type TestContext = {
  client: GraphQLClient
  prisma: PrismaClient
}
export function createTestContext(): TestContext {
  const ctx = {} as TestContext
  const graphqlCtx = graphqlTestContext()
  const prismaCtx = prismaTestContext()
  beforeEach(async() => {
    const client = await graphqlCtx.before()
    const db = await prismaCtx.before()
    Object.assign(ctx, {
      client,
      db,
    })
  })
  afterEach(async() => {
    await graphqlCtx.after()
    await prismaCtx.after()
  })
  return ctx
}
function graphqlTestContext() {
  let serverInstance: ServerInfo | null = null
  return {
    async before() {
      const port = await getPort({ port: makeRange(4000, 6000) })
      serverInstance = await server.listen({ port })
      // Close the Prisma Client connection when the Apollo Server is closed
      serverInstance?.server.on('close', async() => {
        prisma.$disconnect()
      })
      return new GraphQLClient(`http://localhost:${port}`)
    },
    async after() {
      serverInstance?.server.close()
    },
  }
}
function prismaTestContext() {
  const prismaBinary = join(__dirname, '..', 'node_modules', '.bin', 'prisma')
  let prismaClient: null | PrismaClient = null
  return {
    async before() {
      // Run the migrations to ensure our schema has the required structure
      execSync(`${prismaBinary} db push --preview-feature`)
      // Construct a new Prisma Client connected to the generated schema
      prismaClient = new PrismaClient()
      return prismaClient
    },
    async after() {
      // Release the Prisma Client connection
      await prismaClient?.$disconnect()
    },
  }
}
