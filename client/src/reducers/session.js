import { RECEIVE_CURRENT_USER, SIGNOUT_CURRENT_USER } from '../constants/action-types'

const _nullSession = {
  userId: null,
  username: null
}

export default (state = _nullSession, { type, user }) => {
  Object.freeze(state)

  switch (type) {
    case RECEIVE_CURRENT_USER:
      return user
    case SIGNOUT_CURRENT_USER:
      return _nullSession
    default:
      return state
  }
}
