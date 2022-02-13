import type { User } from '@prisma/client'
import prisma from '../src/client'

export async function createUser(user: User) {
  return await prisma.user.create({
    data: user,
  })
}
