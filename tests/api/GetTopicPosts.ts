import request from 'supertest'
import { yogaServer } from '../../src/server'

export const getTopicPosts = it('Gets a topics posts', async() => {
  const posts = await request(yogaServer).post('/graphql')
    .send({
      query: ` {
        getTopicPosts(topic: "General") {
                id
                description
                url
            }
        }
    `,
    })

  expect(posts.body.data).toEqual(expect.objectContaining({
    getTopicPosts: expect.arrayContaining([
      {
        id: expect.any(String),
        description: 'this is a test post',
        url: 'https://google.com',
      },
      {
        id: expect.any(String),
        description: 'Vite.js',
        url: 'https://vitejs.dev',
      },
      {
        id: expect.any(String),
        description: 'My Portfolio',
        url: 'https://crbroughton.me',
      },
      {
        id: expect.any(String),
        description: 'Code-First GraphQL schemas for JavaScript/TypeScript',
        url: 'https://nexusjs.org',
      },
    ]),
  }))
})
