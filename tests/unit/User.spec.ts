import { prismaMock } from '../../src/singleton'
import { createUser } from '../functions-without-context'

describe('User Tests', () => {
  test('should create new user ', async() => {
    const user = {
      id: 'asasd',
      name: 'Rich',
      email: 'hello@prisma.io',
      password: '1234',
      banned: false,
      banReason: '',
      posts: [],
      votes: [],
    }

    prismaMock.user.create.mockResolvedValue(user)

    await expect(createUser(user)).resolves.toEqual(user)
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
