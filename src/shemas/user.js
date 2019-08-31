import Joi from 'joi'

const email = Joi.string().email().required().label('Email')

const username = Joi.string().alphanum().min(3).max(30).required().label('Username')

const password = Joi.string().min(8).max(30).regex(
  /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}.*$/
).required().label('Password').options({
  language: {
    string: {
      regex: {
        base: 'must have at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character'
      }
    }
  }
})

export const signUp = Joi.object().keys({
  email, username, password
})

export const signIn = Joi.object().keys({
  email, password
})
