import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Icon, Button } from 'semantic-ui-react'
import Bquiz from '../games/bquiz'
import { saveUserData } from '../../actions'

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
    this.saveCredit = this.saveCredit.bind(this)
  }

  saveCredit({data}) {
    console.log('Composition Component: ', {data})
    //const data = {{ this.props.user_id }, ...{credit}}
    this.props.saveUserData({data})
  }

  render(){
    const lan = this.state.lan[this.props.lan]
    console.log(this.props.credit)
    return (
      <div className='home col-md-6 welcome game'>
        <h2>{lan[0]}</h2><br/>
        <h1>{'{ '+lan[1]+' }'}</h1>
        <span>{lan[2]}</span>
        <Bquiz lan={this.props.lan}
          credit={this.props.credit}
          saveCredit={this.saveCredit}
          user_id={this.props.user_id}
        />
        <Button color='black' inverted floated='right' content={lan[4]} icon='arrow right' labelPosition='right' />
      </div>
    )
  }
}

GamesPage.propTypes = {
  credit: PropTypes.number.isRequired,
  user_id: PropTypes.number.isRequired,
  lan: PropTypes.string.isRequired,
  saveUserData: PropTypes.func.isRequired
}

function mapStateToProps(state){
  return {
    credit: state.user.credit,
    role: state.user.role,
    user_id: state.user.user_id,
    lan: state.settings.language
  }
}

export default connect(mapStateToProps, { saveUserData })(GamesPage)
