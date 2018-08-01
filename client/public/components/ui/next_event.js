import React from 'react'

export default function NextEvent(props) {
  let dd = new Date(props.date)
  const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Dicember']
  return (
    <div className='day_page'>
      <div className='month'>{month[dd.getMonth()]}</div>
      <div className='date'>{dd.getDate()}</div>
      <div className='day'>{week[dd.getDay()]}</div>
    </div>
  )
}
