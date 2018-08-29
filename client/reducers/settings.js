import { BRANCH_CHANGED, LANGUAGE_CHANGED } from '../types'

export const settings = (state = {}, action) => {
  console.log(state.settings)
  switch(action.type) {
    case BRANCH_CHANGED :
      return {...state, branch: action.branch}
    default: return state
  }
}
