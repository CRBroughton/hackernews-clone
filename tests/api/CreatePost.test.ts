/* eslint-disable quotes */

// tests/Post.test.ts
import { createTestContext } from '../__helpers'
const ctx = createTestContext()

it('Creates a post in the General topic', async() => {
  const user = await ctx.client.request(`           
    mutation {
        login(email: "crbroughton@posteo.uk", password: "graphql") {
          token
        }
    }
    `)
  const feed = await ctx.client.request(`           
    mutation {
        post(url: "https://google.com", topic: "General", description: "this is a test post") {
            id
            description
            url
            postedBy {
              id
              name
              email
            }
        }
    }
    `, undefined, { authorization: `bearer ${user.login.token}` })
  expect(feed).toEqual(expect.objectContaining({
    post: expect.objectContaining({
      id: expect.any(String),
      description: "this is a test post",
      url: "https://google.com",
    }),
  }))
})
