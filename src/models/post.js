import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const postSchema = new Schema({
  title: String,
  body: String,
  author: {
    type: ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

export default mongoose.model('Post', postSchema)
