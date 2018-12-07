import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Logo from '../brand/logo.js'
import Home from './presentHome.js'

class HomePage extends React.Component {
  constructor() {
    super()
    this.state = {
      page: 0,
      lng: {
        en: [],
        es: []
      }
    }
  }

  render() {
    return (
      <div className='home'>
        <div className='half-screen v-center'><Logo lan={this.props.lan} screen={this.props.screen} /></div>
        <div className='half-screen content'>
          <Home lan={this.props.lan} screen={this.props.screen} credits={this.props.credits} />
        </div>
      </div>
    )
  }
}

HomePage.propTypes = {
  credits: PropTypes.number.isRequired
}

const mapStateToProps = state => {
  return {
    credits: state.user.credits
  }
}

export default connect(mapStateToProps,null)(HomePage)
