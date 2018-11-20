import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Segment, Grid, TransitionablePortal } from 'semantic-ui-react'
import Unlock from '../ui/unlock'
import NextEvent from '../ui/next_event'
import Signup from '../ui/signup'
import LaCatalista from '../brand/lacatalista'
import LoginPage from '../pages/login'
import WelcomeUserPage from '../pages/welcomeUserPage'
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
      <div className='home'>
      <Grid columns='equal'>
        <Grid.Row>
          <Grid.Column>
            <div className='cata'>
              <LaCatalista lan={this.props.lan} />
            </div>
          </Grid.Column>
          <Grid.Column>
            <div className='calendar'>
              <NextEvent date='September 19, 2018' lan={this.props.lan} />
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            {!this.props.isAuthenicated ?
              (<Unlock onClick={this.onSlideUnlock} />) :
              (<WelcomeUserPage
                lan={this.props.lan}
                username={this.props.username}
                credit={this.props.credit}
                role={this.props.role}
              />)
            }
        </Grid.Row>
        <TransitionablePortal open={this.state.register_open} transition={{animation:'fly up', duration:500}}>
          <Segment basic style={{width: '90vw', left: '2%', position: 'fixed', top: '55%', zIndex: 100 }}>
            <LoginPage
              history={this.props.history}
              onChecked={this.onSlideUnlock}
            />
          </Segment>
        </TransitionablePortal>
      </Grid>
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
