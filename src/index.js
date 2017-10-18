// @flow

import 'babel-polyfill'

import createApp from '$app/createApp'

require('dotenv').load()

const start = async () => {
  try {
    const app = await createApp()
    const port = process.env.PORT || 3000

    app.listen(port, () => {
      console.log(`App running on port ${port}...`)
    })
  } catch (e) {
    console.error(e.toString())

    process.exit(1)
  }
}

start()
