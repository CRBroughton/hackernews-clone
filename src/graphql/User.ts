import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.nonNull.string('email')
    t.nonNull.list.nonNull.field('posts', { // 1
      type: 'Post',
      resolve(parent, _args, context) { // 2
        return context.prisma.user // 3
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
