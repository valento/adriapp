import React from 'react'
import { Icon, Menu, Checkbox } from 'semantic-ui-react'

export default class Catgame extends React.Component {
  constructor() {
    super()
    this.state = {
      lan: {
        en: {
          q: 'What is a Catalyst?',
          o: [
            ['Your favorite personality', true, 'Correct, you love everything about that person'],
            ['The next Influencer', false, 'Not at all! Catalyst plays for you, not the brands'],
            ['The missing element', true, 'Yes! Catalysts intent to make social life an easy game to play again. Please, be aware - this could speed up your pulse a bit!'],
            ['This Applications owner', true, 'You just choosed to follow him closely']
          ]
        },
        es: {
          q: 'Que es Catalista?',
          o: [
            ['Su personaje favorito', true, 'Correcto! Le encanta todo que ella/el hace!'],
            ['El siguiente Influenciador', false, 'No - para nada! Ellas/Ellos catalizan con personas - no productos'],
            ['Un elemento que faltaba', true, 'Si! Las/Los Catalistas intentan hacer de su vida social un juego. Porfavor, tome en cuenta que esto puede accelerar tu ritmo un poco!'],
            ['El propietario de esta Aplicacion', true, 'Esto tambien! Esta es su linea directa']
          ]
        }
      }
    }
  }

  render() {
    const { lan } = this.state
    const l = lan[this.props.lan]
    const { o } = l
    return (
      <div className='game'>
        <h1>{l.q}</h1>
        <span className='support-text'>Pick any option that sounds right to you...</span>
        {o.map((itm, indx) => {
          return (
            <div key={indx}>
              <Menu size='mini' className='quiz'>
                <Menu.Item className='que'>{itm[0]}</Menu.Item>
                <Menu.Item as='a'>No</Menu.Item>
                <Menu.Item as='a'>Yes</Menu.Item>
                <Menu.Item>+3 <Icon name='check' size='big' color='yellow' className='floating top' /></Menu.Item>
              </Menu>
            </div>
          )
        })}
      </div>
    )
  }
}
