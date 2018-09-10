import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Unlock from '../ui/unlock'
import NextEvent from '../ui/next_event'
import Signup from '../ui/signup'
import LaCatalista from '../brand/lacatalista'
import LoginPage from '../pages/login'
import WelcomeUserPage from '../pages/welcomeUserPage'
import Slide from '@material-ui/core/Slide'
import { Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class Home extends React.Component {

  constructor(props){
    super(props)
    //{ isAuthenticated, logaout } = props
    this.state = {
      register_open: false
    }
    this.onSlideUnlock = this.onSlideUnlock.bind(this)
  }

  onSlideUnlock(e){
    this.setState({
      register_open: !this.state.register_open
    })
  }

  render() {
    return(
      <div>
        <div className='row col-md-10'>
          <div className='col cata'>
            <LaCatalista lan={this.props.lan} />
          </div>
          <div className='col calendar'>
            <NextEvent date='September 19, 2018' lan={this.props.lan} />
          </div>
        </div>
          <div className='col-md-6 opening'>
            {!this.props.isAuthenicated ?
              (<Unlock onClick={this.onSlideUnlock} />) :
              (<WelcomeUserPage
                lan={this.props.lan}
                username={this.props.username}
                credit={this.props.credit}
                role={this.props.role}
              />)
            }
            <Slide direction="up" in={this.state.register_open} mountOnEnter unmountOnExit>
              <LoginPage history={this.props.history} onChecked={this.onSlideUnlock}/>
            </Slide>
          </div>
      </div>
  )}
}

Home.propTypes = {
  isAuthenicated: PropTypes.bool.isRequired,
  lan: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  lan: state.settings.language,
  role: state.user.role,
  credit: state.user.credit,
  isAuthenicated: !!state.user.token,
  username: !!state.user.token ? state.user.username : 'Anon'
})

export default connect(mapStateToProps, null)(Home)
