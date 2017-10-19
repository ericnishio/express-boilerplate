// @flow

import type {$Request, $Response} from 'express'

export default (req: $Request, res: $Response) =>
  res.status(404).json({error: 'NOT_FOUND'})
