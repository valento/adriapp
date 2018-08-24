if(module.hot){
  module.hot.accept()
}

import React from 'react'
import rootReducer from './rootReducer.js'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { hydrate, render } from 'react-dom'

import App from './public/components/app'

/*
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faArrowAltCircleDown, faHeart } from '@fortawesome/free-solid-svg-icons'


library.add(fab,faArrowAltCircleDown,faHeart)
*/
const initState = (!window.STATE_FROM_SEVER)?
  {
    user: {
      username: '',
      gender: 1,
      credit: 0
    },
    settings: {
      language: 'es',
      branch: 'Venice'
    }
  } : window.STATE_FROM_SEVER

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_USER_NAME':
      state.name = action.payload
    break
    case 'CHANGE_USER_MAIL':
      state.mail = action.payload
    break
    case 'CHANGE_USER_PASSWORD' :
      state.password = action.password
    break
  }
  return state
}

const settingsReducer = (state={}, action) => {
  switch (action.type) {
    case 'CHANGE_LOCATION' :
      state.settings.branch = action.payload
    break
  }
  return state
}

// ----- SET REDUX -----------------------------------
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  (state = {}) => state,
  initState,
  composeEnhancers(applyMiddleware(thunk))
  // window.STATE_FROM_SEVER,
)


// -------- ROUTES --------------------------
const routes = (
  <Provider store={store}>
    <Router>
      <Route component={App} />
    </Router>
  </Provider>
)

render(routes, document.getElementById('app'))
