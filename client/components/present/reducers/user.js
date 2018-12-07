import {
  BEATS_ADD
} from '../types'

export default function user(state={}, action){
  switch (action.type) {
    case BEATS_ADD :
      return {...state, credits: action.credits}
    default: return state
  }
}
