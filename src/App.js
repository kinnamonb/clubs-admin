import React, { Component } from 'react'

import './App.css'

import TimeTextbox from './controls/TimeTextbox'

export class App extends Component {
  state = {
    value: ''
  }

  componentDidUpdate() {
    console.dir(this.state)
  }

  render() {
    const { value } = this.state
    return (
      <TimeTextbox
        value={value}
        onChange={value => this.setState({ value: value })} />
    )
  }
}

export default App
