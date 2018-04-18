import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import ms from 'ms'

import {Request} from 'express'
import {DbUser} from '../../db/models/User'
import {AccessToken} from './types'

export const hashPassword = async (password: string): Promise<string> =>
  bcrypt.hash(password, 10)

export const validatePassword = async (password: string, hash: string) => {
  const isCorrect = await bcrypt.compare(password, hash)

  if (!isCorrect) {
    throw new Error('INCORRECT_PASSWORD')
  }
}

export const generateAccessToken = async (user: DbUser): Promise<string> => {
  const tokenData: AccessToken = {
    user: {
      _id: user._id,
      username: user.username,
    },
    refresh: user.password,
    expires: +new Date() + ms('1 day'),
  }

  return await jwt.sign(tokenData, process.env.JWT_SECRET)
}

export const verifyAccessToken = async (accessToken: string): Promise<void> => {
  try {
    // @ts-ignore
    const tokenData: AccessToken = await jwt.verify(accessToken, process.env.JWT_SECRET)

    if (tokenData.expires < +new Date()) {
      throw new Error('EXPIRED_ACCESS_TOKEN')
    }
  } catch (e) {
    throw e
  }
}

export const extractAccessToken = (req: Request): string =>
  typeof req.headers.authorization === 'string'
    ? req.headers.authorization.split('Bearer ')[1]
    : ''
