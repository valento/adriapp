import React from 'react'
import Top from './ui/top'
import Unlock from './unlock'
import NextEvent from './ui/next_event'
import RegIni from './ui/register_init'
import Slide from '@material-ui/core/Slide'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
    this.onSlideUnlock = this.onSlideUnlock.bind(this)
  }

  onSlideUnlock(){
    this.setState({
      checked: !this.state.checked
    })
  }

  render(){
    const { checked } = this.state
    return(
      <div className='clearfix'>
        <div><Top /></div>
        <div className='calendar'><NextEvent date='September 19, 2018' /></div>
        <div className='col-md-6 opening'>
          <Unlock  onClick={this.onSlideUnlock} />
          <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
            <RegIni />
          </Slide>
        </div>
      </div>
    )
  }
}

export default App
