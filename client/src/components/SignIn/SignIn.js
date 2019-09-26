import React, { useState } from 'react'

import { useMutation } from '@apollo/react-hooks'

import { SIGN_IN, SIGN_OUT } from '../../queries'

function SignIn () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [signIn, { data }] = useMutation(SIGN_IN)
  const [signOut] = useMutation(SIGN_OUT)

  const handleLogIn = async e => {
    e.preventDefault()

    setError('')
    setIsLoading(true)

    try {
      await signIn({ variables: { email, password } })

      setIsLoggedIn(true)
    } catch (e) {
      setError('Incorrect email or password')
      setIsLoading(false)
      setEmail('')
      setPassword('')
    }
  }

  const handleLogOut = async e => {
    e.preventDefault()

    try {
      await signOut()

      setIsLoggedIn(false)
      setEmail('')
      setPassword('')
    } catch (e) {
      setError('There was a logout error. Please try again.')
    }
  }

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1>Welcome {data.signIn.username}!</h1>
          <button onClick={handleLogOut}>Logout</button>
        </>
      ) : (
        <form onSubmit={handleLogIn}>
          {error && <p>{error}</p>}
          <p>Please Login!</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Passowrd"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      )}
    </div>
  )
}

export default SignIn
