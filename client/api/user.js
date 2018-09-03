import axios from 'axios'

export default {
  user: {
    signup: user =>
      axios.post('/auth/register', { user }).then(res => {
        console.log(res.data.user)
        return res.data.user
      }),
    login: credentials =>
      axios.post('/auth/user', { credentials }).then(res => res.data.user),
    authorize: token =>
      axios.post('/auth/authorize', { token }),
    resetPassword: data =>
      axios.post('/auth/reset'),
    checkMail: data => {
      const { email } = data
      return axios.get('test/data', { params: { email } }).then(res => {
        console.log('axios promise resolve',res.data)
        return res.data
      })
    }
  }
}
