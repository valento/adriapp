import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
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
      <div className='dashbar'>
        <Grid>
          <Grid.Row>
            <Grid.Column className='text-center' width={4}>
              <Link to='/'>
                <Sign color='#cc0000' size='24' fontsize='24px' />
              </Link>
            </Grid.Column>
            <Grid.Column className='text-center' width={8}>
              <Branch onChange={this.onChange} branch={this.props.branch}/>
            </Grid.Column>
            <Grid.Column width={4}>
              <Account view={0} live={true}
                isAuthenticated={this.props.isAuthenticated}
                credit={this.props.credit}
                role={this.props.role}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
