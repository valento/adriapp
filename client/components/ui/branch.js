import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Dropdown, Button, Icon, Label } from 'semantic-ui-react'
import { getLocations } from '../../actions/'
// ------- Actions -----------------------------------------

// ---------------------------------------------------------

class Branch extends React.Component {

  componentDidMount() {
    this.props.getLocations()
  }

  onChange(e) {
    this.props.onChange()
  }

  render() {
    console.log(this.props)
    const { locations } = this.props
    let branch = ''
    locations.forEach(loc => {
      if(loc.active) {
        branch = {
          location: loc.location,
          loc_short: loc.loc_short,
          value: loc.location_id
        }
      }
    })

    //const local = locations[2].location
    return (
      <div className='container branches'>
        <Icon name='world' size='large' />
        <span>{branch.location}</span>
        <Link to={'/branches/' + branch.value} >
          <Icon name='arrow circle right'/>
        </Link>
  {/* make this container component */}

      </div>
    )
  }

}

/*
<div>
  <select onChange={this.props.onChange} name='global' value={this.props.branch}>
    {
      locations.map((loc, key) => {
        return (
          <option key={key} value={loc.location_id}>{loc.location}</option>
        )
      })
    }
    }
  </select>
</div>
*/

/*
<Dropdown
  button inverted selection compact fluid labeled
  size='mini'
  value={this.props.branch}
  className='icon'
  icon='world'
  options={options}
/>
*/

Branch.propTypes = {
  locations: PropTypes.array.isRequired,
  getLocations: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    locations: state.locations
  }
}

export default connect( mapStateToProps, { getLocations } )(Branch)
