/* eslint-disable quotes */

// tests/Post.test.ts
import { createTestContext } from '../__helpers'
const ctx = createTestContext()

it('Creates a user', async() => {
  const feed = await ctx.client.request(`           
    mutation {
        signup(name: "crbroughton", email: "crbroughton@posteo.uk", password: "graphql") {
          token
          user {
              id
              email
          }
        }
    }
    `)
  expect(feed).toEqual(expect.objectContaining({
    signup: expect.objectContaining({
      user: expect.objectContaining({
        email: "crbroughton@posteo.uk",
      }),
    }),
  }))
})
