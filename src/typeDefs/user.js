import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    user(id: ID!): User
    users: [User!]!
  }

  extend type Mutation {
    signUp(email: String!, username: String!, password: String!): User
  }

  type User {
    id: ID!
    email: String!
    username: String!
    createdAt: String!
  }
`
