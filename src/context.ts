import { PrismaClient } from '@prisma/client'
import { decodeAuthHeader } from './utils/auth'
export const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  userId?: string
}

export const context = ({ req }: { req: any }): Context => {
  const storedCookie = req.headers.authorization as string
  const token
      = req && req.headers.authorization
        ? decodeAuthHeader(storedCookie)
        : null

  return {
    prisma,
    userId: token?.userId as string | undefined,
  }
}
