import React, { Component } from 'react'

import './css/ItemList.css'

import ListItemButton from '../controls/ListItemButton'
import TrashButton from '../controls/TrashButton'
import AddListItemButton from '../controls/AddListItemButton'

export class ItemList extends Component {
  render() {
    return (
      <div>
        {this.listItems()}
        <AddListItemButton onClick={() => console.log('new')} />
      </div>
    )
  }

  listItems() {
    const { items } = this.props

    if (!items) { return null }

    return items.map((item, i) => (
      <div key={i} className='list-item'>
        <ListItemButton onClick={() => console.log(i)}>
          {item}
        </ListItemButton>
        <TrashButton onClick={() => this.delete(i)} />
      </div>
    ))
  }

  setItems(newItems) {
    this.props.onChange(newItems)
  }

  delete(i) {
    const { items } = this.props
    this.setItems([...items.slice(0,i), ...items.slice(i+1)])
  }
}

export default ItemList
