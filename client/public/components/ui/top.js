import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import Sign from '../brand/sign'
import Branch from './branch'
import Live from './live_stream'
import Account from './account'
import PropTypes from 'prop-types'

class Top extends React.Component {
  render(){
    return (
      <div className='row dashbar'>
        <Link to='/' className="col-3 col-md-3"><Sign color='#cc0000' size='24' fontsize='24px' /></Link>
        <div className="col-6 col-md-6"><Branch branch={this.props.branch}/></div>
        <div className="col-3 col-md-3">
          <Account live={true} />
          {/*<Live live={false} />*/}
        </div>
      </div>
  )}
}

Top.propTypes = {
  branch: PropTypes.string.isRequired
}

const mapStateToProps = ( state ) => {
// inject Store.State Global Object to Component:
  return { branch: state.settings.branch }
}

export default connect( mapStateToProps, null )(Top)
