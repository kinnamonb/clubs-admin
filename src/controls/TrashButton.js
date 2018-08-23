import React, { Component } from 'react'

import Button from './Button'
import TrashIcon from '../icons/TrashIcon'

export class TrashButton extends Component {
  render() {
    const { onClick } = this.props
    return (
      <Button isIcon={true} onClick={onClick}>
        <TrashIcon />
      </Button>
    )
  }
}

export default TrashButton
