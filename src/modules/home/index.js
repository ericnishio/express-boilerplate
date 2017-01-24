// @flow

import type {$Request, $Response} from 'express'

export default async (req: $Request, res: $Response) => {
  res.json({message: 'Hello world!'})
}
