import axios from 'axios'

// Action Creators: return Actions = {type, pauload}

export function userSignUpRequest(user) {
  return dispatch => {
    return axios.post('/auth/register', { user })
  }
}
