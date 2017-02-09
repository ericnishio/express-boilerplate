// @flow

import type {$Request, $Response, NextFunction} from 'express'

export const auth = (req: $Request, res: $Response, next: NextFunction) => {
  if (req.headers.authorization !== 'Bearer foobarbaz') {
    return res.status(401).json({error: 'Unauthorized'})
  }

  next()
}
