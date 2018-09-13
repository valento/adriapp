import React from 'react'
import { connect } from 'react-redux'
import { Icon, Button } from 'semantic-ui-react'
import Bquiz from '../games/bquiz'

class GamesPage extends React.Component {
  constructor(props){
    super()
    this.state = {
      lan: {
        es: ['Catalista Game', 'Que es La Catalista?', '... y que no es...',
           'Que es Catalismo?', 'Catalismo Game'],
        en: ['Catalista Game', 'What is she??', '... and what it isn\'t...',
           'What is Catalism about?', 'Catalism Game']
      }
    }
  }

  render(){
    const lan = this.state.lan[this.props.lan]
    return (
      <div className='home col-md-6 welcome game'>
        <h2>{lan[0]}</h2><br/>
        <h1>{'{ '+lan[1]+' }'}</h1>
        <span>{lan[2]}</span>
        <Bquiz lan={this.props.lan} />{/*'es'*/}
        <h3>{(this.props.lan === 'es')? 'Siguiente Juego' : 'Next Game'}</h3><br/>
        <h1>{'{ '+lan[3]+' }'}</h1>
        <span>{lan[2]}</span>
        <Button color='black' inverted>{lan[4]+' >>'}</Button>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    credits: state.user.credits,
    lan: state.settings.language
  }
}

function mapDispatchToProps(state) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesPage)
