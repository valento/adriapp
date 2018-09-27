import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
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
    //const local = locations[2].location
    return (
      <div className='row branches'>
        <Icon color='grey' size='large' name='world'/>:
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
  {/* make this container component */}
        <Link to={'/branches/' + this.props.branch} className='h2-ladies'>
          <Icon color='grey' name='arrow right'/>
        </Link>
      </div>
    )
  }

}

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
