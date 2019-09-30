import { gql } from 'apollo-boost'

export const GET_POSTS = gql`
  query {
    posts {
      id
      title
      createdAt
      author {
        username
      }
    }
  }
`
