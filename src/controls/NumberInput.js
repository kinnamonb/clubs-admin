import React, { Component } from 'react'

import IncreaseButton from './IncreaseButton'
import DecreaseButton from './DecreaseButton'

import './css/NumberInput.css'

export class NumberInput extends Component {
  state = { value: 0 }

  render() {
    const { value } = this.state
    return (
      <div className='number-input-wrapper'>
        <DecreaseButton onClick={e => this.adjust(-1)} />
        <input
          type='text'
          value={value}
          onChange={e => this.handleChange(e.target.value)} />
        <IncreaseButton onClick={e => this.adjust(1)} />
      </div>
    )
  }

  adjust(i) {
    const { value } = this.state
    const newValue = value + i
    this.props.onChange(newValue)
    this.setState({ value: newValue })
  }

  handleChange(value) {
    this.props.onChange(value)
    this.setState({ value: value })
  }
}

export default NumberInput
