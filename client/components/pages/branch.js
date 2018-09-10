import React from 'react'
import { match } from 'react-router-dom'
import NextEvent from '../ui/next_event'
//import { Grid, Icon, Header } from 'semantic-ui-react'
//import { Link } from 'react-router-dom'
import Timeline from '../containers/timeline'
import Sign from '../brand/sign'

class BranchPage extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    const cty = decodeURIComponent(this.props.match.params.city)
    const city = cty.split(' ').join('').toLowerCase()
    return (
      <div className={'location bkg header ' + city.toLowerCase()}>
        <div className='row tiny header'>
          <div className='col-2 col-md-3 service'>

          </div>
          <div className='col-6 col-md-6 service text-shadow-10'>
            <div className='v-center'>
              <h2>{'[ ' + cty + ' ]'}</h2>
              Come with <Sign color='#cc0000' come='true' fontsize='24px' />
            </div>
          </div>
          <div className='col-4 col-md-3 service'>
            <NextEvent date='February 20, 2019' lan='es' />
          </div>
        </div>

        <div>
          <Timeline /><br/>
            <Timeline /><br/>
              <Timeline /><br/>
                <Timeline /><br/>
                  <Timeline /><br/>
                    <Timeline /><br/>
                      <Timeline /><br/>
                        <Timeline /><br/>
                          <Timeline /><br/>
                            <Timeline /><br/>
                              <Timeline /><br/>
                                <Timeline /><br/>
                                  <Timeline /><br/>
                                    <Timeline /><br/>
                                      <Timeline /><br/>
                                        <Timeline /><br/>
                                          <Timeline /><br/>
                                            <Timeline /><br/>
                                              <Timeline /><br/>
                                                <Timeline /><br/>
                                                  <Timeline /><br/>
                                                    <Timeline /><br/>
                                                      <Timeline /><br/>
                                                        <Timeline /><br/>
                                                          <Timeline /><br/>
                                                            <Timeline /><br/>
                                                              <Timeline /><br/>
                                                                <Timeline /><br/>
                                                                  <Timeline /><br/>
                                                                    <Timeline /><br/>
        </div>
      </div>

    )
  }
}

export default BranchPage


/*
<div className={'pages branch ' + city.toLowerCase()}>
  <div className='row header'>
    <Grid verticalAlign='middle' equal centered>
      <Grid.Row>
        <Grid.Column>
          <div className='service'>
            <span className='v-center white-box'>1</span>
          </div>
        </Grid.Column>
        <Grid.Column width={11}>
          <div className='service text-shadow-10'>
            <div className='v-center'><h2>{'[ ' + cty + ' ]'}</h2></div>
          </div>
        </Grid.Column>
        <Grid.Column>
          <div className='service'>
            <NextEvent date='February 20, 2019' lan='es' />
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
</div>
*/
