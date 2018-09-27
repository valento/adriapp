import React from 'react'
import Signup from '../ui/signup'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login, signup } from '../../actions/auth'
import { setGender } from '../../actions/'

class LoginPage extends React.Component {
  constructor() {
    super()
    this.onSubmit = this.onSubmit.bind(this)
    this.onLadies = this.onLadies.bind(this)
  }

  onSubmit(old, data) {
    if(!old) {
      return this.props.login(data).then(() => this.props.history.push('/'))
    } else {
      console.log('Handle this New user Login')
      return this.props.signup(data).then(() => this.props.history.push('/'))
    }

  }

  onLadies(gender) {
    return this.props.setGender(gender)
  }

  render() {
    return (
      <div>
        <Signup
          submit={this.onSubmit}
          onChecked={this.props.onChecked}
          lan={this.props.lan}
          onLadies={this.onLadies}
        />
      </div>
    )
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  lan: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  lan: state.settings.language,
  gender: state.user.gender
})

export default connect(
  mapStateToProps,
  { login, signup, setGender })(LoginPage)
