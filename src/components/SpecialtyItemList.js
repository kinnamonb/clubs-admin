import React, { Component } from 'react'

import ItemList from './ItemList'
import AutoTextbox from '../controls/AutoTextbox'
import SaveButton from '../controls/SaveButton'
import ListItemButton from '../controls/ListItemButton'

export class SpecialtyItemList extends Component {
  state = {
    selected: null,
    values: [...this.props.specialties]
  }

  render() {
    return (
      <ItemList
        onAdd={() => this.createNew()}
        onDelete={i => this.deleteItem(i)}>
        {this.list()}
      </ItemList>
    )
  }

  deleteItem(i) {
    const { specialties } = this.props
    this.setItems([
      ...specialties.slice(0, i),
      ...specialties.slice(i + 1)
    ])
  }

  setItems(items) {
    this.props.onChange(items)
  }

  list() {
    const { specialties, options } = this.props
    const { selected } = this.state

    return specialties.map((s, i) => {
      if (i === selected) {
        return (
          <form
            key={i}
            className='inline-form'
            onSubmit={e => this.commitValue(e, i)}>
            <AutoTextbox
              value={s}
              placeholder='Specialty'
              options={options}
              onChange={value => this.storeValue(i, value)} />
            <SaveButton onClick={e => this.commitValue(e, i)} />
          </form>
        )
      } else {
        return (
          <ListItemButton
            key={i}
            onClick={() => this.select(i)}>
            {s}
          </ListItemButton>
        )
      }
    })
  }

  createNew() {
    const newSpecialties = [...this.props.specialties, '']
    const index = this.props.specialties.length
    this.props.onChange(newSpecialties)
    this.setState({ selected: index })
  }

  storeValue(i, value) {
    const values = [...this.state.values]
    values[i] = value
    this.setState({ values: values })
  }

  commitValue(e, i) {
    if (e) { e.preventDefault() }
    const newSpecialties = [...this.props.specialties]
    newSpecialties[i] = this.state.values[i]
    this.props.onChange(newSpecialties)
    this.setState({ selected: null })
  }

  select(i) {
    this.commitValue(null, this.state.selected)
    this.setState({ selected: i })
  }
}

export default SpecialtyItemList
