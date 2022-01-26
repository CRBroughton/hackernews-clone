import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const APP_SECRET = process.env.SECRET as string

export interface AuthTokenPayload {
  userId: string
}

export function decodeAuthHeader(authHeader: String): AuthTokenPayload {
  const token = authHeader.replace('bearer ', '')

  if (!token)
    throw new Error('No token found')

  return jwt.verify(token, APP_SECRET) as AuthTokenPayload
}
