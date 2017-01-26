// @flow

import mongoose from 'mongoose'

export default () => {
  mongoose.Promise = Promise
  mongoose.connect(process.env.DB)
  mongoose.connection.on('error', () => console.log('MongoDB connection error'))
}
