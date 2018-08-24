import axios from 'axios'

export default {
  user: {
    signup: user =>
      axios.post('/auth/register', { user }).then(res => res.data.user),
    login: crdentials =>
      axios.post('/auth/user', { credentials }).then(res => res.data.user),
    authorize: token =>
      axios.post('/auth/authorize', { token }),
    restPassword: data => axios.post('/auth/reset')
  }
}
