import React from 'react'
import { connect } from 'react-redux'
import { match } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button, Label, Icon } from 'semantic-ui-react'
import NextEvent from '../ui/next_event'
import Sign from '../brand/sign'
import LocationHome from './location_home'

class BranchPage extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    const ui = {
      es: ['Ven conmigo'],
      en: ['Come with me']
    }
    const lng = ui[this.props.lan]
    const { locations } = this.props
    const id = decodeURIComponent(this.props.match.params.city)
    let city, cty, active, votes
    locations.forEach(loc => {
      if(loc.location_id === Number(id)){
        city = loc.location
        votes = loc.votes
        active = (!!loc.active)? true : false
        if(city.split(' ').length > 1) {
          cty = city.replace(' ', '')
        } else {
          cty = city
        }
      }
    })
    return (
      <div className={'location bkg header ' + cty.toLowerCase()}>
        <div className='row tiny header'>
          <div className='col-2 col-md-3 branch-header'>

          </div>
          <div className='col-6 col-md-6 branch-header'>
            <div className='text-shadow-10 city'>
              <h2>{'[ ' + city + ' ]'}</h2>
            </div>
            { (active)?
              (<span>{lng[0]}<Sign come={true} fontsize='24px' /></span>) :
              (<Label basic pointing>
                <Icon name='thumbs up' />
                <Label.Detail inverted>{votes} Votes</Label.Detail>
                </Label>
              )
            }
          </div>
          <div className='col-4 col-md-3 branch-header'>
            <NextEvent date='February 20, 2019' lan={this.props.lan} />
          </div>
        </div>
        <div>
          <LocationHome
            city={city}
            active={active}
            votes={votes}
            isAuthenicated={this.props.isAuthenicated}
            lan={this.props.lan}
          />
        </div>
      </div>

    )
  }
}

BranchPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenicated: PropTypes.bool.isRequired,
  lan: PropTypes.string.isRequired
}

const mapStateToProps = state => {
  return {
    isAuthenicated: !!state.user.token,
    locations: state.locations,
    lan: state.settings.language
  }
}

export default connect(mapStateToProps)(BranchPage)
