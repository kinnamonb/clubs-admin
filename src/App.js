import React, { Component } from 'react'

import './App.css'

import ItemList from './components/ItemList'

export class App extends Component {
  state = { items: ['one', 'two', 'three'] }

  render() {
    const { items } = this.state

    return (
      <div>
        <ItemList
          items={items}
          onChange={items => this.setState({ items: items })} />
      </div>
    )
  }
}

export default App
