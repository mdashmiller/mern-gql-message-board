import { gql } from 'apollo-boost'

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      username
    }
  }
`

export const SIGN_OUT = gql`
  mutation {
    signOut
  }
`
