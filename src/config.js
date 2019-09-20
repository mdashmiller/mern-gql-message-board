require('dotenv').config()

export const {
  APP_PORT,
  NODE_ENV,

  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,

  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME = 1000 * 60 * 60 * 2,

  GMAIL_USER,
  EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET,
  EMAIL_REFRESH_TOKEN,

  EMAIL_TOKEN_SECRET
} = process.env

export const IN_PROD = NODE_ENV === 'production'
