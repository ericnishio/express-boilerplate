// @flow

import 'babel-polyfill'

import createApp from '$app/createApp'
import logger from '$app/logger'

require('dotenv').load()

const start = async () => {
  try {
    const app = await createApp()
    const port = process.env.PORT || 3000

    app.listen(port, () => {
      logger.info(`App running on port ${port}...`)
    })
  } catch (e) {
    logger.error(e.toString())

    process.exit(1)
  }
}

start()
