import { deepEqual } from 'assert'
import request from 'supertest'
import { yogaServer } from '../../src/server'

const expectation = [
  {
    description: 'Vite.js',
    id: '040688e1-c08f-4752-8d5f-888ffb36ef02',
    postedBy: { id: '97527cbe-2de0-40cd-a953-8caae780e66e' },
    topic: 'General',
    url: 'https://vitejs.dev',
    voters: [],
  }, {
    description: 'My Portfolio',
    id: '2df7837b-788d-4410-aa65-919da54f7175',
    postedBy: { id: '97527cbe-2de0-40cd-a953-8caae780e66e' },
    topic: 'General',
    url: 'https://crbroughton.me',
    voters: [],
  }, {
    description: 'Code-First GraphQL schemas for JavaScript/TypeScript',
    id: '16e11628-462a-4235-afb2-21c0db7425ba',
    postedBy: { id: '97527cbe-2de0-40cd-a953-8caae780e66e' },
    topic: 'General',
    url: 'https://nexusjs.org',
    voters: [],
  }]

it('Queries the database', async() => {
  const response = await request(yogaServer).post('/graphql').send({
    query: `{ 
        feed {
            id
            topic
            description
            url
            postedBy {
                id
            }
            voters {
                id
            } 
        } 
    }`,
  })

  deepEqual(response.status, 200)
  deepEqual(
    response.body.data.feed,
    expectation,
  )
})
