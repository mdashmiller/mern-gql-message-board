import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    me: User @auth
    user(id: ID!): User @auth
    users(limit: Int, page: Int): [User!]! @auth
  }

  extend type Mutation {
    signUp(email: String!, username: String!, password: String!): User @guest
    signIn(email: String!, password: String!): User @guest
    signOut: Boolean @auth
    update(email: String, username: String, password: String): User @auth
    remove(email: String!, password: String!): User @auth
  }

  type User {
    id: ID!
    email: String!
    username: String!
    posts(limit: Int, page: Int): [Post!]!
    createdAt: String!
    updatedAt: String!
  }
`
