import React, { Component } from 'react'

import './App.css'

import SaveButton from './controls/SaveButton'
import CancelButton from './controls/CancelButton'
import CloseButton from './controls/CloseButton'
import YesButton from './controls/YesButton'
import NoButton from './controls/NoButton'
import TrashButton from './controls/TrashButton'
import ListItemButton from './controls/ListItemButton'
import AddListItemButton from './controls/AddListItemButton'

export class App extends Component {
  render() {
    const trashButtons = new Array(5).fill(null).map((e,i) => <TrashButton key={i} onClick={() => console.log(`delete ${i}`)} />)

    const listButtons = new Array(5).fill(null).map((e,i) => <ListItemButton key={i} onClick={() => console.log(`item ${i}`)}>{`Item ${i}`}</ListItemButton>)

    return (
      <div>
        <SaveButton onClick={() => console.log('save')} />
        <CancelButton onClick={() => console.log('cancel')} />
        <CloseButton onClick={() => console.log('close')} />
        <YesButton onClick={() => console.log('yes')} />
        <NoButton onClick={() => console.log('no')} />
        { trashButtons }
        <div>
          { listButtons }
          <AddListItemButton onClick={() => console.log('add')} />
        </div>
      </div>
    )
  }
}

export default App

