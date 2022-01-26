import { extendType, objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.nonNull.string('email')
    t.nonNull.boolean('banned')
    t.string('banReason')
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      resolve(parent, _args, context) {
        return context.prisma.user
          .findUnique({ where: { id: parent.id } })
          .posts()
      },
    })
    t.nonNull.list.nonNull.field('votes', {
      type: 'Post',
      resolve(parent, _args, context) {
        return context.prisma.user
          .findUnique({ where: { id: parent.id } })
          .votes()
      },
    })
  },
})

export const userIdQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getUserId', {
      type: 'String',
      resolve(_parent, _args, context) {
        if (!context.userId)
          throw new Error('This user ID does not exist')

        return context.userId
      },
    })
  },
})

export const userPostQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('getUserPosts', {
      type: 'Post',
      resolve(_parent, _args, context) {
        return context.prisma.post.findMany({
          where: { postedById: context.userId },
        })
      },
    })
  },
})
