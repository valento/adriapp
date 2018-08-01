import React from 'react'
import FaHeart from 'react-icons/lib/fa/heart'

function Sign(props) {
  const style = {
    fontSize: props.fontsize
  }
  return (
    <div className='brand'>
      <span style={style}>A'</span><FaHeart color={props.color} size={props.size} />
    </div>
  )
}

export default Sign
