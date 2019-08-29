export const {
  APP_PORT = 4000,
  NODE_ENV = 'development',

  DB_USERNAME = 'matt',
  DB_PASSWORD = 'test1234',
  DB_HOST = 'ds311968.mlab.com',
  DB_PORT = '11968',
  DB_NAME = 'message-board'
} = process.env

export const IN_PROD = NODE_ENV === 'production'
