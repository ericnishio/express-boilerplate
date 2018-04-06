import {Schema, model} from 'mongoose'

import {IDbModel, Id} from '../../app/types'

interface IBaseUser {
  username: string,
  password: string,
}

export type DbUser = IDbModel & IBaseUser

export type UpsertUser = IBaseUser & {
  _id?: Id,
}

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 4,
    max: 32,
  },
  password: {
    type: String,
    required: true,
  },
})

export default model('User', UserSchema)
