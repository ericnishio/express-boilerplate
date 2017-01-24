// @flow

import 'babel-polyfill'
import dotenv from 'dotenv'

import createApp from '$modules/app/createApp'

dotenv.config()

const app = createApp()
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})
