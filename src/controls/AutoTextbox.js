import React, { Component } from 'react'

import './css/AutoTextbox.css'

import Textbox from './Textbox.js'
import ListItemButton from './ListItemButton'

export class AutoTextbox extends Component {
  state = { value: this.props.value, showOptions: false }

  render() {
    const { value } = this.state
    const { label, placeholder, options } = this.props

    return (
      <div className='auto-textbox-wrapper'>
        <Textbox
          label={label}
          placeholder={placeholder}
          value={value}
          pattern={options.reduce((o,v) => `${v}|${o}`)}
          onChange={value => this.handleChange(value)} />
        <div className='textbox-list'>
          {this.listOptions()}
        </div>
      </div>
    )
  }

  listOptions() {
    const { options } = this.props
    const { value='' } = this.state

    return options
      .filter(o => (
        o.toLowerCase().indexOf(value.toLowerCase()) !== -1
        && o.toLowerCase() !== value.toLowerCase()
      ))
      .map((o, i) => (
        <ListItemButton key={i} onClick={e => this.handleChange(o)}>
          {o}
        </ListItemButton>
      ))
  }

  handleChange(value) {
    this.props.onChange(value)
    this.setState({ value: value })
  }
}

export default AutoTextbox
