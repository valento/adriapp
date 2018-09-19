if(module.hot){
  module.hot.accept()
}

import React from 'react'
import rootReducer from './rootReducer.js'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { userLoggedIn } from './actions/auth'
import { setUser } from './actions/'
import decode from 'jwt-decode'
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { hydrate, render } from 'react-dom'
import api from './api/user'

import App from './components/app'

const lng = window.PRELOADED_INIT_STATE

const initState = (!window.STATE_FROM_SEVER)?
  {
    user: {
      credit: 0,
      role: 1000
    },
    settings: {
      language: lng,
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
    user_id: payload.user_id,
    credit: initState.user.credit,
    role: initState.user.role,
  }
  store.dispatch(userLoggedIn(user))
  store.dispatch(setUser(user))

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
