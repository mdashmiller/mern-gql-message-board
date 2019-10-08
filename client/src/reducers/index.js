import { combineReducers } from 'redux'

import errors from './errors'
import session from './session'

export default combineReducers({
  session,
  errors
})

// import { AUTHORIZE, DEAUTHORIZE } from '../constants/action-types'

// import { combineReducers } from 'redux'

// const nullSession = {
//   username: null
// }

// const authReducer = (state = nullSession, { type, user }) => {
//   Object.freeze(state)

//   switch (type) {
//     case AUTHORIZE:
//       return {
//         user
//       }
//     case DEAUTHORIZE:
//       return {
//         nullSession
//       }
//     default:
//       return state
//   }
// }

// export default combineReducers({
//   authReducer
// })
