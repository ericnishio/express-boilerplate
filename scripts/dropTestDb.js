if (process.env.NODE_ENV === 'test') {
  const mongoose = require('mongoose')

  mongoose.Promise = global.Promise

  const db = mongoose.createConnection(process.env.DB)

  db.on('open', () => {
    db.dropDatabase(() => {
      console.log('MongoDB cleared')
      process.exit(0)
    })
  })

  db.on('error', () => {
    console.error('MongoDB clear error')
    process.exit(1)
  })
}
