import React from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'
import { userSignUpRequest } from '../../actions/signUpActions'
//import axios from 'axios'

class Signup extends React.Component {
  constructor(props){
    super(props)
    this.state = this.initialState = {
      checked: props.checked,
      data: {
        email: '',
        password: '',
      },
      lan: {
        es: ['Ponte en la fila, corazón...', 'Las Damas, conmigo... '],
        en: ['Get on line, honey...', 'Ladies, with me... ']
      }
    }
    this.handleInputCahnges = this.handleInputCahnges.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  handleInputCahnges(e) {
    const {name,value} = e.target
    this.setState({data: {...this.state.data, [name]: value}})
  }

  onSubmit(e) {
    e.preventDefault()
    const { data } = this.state
    if(!data.email || !data.password) return

    this.props.userSignUpRequest(this.state.data)
    this.setState(this.initialState)
    this.props.onChecked()
/* ----- Try REDUX Thunk Async Action:

    axios.post('/auth/register', {
      email: data.email,
      password: data.password
    })
    .then(() => {
      this.setState(this.initialState)
      this.props.onChecked()
    })
    .catch(err => {
      console.log(err.message)
    })
*/
  }

  render(){
    const lan = this.state.lan[this.props.lan]
    return (
      <div className='register-card'>
        <h2>{lan[0]}</h2>
        <form onSubmit={this.onSubmit}>
          <div className='row form-group'>
            <div className='col-2'><label>email: </label></div>
            <div className='col-10'>
              <input
                onChange={this.handleInputCahnges}
                id='email'
                type='email'
                value={this.state.email}
                name='email'
                className='form-control'
              />
            </div>
          </div>
          <div className='row form-group'>
            <div className='col-2'><label>pass: </label></div>
            <div className='col-10'>
              <input
                onChange={this.handleInputCahnges}
                id='password'
                type='password'
                value={this.state.password}
                name='password'
                className='form-control'
              />
            </div>
          </div>
          <div className='row'><Button type='submit' variant='outlined' style={{color: 'red'}}>Subscribe</Button></div>
        </form>
        <hr/>
        <Link to='/ladies' className='h2-ladies'>
          {lan[1]} <Icon name='arrow alternate circle right'/>
        </Link>
      </div>
    )
  }
}

Signup.propTypes = {
  userSignUpRequest: PropTypes.func.isRequired,
  onChecked: PropTypes.func.isRequired
}

export default connect(null, { userSignUpRequest })(Signup)
