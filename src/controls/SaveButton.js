import React, { Component } from 'react'

import Button from './Button'

export class SaveButton extends Component {
  render() {
    const { onClick } = this.props
    return (
      <Button isPrimary={true} onClick={onClick}>
        Save
      </Button>
    )
  }
}

export default SaveButton

