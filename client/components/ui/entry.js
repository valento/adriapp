import React from 'react'

export default class Entry extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lan: {
        es: {
            week: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
            mon: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
          },
        en:
          {
            week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            mon: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Dicember']
          }
      },
      type: this.props.type
    }
  }

  render() {
    let today = Date.now()
    let now = new Date(today)

    const { week, mon } = this.state.lan.es
    return (
      <div className='entry'>
        { ' : ' + week[now.getDay()] + ', ' + now.getDate() + ', ' + mon[now.getMonth()] + ', ' +  now.getFullYear()}
      </div>
    )
  }
}
