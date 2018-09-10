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
        en: [
          'HeartBeats', 'Level-up',
          'The color of yout HeartBeats shows your secutiry clearance...'
          ]
    }}
  }
  render(){
    const lan = this.state.lan[this.props.lan]
    let r = Math.floor((this.props.role.toString().slice(0,1))/2)
    if(r > 3) r = 3
    if(this.props.credit < 10) r = 4
    console.log(r)
    const s = ['large', 'huge', 'massive']
    const c = ['grey', 'blue','purple','yellow','red']
    return (
      <div>
        {this.props.view === 0 ?
          (<div>
              <Icon
                name='heartbeat'
                color={c[r]}
                size={s[this.props.view]}
              />
              <div className='label'>{this.props.credit}</div>
            </div>
          ) :
          this.props.view === 1 ? (
            <div>
              <span className='credit-big'>&#123;</span>
                <Icon
                  name='heartbeat'
                  color={c[r]}
                  size={s[this.props.view]}
                />
              <span className='credit-big'>&#125;</span>
              <div className=' credit-big'>
                <p>{lan[0]}</p>
                <Button size='tiny' color='blue' content={lan[1]} />
              </div>
              <span>{lan[2]}</span>
            </div>
          ) :
          ''
        }
      </div>
    )
  }
}
