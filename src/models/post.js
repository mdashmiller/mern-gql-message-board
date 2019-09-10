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

const MAX_TITLE_LENGTH = 50

postSchema.pre('save', function () {
  if (!this.title) {
    let generatedTitle

    if (this.body.length > MAX_TITLE_LENGTH) {
      generatedTitle = this.body.substring(0, MAX_TITLE_LENGTH - 3).concat('...')
    } else {
      generatedTitle = this.body
    }

    this.title = generatedTitle
  }
})

export default mongoose.model('Post', postSchema)
