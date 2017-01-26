// @flow

import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'

import connectDb from './connectDb'
import createEndpoints from './createEndpoints'

import type {$Application} from 'express'

export default (): $Application => {
  const app = express()

  app.use(helmet())
  app.use(bodyParser.json())

  connectDb()
  createEndpoints(app)

  return app
}
