import React, { Component } from 'react'

import Dialog from './Dialog'
import YesButton from '../controls/YesButton'
import NoButton from '../controls/NoButton'

export class ConfirmDialog extends Component {
  render() {
    const { z, isOpen } = this.props

    return (
      <Dialog
        z={z}
        isOpen={isOpen}
        title='Confirm Action'
        onClose={() => this.cancel()}>
        <p>Are you sure?</p>
        <YesButton onClick={() => this.confirm()} />
        <NoButton onClick={() => this.cancel()} />
      </Dialog>
    )
  }

  confirm() {
    this.props.onConfirm()
  }

  cancel() {
    this.props.onCancel()
  }
}

export default ConfirmDialog
