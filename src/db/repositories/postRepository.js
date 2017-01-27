// @flow

import Post from '$db/models/Post'

import type {Id} from '$app/types'
import type {DbPost} from '$db/models/Post'

export const findPostById = async (id: Id): Promise<DbPost> =>
  Post.findById(id)
