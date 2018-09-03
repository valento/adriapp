import { USER_LOGGED_IN, GENDER_CHECKED } from '../types'

export default function user(state={}, action={}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.user
    case GENDER_CHECKED:
      return {...state, gender: action.gender}
    default: return state
  }
}
