import {
  BRANCH_CHANGED,
  LOCATIONS_SET,
  LANGUAGE_CHANGED,
  GENDER_CHECKED,
  USER_ROLE,
  USER_REDUCE_ROLE,
  USER_CREDIT,
  USER_REDUCE_CREDIT,
  USER_SET,
  USER_UPDATED
} from '../types'
import api from '../api/user'// API Calls
import locationsApi from '../api/locations'

// Action Creators: return Actions = {type, payload}

export const setBranchLocation = branch => ({
  type: BRANCH_CHANGED,
  branch
})

export const setLocations = data => ({
  type: LOCATIONS_SET,
  data
})

export const setInitUser = user => ({
  type: USER_SET,
  user
})
export const updateUser = user => ({
  type: USER_UPDATED,
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

export const getLocations = () => dispatch => {
  locationsApi.locations.getAll().then( data => {
    console.log('Client API: ', data);
    dispatch(setLocations( data ))
  })
}

export const setUser = user => dispatch => {
  api.user.getInitialUser().then( data => {//user.user_id
    const { user } = data
    console.log('Redux Action setUser: ',user)
    dispatch(setInitUser( user ))
  })
}

// ---- Save Users Data -----------------------------
export const saveUserData = data => dispatch => {
  api.user.saveUserData(data).then( changes => {
    const updateData = []
    const newset = data.data
    const {user_id, ...updateSet} = newset
    const user = {...updateSet}
    //for( key in  {...rest} ){
      console.log('Action - saveUserData: ',user)
    //}
    //switch(data[key])
    dispatch(updateUser(user))
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
