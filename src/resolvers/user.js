import mongoose from 'mongoose'
import Joi from 'joi'
import { UserInputError } from 'apollo-server-express'
import { User } from '../models'
import { SignUp } from '../shemas'

export default {
  Query: {
    users: (root, args, context, info) => {
      // TODO: auth, projection, pagination

      return User.find({})
    },
    user: (root, { id }, context, info) => {
      // TODO: auth, projection, sanitization

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user id`)
      }

      return User.findById(id)
    }
  },
  Mutation: {
    signUp: async (root, args, context, info) => {
      // TODO: not auth

      await Joi.validate(args, SignUp, { abortEarly: false })

      return User.create(args)
    }
  }
}
