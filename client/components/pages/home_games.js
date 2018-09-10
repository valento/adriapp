import React from 'react'
import { connect } from 'react-redux'
import { Input, Button, Container } from 'semantic-ui-react'

class GamesPage extends React.Component {
  constructor(props){
    super()
    this.state = {
      lan: {
        es: ['Catalista Game', 'Que es La Catalista?', '... y que no es...'],
        en: ['Catalista Game', 'What is she??', '... and what she\'s not...']
      },
      quiz: {
        es: [
          {q: 'Ella es una Influencer ', a: 0, y: '', n: 'No - ella monta la ola que se viene...'},
          {q: 'Ella te mantiene despierto ', a: 1, y: 'Eh, si, es agotador,.. duh!',
            n: 'Dele un tiempo - no le durara'},
          {q: 'Ella te vuelve loco ', a: 1, y: 'Eso, tambien, duh!', n: 'Sos un budista? Salud!'},
          {q: 'Tu la sigues ', a: 0, y: 'No - ella va donde Usted la quiere... Ya veras - quedate en contacto!',
            n: 'Correcto! Ella sigue sus deseos...'},
          {q: 'Ella rumbea mucho ', a: 1, y: '...hasta mas, pero tambien trabaja duro... en el maquillaje',
            n: 'Oprimiste mal?!'},
            {q: 'Tu la sigues ', a: 0, y: 'No - ella va donde Usted la quiere... Ya veras - quedate en contacto!',
              n: 'Correcto! Ella sigue sus deseos...'},
            {q: 'Ella rumbea mucho ', a: 1, y: '...hasta mas, pero tambien trabaja duro... en el maquillaje',
              n: 'Oprimiste mal?!'}
        ],
        en: [
          {q: 'She is an Influencer ', a: 0, y: 'No, Sir - she rides the next wave...',
            n: 'How did you know!!! Yeah! - she rides the next wave...'},
          {q: 'She keeps you awake ', a: 1, y: 'Uh, yeah, you can say that... it\'s exhausting!',
            n: 'Give her some time - that\'s about to change'},
          {q: 'She drives you crazy ', a: 1, y: 'Eso, tambien, duh!', n: 'Sos un budista? Salud!'},
          {q: 'You follow here ', a: 0, y: 'No - She goes where you ask here to... You\'l see - just stick arround!',
            n: 'Correct! In fact - she follows your wishes...  You\'l see - stick arround!'},
          {q: 'She parties a lot ', a: 1, y: '...even more, you have no idea, but she works hard her nails too',
            n: '?!. Wrong button?'}
        ]
      }
    }
  }

  render(){
    const lan = this.state.lan[this.props.lan]
    const ans = this.props.lan === 'es' ? ['Si','No'] : ['Yes', 'No']
    const options = this.state.quiz[this.props.lan]
    return (
      <div className='home welcome game'>
        <h2>{lan[0]}</h2><br/>
        <h1>{'{ '+lan[1]+' }'}</h1>
        <p>{lan[2]}</p>
        <div className='col-12 quiz'>
          {
            options.map((option,i) => {
              return (
                <div className='black-question'>
                  <span>{option.q}</span>
                  <Button.Group floated='right' color='orange' inverted>
                    <Button>{ans[0]}</Button>
                    <Button>{ans[1]}</Button>
                  </Button.Group>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    credits: state.user.credits,
    lan: state.settings.language
  }
}

function mapDispatchToProps(state) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesPage)
