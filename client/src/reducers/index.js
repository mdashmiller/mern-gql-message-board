import { AUTHORIZE, DEAUTHORIZE } from '../constants/action-types'

import { combineReducers } from 'redux'

// const initialState = {
//   isSignedIn: false
// }

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case AUTHORIZE:
//       return {
//         ...state,
//         isSignedIn: true
//       }
//     case DEAUTHORIZE:
//       return {
//         ...state,
//         isSignedIn: false
//       }
//     default:
//       return state
//   }
// }

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
