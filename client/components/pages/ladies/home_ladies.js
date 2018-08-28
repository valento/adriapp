import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Icon, Header, Form, Checkbox, Button, Message } from 'semantic-ui-react'

class LadiesPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lan: {
        es: ['Esta en la Parte de Mujeres! Si Usted es hombre, deberia buscar otra parte, creeme - le conviene mas...',
        'Damas, sigan conmigo...'],
        en: ['!!! Warning: This is Ladies Room! If you\'re a man, you should go somewhere else, believe me - or else you\'ll regret it',
          'Ladies, with me...']
      },
      data: {
        email: '',
        password: '',
        male: false
      },
      lng: props.lan
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

  render() {
    console.log(this.state.lng);
    return (
      <div className='pages ladies'>
        <div className='promo'>
          <Grid columns='equal'>
            <Grid.Row textAlign='center'>
                <Grid.Column mobile={5} tablet={4} computer={4}>
                  <Header as='h6' icon textAlign='center'>
                    <Icon circular size='tiny' name='users' inverted color='white' />
                    <Header.Content>Friends</Header.Content>
                  </Header>
                </Grid.Column>
                <Grid.Column mobile={6} tablet={8} computer={8}>
                  fooo
                </Grid.Column>
                <Grid.Column mobile={5} tablet={4} computer={4}>2</Grid.Column>
            </Grid.Row>
          </Grid>
        </div>

        <div className='register'>
          <Grid columns={2}>
            <Grid.Row centered >
              <Grid.Column mobile ={14} tablet={5} computer={5}>
                <Form onSubmit={this.onSubmit}>
                  <Form.Field>
                    <label>email:</label>
                    <input
                      value={this.state.email}
                      name='email'
                      type='email'
                      onChange={this.handleInputCahnges}
                      placeholder='example@email.com'
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>password:</label>
                    <input
                      value={this.state.password}
                      name='password'
                      type='password'
                      onChange={this.handleInputCahnges}
                      placeholder='make it secure'
                    />
                  </Form.Field>
                  <Form.Field>
                    <Checkbox label='I am a female' checked={!this.state.data.male} />
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>
              </Grid.Column>
              <Grid.Column tablet={3} comuter={3}>
              <div className='hidden'>By signin in you...</div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>

      </div>
    )
  }

}

export default LadiesPage
