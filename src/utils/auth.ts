import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const APP_SECRET = process.env.SECRET as string

export interface AuthTokenPayload { // 1
  userId: string
}

export function decodeAuthHeader(authHeader: String): AuthTokenPayload { // 2
  const token = authHeader.replace('bearer ', '') // 3

  if (!token)
    throw new Error('No token found')

  return jwt.verify(token, APP_SECRET) as AuthTokenPayload // 4
}
