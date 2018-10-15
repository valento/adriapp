import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Icon, Label, Segment, Divider } from 'semantic-ui-react'

class PaymentHome extends React.Component {
  render() {
    const lan = {
      es: ['Opciones de Pago', 'Cuenta Paypal', 'Tarjeta Crédito'],
      en: ['Payment Options', 'Paypal Account', 'Credit Card']
    }
    const lng = lan[this.props.lan]
    return (
      <div className='home payment'>
        <div className='cover'>
          <h2>{lng[0]}</h2>
          <Divider inverted />
          <Segment padded vertical>
            <span>{lng[1]}</span>
            <div className='btn'>
              <Link to='/'>
                <Button primary content={lng[1]} icon='paypal' labelPosition='left' />
              </Link>
            </div>
              <Divider inverted horizontal>Or</Divider>
            <span>{lng[2]}</span>
            <div className='btn'>
              <Link to='/'>
                <Button content={lng[2]} icon='dollar' labelPosition='left' />
              </Link>
            </div>
          </Segment>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    lan: state.settings.language
  }
}

export default connect(mapStateToProps,null)(PaymentHome)
