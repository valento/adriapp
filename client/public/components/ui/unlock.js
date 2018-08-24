import React from 'react'
import { Icon } from 'semantic-ui-react'
//import FaDown from 'react-icons/lib/fa/arrow-circle-down'//arrow-circle-down'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Unlock(props) {
  return (
    <div className='main-lock'>
      <Icon onClick={props.onClick} name='arrow alternate circle down' size='huge'/>
    </div>
  )
}

//<FaDown onClick={props.onClick} color='#ffffff' size='64px' />

export default Unlock
