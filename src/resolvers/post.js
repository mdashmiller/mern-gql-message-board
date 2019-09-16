import Joi from 'joi'
import { createPost } from '../shemas'
import { User, Post } from '../models'
import { UserInputError, AuthenticationError, ApolloError } from 'apollo-server-express'

export default {
  Query: {
    posts: (root, args, { req }, info) => {
      // TODO: projection, pagination
      return Post.find({})
    },
    post: (root, { id }, { req }, info) => {
      return Post.findById(id)
    }
  },
  Mutation: {
    createPost: async (root, args, { req }, info) => {
      const { userId } = req.session
      const { title, body, authorId } = args

      await Joi.validate(args, createPost, { abortEarly: false })

      if (userId !== authorId) {
        throw new UserInputError('User ID is invalid.')
      }

      const author = await User.findById(userId)
      const post = await Post.create({ title, body, author })

      // add id of created post to posts array on author's user document
      await User.where({ _id: userId }).updateOne({ $push: { posts: post } })

      return post
    },
    deletePost: async (root, { postId }, { req }, info) => {
      const { userId } = req.session
      const authorId = (await Post.findById(postId)).author.toString()

      if (!authorId) {
        throw new ApolloError('Network error. Please try again.')
      }

      if (userId !== authorId) {
        throw new AuthenticationError('User is not authorized to delete this post.')
      }

      // remove id of deleted post from posts array on author's user document
      await User.where({ _id: userId }).updateOne({ $pull: { posts: postId } })

      return new Promise(
        (resolve, reject) => {
          Post.findByIdAndDelete(postId, err => {
            if (err) reject(err)

            resolve(true)
          })
        }
      )
    }
  },
  Post: {
    author: async (post, args, context, info) => {
      // TODO: pagination, projection
      return (await post.populate('author').execPopulate()).author
    }
  }
}
