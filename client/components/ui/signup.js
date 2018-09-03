import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Form, Input, Icon, Button, Message } from 'semantic-ui-react'
import { userSignUpRequest } from '../../actions/signUpActions'
import api from '../../api/user'

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
        es: ['Ponte en la fila, corazón...', 'Ponemos el seguro!', 'Las Damas, conmigo... '],
        en: ['Get on line, honey...', 'Lock that door!', 'Ladies, with me... ']
      },
      lan_ui: {
        es: ['Suscribir', 'o', 'Login'],
        en: ['Sign up', 'or', 'Login']
      },
      loading: false,
      email: false,
      subscribe: true,
      errors: {}
    }
    this.handleInputCahnges = this.handleInputCahnges.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onClick = this.onClick.bind(this)
    this.checkMail = this.checkMail.bind(this)
  }

  onClick(e){
    this.props.onLadies(false)
  }

  handleInputCahnges(e) {
    const {name,value} = e.target
    this.setState({data: {...this.state.data, [name]: value}})
  }

  checkMail(data) {
    console.log('check this: ', this.state.data.email)
    this.setState({subscribe: false})
///*
    api.user.checkMail(this.state.data)
      .then(result => console.log('react result: ',result))
      .catch(err => {
        this.setState({ errors: err.response.data.errors })
      })
//*/
  }

  onSubmit(e) {
    e.preventDefault()
    const { data } = this.state
    if(this.state.subscribe) {
      if(!data.email) return
      this.checkMail(data.email)
    }
    if(!this.state.subscribe && !data.email || !data.password) return

    //this.props.userSignUpRequest(this.state.data)
    this.setState({ loading: true })
    this.props
      .submit(this.state.data)
      .catch(err => {
        console.log('error')
        this.setState({ errors: err.response.data.errors })
      })
    if(this.state.errors === {}){
      this.setState(this.initialState)
      this.props.onChecked()
    }
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
    const lan_ui = this.state.lan_ui[this.props.lan]
    const { errors } = this.state
    return (
      <div className='register-card'>
        <h2>{lan[0]}</h2>
        <Form size='mini' inverted onSubmit={this.onSubmit}>

            <Form.Input required inline fluid inverted
              color='black'
              onChange={this.handleInputCahnges}
              label='email'
              value={this.state.data.email}
              name='email'
              type='email'
              placeholder='example@email.com'
            />
{/* ---- Server Error Messaging template ------ */}
              {errors.global && (
                <Message positive size='mini'>
                  <Message.Header>Primera ves? Bienvenido!:</Message.Header>
                  <p>{errors.global}</p>
                </Message>
              )}

            <Form.Input required inline fluid inverted
              color='black'
              disabled={!this.state.email}
              onChange={this.handleInputCahnges}
              label='password'
              value={this.state.password}
              name='password'
              type='password'
              placeholder={lan[1]}
            />
            <Button.Group
              size='tiny'
              color='orange'
              inverted
              floated='right'
            >
              <Button
                type='submit'
                positive={this.state.subscribe}
                disabled={!this.state.subscribe}
              >
                {lan_ui[0]}
              </Button>
              <Button.Or text={lan_ui[1]} />
              <Button
                type='submit'
                positive={!this.state.subscribe}
                disabled={this.state.subscribe}
              >
                {lan_ui[2]}
              </Button>
            </Button.Group>
            <div className='clearfix'></div>
{/*
          <Button disabled={!this.state.subscribe} size='mini' floated='left' type='submit'>
            {lan_ui[0]}
          </Button>
          <span>{lan_ui[1]}</span>
          <Button disabled={this.state.subscribe} size='mini' floated='right' type='submit'>
            {lan_ui[2]}
          </Button>
*/}
        </Form>

        {(this.props.gender)? (
          <div>
            <hr/>
            <Link to='/ladies' onClick={this.onClick} className='h2-ladies'>
              {lan[2]} <Icon name='arrow alternate circle right'/>
            </Link>
          </div>) : null}
      </div>
    )
  }
}

Signup.propTypes = {
  //userSignUpRequest: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  onLadies: PropTypes.func.isRequired
}

export default Signup
//export default connect(null, { userSignUpRequest })(Signup)

/*

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

*/
