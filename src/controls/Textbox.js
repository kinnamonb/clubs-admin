import React, { Component } from 'react'

import './css/Textbox.css'

export class Textbox extends Component {
  render() {
    const {
      label='',
      placeholder='',
      value='',
      required=false,
      pattern='.*',
      onChange } = this.props

    return (
      <div className='textbox-wrapper'>
        <label>{label}</label>
        <input
          type='text'
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
          pattern={pattern} />
      </div>
    )
  }
}

export default Textbox
