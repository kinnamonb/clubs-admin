import React, { Component } from 'react'

import Button from './Button'

export class CancelButton extends Component {
  render() {
    const { onClick } = this.props
    return (
      <Button isPrimary={false} onClick={onClick}>
        <span>Cancel</span>
      </Button>
    )
  }
}

export default CancelButton

