import React from 'react'

import { useMutation } from '@apollo/react-hooks'

import { Link, withRouter } from 'react-router-dom'

import { SIGN_OUT } from '../../queries'

const Nav = ({ history }) => {
  const [signOut] = useMutation(SIGN_OUT)

  async function handleClick () {
    try {
      await signOut()

      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ul>
      <li>
        <Link to="/">Log In</Link>
      </li>
      <li>
        <Link to="/posts">Dashboard</Link>
      </li>
      <li>
        <Link to="/create-post">Create Post</Link>
      </li>
      <li>
        <button onClick={handleClick}>Log Out</button>
      </li>
    </ul>
  )
}

export default withRouter(Nav)
