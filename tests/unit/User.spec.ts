import { createUser } from '../functions-with-context'
import type { Context, MockContext } from '../../src/context'
import { createMockContext } from '../../src/context'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

describe('User Tests', () => {
  test('should create new user ', async() => {
    const user = {
      id: '34ce94bf-7019-4a53-8bd1-d0639f06aead',
      name: 'Craig',
      email: 'hello@prisma.io',
      password: '1234',
      banned: false,
      banReason: '',
      posts: [],
      votes: [],
    }

    mockCtx.prisma.user.create.mockResolvedValue(user)

    await expect(createUser(user, ctx)).resolves.toEqual(user)
  })
})

// test('should update a users name ', async() => {
//   const user = {
//     id: 1,
//     name: 'Rich Haines',
//     email: 'hello@prisma.io',
//   }

//   prismaMock.user.update.mockResolvedValue(user)

//   await expect(updateUsername(user)).resolves.toEqual({
//     id: 1,
//     name: 'Rich Haines',
//     email: 'hello@prisma.io',
//   })
// })

// test('should fail if user does not accept terms', async() => {
//   const user = {
//     id: 1,
//     name: 'Rich Haines',
//     email: 'hello@prisma.io',
//     acceptTermsAndConditions: false,
//   }

//   prismaMock.user.create.mockRejectedValue(new Error('User must accept terms!'))

//   await expect(createUser(user)).resolves.toEqual(
//     new Error('User must accept terms!'),
//   )
// })
