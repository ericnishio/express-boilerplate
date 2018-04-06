import {verifyAccessToken, extractAccessToken} from '../helpers'

import {Request, Response} from 'express'

export default async (req: Request, res: Response) => {
  try {
    const accessToken = extractAccessToken(req)

    await verifyAccessToken(accessToken)

    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(401)
  }
}
