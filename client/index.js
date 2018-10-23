if(module.hot){
  module.hot.accept()
}

import React from 'react'
import rootReducer from './rootReducer.js'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import decode from 'jwt-decode'
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { hydrate, render } from 'react-dom'
import { userLoggedIn } from './actions/auth'
import { setUser } from './actions/'
import setAuthorizationHeader from './utils/setAuthorizationHeader'

import App from './components/app'

const lng = window.PRELOADED_INIT_STATE

const initState = (!window.STATE_FROM_SEVER)?
  {
    user: {
      credit: 0,
      role: 1000,
      username: 'Anon',
      country:'',
      gender: -1
    },
    settings: {
      language: lng,
      branch: 2
    },
    locations: []
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
  const payload = decode(localStorage.catalistaJWT)
  const user = {
    token: localStorage.catalistaJWT,
    email: payload.email,
    user_id: payload.user_id,
    credit: initState.user.credit,
    role: payload.role,
    gender: initState.user.country,
    username: initState.user.username,
    country: initState.user.country,
  }
  setAuthorizationHeader(localStorage.catalistaJWT)
  store.dispatch(userLoggedIn(user))
  store.dispatch(setUser(user))

}

// -------- ROUTES --------------------------
const Routes = (
  <Provider store={store}>
    <Router>
      <Route component={App} />
    </Router>
  </Provider>
)

render(Routes, document.getElementById('app'))
