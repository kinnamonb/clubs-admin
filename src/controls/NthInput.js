import React, { Component } from 'react'

import ToggleButton from './ToggleButton'

export class NthInput extends Component {
  state = { selected: 0 }
  render() {
    return (
      <div>
        {this.buttons()}
      </div>
    )
  }

  buttons() {
    const { length } = this.props
    const { selected } = this.state

    return new Array(length).fill(null).map((e, i) => (
      <ToggleButton
        key={i}
        isSelected={selected === i}
        onClick={() => this.toggle(i)}>
        {this.nthify(i + 1)}
      </ToggleButton>
    ))
  }

  toggle(i) {
    this.setState({ selected: i })
    this.props.onChange(i + 1)
  }

  nthify(n) {
    let postfix = 'th'
    const tens = Math.floor(n / 10) % 10
    const ones = n % 10

    if (tens !== 1) {
      if (ones === 1) { postfix = 'st' }
      else if (ones === 2) { postfix = 'nd' }
      else if (ones === 3) { postfix = 'rd' }
    }

    return `${n}${postfix}`
  }
}

export default NthInput
