import {
  LANGUAGE_TOGGLE,
} from '../types'

export default function settings(state={}, action) {
  switch (action.type) {
    case LANGUAGE_TOGGLE :
      return {...state, lan: action.lan}
    default: return state
  }
}
