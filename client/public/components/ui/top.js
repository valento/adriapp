import React from 'react'
import Sign from '../brand/sign'
import Branch from './branch.js'

function Top() {
  return (
    <div className='row dashbar'>
      <div className="col-3"><Sign color='#cc0000' size='24' fontsize='24px' /></div>
      <div className="col-6"><Branch branch='Ibiza' /></div>
      <div className="col-3"></div>
    </div>
  )
}

export default Top
