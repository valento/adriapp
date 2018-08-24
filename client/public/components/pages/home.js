import React from 'react'
import { Grid } from 'semantic-ui-react'
import Unlock from '../ui/unlock'
import NextEvent from '../ui/next_event'
import Signup from '../ui/signup'
import Slide from '@material-ui/core/Slide'

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
        <Grid centered className='calendar'><NextEvent date='September 19, 2018' lan='es' /></Grid>
        <div className='col-md-6 opening'>
          <Unlock  onClick={this.onSlideUnlock} />
          <Slide direction="up" in={this.state.checked} mountOnEnter unmountOnExit>
            <Signup onChecked={this.onSlideUnlock} lan='es'/>
          </Slide>
        </div>
      </div>
  )}
}

export default Home
