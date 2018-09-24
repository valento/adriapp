import { combineReducers } from 'redux'

import user from './reducers/user'
import { settings } from './reducers/settings'
import { locations } from './reducers/locations'

export default combineReducers({
  user,
  settings,
  locations
})
