if(module.hot){
  module.hot.accept()
}

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './components/present/home'

const lng = window.PRELOADED_INIT_STATE
const Routes = (
  <Router>
    <Route render = {(props) => <HomePage lan={lng} {...props}/>}/>
  </Router>
)

render(Routes, document.getElementById('app'))
