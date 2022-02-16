// tests/Post.test.ts
import { createTestContext } from '../__helpers'
const ctx = createTestContext()

it('Gets posts from the a specific user', async() => {
  const feed = await ctx.client.request(`
      query {
        getUserPosts(id: "97527cbe-2de0-40cd-a953-8caae780e66e") {
          id
          description
          url
          voters {
            id
            name
            email
          }
        } 
      }
    `)
  expect(feed).toMatchSnapshot()
  const persistedData = await ctx.prisma.post.findMany(
    { where: { postedById: '97527cbe-2de0-40cd-a953-8caae780e66e' } },
  )
  expect(persistedData).toMatchSnapshot()
})
