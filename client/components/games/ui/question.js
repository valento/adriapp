import React from 'react'
import { Icon, Button, Message } from 'semantic-ui-react'

export default class BQuestion extends React.Component {
  constructor(props) {
    super()
    this.state = {
      ui: {
        es: ['Si', 'No'],
        en: ['Y', 'N']
      },

      settings: {
        correct: null,
        answered: null,
        clicked: ''
      },

      styles: {
        black: 'black-question',
        white: 'white-question',
        b_inv: 'black-inverted',
        w_inv: 'white-inverted'
      }

    }

    this.onClick = this.onClick.bind(this)
  }

  onClick(e) {
    const a = e.target.value === 'true' ? true : false
    console.log('answer clicked: ', a)
    this.props.onAnswer(e.target.value)
    this.setState({
      settings: {...this.state.settings,
        answered: true,
        correct: a,
        clicked: e.target.name
      }
    })
  }

  render() {
    let ui = this.state.ui[this.props.lan]
    const { q, a, y, n, o } = this.props.que
    if(o !== undefined){
      ui = o
    }
    const toggle_disabled_style = this.state.settings.answered ?
      (this.state.styles[this.props.style] + 'answer-disabled') :
      this.state.styles[this.props.style]
    return (
    <div>
      <div className={toggle_disabled_style} key={this.props.index}>
        <Icon name='question circle' color={this.props.btn_color} />
        <span>{q}</span>
        <Button.Group floated='right' color={this.props.btn_color} inverted>
          <Button onClick={this.onClick} value={a!==0 ? 'true' : 'false'} name='first'>{ui[0]}</Button>
          <Button onClick={this.onClick} value={a!==1 ? 'true' : 'false'} name='second'>{ui[1]}</Button>
        </Button.Group>
      </div>

      {(this.state.settings.answered && this.props.messaging) ? (
        <Message attached='bottom' info={this.state.settings.correct} negative={!this.state.settings.correct} size='mini'>
          <p>{ this.state.settings.clicked === 'first' ? y : n}</p>
        </Message>
      ) : null}

    </div>
    )
  }
}
