import React, { Component } from 'react'

import Button from './Button'

export class DecreaseButton extends Component {
  render() {
    const { onClick } = this.props
    return (
      <Button isPrimary={false} onClick={onClick}>
        -
      </Button>
    )
  }
}

export default DecreaseButton
