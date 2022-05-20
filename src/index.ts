import 'graphql-import-node'
import { createServer } from '@graphql-yoga/node'
import { context } from './context'
import { schema } from './schema'

async function main() {
  const server = createServer({ schema, context })
  await server.start()
}

main()
