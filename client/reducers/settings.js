import { BRANCH_CHANGED } from '../types'

export default function updateUI(state={}, action) {
  switch(action.type) {
    case BRANCH_CHANGED :
      return {branch: action.payload}
    default: return state
  }
}
