import React from 'react'
import FaDown from 'react-icons/lib/fa/arrow-circle-down'//arrow-circle-down'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Unlock(props) {
  return (
    <div className='main-lock'>
      <FaDown onClick={props.onClick} color='#ffffff' size='64px'  />
    </div>
  )
}

export default Unlock
