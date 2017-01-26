// @flow

import {findPostById} from '$db/repositories/postRepository'

import type {$Request, $Response} from 'express'

export default async (req: $Request, res: $Response) => {
  try {
    const post = await findPostById(req.params.id)

    res.json(post)
  } catch (e) {
    res.status(404).send()
  }
}
