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
    let r = Math.floor((this.props.role.toString().slice(0,1))/2)
    if(r > 3) r = 3
    //if(this.props.credit < 10) r = 4
    const st = ['','credit-big','credit-middle']
    const s = ['large', 'huge', 'big']
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
              <div className='menu-icon-label'>{this.props.credit}</div>
            </div>
          ) : (
            <div>
              <span className={st[this.props.view]}>&#123;</span>
                <Icon
                  name='heartbeat'
                  color={c[r]}
                  size={s[this.props.view]}
                />
              <span className={st[this.props.view]}>&#125;</span>
              <div className={st[this.props.view]}>
                <p>{lan[0]}</p>
                <Button size='tiny' color='blue' content={lan[1]} />
              </div>
              <i>{lan[2]}</i>
            </div>
          )
        }
      </div>
    )
  }
}
