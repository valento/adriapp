import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Icon, Label, Segment, Divider } from 'semantic-ui-react'

class CreditsHome extends React.Component {
  render() {
    const lan = {
      es: ['Jugar por Créditos! Si - asi de simple. Solo juegue y gane... fasilisimo.',
        'Pon Dinero: comprar creditos es doloroso, lo sé... pero da mucho más!! Pagar por Créditos, \
        adrinalina su Latido (hasta poner el color de su corazón en dorado) y sube el estrato de su cuenta. \
        Además, a nostras - las chicas, nos gusta el efectivo. Yo le devolveré el favor, no dudes!',
        'Pon datos: es la manera menos dolorosa: averigüe si su perfil todavía tiene datos por llenar. \
        Solo haz un Click...',
        'Por Más Créditos:', 'Jugar por Créditos', 'Comprar Créditos', 'Datos por Créditos'
      ],
      en: ['Play a Game! Yeah, simple as that - just click arround and earn some easy coins for fun...',
        'Put some Cash: this is painfull, I know, BUT - it gives you so much more! It elevates your \
        HeartBeats, too (till the color of your heart turns golden-yellow) and makes you special, you\'ll \
        notice... and so will I. Plus: we, girls, love cash (among other things) and I\'ll make it up to you!!!',
        'Put some Data: this is so far the painless way - check if your profile still has left \
        some missing data to exchange for credits. Just Click...',
        'To Get Credits:', 'Play for Credits', 'Buy Credits', 'Data for Credits'
      ]
    }
    const lng = lan[this.props.lan]
    return (
      <div className='home credits'>
        <div className='cover'>
          <h2>{lng[3]}</h2>
          <Divider inverted />
          <Segment padded vertical>
            <span>{lng[0]}</span>
            <div className='btn'>
              <Link to='/games'>
                <Button content={lng[4]} icon='play' labelPosition='left' />
              </Link>
            </div>
              <Divider inverted horizontal>Or</Divider>
            <span>{lng[1]}</span>
            <div className='btn'>
              <Link to='/payment'>
                <Button content={lng[5]} icon='dollar' labelPosition='left' />
              </Link>
            </div>
            <Divider inverted horizontal>Or</Divider>
            <span>{lng[2]}</span>
            <div className='btn'>
              <Link to='/profile'>
                <Button content={lng[6]} icon='database' labelPosition='left' />
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

export default connect(mapStateToProps,null)(CreditsHome)
