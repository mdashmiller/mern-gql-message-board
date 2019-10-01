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

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      title
      author {
        username
      }
      createdAt
      body
    }
  }
`

export const CREATE_POST = gql`
  mutation CreatePost($authorId: ID!, $title: String, $body: String!) {
    createPost(authorId: $authorId, title: $title, body: $body) {
      id
    }
  }
`
