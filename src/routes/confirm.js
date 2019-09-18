import express from 'express'
import { User } from '../models'

const router = express.Router()

router.get('/:token', async (req, res) => {
  try {
    const { user: { id } } = jwt.verify(req.params.token, EMAIL_SECRET)
    await User.update({ confirmed: true }, { where: { id } })
  } catch (e) {
    console.log(e)
  }

  return res.json({ confirmed: true })
})

export default router
