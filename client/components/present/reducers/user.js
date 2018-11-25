import {
  BEATS_ADD
} from '../types'

export default function user(state={}, action){
  switch (action.type) {
    case BEATS_ADD :
      return {...state, beats: action.beats}
    default: return state
  }
}
