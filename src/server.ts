import { createServer } from '@graphql-yoga/node'
import { context } from './context'
import { schema } from './schema'

export const yogaServer = createServer({ schema, context })

export async function server() {
  await yogaServer.start()
}
