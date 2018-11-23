import React from 'react'
import { Container, Grid } from 'semantic-ui-react'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      lan: {
        en: ['Catalyst Startup'],
        es: ['Catalista Startup']
      }
    }
  }
  render() {
    const { lan } = this.state
    const l = lan[this.props.lan]
    return (
      <div className=''>
        <Grid relaxed>
          <Grid.Row columns={3}>
            <Grid.Column mobile={1} computer={5}>

            </Grid.Column>
            <Grid.Column mobile={13} computer={6}>sdfjhjkhk kih ih sodif oisdfkh kh sdfhj lsdkj fskjh sldkflkh sldk flkh sdi fkjh
              sdfjhjkhk kih ih sodif oisdfkh kh sdfkhj lsdkj fskjh  sldk flkh sdi fkjh
              sdfjhjkhk kih ih sodif oisdfkh kh sdfkhj lsdkj fskjh sldkflkh sldk flkh sdi fkjh
            </Grid.Column>
            <Grid.Column mobile={1} computer={5}></Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
