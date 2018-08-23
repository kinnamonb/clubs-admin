import React, { Component } from 'react'

import Button from './Button'

export class YesButton extends Component {
  render() {
    const { onClick } = this.props
    return (
      <Button isPrimary={true} onClick={onClick}>
        Yes
      </Button>
    )
  }
}

export default YesButton
