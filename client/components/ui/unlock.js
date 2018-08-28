import React from 'react'
import { Icon } from 'semantic-ui-react'

function Unlock(props) {
  return (
    <div>
      <Icon onClick={props.onClick} name='arrow alternate circle down' size='huge'/>
    </div>
  )
}

//<FaDown onClick={props.onClick} color='#ffffff' size='64px' />

export default Unlock
