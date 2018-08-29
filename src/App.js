import React, { Component } from 'react'

import './App.css'

import SpecialtyItemList from './components/SpecialtyItemList'

export class App extends Component {
  state = { specialties: ['one', 'two', 'three'] }

  render() {
    const { specialties } = this.state
    const options = [ 'one', 'two', 'three', 'four', 'five' ]

    return (
      <div>
        <SpecialtyItemList
          specialties={specialties}
          options={options}
          onChange={specialties => this.setState({ specialties: specialties })} />
      </div>
    )
  }
}

export default App
