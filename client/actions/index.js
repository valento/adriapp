import {
  BRANCH_CHANGED,
  LANGUAGE_CHANGED,
  GENDER_CHECKED,
  USER_ROLE,
  USER_REDUCE_ROLE,
  USER_CREDIT,
  USER_REDUCE_CREDIT,
  USER_SET
} from '../types'
import api from '../api/user'// API Calls

// Action Creators: return Actions = {type, payload}

export const setBranchLocation = branch => ({
  type: BRANCH_CHANGED,
  branch
})

export const setInitUser = user => ({
  type: USER_SET,
  user
})

export const setUserRole = user => ({
  type: USER_ROLE,
  user
})

export const updateCredit = user => ({
  type: USER_REDUCE_ROLE,
  user
})

export const setUserCredit = user => ({
  type: USER_CREDIT,
  user
})

export const setUser = user => dispatch => {
  api.user.getInitialUser(user.user_id).then( data => {
    const { user } = data
    dispatch(setInitUser( user ))
  })
}

// ---- Save Users Data -----------------------------
export const saveUserData = data => dispatch => {
  console.log('Actions:', data)
  api.user.saveUserData(data).then( msg => {
    console.log(msg)
    //switch(data[key])
      //dispatch(setUser())
  })
}

export const setLanguage = language => ({
    type: LANGUAGE_CHANGED,
    language
})

export function userSignUpRequest(payload) {
  return dispatch => {
    //
  }
}

//export default setBranchLocation
