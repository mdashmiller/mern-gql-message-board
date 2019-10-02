import { AUTHORIZE, DEAUTHORIZE } from '../constants/action-types'

export function authorize (user) { // { data: { username: 'whatever' } }
  return {
    type: AUTHORIZE,
    user
  }
}

export function deauthorize () {
  return {
    type: DEAUTHORIZE
  }
}
