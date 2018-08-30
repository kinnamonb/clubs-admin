import React, { Component } from 'react'

import Dialog from './Dialog'
import MonthsSelect from '../controls/MonthsSelect'
import TimeTextbox from '../controls/TimeTextbox'
import NthInput from '../controls/NthInput'
import AutoTextbox from '../controls/AutoTextbox'
import SaveButton from '../controls/SaveButton'
import ConfirmDialog from './ConfirmDialog'

export class MeetingDetailsDialog extends Component {
  state = {
    isCancelling: false,
    meeting: {
      start: 0,
      end: 11,
      except: [],
      time: '',
      nth: 1,
      dayOfWeek: -1
    }
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
          <MonthsSelect
            onChange={value => this.setValue({...value})} />
          <TimeTextbox
            onChange={value => this.setValue({time: value})} />
          <NthInput
            length={4}
            onChange={value => this.setValue({nth: value})} />
          <AutoTextbox
            label='Day of week'
            options={this.days}
            onChange={value => this.setValue({dayOfWeek: this.days.indexOf(value)})} />
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

  setValue(data) {
    const meeting = Object.assign({...this.state.meeting}, data)
    console.dir(meeting)
    this.setState({ meeting: meeting })
  }

  save() {
    this.props.onSave(this.state.meeting)
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
