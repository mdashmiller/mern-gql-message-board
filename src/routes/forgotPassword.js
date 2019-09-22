import express from 'express'
import { User } from '../models'
import jwt from 'jsonwebtoken'
import { sendToken } from '../auth'
import { EMAIL_TOKEN_SECRET } from '../config'

const router = express.Router()

// get a token to reset a forgotten password
router.get('/', async (req, res) => {
  if (!req.body.email) {
    return res.end('Please enter your email.')
  }

  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return res.end('User not found.')
  }

  sendToken(user, 'forgot')
    .then(result => res.end(result))
    .catch(e => res.end(e.message))
})

// verify token
router.get('/:token', (req, res) => {
  jwt.verify(req.params.token, EMAIL_TOKEN_SECRET, err => {
    if (err) {
      return res.end(err.message)
    }
  })

  return res.end('Please enter a new password.')
})

export default router
