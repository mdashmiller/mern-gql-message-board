import React, { useState } from 'react'

import { gql } from 'apollo-boost'

import { useMutation } from '@apollo/react-hooks'

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      username
    }
  }
`

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signIn, { user }] = useMutation(SIGN_IN)

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          signIn({ variables: { email, password } })
        }}
      >
        <input
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
      {
        user &&
          <p>{user.signIn.username}</p>
      }
    </div>
  )
}

export default SignIn
