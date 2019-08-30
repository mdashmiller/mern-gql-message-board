import Joi from 'joi'

export default Joi.object().keys({
  email: Joi.string().email().required().label('Email'),
  username: Joi.string().alphanum().min(3).max(30).required().label('Username'),
  password: Joi.string().regex(
    /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])[A-Za-z\d@$!%*#?&]\S{7,30}$/
  ).label('Password').options({
    language: {
      string: {
        regex: {
          base: 'must have at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character'
        }
      }
    }
  })
})
