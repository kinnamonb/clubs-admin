import React, { Component } from 'react'

import Textbox from './Textbox'

export class TimeTextbox extends Component {
  state = { value: this.props.value }

  render() {
    const { value } = this.state

    return (
      <Textbox
        value={value}
        label='Time'
        required={true}
        pattern='[0-1]?[0-9]:[0-5][0-9] ?(am|pm|AM|PM)'
        placeholder='1:00pm'
        onChange={value => this.handleChange(value)} />
    )
  }

  handleChange(value) {
    this.props.onChange(value)
    this.setState({ value: value })
  }
}

export default TimeTextbox
