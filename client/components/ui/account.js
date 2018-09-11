import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import HeartBeats from './heartBeats'
import PleaseAuthenticate from '../messages/please.js'

export default class Account extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='dash credit'>
        {this.props.isAuthenticated ?
          (<Link to='/account'>
            <HeartBeats credit={this.props.credit} view={this.props.view} role={this.props.role}/>
          </Link>) :
          <PleaseAuthenticate lan={this.props.lan} />
        }
      </div>
    )
  }
}
