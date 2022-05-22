import { createServer } from '@graphql-yoga/node'
import { context } from './context'
import { schema } from './schema'

export async function server() {
  const server = createServer({ schema, context })
  await server.start()
}
