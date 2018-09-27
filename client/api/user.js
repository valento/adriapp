import axios from 'axios'

export default {
  user: {
// handle: Signup Form => Axios returns Promise to React Component
    saveUserData: data =>
      axios.post('/user/data/' + data.data.user_id.toString(), { data } ).then(res => res.data),

// handle: Signup Form => Axios returns Promise to React Component
    signup: credentials =>
      axios.post('/auth/signup', { credentials }).then(res => res.data.user),

// handle: Login Form => Axios returns Promise to React Component
    login: credentials =>
      axios.post('/auth/login', { credentials }).then(res => res.data.user),

    authorize: token =>
      axios.post('/auth/authorize', { token }),

    resetPassword: data =>
      axios.post('/auth/reset'),

// handle: Check email (Exists)? Login : Signup
    checkMail: data => {
      const { email } = data
      return axios.get('/auth/test', { params: { email } }).then(res => {
        console.log('axios promise resolve: ',res.data)
        return res.data
      })
    },

// USER DATA: GET, UPDATE, INSERT
    getInitialUser: () => //id
      axios.get('/user/data/').then(res => res.data)



  }
}
