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
        es: ['Ponte en la fila, corazón...', 'Ponemos el seguro!',
        'Las Damas, conmigo... ', 'Primera ves? Bienvenido!... ', 'Me alegra que volviste!... '],
        en: ['Get on line, honey...', 'Lock that door!',
        'Ladies, with me... ', 'Your first time? Welcome!... ', 'Pleasure to see you back!... ']
      },
      lan_ui: {
        es: ['Suscribir', 'o', 'Login'],
        en: ['Sign up', 'or', 'Login']
      },
      loading: false,
      //subscribe: true,
      pass: false,
      new_user: true,
      errors: {},
      messages: {}
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
    this.setState({
      data: {...this.state.data, [name]: value},
      messages: {},
      errors: {}
    })
  }

  checkMail() {
    console.log('check this: ', this.state.data.email)
    api.user.checkMail(this.state.data)
      .then(result => {
        console.log('react result: ',result.message)
        this.setState({
          messages: result.message,
          pass: true,
          new_user: false,
          loading: false
        })
      })
      .catch(err => {
        this.setState({
          errors: err.response.data.errors,
          pass: true,
          loading: false
        })
      })
  }

  onSubmit(e) {
    e.preventDefault()
    this.setState({ loading: true })
    const { data , new_user } = this.state
    if(!this.state.pass) {
      if(!data.email) return
      this.checkMail()
    }
    if(!data.email || !data.password) return

    //this.props.userSignUpRequest(this.state.data)
    this.props
      .submit(new_user, data)
      .then(result => {
        this.setState(this.initialState)
        this.props.onChecked()
      })
      .catch(err => {
        this.setState({ errors: err.response.data.errors, loading: false })
      })
  }

  render(){
    const lan = this.state.lan[this.props.lan]
    const lan_ui = this.state.lan_ui[this.props.lan]
    const { errors, messages, pass, new_user, loading } = this.state
    return (
      <div className='register-card'>
        <h2>{lan[0]}</h2>
        <Form size='mini' inverted onSubmit={this.onSubmit} loading={loading}>

            <Form.Input required inline fluid inverted
              color='black'
              onChange={this.handleInputCahnges}
              label='email'
              value={this.state.data.email}
              name='email'
              type='email'
              placeholder='example@email.com'
              disabled={pass}
            />
{/* ---- Server Error Messaging template ------ */}
              {(errors.global || messages.global && pass)? (
                <Message positive size='mini'>
                  <Message.Header>{(messages.global)? lan[4] : lan[3]}</Message.Header>
                  <p>{(messages.global)? messages.global : errors.global}</p>
                </Message>
              ) : null}

            <Form.Input required inline fluid inverted
              iconPosition='left'
              icon={<Icon name='key' inverted />}
              color='black'
              disabled={!this.state.pass}
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
              className='buttons'
            >
              <Button
                type='submit'
                positive={new_user}
                disabled={!new_user}
              >
                {!this.state.pass ? 'Check-in' : lan_ui[0]}
              </Button>
              <Button.Or text={lan_ui[1]} />
              <Button
                type='submit'
                positive={!new_user}
                disabled={new_user}
              >
                {lan_ui[2]}
              </Button>
            </Button.Group>
            <div className='clearfix'></div>
        </Form>

        {(!this.props.gender)? (
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
