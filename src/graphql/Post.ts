import { extendType, nonNull, objectType, stringArg } from 'nexus'

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.string('id')
    t.nullable.string('description')
    t.nonNull.string('url')
    t.field('postedBy', { // 1
      type: 'User',
      resolve(parent, _args, context) { // 2
        return context.prisma.post
          .findUnique({ where: { id: parent.id } })
          .postedBy()
      },
    })
    t.nonNull.list.nonNull.field('voters', { // 1
      type: 'User',
      resolve(parent, _args, context) {
        return context.prisma.post
          .findUnique({ where: { id: parent.id } })
          .voters()
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

export const PostQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('feed', {
      type: 'Post',
      resolve(_parent, _args, context) {
        return context.prisma.post.findMany()
      },
    })
  },
})

export const PostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('post', {
      type: 'Post',
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },

      resolve(_parent, args, context) {
        const { description, url } = args
        const { userId } = context

        if (!userId) { // 1
          throw new Error('Cannot post without logging in.')
        }

        const newPost = context.prisma.post.create({
          data: {
            description,
            url,
            postedBy: { connect: { id: userId } }, // 2
          },
        })

        return newPost
      },
    })
  },
})

export const deletePost = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deletePost', {
      type: 'ID',
      args: {
        id: nonNull(stringArg()),
      },

      async resolve(_parent, args, context) {
        await context.prisma.post.delete({
          where: {
            id: args.id,
          },
        })
        return `deleted post ${args.id}`
        // links = links.filter(link => link.id !== args.id)
        // return `deleted post ${args.id}`
      },
    })
  },
})

export const updatePost = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updatePost', {
      type: 'Post',
      args: {
        id: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      async resolve(_parent, args, context) {
        const { id, url } = args
        const updatePost = await context.prisma.post.update({
          where: {
            id,
          },
          data: {
            url,
          },
        })
        return updatePost
        // const { id, url } = args
        // for (const link of links) {
        //   if (link.id === id)
        //     link.url = url
        // }
        // return args
      },
    })
  },
})
