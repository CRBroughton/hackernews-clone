// tests/Post.test.ts
import { createTestContext } from './__helpers'
const ctx = createTestContext()
it('ensures that a draft can be created and published', async() => {
  // Create a new draft
  const feed = await ctx.client.request(`           
    query {
      feed() {           
        id
      }
    }
  `)
  // Snapshot that draft and expect `published` to be false
  expect(feed).toMatchInlineSnapshot() // 3
  const persistedData = await ctx.prisma.post.findMany()
  expect(persistedData).toMatchInlineSnapshot()
//   // Publish the previously created draft
//   const publishResult = await ctx.client.request(`
//     mutation publishDraft($draftId: Int!) {
//       publish(draftId: $draftId) {
//         id
//         title
//         body
//         published
//       }
//     }
//   `,
//   { draftId: draftResult.createDraft.id },
//   )
//   // Snapshot the published draft and expect `published` to be true
//   expect(publishResult).toMatchInlineSnapshot()
})
