import { AuthenticationError, ApolloError } from 'apollo-server-express'
import { User, Post } from './models'
import { SESS_NAME } from './config'

export const attemptSignIn = async (email, password) => {
  const message = 'Incorrect email or password. Please try again.'

  const user = await User.findOne({ email })

  if (!user) {
    throw new AuthenticationError(message)
  }

  if (!await user.matchesPassword(password)) {
    throw new AuthenticationError(message)
  }

  return user
}

const signedIn = req => req.session.userId

export const ensureSignedIn = req => {
  if (!signedIn(req)) {
    throw new AuthenticationError('You must be signed in.')
  }
}

export const ensureSignedOut = req => {
  if (signedIn(req)) {
    throw new AuthenticationError('You are already signed in.')
  }
}

export const signOut = (req, res) => new Promise(
  (resolve, reject) => {
    req.session.destroy(err => {
      if (err) reject(err)

      res.clearCookie(SESS_NAME)

      resolve(true)
    })
  }
)

export const isUnique = async (args, session = {}) => {
  const { email, username } = args

  const emailExists = await User.findOne({ email })
  const usernameExists = await User.findOne({ username })

  // in the following conditionals, don't throw error
  // if user enters their current email or username
  if (emailExists && emailExists.id !== session.userId) {
    throw new AuthenticationError('Email already taken.')
  }

  if (usernameExists && usernameExists.id !== session.userId) {
    throw new AuthenticationError('Username already taken.')
  }
}

// export const confirmEmail = user => {
//   jwt.sign(
//     {
//       user: _.pick(user, 'id')
//     },
//     EMAIL_SECRET,
//     {
//       expiresIn: '1d'
//     },
//     (err, emailToken) => {
//       const url = `http://localhost:3000/confirmation/${emailToken}`

//       transporter.sendMail({
//         to: args.email,
//         subject: 'Confirm Email',
//         html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`
//       })
//     },
//   )
// }

export const updateProfile = async ({ session }, args) => {
  const { password, email, username, newPassword } = args
  const user = await User.findById(session.userId)

  if (!user) {
    throw new ApolloError('Server error. Please try again.')
  }

  if (!await user.matchesPassword(password)) {
    throw new AuthenticationError('Incorrect password.')
  }

  await isUnique(args, session)

  if (email) {
    user.email = email
  }

  if (username) {
    user.username = username
  }

  if (newPassword) {
    user.password = newPassword
  }

  return user.save()
}

// export const getResetPasswordToken = user => {
//   jwt.sign({ options }, (err, passwordToken) => {
//     if (err) {
//       console.log(err)
//     }
//     transporter.sendMail() => {
//       if (err) console.log(err)
//     }
//   })
// }

export const removeProfile = async ({ session }, { email, password }) => {
  const user = await attemptSignIn(email, password)

  if (session.userId !== user.id) {
    throw new AuthenticationError('The logged in user is not authorized to delete this account.')
  }

  const postsRemoved = await Post.deleteMany({ author: user.id })
  const userRemoved = await user.remove()

  if (!postsRemoved || !userRemoved) {
    throw new ApolloError('Sever error. Please try again.')
  }

  return userRemoved
}
