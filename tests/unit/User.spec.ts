import type { Post } from '@prisma/client'
import { createUser, userPostQuery } from '../functions-with-context'
import type { Context, MockContext } from '../../src/context'
import { createMockContext } from '../../src/context'
import { uuidGenerator } from '../../src/utils/uuidGenerator'

let mockCtx: MockContext
let ctx: Context

const post = {
  id: uuidGenerator(),
  createdAt: new Date(),
  description: 'Code-First GraphQL schemas for JavaScript/TypeScript',
  url: 'https://nexusjs.org',
  topic: 'General',
  postedById: '34ce94bf-7019-4a53-8bd1-d0639f06aead',
}

const user = {
  id: '34ce94bf-7019-4a53-8bd1-d0639f06aead',
  name: 'Craig',
  email: 'hello@prisma.io',
  password: '1234',
  banned: false,
  banReason: '',
  posts: [] as Post[],
  votes: [],
}

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

describe('User Tests', () => {
  test('should create new user ', async() => {
    mockCtx.prisma.user.create.mockResolvedValue(user)

    await expect(createUser(user, ctx)).resolves.toEqual(user)
  })

  test('returns a users posts ', async() => {
    mockCtx.prisma.user.create.mockResolvedValue(user)
    mockCtx.prisma.post.create.mockResolvedValue(post)
    mockCtx.prisma.post.findMany.mockResolvedValue([post])

    await expect(userPostQuery(ctx)).resolves.toEqual([post])
  })
})
