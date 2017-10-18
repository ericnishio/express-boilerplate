// @flow

import jwt from 'jsonwebtoken'

import {findUserByUsername} from '$db/repositories/userRepository'
import {generateAccessToken, extractAccessToken} from './helpers'

import type {$Request, $Response} from 'express'

export default async (req: $Request, res: $Response) => {
  try {
    const accessToken = await jwt.decode(extractAccessToken(req))
    const user = await findUserByUsername(accessToken.user.username)

    if (accessToken.refresh !== user.password) {
      res.sendStatus(401)
      return
    }

    const json = {
      jwt: await generateAccessToken(user),
    }

    res.status(201).json(json)
  } catch (e) {
    res.sendStatus(401)
  }
}
