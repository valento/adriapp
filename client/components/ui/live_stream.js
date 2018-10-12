import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import FaVideo from 'react-icons/lib/fa/video'

class Live extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      live: props.live
    }
  }

  render() {
    return (
      <div className='dash video'>
        <Link to='/video'>
          <Icon
            name={(this.state.live)? 'dot circle' : 'dot circle outline'}
            color={(this.state.live)? 'red' : 'grey'}
            size='large'
          />
          <div className={this.props.live ? 'video-label' : 'hidden'}>LIVE</div>
        </Link>
      </div>
    )
  }
}
// NO SPACE in TOP: Add this with some transition when active
//<span className={(this.state.live)? 'video on' : 'video off'}>LIVE</span>

export default Live
