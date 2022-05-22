import request from 'supertest'
import { yogaServer } from '../../src/server'

export const getUserPosts = it('Gets a users posts', async() => {
  const posts = await request(yogaServer).post('/graphql')
    .send({
      query: ` {
        getUserPosts(id: "97527cbe-2de0-40cd-a953-8caae780e66e") {
                id
                description
                url
            }
        }
    `,
    })

  expect(posts.body.data).toEqual(expect.objectContaining({
    getUserPosts: expect.arrayContaining([
      {
        id: expect.any(String),
        description: 'Code-First GraphQL schemas for JavaScript/TypeScript',
        url: 'https://nexusjs.org',
      },
      {
        id: expect.any(String),
        description: 'My Portfolio',
        url: 'https://crbroughton.me',
      },
      {
        id: expect.any(String),
        description: 'Vite.js',
        url: 'https://vitejs.dev',
      },
    ]),
  }))
})
