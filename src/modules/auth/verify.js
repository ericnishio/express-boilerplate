// @flow

import {verifyAccessToken} from './helpers'

import type {$Request, $Response} from 'express'

export default async (req: $Request, res: $Response) => {
  try {
    const accessToken = req.headers.authorization.split('Bearer ')[1]

    await verifyAccessToken(accessToken)

    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(401)
  }
}
