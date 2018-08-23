import React, { Component } from 'react'

import './App.css'

import AutoTextbox from './controls/AutoTextbox.js'

export class App extends Component {
  state = { value: '' }

  render() {
    const colors = ['blue', 'green', 'red', 'yellow', 'purple', 'pink']
    return (
      <div>
        <AutoTextbox
          label='Favorite color'
          placeholder='Favorite color'
          value={this.state.value}
          options={colors}
          onChange={e => {
            this.setState({ value: e.target.value })
            console.log(e.target.value)
          }} />
      </div>
    )
  }
}

export default App

