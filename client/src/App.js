import React, { useState } from 'react'

import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      username
    }
  }
`

const GET_POSTS = gql`
  query{
    posts{
      title
    }
  }
`

function App () {
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [signIn, { user }] = useMutation(SIGN_IN)
  const { loading, error, data } = useQuery(GET_POSTS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <div>
      {data.posts.map(post => <div>{post.title}</div>)}
    </div>
    // <div>
    //   <form
    //     onSubmit={e => {
    //       e.preventDefault()
    //       signIn({ variables: { email, password } })
    //     }}
    //   >
    //     <input
    //       placeholder='Email'
    //       value={email}
    //       onChange={e => setEmail(e.target.value)}
    //     />
    //     <input
    //       placeholder='Password'
    //       value={password}
    //       onChange={e => setPassword(e.target.value)}
    //     />
    //     <button>Login</button>
    //   </form>
    //   {
    //     user &&
    //       <p>{user.signIn.username}</p>
    //   }
    // </div>
  )
}

export default App
