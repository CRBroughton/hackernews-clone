import { extendType, nonNull, objectType, stringArg } from 'nexus'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { APP_SECRET, decodeAuthHeader } from '../utils/auth'

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', {
      type: 'User',
    })
  },
})

export const AuthMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('authenticate', {
      type: 'AuthPayload',
      args: {
        cookie: nonNull(stringArg()),
      },
      async resolve(_, args, context) {
        const cookie = decodeAuthHeader(args.cookie)
        const token = cookie.userId

        const user = await context.prisma.user.findUnique({
          where: { id: token.toString() },
        })

        if (!user)
          throw new Error('This account does not exist')

        return {
          token,
          user,
        }
      },
    })

    t.nonNull.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_parent, args, context) {
        const email = args.email.toLowerCase()
        const user = await context.prisma.user.findUnique({
          where: { email },
        })

        if (!user)
          throw new Error('No such user found')

        const valid = await bcrypt.compare(
          args.password,
          user.password,
        )

        if (!valid)
          throw new Error('Invalid password')

        if (user.banned)
          throw new Error(`You are banned! \r\n Reason: ${user.banReason}`)

        const token = jwt.sign({ userId: user.id }, APP_SECRET)

        return {
          token,
          user,
        }
      },
    })

    t.nonNull.field('signup', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      async resolve(_parent, args, context) {
        const password = await bcrypt.hash(args.password, 10)

        const email = args.email.toLowerCase()
        const name = args.name.toLowerCase()

        const existingUser = await context.prisma.user.findUnique({
          where: { email },
        })

        const existingUserName = await context.prisma.user.findUnique({
          where: { name },
        })

        if (existingUser || existingUserName)
          throw new Error('Account already created')

        const user = await context.prisma.user.create({
          data: { email, name, password },
        })

        const token = jwt.sign({ userId: user.id }, APP_SECRET)

        return {
          token,
          user,
        }
      },
    })
  },
})
