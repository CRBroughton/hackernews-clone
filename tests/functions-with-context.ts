import type { Post, User } from '@prisma/client'
import type { Context } from '../src/context'

export async function createUser(user: User, ctx: Context) {
  return await ctx.prisma.user.create({
    data: user,
  })
}

export async function createPost(post: Post, ctx: Context) {
  return await ctx.prisma.post.create({
    data: post,
  })
}

export async function findPosts(ctx: Context) {
  return await ctx.prisma.post.findMany()
}

export async function userPostQuery(ctx: Context) {
  return await ctx.prisma.post.findMany({
    where: { postedById: ctx.userId },
  })
}
