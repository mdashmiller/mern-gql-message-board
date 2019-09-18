import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import bodyParser from 'body-parser'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import {
  APP_PORT, IN_PROD,
  DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME,
  SESS_NAME, SESS_SECRET, SESS_LIFETIME
} from './config'
import schemaDirectives from './directives'
import { confirm, forgotPassword } from './routes'

(async () => {
  try {
    await mongoose.connect(
      `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      {
        useNewUrlParser: true,
        useFindAndModify: false
      }
    )

    const app = express()

    app.disable('x-powered-by')

    const MongoStore = connectMongo(session)
    const store = new MongoStore({ mongooseConnection: mongoose.connection })

    app.use(session({
      store,
      name: SESS_NAME,
      secret: SESS_SECRET,
      resave: true,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        maxAge: parseInt(SESS_LIFETIME),
        sameSite: true,
        secure: IN_PROD
      }
    }))

    app.use(bodyParser.json())

    // confirm email and forgot password routes
    app.use('/confirm', confirm)
    app.use('/forgotpassword', forgotPassword)

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: IN_PROD ? false : {
        settings: {
          'request.credentials': 'include',
          'schema.polling.enable': false
        }
      },
      context: ({ req, res }) => ({ req, res })
    })

    server.applyMiddleware({ app, cors: false })

    app.listen({ port: APP_PORT }, () =>
      console.log(`server ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
    )
  } catch (e) {
    console.error(e)
  }
})()
