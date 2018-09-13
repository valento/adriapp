import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
//import PleaseAuthenticate from '../messages/please.js'

const AuthRoute = ({isAuthenticated, component: Component, ...rest}) => (
  //(isAuthenticated)?
  <Route {...rest} render={ props => <Component {...props} />} />
)

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state){
  return {
    isAuthenticated: !!state.user.token
  }
}

export default connect(mapStateToProps)(AuthRoute)
