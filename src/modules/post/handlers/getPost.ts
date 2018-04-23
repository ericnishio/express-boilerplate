import {Request, Response} from 'express'

import {findPostById} from '../../../db/repositories/postRepository'
import notFound from '../../error/handlers/404'

export default async (req: Request, res: Response) => {
  try {
    const {id} = req.params

    const post = await findPostById(id)

    if (post) {
      res.json(post)
    } else {
      notFound(req, res)
    }
  } catch (e) {
    res.sendStatus(400)
  }
}
