// @flow

import Post from '$db/models/Post'

import type {$Request, $Response} from 'express'

export default async (req: $Request, res: $Response) => {
  const post = new Post(req.body)

  try {
    await post.save()

    res.status(201).json(post)
  } catch (e) {
    res.status(400).json({error: e.name})
  }
}
