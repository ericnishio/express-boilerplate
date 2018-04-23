import express, {Application} from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'

import routes from '../routes'
import connectDb from './connectDb'
import {httpLoggerMiddleware as httpLogger} from './logger'

export default async (): Promise<Application> => {
  const app = express()

  app.use(helmet())
  app.use(cors())
  app.use(bodyParser.json({limit: '1mb'}))
  app.use(httpLogger)

  await connectDb()

  app.use('/', routes)

  return app
}
