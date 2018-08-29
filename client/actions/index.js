import { BRANCH_CHANGED, LANGUAGE_CHANGED } from '../types'

// Action Creators: return Actions = {type, pauload}

export const setBranchLocation = branch => ({
    type: BRANCH_CHANGED,
    branch
})

export const setLanguage = payload => {
  return dispatch => {
    type: LANGUAGE_CHANGED,
    payload
  }
}

export function userSignUpRequest(payload) {
  return dispatch => {
    //
  }
}

export default setBranchLocation
