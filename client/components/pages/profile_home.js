import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Checkbox, Input, Dropdown, Button, Icon, Label, Divider } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class ProfileHome extends React.Component {
  constructor() {
    super()
    this.state = {
      data:{
        gender: -1,
        score: 0,
        country: ''
      }
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.handleChanges = this.handleChanges.bind(this)
  }
  onSubmit(e) {
    //
  }
  handleChanges(e, {value, name}) {
    this.setState({
      data: {...this.state.data,
        [name]:value,
        score: (this.state.data.gender < 0)? this.state.data.score + 3 : this.state.data.score
      },
    })
  }
  render() {
    const lan = {
      es: ['Perfil de Usuario', 'Guarde: ', 'Genero: ', 'Mujer', 'Hombre', 'ninguno', 'Nombre de Usuario: '],
      en: ['User Profile', 'Save: ', 'Gender: ', 'Female', 'Male', 'none', 'Username: ']
    }
    const lng = lan[this.props.lan]
    const {gender, country, username} = this.props
    const g = (this.state.data.gender < 0)? lng[5] : (this.state.data.gender > 0)? lng[4] : lng[3]
    const gen = (gender < 0)? g : (gender > 0)? lng[4] : lng[3]
    const usernameTag = (this.props.username !== 'Anon')? '+0' : '+3'
    return (
      <div className='home profile'>
        <div className='cover'>
          <h2>{lng[0]}</h2>
          <Divider inverted />
            <Form>
              <Button as='div' labelPosition='right' fluid>
                <Button basic inverted fluid icon labelPosition='left' disabled={!(gender < 0)}>
                  <Icon color='standard' size='large' name='heterosexual' />
                  {lng[2] + gen}
                </Button>
                <Label disabled tag={true}>
                  {(gender < 0 || gender === null)? '+3' : '+0'}
                </Label>
              </Button>

              <Form.Group inline>
                <div className='middle white-radio'>
                  <Form.Radio
                    label={lng[3]}
                    name='gender'
                    value={0}
                    checked={this.state.data.gender === 0}
                    onChange={this.handleChanges}
                  />
                </div>
                <div className='middle white-radio'>
                  <Form.Radio fitted
                    label={lng[4]}
                    name='gender'
                    value={1}
                    checked={this.state.data.gender === 1}
                    onChange={this.handleChanges}
                  />
                </div>
              </Form.Group>

              <Divider inverted />
                <Button fluid as='div' labelPosition='right' name='country'>
                  <Dropdown
                    button fluid labeled selection basic
                    icon='world'
                    text='Select Country'
                    className='icon'
                  />
                  <Label disabled tag={true}>
                    {'+3'}
                  </Label>
                </Button>
              <Divider inverted />
                {/*disabled={this.props.username !== 'Anon'}*/}
                <Input fluid
                  disabled={this.props.username !== 'Anon'}
                  icon={{name: 'user', className: 'white', inverted: true}}
                  iconPosition='left'
                  label={{ tag: true, content: usernameTag}}
                  labelPosition='right'
                  placeholder={(this.props.username !== 'Anon')?
                    'Username: ' + this.props.username :
                    'Username: Anon'
                  }
                />
              <Divider inverted />
              <div className='sbmt'>
                <Button fluid color='blue'
                  content={lng[1] + this.state.data.score}
                />
              </div>
            </Form>
        </div>
      </div>
    )
  }
}

ProfileHome.propTypes = {
  data: PropTypes.shape({
    gender: PropTypes.number.isRequired
  })
}

const mapStateToProps = state => {
  return {
    lan: state.settings.language,
    gender: state.user.gender,
    country: state.user.country,
    username: state.user.username,
  }
}

export default connect(mapStateToProps,null)(ProfileHome)
