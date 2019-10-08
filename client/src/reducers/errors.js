import {
  RECEIVE_CURRENT_USER,
  RECEIVE_ERRORS,
  CLEAR_ERRORS
} from '../constants/action-types'

export default (state = '', { message, type }) => {
  Object.freeze(state)

  switch (type) {
    case RECEIVE_ERRORS:
      return message
    case RECEIVE_CURRENT_USER:
    case CLEAR_ERRORS:
      return ''
    default:
      return state
  }
}
