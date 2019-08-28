const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const crypto = require('crypto')

const db = {
  users: [
    { id: '1', name: 'marty', email: 'mcfly@gmail.com' },
    { id: '2', name: 'jen', email: 'thegirlfriend@gmail.com' },
    { id: '3', name: 'doc', email: 'dbrown@gmail.com' },
  ],
  posts: [
    { 
      id: crypto.randomBytes(10).toString('hex'),
      title: 'title 1',
      content: 'content for post 1',
      authorId: '1',
      createdAt: Date.now()
    },
    { 
      id: crypto.randomBytes(10).toString('hex'),
      title: 'title 2',
      content: 'content for post 2',
      authorId: '2',
      createdAt: Date.now()
    },
    { 
      id: crypto.randomBytes(10).toString('hex'),
      title: 'title 3',
      content: 'content for post 3',
      authorId: '3',
      createdAt: Date.now()
    },
    { 
      id: crypto.randomBytes(10).toString('hex'),
      title: 'title 4',
      content: 'content for post 4',
      authorId: '1',
      createdAt: Date.now()
    },
  ]
}

const schema = buildSchema(`
  type Query {
    users: [User!]!
    user(id: ID!): User 
    posts: [Post!]!
  }

  type Mutation {
    addUser(name: String!, email: String!): User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    authorId: ID!
    createdAt: String!
  }
`)

const rootValue = {
  users: () => db.users,
  user: ({ id }) => {
    return db.users.find(user => id === user.id)
  },
  posts: () => db.posts,
  addUser: ({ name, email }) => {
    const user = {
      id: crypto.randomBytes(10).toString('hex'),
      name,
      email
    }
    
    db.users.push(user)

    return user
  }
}

const app = express()

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}))

app.listen(5000, () => console.log('Listening on 5000'))
