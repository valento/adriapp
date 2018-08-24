import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

const LadiesPage = props => {
  const lng = {
    lan: {
      es: ['Atencion: Este es la Parte de Mujeres! Si Usted es hombre, deberia buscar otra parte, creeme - le conviene mas...',
      'Damas, sigan conmigo...'],
      en:
        ['!!! Warning: This is Ladies Room! If you\'re a man, you should go somewhere else, believe me - or else you\'ll regret it',
        'Ladies, with me...']
    }
  }

  return (
    <div className='pages ladies'>
      <div className='promo'>
        <p className='warning'>
          {lng.lan[props.lan][0]}
        </p>
        <p>
          {lng.lan[props.lan][1]}
        </p>
      </div>
      <div className='register'>Register</div>
    </div>
  )
}
 export default LadiesPage
