import { PrismaClient } from '@prisma/client'
import type { Request } from 'express'
import type { DeepMockProxy } from 'jest-mock-extended'
import { mockDeep } from 'jest-mock-extended'
import { decodeAuthHeader } from './utils/auth'
export const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  userId?: string
}

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>
}

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
  }
}

export const context = ({ req }: { req: Request }): Context => {
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
