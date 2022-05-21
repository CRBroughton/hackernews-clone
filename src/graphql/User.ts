import { GraphQLYogaError } from '@graphql-yoga/node'
import { list, nonNull, nullable, objectType, queryField, stringArg } from 'nexus'
import { userPostQuery as postQuery } from '../../tests/functions-with-context'

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

export const userIdQuery = queryField('getUserId', {
  type: 'Query',
  resolve(_parent, _args, context) {
    if (!context.userId)
      throw new GraphQLYogaError('This user ID does not exist')

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
