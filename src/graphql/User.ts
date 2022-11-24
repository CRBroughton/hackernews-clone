import { GraphQLError } from 'graphql'
import { list, nonNull, nullable, objectType, queryField, stringArg } from 'nexus'
import { userPostQuery as postQuery } from '../../tests/functions-with-context'
import { Post } from './Post'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.nonNull.string('email')
    t.nonNull.boolean('banned')
    t.string('banReason')
    t.nonNull.list.nonNull.field('posts', {
      type: Post,
      async resolve(parent, _args, context) {
        const posts = await context.prisma.user
          .findUnique({ where: { id: parent.id } })
          .posts()

        if (!posts)
          return []
        return posts
      },
    })
    t.nonNull.list.nonNull.field('votes', {
      type: Post,
      async resolve(parent, _args, context) {
        const posts = await context.prisma.user
          .findUnique({ where: { id: parent.id } })
          .votes()

        if (!posts)
          return []
        return posts
      },
    })
  },
})

export const userIdQuery = queryField('getUserId', {
  type: nonNull('String'),
  resolve(_parent, _args, context) {
    if (!context.userId)
      throw new GraphQLError('This user ID does not exist')

    return context.userId
  },
})

export const userPostQuery = queryField('getUserPosts', {
  type: nonNull(list(nonNull('Post'))),
  args: {
    id: nullable(stringArg()),
  },
  resolve(_parent, args, context) {
    if (args.id)
      return postQuery(context, args.id)

    return postQuery(context)
  },
})
