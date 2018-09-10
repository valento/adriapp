import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Icon, Button } from 'semantic-ui-react'
import HeartBeats from '../ui/heartBeats'

class WelcomeUserPage extends React.Component {
  constructor(){
    super()
    this.state = {
      lan: {
        es: ['!Hola, mi ', 'Aqui esta su balance: ', 'Creditos', 'Quiero +'],
        en: ['!Hello, my ', 'Here what you\'ve got: ', 'Credits', 'Go for +']
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
          <div className='col credit-big'>
            {'{' + this.props.credit + '}'}
            <p>{lan[2]}</p>
            <Link to='/games'><Button size='tiny' color='blue' content={lan[3]} /></Link>
          </div>
          <div className='col'>
            <HeartBeats view={1} credit={this.props.credit} role={this.props.role} lan={this.props.lan}/>
          </div>
          <hr/>
        </div>
        <div className='row'><Icon name='arrow alternate circle right'/></div>
      </div>
    )
  }
}

export default WelcomeUserPage
