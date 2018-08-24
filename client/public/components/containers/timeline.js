import React from 'react'
import { connect } from 'react-redux'
import Diary from '../ui/diary'

class Timeline extends React.Component {
  render(){
    return (
      <div><Diary /></div>
    )
  }
}

export default connect(null,null)(Timeline)
