import mongoose from 'mongoose'

export default (): Promise<void> => new Promise((resolve, reject) => {
  mongoose.Promise = global.Promise
  mongoose.connect(process.env.DB)
  mongoose.connection.on('open', resolve)
  mongoose.connection.on('error', reject)
})
