import prisma from '../src/client'

interface CreateUser {
  name: string
  email: string
  password: string
}

export async function createUser(user: CreateUser) {
  return await prisma.user.create({
    data: user,
  })
}
