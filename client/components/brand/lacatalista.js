import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

export default function LaCatalista(props) {
  const lan = {
    es: [' La...\n', 'CATALISTA\n', 'Quien ??'],
    en: ['Catalista Who?']
  }
  const l = lan[props.lan]
  return (
    <div className='lista v-center'>
      <div className='v-center'>
        <Link to='/catalista/home' className='link'>
          <div>
            <div className='big'>
              <Icon name='question circle' />
              {l[0]}
            </div>
            <div>{l[1]}</div>
            <div>
            <Icon name='exclamation triangle' color='orange' />
              {l[2]}
            </div>
          </div>
        </Link>
        </div>
    </div>
  )
}
