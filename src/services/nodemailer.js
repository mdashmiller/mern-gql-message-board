import nodemailer from 'nodemailer'
import {
  GMAIL_USER,
  EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET,
  EMAIL_REFRESH_TOKEN
} from '../config'

export default nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
    type: 'OAuth2',
    user: GMAIL_USER,
    clientId: EMAIL_CLIENT_ID,
    clientSecret: EMAIL_CLIENT_SECRET,
    refreshToken: EMAIL_REFRESH_TOKEN
  }
})
