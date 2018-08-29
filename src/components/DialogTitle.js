import React, { Component } from 'react'

import CloseButton from '../controls/CloseButton'

export class DialogTitle extends Component {
  render() {
    const { children, onClose } = this.props

    return (
      <div className='dialog-title'>
        <div className='dialog-title-text'>
          <h3>{children}</h3>
        </div>
        <div>
          <CloseButton onClick={() => onClose()} />
        </div>
      </div>
    )
  }
}

export default DialogTitle
