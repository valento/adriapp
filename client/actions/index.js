const CHANGE_BRANCH_LOCATION = 'CHANGE_BRANCH_LOCATION'
const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'
const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'

// Action Creators: return Actions = {type, pauload}
export function setBranchLocation(payload) {
  return {
    type: CHANGE_BRANCH_LOCATION,
    payload
  }
}

export function setLanguage(payload) {
  return {
    type: CHANGE_LANGUAGE,
    payload
  }
}

export function userSignUpRequest(payload) {
  return dispatch => {

  }
}

export default setBranchLocation
