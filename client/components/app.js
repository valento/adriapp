import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Top from './ui/top'
import Home from './pages/home'
import BranchPage from './pages/branch'
import LivePage from './pages/live'
import LadiesPage from './pages/ladies/home_ladies'
import CatalistaPage from './pages/home_catalista'
import Account from './pages/account'
import GamesPage from './pages/home_games'
import AuthRoute from './routes/userRoute'
import CreditsHome from './pages/get_credits_home'

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    // {this.props.isAuthenicated && <Top />}
    return(
      <div className='clearfix'>
        <Route location={this.props.location} path='/'
          render={() => (<Top />)}
        />
        <Route location={this.props.location} path='/' exact component={Home} />
        <Route location={this.props.location} path='/branches/:city' exact component={BranchPage}/>
        <Route location={this.props.location} path='/live' exact component={LivePage} />
        <Route location={this.props.location} path='/ladies' exact component={LadiesPage} />
        <Route location={this.props.location} path='/catalista' exact render={() => {
          return (
            <CatalistaPage lan={this.props.lan} male={this.props.gender} />
          )
        }}/>
        <AuthRoute path='/account' exact
          location={this.props.location}
          component={Account}
        />
        <AuthRoute path='/games' exact
          location={this.props.location}
          component={GamesPage}
        />
        <AuthRoute path='/credits' exact
          location={this.props.location}
          component={CreditsHome}
        />
      </div>
    )
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenicated: PropTypes.bool.isRequired,
  lan: PropTypes.string.isRequired
}

const mapStateToProps = state => {
  return {
    isAuthenicated: !!state.user.token,
    lan: state.settings.language
  }
}
export default connect(mapStateToProps)(App)
