// @flow

import mongoose from 'mongoose'

import type {DbModel, Id} from '$app/types'

type BasePost = {
  title: string,
  body: string,
}

export type DbPost = DbModel & BasePost

export type UpsertPost = BasePost & {
  _id?: Id,
}

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
})

export default mongoose.model('Post', PostSchema)
