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
        clicked: '',
        cancel_game: props.cancel_game
      },

      styles: {
        black: 'black-question',
        white: 'white-question',
        b_inv: 'black-inverted',
        w_inv: 'white-inverted'
      },
      dismissMessage: false

    }

    this.onClick = this.onClick.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
  }

  onClick(e) {
    const a = e.target.value === 'true' ? true : false
    console.log('answer clicked: ', a)
    if (a) { this.props.onAnswer(this.props.que.win) }
    this.setState({
      settings: {...this.state.settings,
        answered: true,
        correct: a,
        clicked: e.target.name
      }
    })
  }

  onDismiss() {
    this.setState({
      dismissMessage: true,
    })
  }

  render() {
    let ui = this.state.ui[this.props.lan]
    const { q, a, y, n, o } = this.props.que
    if(o !== undefined){
      ui = o
    }
    const toggle_disabled_style = this.state.settings.answered ?
      (this.state.styles[this.props.style] + ' answer-disabled') :
      this.state.styles[this.props.style]
    return (
    <div>
      <div className={toggle_disabled_style} key={this.props.index}>
        <Icon name='question circle' color={this.props.btn_color} />
        <span>{q}</span>
        <Button.Group floated='right' color={this.props.btn_color} inverted size='tiny'>
          <Button onClick={this.onClick}
            value={a!==0 ? 'true' : 'false'}
            disabled={this.state.settings.answered}
            name='first'>
            {ui[0]}
          </Button>
          <Button onClick={this.onClick}
            value={a!==1 ? 'true' : 'false'}
            disabled={this.state.settings.answered}
            name='second'>
            {ui[1]}
          </Button>
        </Button.Group>
      </div>

      {(this.state.settings.answered && this.props.messaging && !this.state.dismissMessage) ? (
        <Message attached='bottom' size='mini'
          info={this.state.settings.correct}
          negative={!this.state.settings.correct}
          onDismiss={this.onDismiss}
        >
          <p>{ this.state.settings.clicked === 'first' ? y : n}</p>
        </Message>
      ) : null}

    </div>
    )
  }
}
