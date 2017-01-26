// @flow

import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
})

export default mongoose.model('Post', PostSchema)
