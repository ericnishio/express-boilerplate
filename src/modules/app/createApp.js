// @flow

import express from 'express'
import helmet from 'helmet'

import createEndpoints from './createEndpoints'

import type {$Application} from 'express'

export default (): $Application => {
  const app = express()

  app.use(helmet())

  createEndpoints(app)

  return app
}
