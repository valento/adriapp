import React from 'react'

class CatalistaPage extends React.Component {
  constructor() {
    super()
  }
  render() {
    const style = (this.props.male)? 'pages man catalista' : 'pages ladies catalista'
    return (
      <div className={style}>
        foo
      </div>
    )
  }
}

export default CatalistaPage
