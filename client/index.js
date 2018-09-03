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

import App from './components/app'

const initState = (!window.STATE_FROM_SEVER)?
  {
    user: {
      username: '',
      gender: true,
      credit: 0
    },
    settings: {
      language: 'es',
      branch: 'Beirut',
      credits: 89,
      male: true
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


// -------- ROUTES --------------------------
const routes = (
  <Provider store={store}>
    <Router>
      <Route component={App} />
    </Router>
  </Provider>
)

render(routes, document.getElementById('app'))
