// @flow

import {upsertPost} from '$db/repositories/postRepository'

import type {$Request, $Response} from 'express'
import type {UpsertPost} from '$db/models/Post'

export default async (req: $Request, res: $Response) => {
  const payload: UpsertPost = (req.body: any)

  try {
    const post = await upsertPost(payload)

    res.status(201).json(post)
  } catch (e) {
    res.status(400).json({error: e.name})
  }
}
