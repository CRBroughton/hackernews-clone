import type { User } from '@prisma/client'
import type { Context } from '../src/context'

export async function createUser(user: User, ctx: Context) {
  return await ctx.prisma.user.create({
    data: user,
  })
}
