import React from 'react'
import Button from '@material-ui/core/Button'
import FaRight from 'react-icons/lib/fa/arrow-circle-right'
import axios from 'axios'

export default class RegIni extends React.Component {
  constructor(props){
    super(props)
    this.state = this.initialState = {
      checked: props.checked,
      email:'',
      password:''
    }
    this.handleInputCahnges = this.handleInputCahnges.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  handleInputCahnges(e) {
    const {name,value} = e.target
    this.setState({[name]: value})
  }

  onSubmit(e){
    e.preventDefault()

    if(!this.state.email || !this.state.password) return
    const that = this

    axios.post('/auth/register', {
      email: this.state.email,
      password: this.state.password
    })
    .then(() => {
      this.setState(this.initialState)
      this.props.onChecked()
    })
    .catch(err => {
      console.log(err.message)
    })

  }

  render(){
    return (
      <div className='register-card'>
        <h2>Get on line, Honey... </h2>
        <form onSubmit={this.onSubmit}>
          <div className='row form-group'>
            <div className='col-2'><label>email: </label></div>
            <div className='col-10'>
              <input
                onChange={this.handleInputCahnges}
                type='text'
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
                type='text'
                value={this.state.password}
                name='password'
                className='form-control'
              />
            </div>
          </div>
          <div className='row'><Button type='submit' variant='outlined' style={{color: 'red'}}>Subscribe</Button></div>
        </form>
        <hr/>
        <a className='h2-ladies'>Ladies, with me... <FaRight /></a>
      </div>
    )
  }
}
