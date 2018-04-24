import {model, Schema, Document} from 'mongoose'

import {Id} from '../types'

interface BasePost {
  title: string
  body: string
}

export interface DbPost extends Document, BasePost {}

export interface UpsertPost extends BasePost {
  _id?: Id
}

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
})

export default model<DbPost>('Post', PostSchema)
