// tests/Post.test.ts
import { createTestContext } from '../__helpers'
const ctx = createTestContext()

it('Gets posts from the a specific user', async() => {
  const feed = await ctx.client.request(`
      query {
        getTopicPosts(topic: "General") {
          id
          description
          url
          topic
          postedBy {
            id
            name
            email
          }
          voters {
            id
            name
            email
          }
        }
      }
    `)
  expect(feed).toMatchSnapshot()
})
