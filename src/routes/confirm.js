import express from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models'
import { EMAIL_TOKEN_SECRET } from '../config'

const router = express.Router()

const respondWithError = (res, err) => res.json({ error: err.message })

router.get('/:token', (req, res) => {
  jwt.verify(req.params.token, EMAIL_TOKEN_SECRET, (err, payload) => {
    if (err) respondWithError(res, err)

    User.findById(payload.id, (err, user) => {
      if (err) respondWithError(res, err)

      user.confirmed = true

      user.save(err => {
        if (err) respondWithError(res, err)

        res.json({ confirmed: true })
      })
    })
  })
})

export default router
