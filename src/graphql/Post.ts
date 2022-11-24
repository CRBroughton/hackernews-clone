import { GraphQLError } from 'graphql'
import { list, mutationField, nonNull, objectType, queryField, stringArg } from 'nexus'
import { User } from './User'

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.string('id')
    t.nullable.string('description')
    t.nonNull.string('url')
    t.nonNull.string('topic')
    t.field('postedBy', {
      type: User,
      resolve(parent, _args, context) {
        return context.prisma.post
          .findUnique({ where: { id: parent.id } })
          .postedBy()
      },
    })
    t.nonNull.list.nonNull.field('voters', {
      type: User,
      async resolve(parent, _args, context) {
        const posts = await context.prisma.post
          .findUnique({ where: { id: parent.id } })
          .voters()

        if (!posts)
          return []
        return posts
      },
    })
  },
})

export const ID = objectType({
  name: 'ID',
  definition(t) {
    t.nonNull.string('id')
  },
})

export const PostQuery = queryField('feed', {
  type: nonNull(list(nonNull('Post'))),
  async resolve(_parent, _args, context) {
    return (await context.prisma.post.findMany()).reverse()
  },
})

export const TopicQuery = queryField('getTopicPosts', {
  type: nonNull(list(nonNull('Post'))),
  args: {
    topic: nonNull(stringArg()),
  },
  async resolve(_parent, args, context) {
    return (await context.prisma.post.findMany({
      where: { topic: args.topic },
    })).reverse()
  },
})

export const post = mutationField('post', {
  type: nonNull(Post),
  args: {
    description: nonNull(stringArg()),
    url: nonNull(stringArg()),
    topic: nonNull(stringArg()),
  },

  async resolve(_parent, args, context) {
    const { description, url } = args
    let topic = args.topic

    if (!args.description || !args.url)
      throw new GraphQLError('Missing a required field!')

    if (!args.topic)
      topic = 'General'

    if (!context.userId)
      throw new GraphQLError('Cannot post without logging in.')

    const user = await context.prisma.user.findUnique({
      where: { id: context.userId },
    })

    if (user?.banned)
      throw new GraphQLError(`You are banned! \r\n Reason: ${user.banReason}`)

    const newPost = context.prisma.post.create({
      data: {
        description,
        url,
        topic,
        postedBy: { connect: { id: context.userId } },
      },
    })

    return newPost
  },
})

export const deletePost = mutationField('deletePost', {
  type: nonNull(ID),
  args: {
    id: nonNull(stringArg()),
  },

  async resolve(_parent, args, context) {
    const getPostedUser = await context.prisma.post.findUnique({
      where: {
        id: args.id,
      },
      select: {
        postedById: true,
      },
    })

    if (!context.userId)
      throw new GraphQLError('Cannot post without logging in.')

    if (!getPostedUser?.postedById)
      throw new GraphQLError('Post does not exist!')

    if (getPostedUser?.postedById !== context.userId)
      throw new GraphQLError('Cannot delete posts that you dont own!')

    await context.prisma.post.delete({
      where: {
        id: args.id,
      },
    })
    return `deleted post ${args.id}`
  },
})
