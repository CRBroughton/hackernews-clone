// tests/Post.test.ts
import { createTestContext } from '../__helpers'
const ctx = createTestContext()
it('Queries the database feed', async() => {
  const feed = await ctx.client.request(`           
    query {
      feed {           
        id
        description
        url
        postedBy {
          id
          name
        }
        voters {
          id
        }
      }
    }
  `)
  expect(feed).toMatchSnapshot()
  const persistedData = await ctx.prisma.post.findMany()
  expect(persistedData).toMatchSnapshot()
})
