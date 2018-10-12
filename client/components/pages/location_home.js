import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import Timeline from '../containers/timeline'

class LocationHome extends React.Component {
  render() {
    return(
      <div>
        { (this.props.isAuthenicated && this.props.active)? <Timeline /> :
          <div className='sbmt'>
            <Button content={'Vote for ' + this.props.city} />
            <Button content={'Crowdfund ' + this.props.city} />
          </div>
        }
      </div>
    )
  }
}

export default LocationHome
