import React from 'react'
import Signup from '../ui/signup'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'

class LoginPage extends React.Component {
  constructor() {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(data) {
    this.props.login(data).then(() => this.props.history.push('/'))
  }

  render() {
    return (
      <div>
        <Signup submit={this.onSubmit} onChecked={this.props.onChecked} lan={this.props.lan} />
      </div>
    )
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired,
  lan: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  lan: state.settings.language
})

export default connect(
  mapStateToProps,
  { login })(LoginPage)
