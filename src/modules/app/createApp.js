// @flow

import express from 'express'
import helmet from 'helmet'

import createEndpoints from './createEndpoints'

import type {App} from './types'

export default (): App => {
  const app = express()

  app.use(helmet())

  createEndpoints(app)

  return app
}
