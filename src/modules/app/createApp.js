// @flow

import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'

import createEndpoints from './createEndpoints'

import type {$Application} from 'express'

export default (): $Application => {
  const app = express()

  app.use(helmet())
  app.use(bodyParser.json())

  createEndpoints(app)

  return app
}
