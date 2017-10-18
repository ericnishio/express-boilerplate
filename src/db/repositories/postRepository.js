// @flow

import Post from '$db/models/Post'

import type {Id} from '$app/types'
import type {DbPost, UpsertPost} from '$db/models/Post'

export const findPostById = async (id: Id): Promise<DbPost> =>
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
