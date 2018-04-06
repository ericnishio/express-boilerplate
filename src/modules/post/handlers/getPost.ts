import {findPostById} from '../../../db/repositories/postRepository'

import {Request, Response} from 'express'

export default async (req: Request, res: Response) => {
  try {
    const post = await findPostById(req.params.id)

    if (post) {
      res.json(post)
    } else {
      res.sendStatus(404)
    }
  } catch (e) {
    res.sendStatus(400)
  }
}
