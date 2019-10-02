import React, { useReducer } from 'react'

import { useMutation } from '@apollo/react-hooks'
import { SIGN_IN } from '../../queries'

import { connect } from 'react-redux'
import { authorize } from '../../actions'

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
        email: '',
        password: ''
      }
    }
    case 'error': {
      return {
        ...state,
        error: action.payload,
        isLoading: false
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
}

const mapDispatchToProps = (dispatch) => {
  return {
    authorize: authInfo => dispatch(authorize(authInfo))
  }
}

function SignIn({ history, authorize }) {
  const [state, dispatch] = useReducer(loginReducer, initialState)
  const { email, password, isLoading, error } = state
  const [signIn] = useMutation(SIGN_IN)

  const handleLogIn = async e => {
    e.preventDefault()

    dispatch({ type: 'login' })

    try {
      const user = await signIn({ variables: { email, password } })

      dispatch({ type: 'success' })

      authorize(user)

      history.push('/posts')
    } catch (err) {
      dispatch({ type: 'error', payload: 'Incorrect email or password' })
    }
  }

  return (
    <section>
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
    </section>
  )
}

export default connect(null, mapDispatchToProps)(SignIn)
