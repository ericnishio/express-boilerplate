// @flow

import 'babel-polyfill'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'

import createEndpoints from '$modules/routes/createEndpoints'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(helmet())

createEndpoints(app)

app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})
