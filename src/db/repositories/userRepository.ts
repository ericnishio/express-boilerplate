import bcrypt from 'bcryptjs'

import {Id} from '../../app/types'
import User, {DbUser, UpsertUser} from '../models/User'

export const findUserById = async (id: Id): Promise<DbUser> => {
  return await User.findById(id)
}

export const findUserByUsername = async (username: string): Promise<DbUser> => {
  return await User.findOne({username})
}

export const upsertUser = async (payload: UpsertUser): Promise<DbUser> => {
  const isNew = !payload._id

  const passwordHash = await bcrypt.hash(payload.password, 10)

  const user = {...payload, password: passwordHash}

  return isNew
    ? await User.create(user)
    : await User.update({_id: payload._id}, user)
}
