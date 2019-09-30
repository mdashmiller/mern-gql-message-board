import React, { useReducer } from 'react'

import { useMutation } from '@apollo/react-hooks'

import { SIGN_IN, SIGN_OUT } from '../../queries'

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload
      }
    }
    case 'login': {
      return {
        ...state,
        error: '',
        isLoading: true
      }
    }
    case 'success': {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        email: '',
        password: ''
      }
    }
    case 'error': {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isLoggedIn: false
      }
    }
    case 'logout': {
      return {
        ...state,
        isLoggedIn: false
      }
    }
    default:
      return state
  }
}

const initialState = {
  email: '',
  password: '',
  isLoading: false,
  error: '',
  isLoggedIn: false
}

function SignIn () {
  const [state, dispatch] = useReducer(loginReducer, initialState)
  const { email, password, isLoading, error, isLoggedIn } = state
  const [signIn, { data }] = useMutation(SIGN_IN)
  const [signOut] = useMutation(SIGN_OUT)

  const handleLogIn = async e => {
    e.preventDefault()

    dispatch({ type: 'login' })

    try {
      await signIn({ variables: { email, password } })

      dispatch({ type: 'success' })
    } catch (err) {
      dispatch({ type: 'error', payload: 'Incorrect email or password' })
    }
  }

  const handleLogOut = async () => {
    try {
      await signOut()

      dispatch({ type: 'logout' })
    } catch (err) {
      dispatch({ type: 'error', payload: 'There was a logout error. Please try again.'})
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
            onChange={e =>
              dispatch({
                type: 'field',
                fieldName: 'email',
                payload: e.currentTarget.value
              })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e =>
              dispatch({
                type: 'field',
                fieldName: 'password',
                payload: e.currentTarget.value
              })
            }
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
