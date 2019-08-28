const { graphql, buildSchema } = require('graphql')

const db = {
  users: [
    { id: '1', name: 'marty', email: 'mcfly@gmail.com' },
    { id: '2', name: 'jen', email: 'thegirlfriend@gmail.com' },
    { id: '3', name: 'doc', email: 'dbrown@gmail.com' },
  ]
}

const schema = buildSchema(`
  type Query {
    users: [User!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`)

const rootValue = {
  users: () => db.users
}

graphql(
  schema,
  `
    {
      users {
        email
      }
    }
  `,
  rootValue
).then(res => 
  console.dir(res, { depth: null })
).catch(
  console.error
)
