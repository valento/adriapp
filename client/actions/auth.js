import { USER_LOGGED_IN } from '../types'
import api from '../api/user'// API Calls


// Action Creators = return Actions = {type, payload}

export const userSignUpRequest = user => {
  return dispatch => {
    // use the api better:
    return axios.post('/auth/register', {user})
  }
}

// Action Creator:
export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
})

// ---- SIGNUP: New Users -----------------------------
export const signup = credentials => dispatch =>
  api.user.signup(credentials)
    .then(user => dispatch(userLoggedIn(user)))

// ---- LOGIN: Old Users ------------------------------
export const login = credentials => dispatch =>
  api.user.login(credentials)
    .then(user => {
      localStorage.catalistaJWT = user.token
      dispatch(userLoggedIn(user))
    })
