import React, { Component } from 'react'

import Textbox from './Textbox'

export class TimeTextbox extends Component {
  render() {
    const { value, onChange } = this.props

    return (
      <Textbox
        value={value}
        label='Time'
        pattern='[0-1]?[0-9]:[0-5][0-9] ?(am|pm|AM|PM)'
        placeholder='1:00pm'
        onChange={value => onChange(value)} />
    )
  }
}

export default TimeTextbox
