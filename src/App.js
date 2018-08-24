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
        <div className='months'>
          <span>JAN</span>
          <span>FEB</span>
          <span>MAR</span>
          <span>APR</span>
          <span>MAY</span>
          <span>JUN</span>
          <span>JUL</span>
          <span>AUG</span>
          <span>SEP</span>
          <span>OCT</span>
          <span>NOV</span>
          <span>DEC</span>
        </div>
      </div>
    )
  }
}

export default App

