import { LOCATIONS_SET } from '../types'

export const locations = ( state = [], action) => {
  switch(action.type) {
    case LOCATIONS_SET :
      return action.data
    default: return state
  }
}
