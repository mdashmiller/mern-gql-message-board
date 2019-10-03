import { AUTHORIZE, DEAUTHORIZE } from '../constants/action-types'

import { combineReducers } from 'redux'

const nullSession = {
  username: null
}

const authReducer = (state = nullSession, { type, user }) => {
  Object.freeze(state)

  switch (type) {
    case AUTHORIZE:
      return {
        user
      }
    case DEAUTHORIZE:
      return {
        nullSession
      }
    default:
      return state
  }
}

export default combineReducers({
  authReducer
})
