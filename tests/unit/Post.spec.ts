import { createPost, findPosts } from '../functions-with-context'
import type { Context, MockContext } from '../../src/context'
import { createMockContext } from '../../src/context'
import { uuidGenerator } from '../../src/utils/uuidGenerator'

let mockCtx: MockContext
let ctx: Context

const posts = [
  {
    id: uuidGenerator(),
    createdAt: new Date(),
    description: 'Code-First GraphQL schemas for JavaScript/TypeScript',
    url: 'https://nexusjs.org',
    topic: 'General',
    postedById: uuidGenerator(),
  },
  {
    id: uuidGenerator(),
    createdAt: new Date(),
    description: 'My Portfolio',
    url: 'https://crbroughton.me',
    topic: 'General',
    postedById: uuidGenerator(),
  },
  {
    id: uuidGenerator(),
    createdAt: new Date(),
    description: 'Vite.js',
    url: 'https://vitejs.dev',
    topic: 'General',
    postedById: uuidGenerator(),
  },
]

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

describe('Post Tests', () => {
  test('should create a new post', async() => {
    mockCtx.prisma.post.create.mockResolvedValue(posts[0])

    await expect(createPost(posts[0], ctx)).resolves.toEqual(posts[0])
  })

  test('should return all posts', async() => {
    mockCtx.prisma.post.create.mockResolvedValue(posts[0])
    mockCtx.prisma.post.findMany.mockResolvedValue(posts)

    await expect(findPosts(ctx)).resolves.toEqual(posts)
  })
})
