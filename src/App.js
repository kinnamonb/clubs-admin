import React, { Component } from 'react'

import './App.css'

import MeetingDetailsDialog from './components/MeetingDetailsDialog'

export class App extends Component {
  state = {
    isOpen: true
  }

  componentDidUpdate() {
    console.dir(this.state)
  }

  render() {
    const { isOpen } = this.state

    return (
      <MeetingDetailsDialog
        isOpen={isOpen}
        onSave={value => console.log(value)}
        onCancel={() => this.setState({ isOpen: false })} />
    )
  }
}

export default App
