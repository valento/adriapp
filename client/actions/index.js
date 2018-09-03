import {
  BRANCH_CHANGED,
  LANGUAGE_CHANGED,
  GENDER_CHECKED
} from '../types'

// Action Creators: return Actions = {type, pauload}

export const setBranchLocation = branch => ({
    type: BRANCH_CHANGED,
    branch
})

export const setGender = gender => ({
  type: GENDER_CHECKED,
  gender
})

export const setLanguage = language => {
  return dispatch => {
    type: LANGUAGE_CHANGED,
    language
  }
}

export function userSignUpRequest(payload) {
  return dispatch => {
    //
  }
}

export default setBranchLocation
