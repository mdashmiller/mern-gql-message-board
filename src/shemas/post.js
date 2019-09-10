import Joi from './joi'

export const createPost = Joi.object().keys({
  title: Joi.string().min(1).max(50).label('Title'),
  body: Joi.string().min(1).max(5000).label('Body'),
  authorId: Joi.string().objectId().label('Author')
})
