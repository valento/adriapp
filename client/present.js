if(module.hot){
  module.hot.accept()
}

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './components/present/rootReducer'

import HomePage from './components/present/home'

const initState = JSON.parse(window.PRELOADED_INIT_STATE)

let { ln, agent } = initState
if(agent === null || agent.length == 0) {
  agent = 'pc'
} else {
  agent = agent[0].toLowerCase()
}

const composeInhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const state = {
  user: {
    credits: 6017
  },
  settings: {
    lan: ln,
    agent: agent
  }
}

const store = createStore(rootReducer, state, composeInhancers())

const Routes = (
  <Provider store={store}>
    <Router>
      <Route render = {(props) => <HomePage lan={ln} screen={agent} {...props}/>}/>
    </Router>
  </Provider>
)

render(Routes, document.getElementById('app'))
