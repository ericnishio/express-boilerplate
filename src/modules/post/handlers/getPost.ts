import {Request, Response} from 'express'

import {findPostById} from '../../../db/repositories/postRepository'

export default async (req: Request, res: Response) => {
  try {
    const {id} = req.params

    const post = await findPostById(id)

    if (post) {
      res.json(post)
    } else {
      res.sendStatus(404)
    }
  } catch (e) {
    res.sendStatus(400)
  }
}
