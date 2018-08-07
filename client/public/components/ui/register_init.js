import React from 'react'
import Button from '@material-ui/core/Button'
import FaRight from 'react-icons/lib/fa/arrow-circle-right'

export default class RegIni extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      mail:'',
      pass:'',
    }
    this.handleInputCahnges = this.handleInputCahnges.bind(this)
  }

  handleInputCahnges(e) {
    this.setState({[e.target.name]: e.target.value })
  }

  render(){
    return (
      <div className='register-card'>
        <h2>Get on line, Honey... </h2>
        <form action={this.onSubmit}>
          <div className='row form-group'>
            <div className='col-2'><label>email: </label></div>
            <div className='col-10'>
              <input
                onChange={this.handleInputCahnges}
                type='text' value={this.state.mail}
                name='mail'
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
