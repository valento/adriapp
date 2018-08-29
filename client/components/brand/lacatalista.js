import React from 'react'
import { Link } from 'react-router-dom'

export default function LaCatalista(props) {
  const lan = {
    es: ['¿ La...\n', 'CATALISTA\n', 'Quien___?'],
    en: ['Catalista Who?']
  }
  return (
    <div className='lista v-center'>
      <div className='v-center'>
        <Link to='/catalista/home' className='link'>
          <div>
            <div className='big'>{lan[props.lan][0]}</div>
            <div>{lan[props.lan][1]}</div>
            <div>{lan[props.lan][2]}</div>
          </div>
        </Link>
        </div>
    </div>
  )
}
