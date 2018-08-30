import React, { Component } from 'react'

import Dialog from './Dialog'
import MeetingDetailsDialog from './MeetingDetailsDialog'
import ItemList from './ItemList'
import ListItemButton from '../controls/ListItemButton'
import SaveButton from '../controls/SaveButton'

export class MeetingsListDialog extends Component {
  state = { meeting: null }

  render() {
    const { isOpen=false } = this.props
    const { meeting } = this.state

    return (
      <Dialog
        title='Meetings'
        isOpen={isOpen}
        onClose={() => this.cancel()}>
        <ItemList>
          {this.listItems()}
        </ItemList>
        <SaveButton
          onClick={() => this.save()} />
        <MeetingDetailsDialog
          isOpen={meeting}
          meeting={meeting} />
      </Dialog>
    )
  }

  listItems() {
    const { meetings=[] } = this.props

    return meetings.map((m, i) => (
      <ListItemButton
        key={i}>
        {m.from} - {m.to} (except: {m.except})
      </ListItemButton>
    ))
  }

  save() {

  }

  cancel() {

  }
}

export default MeetingsListDialog
