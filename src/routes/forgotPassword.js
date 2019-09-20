import express from 'express'
import { User } from '../models'
import { sendPasswordToken } from '../auth'

const router = express.Router()

// get a token to reset a forgotten password
router.get('/', async (req, res) => {
  try {
    const email = req.body.email
    const user = await User.findOne({ email })
    const token = await sendPasswordToken(user)

    // sendPasswordToken(user)

    return res.json({ token })
    // return res.json({ sent: true })
  } catch (e) {
    return res.json({ error: e.message })
  }
})

// verify token
router.post('/:token', async (req, res) => {
  // const { user: { id } } = jwt.verify(req.params.token, PASSWORD_SECRET)
  // const user = await User.findById(id)

  // if (!user) {
  //   res.json({ error: 'Invalid or expired user indentification.'})
  // }

  // return res.json(user)
  try {
    const user = await User.findOne({ username: req.params.token })

    res.json({ password: user.password })
  } catch (e) {
    res.json({ error: e.message })
  }
})

export default router
