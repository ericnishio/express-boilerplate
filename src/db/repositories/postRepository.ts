import Post from '../models/Post'

import {Id} from '../../app/types'
import {DbPost, UpsertPost} from '../models/Post'

export const findPostById = (id: Id): Promise<DbPost> =>
  Post.findById(id)

export const upsertPost = async (payload: UpsertPost): Promise<DbPost> => {
  const isNew = !payload._id

  const dbPost = {
    title: payload.title,
    body: payload.body,
  }

  return isNew
    ? await Post.create(dbPost)
    : await Post.update({_id: payload._id}, dbPost)
}
