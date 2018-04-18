import {model, Schema, Document} from 'mongoose'

import {Id} from '../../db/types'

interface BaseUser {
  username: string,
  password: string,
}

export interface DbUser extends Document, BaseUser {}

export interface UpsertUser extends BaseUser {
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

export default model<DbUser>('User', UserSchema)
