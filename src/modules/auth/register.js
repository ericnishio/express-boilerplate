// @flow

import {upsertUser} from '$db/repositories/userRepository'

import type {$Request, $Response} from 'express'
import type {UpsertUser} from '$db/models/User'

export default async (req: $Request, res: $Response) => {
  const {username, password}: UpsertUser = (req.body: any)

  try {
    await upsertUser({username, password})

    res.sendStatus(201)
  } catch (e) {
    res.status(400).json({error: e})
  }
}
