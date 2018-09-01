import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
// ------- Actions -----------------------------------------

// ---------------------------------------------------------

class Branch extends React.Component {

  render(){
    const dest = ['Beirut','Budapest','Ibiza','Mykonos','Tel Aviv','Venice']

    return (
      <div className='row branches'>
        <Icon color='grey' size='large' name='world'/>:
        <div>
          <select onChange={this.props.onChange} name='global' value={this.props.branch}>
            {dest.map((d, key) => {
                return (
                  <option
                    key={key}
                    value={d}>
                    {d}
                  </option>
                )
              })
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
  branch: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Branch
