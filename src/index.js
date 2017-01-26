// @flow

import 'babel-polyfill'

import createApp from '$app/createApp'

require('dotenv').load()

const app = createApp()
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})
