import React, { Component } from 'react'

import Button from './Button'

export class ListItemButton extends Component {
  render() {
    const { children, onClick } = this.props
    return (
      <Button isListItem={true} onClick={onClick}>
        {children}
      </Button>
    )
  }
}

export default ListItemButton
