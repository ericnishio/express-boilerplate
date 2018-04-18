import {Id} from '../types'
import Post, {DbPost, UpsertPost} from '../models/Post'

export const findPostById = async (id: Id): Promise<DbPost> => {
  return await Post.findById(id)
}

export const upsertPost = async (payload: UpsertPost): Promise<DbPost> => {
  const isNew = !payload._id

  const post = {
    title: payload.title,
    body: payload.body,
  }

  return isNew
    ? await Post.create(post)
    : await Post.update({_id: payload._id}, post)
}
