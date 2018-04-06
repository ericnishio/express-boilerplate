import {Schema, model} from 'mongoose'

import {IDbModel, Id} from '../../app/types'

interface IBasePost {
  title: string,
  body: string,
}

export type DbPost = IDbModel & IBasePost

export type UpsertPost = IBasePost & {
  _id?: Id,
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

export default model('Post', PostSchema)
