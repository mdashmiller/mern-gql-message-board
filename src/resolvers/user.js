import Joi from 'joi'
import { User } from '../models'
import { signUp, signIn, objectId } from '../shemas'
import { attemptSignIn, signOut, updateProfile } from '../auth'

export default {
  Query: {
    me: (root, args, { req }, info) => {
      // TODO: projection
      return User.findById(req.session.userId)
    },
    users: (root, args, { req }, info) => {
      // TODO: projection, pagination
      return User.find({})
    },
    user: async (root, args, { req }, info) => {
      // TODO: projection
      await Joi.validate(args, objectId)
      return User.findById(args.id)
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      // TODO: not auth
      await Joi.validate(args, signUp, { abortEarly: false })

      const user = await User.create(args)

      req.session.userId = user.id

      return user
    },
    signIn: async (root, args, { req }, info) => {
      await Joi.validate(args, signIn, { abortEarly: false })

      const user = await attemptSignIn(args.email, args.password)

      req.session.userId = user.id

      return user
    },
    signOut: (root, args, { req, res }, info) => {
      return signOut(req, res)
    },
    update: (root, args, { req }, info) => {
      return updateProfile(req, args)
    }
  },
  User: {
    posts: async (user, args, context, info) => {
      // TODO: pagination, projection
      return (await user.populate('posts').execPopulate()).posts
    }
  }
}
