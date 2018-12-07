import React from 'react'
import { Button } from 'semantic-ui-react'
import Qu from './qu'

export default class Catgame extends React.Component {
  constructor() {
    super()
    this.state = {
      score: 0,
      answ: [],
      tr: false,
      lan: {
        en: {
          q: 'What is a Catalyst?',
          o: [
            ['Your favorite personality', 1, 'Correct, you love everything about that person','Not cool! You might search for another personality instead...'],
            ['The next Influencer', 0, 'How did you know?! Correct, Influencers were the past... Catalysts come from the future', 'Not at all! Catalyst plays for you, not the brands'],
            ['The missing element', 1, 'Yes! Catalysts intent to make social life an easy game to play again. Please, be aware - this could speed up your pulse a bit!', 'Wrong button?!'],
            ['This Applications owner', 1, 'You just choosed to follow him closely - it can\'t get more personal than this!', 'Catalysts are offical representatives with a personal web application and you can follow her/him closely by downloading it']
          ]
        },
        es: {
          q: 'Que es Catalista?',
          o: [
            ['Su personaje favorito', true, 'Correcto! Le encanta todo que ella/el hace!'],
            ['El siguiente Influenciador', false, 'No - para nada! Ellas/Ellos catalizan con personas - no productos'],
            ['Un elemento que faltaba', true, 'Si! Las/Los Catalistas intentan hacer de su vida social un juego. Porfavor, tome en cuenta que esto puede accelerar tu ritmo un poco!'],
            ['El propietario de esta Aplicacion', true, 'Esto tambien! Esta es su linea directa']
          ]
        }
      }
    }
    this.onAnswer = this.onAnswer.bind(this)
  }

  onAnswer(correct) {
    // Score
    if(correct) {
      this.setState({score: this.state.score + 3})
    }
  }

  onClick() {
    // Save Credits
  }

  render() {
    const { lan } = this.state
    const l = lan[this.props.lan]
    const { o } = l
    const { answ } = this.state
    return (
      <div className='game'>
        <h1>{l.q}</h1>
        <span className='support-text'>Pick any option that sounds right to you...</span>
        {o.map((itm, indx) => {
          const dis = answ.includes(indx.toString())
          const cor = this.state.tr
          const win = this.state.tr ? ' win' : ''
          return (
            <div key={indx}>
              <Qu a={itm[0]} t={itm[1]} onAnswer={this.onAnswer}/>
            </div>
          )
        })}
        <Button basic inverted fluid onClick={this.onClick}>Save Now: {this.state.score}</Button>
      </div>
    )
  }
}
