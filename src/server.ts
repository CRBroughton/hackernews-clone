import { createServer } from 'http'
import { createYoga } from 'graphql-yoga'
import { context } from './context'
import { schema } from './schema'

export const yogaServer = createYoga({ schema, context })

export async function server() {
  const yogaServer = createYoga({ schema, context })
  const server = createServer(yogaServer)

  server.listen(4000, '0.0.0.0')
  // eslint-disable-next-line no-console
  console.log('Yoga server running...')
}
