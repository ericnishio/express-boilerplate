import {Request, Response, NextFunction} from 'express'

import {extractAccessToken, verifyAccessToken} from './helpers'

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = extractAccessToken(req)

    await verifyAccessToken(accessToken)

    next()
  } catch (e) {
    res.status(401).json({error: 'Unauthorized'})
  }
}
