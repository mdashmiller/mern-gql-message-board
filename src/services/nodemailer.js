import nodemailer from 'nodemailer'

export default nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
})
