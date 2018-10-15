import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Icon, Label, Segment, Divider } from 'semantic-ui-react'

class ProfileHome extends React.Component {
  render() {
    const lan = {
      es: ['Perfil de Usuario'],
      en: ['User Profile']
    }
    const lng = lan[this.props.lan]
    return (
      <div className='home profile'>
        <div className='cover'>
          <h2>{lng[0]}</h2>
          <Divider inverted />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    lan: state.settings.language
  }
}

export default connect(mapStateToProps,null)(ProfileHome)
