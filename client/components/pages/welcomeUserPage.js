import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Icon, Button, Grid } from 'semantic-ui-react'
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
        <Grid container columns='equal'>
          <Grid.Row className='grid-top'>
            <Grid.Column>
              <h2>{lan[0] + this.props.username}</h2>
              <p>{lan[1]}</p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className='text-center grid-top'>
            <Grid.Column>
              <Credits view={1} credit={this.props.credit} lan={this.props.lan}/>
            </Grid.Column>
            <Grid.Column>
              <HeartBeats view={1} credit={this.props.credit} role={this.props.role} lan={this.props.lan}/>
            </Grid.Column>
            <hr/>
          </Grid.Row>
          <Grid.Row className='grid-top'>
            <Link to='/account'>
              <Button size='tiny' icon labelPosition='right' inverted >
                {lan[2]}
                <Icon name='arrow alternate circle right' />
              </Button>

            </Link>
          </Grid.Row>
        </Grid>
    )
  }
}

export default WelcomeUserPage
