/* eslint-disable quotes */

// tests/Post.test.ts
import { createTestContext } from '../__helpers'
const ctx = createTestContext()

it('Logs in a user', async() => {
  const feed = await ctx.client.request(`           
    mutation {
        login(email: "crbroughton@posteo.uk", password: "graphql") {
        token
        user {
            id
            email
            posts {
            url
            description
            }
        }
        }
    }
    `)
  expect(feed).toEqual(expect.objectContaining({
    login: expect.objectContaining({
      user: expect.objectContaining({
        email: "crbroughton@posteo.uk",
      }),
    }),
  }))
})
