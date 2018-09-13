import React from 'react'
import { Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Credits extends React.Component {
  constructor(props){
    super()
    this.state = {
      lan: {
        es: ['Creditos', 'Quiero +',
            'Los Creditos le compran cosas...'
          ],
        en: ['Credits', 'Get +',
            'You need these to buy stuff...'
          ]
    }}
  }
  render(){
    const lan = this.state.lan[this.props.lan]
    const s = ['', 'credit-big', 'credit-middle']
    return (
      <div>
        {this.props.view === 0 ? (
            <div>
              - - -
            </div>
          ) : (
            <div>
              <div className={s[this.props.view]}>
                {'{' + this.props.credit + '}'}
                <p>{lan[0]}</p>
                <Link to='/games'>
                  <Button size='tiny' color='blue' content={lan[1]} />
                </Link>
              </div>
              <i>{lan[2]}</i>
            </div>
          )
        }
      </div>
    )
  }
}
