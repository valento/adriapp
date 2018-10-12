import React from 'react'
import { connect } from 'react-redux'
import BQuestion from './ui/question'
import { Button } from 'semantic-ui-react'

class Bquiz extends React.Component {
  constructor(props) {
    super()
    //this.onAnswer = this.onAnswer.bind(this)
    this.state = this.initialState = {
      correct: null,
      answered: null,
      credit: props.credit,
      cancel_game: false,
      quiz: {
        es: [
          {q: 'Ella es una Influencer ', a: 0, win: 3,
            y: 'No, Señor! Ella no quiere influenciar a nadie... Ella solo cataliza entre Usted y el ambiente',
            n: 'Correcto: Como lo sabía Usted!! Los influencers son del pasado - ella monta la ola de la siguiente generación, Las Catalistas!'},
          {q: 'Puedo conserla ', a: 1, win: 4,
            y: 'Claro que SI! Solo debes descubrir la manera - estas en el sitio correcto!',
            n: 'Definitivamente - Si! Ella viene por Usted -  invitela y quedata aquí!'},
          {q: 'Ella habla Chino ', a: 0, win: 3,
            y: 'Todavia No... PERO: ella sabe conectarse con mucho, menos o sin palabras',
            n: 'Correcto: la vida es demasiado corta para aprender Chino... pero La Catlista sabe hablar mucho, menos o nada. Gan Bei!'},
          {q: 'Ella se Baña o se Ducha ', o: ['B','D'] , a: 0, win: 4,
            y: 'Ducha por supuesto - es más grande... mejor',
            n: 'Ducha por supuesto - es más grande... mejor'},
          {q: 'Sabes que pasará con ella ', a: -1, win: 4,
            y: '!Eh, bueno... esa fue difícil - nadie sabe que pasará, pero con certeza pasará algo!... además Usted sigue ganando los 4 Creditos',
            n: '!Eh, bueno... esa fue difícil - nadie sabe que pasará, pero con certeza pasará algo!... además Usted sigue ganando los 4 Creditos'},
          {q: 'Ella lee muchos libros ', a: 1, win: 3,
            y: 'Por supuesto - ella cataliza con libros, cuentos, realidad... e imaginación'},
          {q: 'Le gana a Chuck Noris ' , a: -1, win: 4,
            y: '?! Injusto... Ella cataliza, no lucha! Pierde o gana, Chuck, da igual - Usted recibe los 4 Creditos',
            n: '?! Injusto... Ella cataliza, no lucha! Pierde o gana, Chuck, da igual - Usted recibe los 4 Creditos'},
          {q: 'Le gustan los hombres ' , a: 0, win: 4,
            y: 'Incorrecto! Ella disgusta cualquier mandato, regla, requerimiento... Esta claro?',
            n: 'Correcto! Ella disgusta cualquier mandato, regla, requerimiento... Usted entiende!'}
        ],
        en: [
          {q: 'Is she the next Influencer ', a: 0, win: 3,
            y: 'No, Sir! She is not to influence anybody... She is The First Catalist - she triggers action on Click!',
            n: 'How did you know!!! Yeah! - she rides the next wave... The First Catalist that triggers action on Click!'},
          {q: 'Can I meet her ', a: 1, win: 4,
            y: 'Sure - absolutely! You just need to find the way - and you, sir, are in the right place!',
            n: 'You definitely can! She\'ll come to you, just keep pushing - you are in the right place!'},
          {q: 'Does she speak Chinese ', a: 0, win: 3,
            y: 'Not yet... BUT: she connects and catalyzes in any language with or without words',
            n: 'Life is too short to learn Chinese, but she speaks with many, little or no words at all... Gan Bei!'},
          {q: 'She is to shower or to bath ', o: ['S','B'] , a: 1, win: 4,
            y: 'Shower, of course! - it\'s bigger... better',
            n: 'Wrong! - shower, of course! - it\'s bigger... better'},
          {q: 'Know what when with her ', a: -1, win: 4,
            y: 'Yeah... that was tough one. No body knows what but it certainly will!... plus - you still get 4 credits',
            n: 'Yeah... that was tough one. No body knows what but it certainly will!... plus - you still get 4 credits'},
          {q: 'She reads lots of books ', a: 1, win: 3,
            y: '...even more - she can catalize with books, images, stories, reality... and imagination',
            n: '?!. Wrong button? Yes, she does - she can catalyze with books, images, stories, reality... and imagination'},
          {q: 'She can beat Chuck Noris ' , a: -1, win: 4,
            y: '?! That\'s not fair... She is to Catalyze, not to fight... Maybe, he\'ll just give up... plus - you still get 4 credits',
            n: '?! True! She is to Catalyze, not to fight... Eventually, he\'ll just give up... plus - you still get 4 credits'},
          {q: 'She likes men ' , a: 0, win: 4,
            y: 'Negative! She dislikes anything demanding, requiering, insisting... Clear enough?',
            n: 'Correct! She dislikes anything demanding, requiering, insisting... You\'ve got that right'}
        ]
      }
    }
    this.addCredit = this.addCredit.bind(this)
    this.saveCredit = this.saveCredit.bind(this)
  }

  addCredit(add) {
    this.setState({
      credit: this.state.credit + add
    })
  }

  saveCredit(e) {
    const { credit } = this.state
    const { user_id } = this.props
    const data = { credit, user_id }
    console.log('Representation Component: ', { data })
    //if(credit > this.initialState.credit){
      this.props.saveCredit({data})
      this.setState({
        cancel_game: true
      })
    //}
  }

  render() {
    const options = this.state.quiz[this.props.lan]
    return (
      <div className='quiz'>
        {options.map((option,i) =>
            <BQuestion lan={this.props.lan}
              onAnswer={this.addCredit}
              style='black'
              btn_color='orange'
              messaging={true}
              cancel_game={this.state.cancel_game}
              key={i}
              que={option}
              index={i}
            />
        )}
        <div className='total'>
          <Button primary floated='right'
            onClick={this.saveCredit}
            disabled={(this.state.credit > this.initialState.credit) ? false : true}
          >
            <Button.Content visible >
              {(this.props.lan === 'es') ? ('Guarda ' + this.state.credit + ' ya!') : ('Save ' + this.state.credit + ' Now')}
            </Button.Content>
          </Button>
        </div>
        <div className="clearfix"></div>
      </div>
    )
  }
}

export default Bquiz
