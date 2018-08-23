import React, { Component } from 'react'

import Button from './Button'

export class AddListItemButton extends Component {
  render() {
    const { onClick } = this.props
    return (
      <Button isPrimary={true} isListItem={true} onClick={onClick}>
        <div style={{textAlign: 'center'}}>+</div>
      </Button>
    )
  }
}

export default AddListItemButton
