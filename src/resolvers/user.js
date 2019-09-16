import Joi from 'joi'
import { User } from '../models'
import { signUp, signIn, update, remove, objectId } from '../shemas'
import { isUnique, attemptSignIn, signOut, updateProfile, removeProfile } from '../auth'

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
      await Joi.validate(args, signUp, { abortEarly: false })

      await isUnique(args)

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
    update: async (root, args, { req }, info) => {
      await Joi.validate(args, update, { abortEarly: false })

      return updateProfile(req, args)
    },
    remove: async (root, args, { req, res }, info) => {
      await Joi.validate(args, remove, { abortEarly: false })

      const userRemoved = await removeProfile(req, args)

      await signOut(req, res)

      return userRemoved
    }
  },
  User: {
    posts: async (user, args, context, info) => {
      // TODO: pagination, projection
      return (await user.populate('posts').execPopulate()).posts
    }
  }
}
