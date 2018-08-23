import React, { Component } from 'react'

import Textbox from './Textbox.js'

export class AutoTextbox extends Component {
  state = { value: this.props.value }

  render() {
    const { options } = this.props

    return (
      <div>
        <Textbox {...this.props} onChange={e => this.handleChange(e)} />
        <ul>
          {this.listOptions()}
        </ul>
      </div>
    )
  }

  handleChange(e) {
    this.props.onChange(e)
    this.setState({ value: e.target.value })
  }

  listOptions() {
    return this.props.options
      .filter(o => o.indexOf(this.state.value) !== -1)
      .map((o, i) => <li key={i}>{o}</li>)
  }
}

export default AutoTextbox
