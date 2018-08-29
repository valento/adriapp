import React from 'react'
import { Route } from 'react-router-dom'
import Top from './ui/top'
import Home from './pages/home'
import BranchPage from './pages/branch'
import LivePage from './pages/live'
import LadiesPage from './pages/ladies/home_ladies'
import CatalistaPage from './pages/home_catalista'

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    return(
      <div className='clearfix'>
        <Route location={location} path='/' component={Top} />
        <Route location={location} exact path='/' component={Home} />
        <Route location={location} path='/branches/:city' component={BranchPage}/>
        <Route location={location} path='/live' component={LivePage} />
        <Route location={location}
          path='/ladies'
          component={LadiesPage}
        />
        <Route location={location} path='/catalista/home' render={() => {
          return (
            <CatalistaPage lan='es' male={false} />
          )
        }}/>
      </div>
    )
  }
}

export default App
