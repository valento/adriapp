import React from 'react'
import { Icon, Button } from 'semantic-ui-react'

export default class HeartBeats extends React.Component {
  constructor(props){
    super()
    this.state = {
      lan: {
        es: ['Cardio', 'Adrenalinate',
            'El color de tu Cardio refleja tu nivel de acceso...'
          ],
        en: ['HeartBeats', 'Level-up',
            'The color of your HeartBeats shows your security clearance...'
          ]
    }}
  }
  render(){
    const lan = this.state.lan[this.props.lan]
    //if(this.props.credit < 10) r = 4
    const s = ['large', 'big']
    return (
      <div>
        <div>
          <Icon
            name='heartbeat'
            color='grey'
            size={s[this.props.view]}
          />
          <div className='menu-icon-label'>{this.props.credit}</div>
        </div>
      </div>
    )
  }
}
