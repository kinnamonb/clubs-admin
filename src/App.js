import React, { Component } from 'react'

import './App.css'

import ConfirmDialog from './components/ConfirmDialog'
import Dialog from './components/Dialog'
import Button from './controls/Button'

export class App extends Component {
  state = { dialogOpen: true, nextOpen: false }

  render() {
    const { dialogOpen, nextOpen } = this.state

    return (
      <div>
        <Button
          isPrimary={true}
          onClick={() => this.setState({ dialogOpen: true })}>
          Open
        </Button>
        <Dialog
          z={10}
          title='New Dialog'
          isOpen={nextOpen}
          onClose={() => this.setState({ nextOpen: false })} />
        <ConfirmDialog
          z={5}
          isOpen={dialogOpen}
          onConfirm={() => this.setState({ nextOpen: true })}
          onCancel={() => this.setState({ nextOpen: true })} />
      </div>
    )
  }
}

export default App
