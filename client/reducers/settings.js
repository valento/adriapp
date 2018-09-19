import { BRANCH_CHANGED, LANGUAGE_CHANGED } from '../types'

export const settings = (state = {}, action) => {
  switch(action.type) {
    case BRANCH_CHANGED :
      return {...state, branch: action.branch}
    case LANGUAGE_CHANGED :
      return {...state, language: action.lan}
    default: return state
  }
}
