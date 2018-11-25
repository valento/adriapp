import React from 'react'
import HeartBeats from '../present/heartBeats'

export default class Logo extends React.Component {
  constructor() {
    super()
    this.state = {
      page: 0,
      lng: {
        en: ['Cat', 'Catalyst'],
        es: ['Cat', 'Catalista']
      }
    }
  }
  render() {
    const { lng } = this.state
    const l = lng[this.props.lan]
    let v = (this.props.screen === 'pc')? 1 : 0
    return (
      <div className='brand-content'>
        {(this.props.screen === 'pc')? (<div className='brand-header'><h1>Intro</h1></div>) : null}
        <div className='brand'>
          <div className='anumber'>0</div>
          <div className='element'>
            <div className='cat'>{l[0]}</div>
            <div className='catalista'>{l[1]}</div>
            <div className='mass'>
              <HeartBeats role={1} view={v} credit={6017/1000} lan={this.props.lan}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
