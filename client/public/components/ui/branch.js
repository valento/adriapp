import React from 'react'
import FaGlobe from 'react-icons/lib/fa/globe'

export default class Branch extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      branch: props.branch,
      fontSize: true
    }
    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onChange(e){
    e.preventDefault()
    this.setState({
      branch: e.target.value,
      fontSize: true
    })
  }
  onClick(e){
    e.preventDefault()
    this.setState(prevState => ({
      fontSize: !prevState.fontSize
    }))
  }

  render(){
    const sm = (this.state.fontSize)? '' : '.small'
    console.log(sm)
    return (
      <div className='row branches'>
        <FaGlobe size='30px' color='#aaa'/>:
        <div>
          <select onClick={this.onClick} onChange={this.onChange} name='global' value={this.state.branch}>
            <option value='Berlin'>Berlin</option>
            <option value='Budapest'>Budapest</option>
            <option value='Ibiza'>Ibiza</option>
            <option value='Milan'>Milan</option>
            <option value='Moscow'>Moscow</option>
            <option value='Tel Aviv'>Tel Aviv</option>
            <option value='Venice'>Venice</option>
          </select>
        </div>
      </div>
    )
  }
}
