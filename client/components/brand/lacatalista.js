import React from 'react'

export default function LaCatalista(props) {
  const lan = {
    es: ['? Catalista Quien...'],
    en: ['Catalista Who?']
  }
  return (
    <div className='lista v-center'>
      <div className='v-center'>{lan[props.lan][0]}</div>
    </div>
  )
}
