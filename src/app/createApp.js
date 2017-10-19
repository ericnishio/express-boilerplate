// @flow

import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'

import connectDb from './connectDb'
import createEndpoints from './createEndpoints'
import {httpErrorMiddleware as httpErrorLogger} from './logger'

import type {$Application} from 'express'

export default async (): Promise<$Application> => {
  const app = express()

  app.use(helmet())
  app.use(cors())
  app.use(bodyParser.json())
  app.use(httpErrorLogger)

  await connectDb()

  createEndpoints(app)

  return app
}
