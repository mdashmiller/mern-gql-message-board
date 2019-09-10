import { gql } from 'apollo-server-express'

export default gql`
  extend type Mutation {
    createPost(authorId: ID!, title: String, body: String!): Post @auth
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    author: User!
    createdAt: String!
    updatedAt: String!
  }
`
