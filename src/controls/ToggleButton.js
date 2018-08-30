import React, { Component } from 'react'

import Button from './Button'

export class ToggleButton extends Component {
  render() {
    let cls = this.props.isSelected ? 'selected' : ''

    return (
      <Button {...this.props} customClass={cls} />
    )
  }
}

export default ToggleButton
