import {extractAccessToken, verifyAccessToken} from './helpers'

import {Request, Response, NextFunction} from 'express'

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = extractAccessToken(req)

    await verifyAccessToken(accessToken)

    next()
  } catch (e) {
    res.status(401).json({error: 'Unauthorized'})
  }
}
