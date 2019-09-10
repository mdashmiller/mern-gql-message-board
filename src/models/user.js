import mongoose, { Schema } from 'mongoose'
import { hash, compare } from 'bcryptjs'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    validate: {
      validator: email => User.doesntExist({ email }),
      message: ({ value }) => 'Email has already been taken'
    }
  },
  username: {
    type: String,
    trim: true,
    validate: {
      validator: username => User.doesntExist({ username }),
      message: ({ value }) => 'Username has already been taken'
    }
  },
  password: String,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
}, {
  timestamps: true
})

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10)
  }
})

userSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

userSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
