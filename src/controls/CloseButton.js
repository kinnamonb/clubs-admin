import React, { Component } from 'react'

import Button from './Button'

export class CloseButton extends Component {
  render() {
    const { onClick } = this.props
    return (
      <Button customClass='btn-close' onClick={onClick}>
        X
      </Button>
    )
  }
}

export default CloseButton

