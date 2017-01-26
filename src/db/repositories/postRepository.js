// @flow

import Post from '$db/models/Post'

import type {Id} from '$app/types'

export const findPostById = async (id: Id): Promise<Post> =>
  Post.findById(id)
