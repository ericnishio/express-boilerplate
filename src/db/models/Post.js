// @flow

import mongoose from 'mongoose'

import type {DbModel} from '$app/types'

export type DbPost = DbModel & {
  title: string,
  body: string,
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
