import React from 'react'
import { Route } from 'react-router-dom'
import Logo from '../brand/logo.js'
import Home from './presentHome.js'

export default class HomePage extends React.Component {
  constructor(props) {
    console.log(props)
    super()
    this.state = {
      page: 0,
      lng: {
        en: [],
        es: []
      }
    }
  }

  render() {
    return (
      <div className='home'>
        <div className='half-screen v-center'><Logo lan={this.props.lan}/></div>
        <div className='half-screen content'><Home lan={this.props.lan} /></div>
      </div>
    )
  }
}
