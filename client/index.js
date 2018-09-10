if(module.hot){
  module.hot.accept()
}

import React from 'react'
import rootReducer from './rootReducer.js'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { userLoggedIn } from './actions/auth'
import decode from 'jwt-decode'
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { hydrate, render } from 'react-dom'

import App from './components/app'

const initState = (!window.STATE_FROM_SEVER)?
  {
    user: {
      username: '',
      gender: null,
      credit: 0,
      role: 4000
    },
    settings: {
      language: 'es',
      branch: 'Beirut'
    }
  } : window.STATE_FROM_SEVER


// ----- SET REDUX -----------------------------------
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  initState,
  composeEnhancers(applyMiddleware(thunk))
  // window.STATE_FROM_SEVER,
)

if(localStorage.catalistaJWT){
  console.log(localStorage.catalistaJWT)
  const payload = decode(localStorage.catalistaJWT)
  const user = {
    token: localStorage.catalistaJWT,
    email: payload.email,
    username: payload.username,
    role: payload.role,
    credit: payload.credit,
    gender: payload.gender,
    user_id: payload.user_id,
  }
  store.dispatch(userLoggedIn(user))
}

// -------- ROUTES --------------------------
const routes = (
  <Provider store={store}>
    <Router>
      <Route component={App} />
    </Router>
  </Provider>
)

render(routes, document.getElementById('app'))
