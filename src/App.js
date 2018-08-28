import React, { Component } from 'react'

import './App.css'

import MonthsSelect from './controls/MonthsSelect'

export class App extends Component {
  render() {
    return (
      <div>
        <MonthsSelect onChange={value => console.dir(value)} />
      </div>
    )
  }
}

export default App
