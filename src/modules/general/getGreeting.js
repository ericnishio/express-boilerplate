// @flow

import type {$Request, $Response} from 'express'

export default (req: $Request, res: $Response) =>
  res.json({message: 'Well, what do we have here? You must be a new arrival.'})
