import Joi from 'joi'
import { createPost } from '../shemas'
import { User, Post } from '../models'
import { UserInputError } from 'apollo-server-express'

export default {
  Mutation: {
    createPost: async (root, args, { req }, info) => {
      const { userId } = req.session
      const { title, body, authorId } = args

      await Joi.validate(args, createPost, { abortEarly: false })

      if (userId !== authorId) {
        throw new UserInputError('User ID is invalid')
      }

      const author = await User.findById(userId)
      const post = await Post.create({ title, body, author })

      await User.where({ _id: userId }).updateOne({ $push: { posts: post } })

      return post
    }
  }
}
