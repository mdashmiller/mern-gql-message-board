import express from 'express'
import { User } from '../models'
import { getResetPasswordToken } from '../auth'

const router = express.Router()

// get a token to reset a forgotten password
router.get('/', async (req, res) => {
  const email = req.body.email
  const user = await User.findOne({ email })

  if (!user) {
    return res.json({ error: 'No account with that email address exists.' })
  }

  await getResetPasswordToken(user)

  return res.json({ sent: true })
})

// verify token
router.post('/:token', async (req, res) => {
  const { user: { id } } = jwt.verify(req.params.token, PASSWORD_SECRET)
  const user = await User.findById(id)

  if (!user) {
    res.json({ error: 'Invalid or expired user indentification.'})
  }

  return res.json(user)
})

export default router
