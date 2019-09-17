import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    post(id: ID!): Post @auth
    posts(limit: Int, page: Int): [Post!]! @auth
  }

  extend type Mutation {
    createPost(authorId: ID!, title: String, body: String!): Post @auth
    deletePost(postId: ID!): Boolean @auth
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
