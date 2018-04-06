import bcrypt from 'bcryptjs'

import User from '../models/User'

import {Id} from '../../app/types'
import {DbUser, UpsertUser} from '../models/User'

export const findUserById = (id: Id): Promise<DbUser> =>
  User.findById(id)

export const findUserByUsername = (username: string): Promise<DbUser> =>
  User.findOne({username})

export const upsertUser = async (payload: UpsertUser): Promise<DbUser> => {
  const isNew = !payload._id

  const passwordHash = await bcrypt.hash(payload.password, 10)
  const dbUser = {...payload, password: passwordHash}

  return isNew
    ? await User.create(dbUser)
    : await User.update({_id: payload._id}, dbUser)
}
