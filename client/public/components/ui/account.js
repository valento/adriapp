import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

export default class Account extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='dash credit'>
        <Link to='/account'>
          <Icon
            name='heartbeat'
            color='grey'
            size='large'
          />
          <div className={this.props.live ? 'label center' : 'label alert'}>99</div>
        </Link>
      </div>
    )
  }
}
