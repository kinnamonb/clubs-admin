import React, { Component } from 'react'

import './App.css'

import SpecialtyDialog from './components/SpecialtyDialog'

export class App extends Component {
  state = {
    specialties: ['one', 'two', 'three'],
    sdIsOpen: true
  }

  componentDidUpdate() {
    console.dir(this.state)
  }

  render() {
    const { specialties, sdIsOpen } = this.state
    const options = [ 'one', 'two', 'three', 'four', 'five' ]

    return (
      <div>
        <SpecialtyDialog
          isOpen={sdIsOpen}
          specialties={specialties}
          options={options}
          onSave={specialties => this.setState({ specialties: specialties })}
          onCancel={() => this.setState({ sdIsOpen: false })} />
      </div>
    )
  }
}

export default App
