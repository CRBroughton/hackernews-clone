import { extendType, nonNull, objectType, stringArg } from 'nexus'
import type { User } from '@prisma/client'

export const Vote = objectType({
  name: 'Vote',
  definition(t) {
    t.nonNull.field('post', { type: 'Post' })
    t.nonNull.field('user', { type: 'User' })
  },
})

export const VoteMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('vote', {
      type: 'Vote',
      args: {
        postId: nonNull(stringArg()),
      },
      async resolve(_parent, args, context) {
        if (!context.userId)
          throw new Error('Cannot vote without logging in.')

        const post = await context.prisma.post.update({
          where: {
            id: args.postId,
          },
          data: {
            voters: {
              connect: {
                id: context.userId,
              },
            },
          },
        })

        const user = await context.prisma.user.findUnique({ where: { id: context.userId } })

        return {
          post,
          user: user as User,
        }
      },
    })
  },
})
