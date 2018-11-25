import React from 'react'
import { Container, Grid } from 'semantic-ui-react'
import Catgame from './catgame'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      lan: {
        en: ['Catalyst Startup','What is a Catalyst?'],
        es: ['Catalista Startup','Que es Catalista?']
      }
    }
  }
  render() {
    const { lan } = this.state
    const l = lan[this.props.lan]
    return (
      <div className=''>
        {(this.props.screen === 'mobile')?
          (
            <Grid>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Catgame lan={this.props.lan}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          ) : (
            <Grid>
              <Grid.Row columns={1}>
                <Grid.Column tablet={5} computer={6}>foo</Grid.Column>
                <Grid.Column tablet={6} computer={4}></Grid.Column>
                <Grid.Column tablet={5} computer={6}>foo</Grid.Column>
              </Grid.Row>
            </Grid>
          )
        }
      </div>
    )
  }
}
