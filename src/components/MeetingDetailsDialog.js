import React, { Component } from 'react'

import Dialog from './Dialog'
import MonthsSelect from '../controls/MonthsSelect'
import TimeTextbox from '../controls/TimeTextbox'
import NumberInput from '../controls/NumberInput'
import AutoTextbox from '../controls/AutoTextbox'
import SaveButton from '../controls/SaveButton'
import ConfirmDialog from './ConfirmDialog'

export class MeetingDetailsDialog extends Component {
  state = {
    isCancelling: false
  }

  days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday' ]

  render() {
    const { isOpen } = this.props
    const { isCancelling } = this.state

    return (
      <div>
        <Dialog
          isOpen={isOpen}
          title='Meeting Details'
          onClose={() => this.confirmCancel()}>
          <MonthsSelect onChange={value => console.log(value)} />
          <TimeTextbox onChange={value => console.log(value)} />
          <NumberInput onChange={value => console.log(value)} />
          <p>th</p>
          <AutoTextbox
            label='Day of week'
            options={this.days}
            onChange={value => console.log(value)} />
          <SaveButton onClick={() => this.save()} />
        </Dialog>
        <ConfirmDialog
          z={10}
          isOpen={isCancelling}
          prompt='Are you sure you want to cancel? All changes will be lost.'
          onConfirm={() => this.cancel()}
          onCancel={() => this.setState({ isCancelling: false })} />
      </div>
    )
  }

  save() {
    this.props.onSave()
  }

  confirmCancel() {
    this.setState({ isCancelling: true })
  }

  cancel() {
    this.setState({ isCancelling: false })
    this.props.onCancel()
  }
}

export default MeetingDetailsDialog
