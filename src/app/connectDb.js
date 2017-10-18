// @flow

import mongoose from 'mongoose'

export default (): Promise<void> => new Promise((resolve, reject) => {
  mongoose.Promise = Promise
  mongoose.connect(process.env.DB, {useMongoClient: true})
  mongoose.connection.on('open', resolve)
  mongoose.connection.on('error', reject)
})
