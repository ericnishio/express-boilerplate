import {Request, Response} from 'express'

import {upsertUser} from '../../../db/repositories/userRepository'
import {UpsertUser} from '../../../db/models/User'

export default async (req: Request, res: Response) => {
  const {username, password}: UpsertUser = req.body

  try {
    await upsertUser({username, password})

    res.sendStatus(201)
  } catch (e) {
    res.sendStatus(400)
  }
}
