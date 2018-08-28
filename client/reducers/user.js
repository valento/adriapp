import { USER_LOGGED_IN } from '../types'

export default function user(state={}, action={}) {
  console.log(action)
  switch (action.type) {
    case USER_LOGGED_IN:
      return state
    default: return state
  }
}
