import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { hydrate } from 'react-dom'

const routes = (
  /*<BrowserRouter>*/
    <App />
  /*</BrowserRouter>*/
)

hydrate(routes, document.getElementById('app'))
