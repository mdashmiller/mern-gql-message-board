import { RECEIVE_CURRENT_USER, SIGNOUT_CURRENT_USER } from '../constants/action-types'

import { useMutation } from '@apollo/react-hooks'
import { SIGN_IN, SIGN_OUT } from '../queries'

import { receiveErrors } from './error'

const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
})

const signOutCurrentUser = () => ({
  type: SIGNOUT_CURRENT_USER
})

export const signIn = ({ email, password }) => async dispatch => {
  const [apiSignIn] = useMutation(SIGN_IN)
  const response = await apiSignIn(email, password)

  if (response.data) {
    return dispatch(receiveCurrentUser(response.data.signIn)) // { "username": "whatever" }
  }

  return dispatch(receiveErrors(response.errors[0])) // { "message": "whatever" }
}

export const signOut = () => async dispatch => {
  const [apiSignOut] = useMutation(SIGN_OUT)
  const response = await apiSignOut()

  if (response.data) {
    return dispatch(signOutCurrentUser())
  }
  
  return dispatch(receiveErrors(response.errors[0]))
}
