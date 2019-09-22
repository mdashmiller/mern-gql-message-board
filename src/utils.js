import { TEST_INBOX } from './config'

export const createEmail = (type, token) => {
  const url = type === 'confirm' ? (
    `http://localhost:4000/confirm/${token}`
  ) : (
    `http://localhost:4000/forgotpassword/${token}`
  )

  const from = type === 'confirm' ? (
    'JUMP <confirm@jump.com>'
  ) : (
    'JUMP <forgotpassword@jump.com>'
  )

  const subject = type === 'confirm' ? (
    'Confirm Email'
  ) : (
    'Reset Password Link'
  )

  const html = type === 'confirm' ? (
    `
      <h3>Thanks for joining JUMP!</h3>
      <p>Please click <a href=${url}>here</a> to confirm your email.</p>
    `
  ) : (
    `
      <h3>Thanks for using JUMP!</h3>
      <p>Please click <a href=${url}>here</a> to reset your password.</p>
    `
  )

  return {
    to: TEST_INBOX,
    // to: user.email,
    from,
    subject,
    html
  }
}
