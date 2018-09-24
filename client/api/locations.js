import axios from 'axios'

export default {
  locations: {
// handle: Signup Form => Axios returns Promise to React Component
    getAll: () =>
      axios.get('/data/locations').then( res => res.data )
  }
}
