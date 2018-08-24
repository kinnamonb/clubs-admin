import React, { Component } from 'react'

import './App.css'

import NumberInput from './controls/NumberInput'
import AutoTextbox from './controls/AutoTextbox'

export class App extends Component {
  render() {
    const options = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    return (
      <div>
        <AutoTextbox
          label='Day'
          value=''
          options={options}
          onChange={value => console.log(value)} />
        <NumberInput onChange={value => console.log(value)} />
      </div>
    )
  }
}

export default App

