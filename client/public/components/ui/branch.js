import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// ------- Actions -----------------------------------------

// ---------------------------------------------------------

class Branch extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      branch: props.branch
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(e){
    e.preventDefault()
    this.setState({
      branch: e.target.value
    })
  }

  render(){
    const dest = ['Beirut','Budapest','Ibiza','Mykonos','Tel Aviv','Venice']

    return (
      <div className='row branches'>
        <Icon color='grey' size='large' name='world'/>:
        <div>
          <select onChange={this.onChange} name='global' value={this.state.branch}>
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
        <Link to={'/branches/' + this.state.branch} className='h2-ladies'>
          <Icon color='grey' name='arrow right'/>
        </Link>
      </div>
    )
  }
}

Branch.propTypes = {
  branch: PropTypes.string.isRequired
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps.branch)
  return {
    onChange: () => {
      console.log('dispatch an action')
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Branch)
