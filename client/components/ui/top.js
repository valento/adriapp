import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import Sign from '../brand/sign'
import Branch from './branch'
import Live from './live_stream'
import Account from './account'
import PropTypes from 'prop-types'
import { setBranchLocation } from '../../actions/'

class Top extends React.Component {
  constructor(){
    super()
    this.onChange = this.onChange.bind(this)
  }

  onChange(e){
    this.props.setBranchLocation(e.target.value)
  }

  render(){
    return (
      <div className='row dashbar'>
        <Link to='/' className="col-3 col-md-3">
          <Sign color='#cc0000' size='24' fontsize='24px' />
        </Link>
        <div className="col-6 col-md-6">
          <Branch onChange={this.onChange} branch={this.props.branch}/>
        </div>
        <div className="col-3 col-md-3">
          <Account view={0} live={true}
            isAuthenticated={this.props.isAuthenticated}
            credit={this.props.credit}
            role={this.props.role}
          />
        </div>
      </div>
  )}
}

Top.propTypes = {
  branch: PropTypes.number.isRequired,
  setBranchLocation: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  role: PropTypes.number.isRequired,
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.user.token,
    branch: state.settings.branch,
    credit: state.user.credit,
    lan: state.settings.language,
    role: state.user.role,
  }
}

export default connect( mapStateToProps, { setBranchLocation } )(Top)
