import React from 'react'
import Entry from './entry'

export default class Diary extends React.Component {
  constructor(props) {
    super(props)
    //
  }

  render() {
    return (
      <div><Entry type={'diary'} /></div>
    )
  }
}
