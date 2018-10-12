import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Icon, Button, Accordion } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import HeartBeats from '../ui/heartBeats'
import Credits from '../ui/credits'

class Account extends React.Component {
  constructor(props) {
    super()
    this.state = {
      activeIndex: 0,
      lan: {
        es: ['!Hola, ', 'Aquí está su balance: '
        ],
        en: ['Hi, ', 'Here\'s what you have: '
        ]
      },
      faq: {
        es: [{q:'"Para qué los Creditos?',
              a:'Cada acción en este app le \'costará\' Creditos! Usted los necesita en gran cantidad y debe trbajar duro para conseguir más en cada oportunidad!'
            },
            {q:'"Qué es el Latido',
              a:'El acceso del contenido en mi app es regulado por niveles - Miembro, Fan y VIP. El Latido de su corazón mide el nivel de acceso que Usted tiene. Debes subir la adrenalina para accesar lo más emocionante!'
            },
            {q: 'Donde conseguir más Creditos!?',
              a: 'Hay dos maneras: comprandolos por cuenta de PayPal o jugando cada juego que se le atraviesa... Usted encontrará suficiente de juegos. No tengas miedo - soy generosa!'
            }
        ],
        en: [{q: 'What\'s the Credits for?',
              a: 'You\'ll need Credits all the time! We\'ll give you enough - but you\'ll have to work hard for the rest if you don\'t wanna miss the most exciting stuff!'
            },
            {q:'Why the Heartbeats for?',
              a:'You access every content in this application with Role Based Access Control. There is 3 levels - Member, Fan and VIP. There is also 100Club Membership, but that\'s another story! Guess, you\'ve got the picture already - you only access what you can! You should Level-up your Heartbeats in order to see the most breathtaking stuff'
            },
            {q: 'How to Get more Credits!?',
              a: 'You can easily buy Credits anytime trough your Account Page... OR: you can just play for Credits - you\'ll see plenty of Games to play. Don\'t be worried - I\'m genereous enough!'}
        ]
      }
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e, titleProps) {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const lan = this.state.lan[this.props.lan]
    const ques = this.state.faq[this.props.lan]
    const { activeIndex } = this.state
    return (
      <div className='container account user'>
        <div className='row col-12 col-md-6'>
          <h3>{lan[0] + this.props.user}</h3>
        </div>
        <i className='row col-12 col-md-6'>{lan[1]}</i>
        <hr/>
        <div className='row col-12 col-md-6'>
          <div className='col'>
            <Credits view={2} credit={this.props.credit} lan={this.props.lan} />
          </div>
          <div className='col'>
            <HeartBeats view={2} role={this.props.role} lan={this.props.lan} />
          </div>
        </div>
        <hr/>
        <div className='row col-12 col-md-6 left'>
          {<Accordion fluid styled>
            {ques.map((que, i) => {
              return (
                <div>
                <Accordion.Title active={activeIndex === i+1} index={i+1}
                  onClick={this.handleClick}
                  className='accordion-white-title'>
                  <Icon name='dropdown' />
                    {que.q}
                </Accordion.Title>
                <Accordion.Content active={activeIndex === i+1}>
                  <span>
                    {que.a}
                  </span>
                </Accordion.Content>
                </div>
              )})
            }
          </Accordion>}
        </div>
    </div>
    )
  }
}

Account.propTypes = {
  credit: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  lan: PropTypes.string.isRequired
}

const mapStateToProps = state => {
  return {
    user: state.user.username,
    credit: state.user.credit,
    role: state.user.role,
    lan: state.settings.language
  }
}

export default connect(mapStateToProps)(Account)
