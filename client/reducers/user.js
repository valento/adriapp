import {
  USER_LOGGED_IN,
  USER_GENDER,
  USER_ROLE,
  USER_ROLE_UPGRADED,
  USER_CREDIT,
  USER_CREDIT_CHANGED,
  USER_SET,
  USER_UPDATED
} from '../types'

export default function user(state={}, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.user
    case USER_GENDER:
      return {...state, gender: action.user.gender}
    case USER_ROLE:
      return {...state, role: action.user.role }
    case USER_ROLE_UPGRADED:
      return {...state, role: action.user.role }
    case USER_CREDIT:
      return {...state, credit: action.user.credit }
    case USER_CREDIT_CHANGED:
      return {...state, credit: action.user.credit }
    case USER_SET:
      return {...state, ...action.user}
    case USER_UPDATED:
      return {...state, ...action.user}
    default: return state
  }
}
