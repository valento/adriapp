import React from 'react'
import { Icon, Menu, Checkbox } from 'semantic-ui-react'

export default class Qu extends React.Component {
  constructor(props) {
    super()
    this.state = {
      fin: false,
      ans: false
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick(e, { name }) {
    if(this.state.fin) return
    const ans = (name).split('-')
    const correct = (ans[0] === ans[1])? true : false
    this.setState({fin: true})
    this.setState({ans: correct})
    this.props.onAnswer(correct)
  }

  render() {
    return (
      <Menu size='mini' className='quiz'>
        <Menu.Item className='que'>{this.props.a}</Menu.Item>
        <Menu.Item disabled={this.state.fin} name={this.props.t + '-0'} onClick={this.onClick}>
          No
        </Menu.Item>
        <Menu.Item disabled={this.state.fin} name={this.props.t + '-1'} onClick={this.onClick}>
          Yes
        </Menu.Item>
        <Menu.Item>+3{this.state.ans && <Icon name='check' size='big' color='yellow' className={'floating top'} />}</Menu.Item>
      </Menu>
    )
  }
}
