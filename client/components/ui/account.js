import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import HeartBeats from './heartBeats'

export default class Account extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='dash credit'>
        <Link to='/account'>
          <HeartBeats credit={this.props.credit} view={this.props.view} role={this.props.role}/>
        </Link>
      </div>
    )
  }
}
