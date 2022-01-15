import { extendType, nonNull, objectType, stringArg } from 'nexus'
import type { User } from '@prisma/client'

export const Vote = objectType({ // 1
  name: 'Vote',
  definition(t) {
    t.nonNull.field('post', { type: 'Post' })
    t.nonNull.field('user', { type: 'User' })
  },
})

export const VoteMutation = extendType({ // 2
  type: 'Mutation',
  definition(t) {
    t.field('vote', {
      type: 'Vote',
      args: {
        postId: nonNull(stringArg()),
      },
      async resolve(_parent, args, context) {
        const { userId } = context
        const { postId } = args

        if (!userId) { // 1
          throw new Error('Cannot vote without logging in.')
        }

        const post = await context.prisma.post.update({ // 2
          where: {
            id: postId,
          },
          data: {
            voters: {
              connect: {
                id: userId,
              },
            },
          },
        })

        const user = await context.prisma.user.findUnique({ where: { id: userId } })

        return { // 3
          post,
          user: user as User,
        }
      },
    })
  },
})
