// tests/Post.test.ts
import { createTestContext } from './__helpers'
const ctx = createTestContext()
it('Queries the database feed', async() => {
  const feed = await ctx.client.request(`           
    query {
      feed {           
        id
      }
    }
  `)
  expect(feed).toMatchInlineSnapshot(`
    Object {
      "feed": Array [
        Object {
          "id": "99fbda4a-c0cb-458a-b4dc-03858b4a9523",
        },
        Object {
          "id": "570780e5-e4b5-484e-ba6e-df81e0ccd479",
        },
        Object {
          "id": "c48f8db5-3eeb-4c70-b384-70487ac1da9f",
        },
      ],
    }
`) // 3
  const persistedData = await ctx.prisma.post.findMany()
  expect(persistedData).toMatchInlineSnapshot(`
    Array [
      Object {
        "createdAt": 2022-02-15T19:59:46.274Z,
        "description": "Code-First GraphQL schemas for JavaScript/TypeScript",
        "id": "c48f8db5-3eeb-4c70-b384-70487ac1da9f",
        "postedById": "97527cbe-2de0-40cd-a953-8caae780e66e",
        "topic": "General",
        "url": "https://nexusjs.org",
      },
      Object {
        "createdAt": 2022-02-15T19:59:46.274Z,
        "description": "My Portfolio",
        "id": "570780e5-e4b5-484e-ba6e-df81e0ccd479",
        "postedById": "97527cbe-2de0-40cd-a953-8caae780e66e",
        "topic": "General",
        "url": "https://crbroughton.me",
      },
      Object {
        "createdAt": 2022-02-15T19:59:46.274Z,
        "description": "Vite.js",
        "id": "99fbda4a-c0cb-458a-b4dc-03858b4a9523",
        "postedById": "97527cbe-2de0-40cd-a953-8caae780e66e",
        "topic": "General",
        "url": "https://vitejs.dev",
      },
    ]
`)
})
