import React from 'react'
import { Message, Link, Button } from 'semantic-ui-react'

export default class PleaseAuthenticate extends React.Component {
  constructor(props) {
    super()
    this.state = {
      lan: {
        es: ['!Por favor, registrate primero, corazon...'],
        en: ['Register first, honey...!']
      }
    }
  }
  render() {
    const lan = this.state.lan.es
    return (
      <Message positive size='mini'>
        <Message.Header>(from Adri with Love...):</Message.Header>
        <p>{lan[0]}</p>
      </Message>
    )
  }
}
