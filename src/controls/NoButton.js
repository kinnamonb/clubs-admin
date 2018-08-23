import React, { Component } from 'react'

import Button from './Button'

export class NoButton extends Component {
  render() {
    const { onClick } = this.props
    return (
      <Button isPrimary={false} onClick={onClick}>
        No
      </Button>
    )
  }
}

export default NoButton
