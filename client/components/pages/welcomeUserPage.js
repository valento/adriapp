import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Icon, Button } from 'semantic-ui-react'
import HeartBeats from '../ui/heartBeats'
import Credits from '../ui/credits'

class WelcomeUserPage extends React.Component {
  constructor(){
    super()
    this.state = {
      lan: {
        es: ['!Hola, mi ', 'Aqui esta su balance: ', ' Tu Cuenta '],
        en: ['!Hello, my ', 'Here\'s what you\'ve got: ', 'Account']
      }
    }
  }

  render(){
    const lan = this.state.lan[this.props.lan]
    return (
      <div className='container welcome-page user'>
        <div className='row col-10 col-md-6'>
          <h2>{lan[0] + this.props.username}</h2>
          <p>{lan[1]}</p>
        </div>
        <div className='row col-12 col-md-6'>
          <div className='col'>
            <Credits view={1} credit={this.props.credit} lan={this.props.lan}/>
          </div>
          <div className='col'>
            <HeartBeats view={1} credit={this.props.credit} role={this.props.role} lan={this.props.lan}/>
          </div>
          <hr/>
        </div>
        <div className='row'>
          <Link to='/account'>
            <Button size='tiny' icon labelPosition='right' inverted color=''>
              {lan[2]}
              <Icon name='arrow alternate circle right' size=''/>
            </Button>

          </Link>
        </div>
      </div>
    )
  }
}

export default WelcomeUserPage
