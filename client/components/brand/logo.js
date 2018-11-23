import React from 'react'

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
    return (
      <div className='brand-content'>
        <div className='brand'>
          <h3>0</h3>
          <div className='element'>
            <div className='cat'>{l[0]}</div>
            <div className='catalista'>{l[1]}</div>
          </div>
        </div>
      </div>
    )
  }
}
