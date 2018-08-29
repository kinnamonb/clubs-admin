import React, { Component } from 'react'

import './css/ItemList.css'

import TrashButton from '../controls/TrashButton'
import AddListItemButton from '../controls/AddListItemButton'

export class ItemList extends Component {
  render() {
    const { onAdd } = this.props

    return (
      <div>
        {this.listItems()}
        <AddListItemButton onClick={() => onAdd()} />
      </div>
    )
  }

  listItems() {
    const { children } = this.props

    if (!children) { return null }

    return children.map((c, i) => (
      <div key={i} className='list-item'>
        {c}
        <TrashButton onClick={() => this.delete(i)} />
      </div>
    ))
  }

  delete(i) {
    this.props.onDelete(i)
  }
}

export default ItemList
