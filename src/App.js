import React, { Component } from 'react'

import './App.css'

import SaveButton from './controls/SaveButton'
import CancelButton from './controls/CancelButton'
import CloseButton from './controls/CloseButton'

export class App extends Component {
  render() {
    return (
      <div>
        <SaveButton onClick={() => console.log('save')} />
        <CancelButton onClick={() => console.log('cancel')} />
        <CloseButton onClick={() => console.log('close')} />
      </div>
    )
  }
}

export default App

