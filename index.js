const { ApolloServer, gql } = require('apollo-server')
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

const typeDefs = gql`
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
`

const resolvers = {
  Query: {
    users: () => db.users,
    user: (parent, { id }) => db.users.find(user => id === user.id),
    posts: () => db.posts
  },
  Mutation: {
    addUser: (parent, { name, email }) => {
      const user = {
        id: crypto.randomBytes(10).toString('hex'),
        name,
        email
      }

      db.users.push(user)

      return user
    }
  },
  User: {
    posts: user => db.posts.filter(post => post.authorId === user.id)
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(url))
