// @flow

import mongoose from 'mongoose'

import type {DbModel, Id} from '$app/types'

type BaseUser = {
  username: string,
  password: string,
}

export type DbUser = DbModel & BaseUser

export type UpsertUser = BaseUser & {
  _id?: Id,
}

const UserSchema = mongoose.Schema({
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

export default mongoose.model('User', UserSchema)
