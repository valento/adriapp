if(module.hot){
  module.hot.accept()
}

import React from 'react'
import { render } from 'react-dom'

class Present extends React.Component {
  render() {
    return (
      <div>Hola, you Bussy Man</div>
    )
  }
}

render(<Present />, document.getElementById('app'))
