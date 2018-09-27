import React from 'react'
import { connect } from 'react-redux'
import { match } from 'react-router-dom'
import NextEvent from '../ui/next_event'
import Timeline from '../containers/timeline'
import Sign from '../brand/sign'

class BranchPage extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    const { locations } = this.props
    const id = decodeURIComponent(this.props.match.params.city)
    let city
    locations.forEach(loc => {
      if(loc.location_id === Number(id)){
        city = loc.location
      }
    })
    return (
      <div className={'location bkg header ' + city.toLowerCase()}>
        <div className='row tiny header'>
          <div className='col-2 col-md-3 service'>

          </div>
          <div className='col-6 col-md-6 service text-shadow-10'>
            <div className='v-center'>
              <h2>{'[ ' + city + ' ]'}</h2>
              Come with <Sign color='#cc0000' come='true' fontsize='24px' />
            </div>
          </div>
          <div className='col-4 col-md-3 service'>
            <NextEvent date='February 20, 2019' lan='es' />
          </div>
        </div>

        <div>
          <Timeline /><br/>
        </div>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locations
  }
}

export default connect(mapStateToProps)(BranchPage)
