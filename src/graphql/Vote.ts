import { mutationField, nonNull, objectType, stringArg } from 'nexus'
import type { User } from '@prisma/client'
import { GraphQLError } from 'graphql'

export const Vote = objectType({
  name: 'Vote',
  definition(t) {
    t.nonNull.field('post', { type: 'Post' })
    t.nonNull.field('user', { type: 'User' })
  },
})

export const VoteMutation = mutationField('vote', {
  type: Vote,
  args: {
    postId: nonNull(stringArg()),
  },
  async resolve(_parent, args, context) {
    if (!context.userId)
      throw new GraphQLError('Cannot vote without logging in.')

    const user = await context.prisma.user.findUnique({ where: { id: context.userId } })

    const getPostedUser = await context.prisma.post.findUnique({
      where: {
        id: args.postId,
      },
      select: {
        postedById: true,
      },
    })

    if (getPostedUser?.postedById === context.userId)
      throw new GraphQLError('Cannot vote on your own posts!')

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

    return {
      post,
      user: user as User,
    }
  },
})
