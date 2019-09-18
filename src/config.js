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
  GMAIL_PASS
} = process.env

export const IN_PROD = NODE_ENV === 'production'
