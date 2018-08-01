if(module.hot){
  module.hot.accept();
}

import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { hydrate, render } from 'react-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faArrowAltCircleDown, faHeart } from '@fortawesome/free-solid-svg-icons'

import App from './public/components/app'
library.add(fab,faArrowAltCircleDown,faHeart)
const routes = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

render(routes, document.getElementById('app'))
