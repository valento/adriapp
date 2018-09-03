import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Unlock from '../ui/unlock'
import NextEvent from '../ui/next_event'
import Signup from '../ui/signup'
import LaCatalista from '../brand/lacatalista'
import LoginPage from '../pages/login'
import Slide from '@material-ui/core/Slide'
import { Grid } from 'semantic-ui-react'

class Home extends React.Component {

  constructor(props){
    super(props)
    //{ isAuthenticated, logaout } = props
    this.state = {
      checked: false
    }
    this.onSlideUnlock = this.onSlideUnlock.bind(this)
  }

  onSlideUnlock(e){
    this.setState({
      checked: !this.state.checked
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
          <Unlock onClick={this.onSlideUnlock} />
          <Slide direction="up" in={this.state.checked} mountOnEnter unmountOnExit>
            {/*<Signup lan='es'/>*/}
            <LoginPage history={this.props.history} onChecked={this.onSlideUnlock}/>
          </Slide>
        </div>
      </div>
  )}
}

const mapStateToProps = state => ({
  lan: state.settings.language
})

export default connect(mapStateToProps, null)(Home)
