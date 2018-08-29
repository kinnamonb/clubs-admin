import React, { Component } from 'react'

import Dialog from './Dialog'
import ItemList from './ItemList'
import AutoTextbox from '../controls/AutoTextbox'
import SaveButton from '../controls/SaveButton'
import ListItemButton from '../controls/ListItemButton'
import ConfirmDialog from './ConfirmDialog'

export class SpecialtyItemList extends Component {
  state = {
    selected: null,
    specialties: [...this.props.specialties],
    values: [...this.props.specialties],
    confirming: null
  }

  render() {
    const { confirming } = this.state
    const { isOpen, onCancel } = this.props

    return (
      <Dialog
        title='Specialties'
        isOpen={isOpen}
        onClose={() => onCancel()}>
        <ItemList
          onAdd={() => this.createNew()}
          onDelete={i => this.confirmDeleteItem(i)}>
          {this.list()}
        </ItemList>
        <SaveButton onClick={() => this.save()} />
        <ConfirmDialog
          z={10}
          isOpen={(confirming !== null)}
          prompt='Are you sure you want to delete this item?'
          onConfirm={() => this.deleteItem(confirming)}
          onCancel={() => this.setState({ confirming: null })}/>
      </Dialog>
    )
  }

  deleteItem(i) {
    const { specialties } = this.state
    this.setState({
      specialties: [
        ...specialties.slice(0, i),
        ...specialties.slice(i + 1)
      ],
      confirming: null
    })
  }

  confirmDeleteItem(i) {
    this.setState({ confirming: i })
  }

  setItems(items) {
    this.props.onChange(items)
  }

  list() {
    const { options } = this.props
    const { specialties, selected } = this.state

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
    const { specialties } = this.state

    this.setState({
      specialties: [...specialties, ''],
      selected: specialties.length
    })
  }

  storeValue(i, value) {
    const values = [...this.state.values]
    values[i] = value
    this.setState({ values: values })
  }

  commitValue(e, i) {
    if (e) { e.preventDefault() }
    const newSpecialties = [...this.state.specialties]
    newSpecialties[i] = this.state.values[i]
    this.setState({ selected: null, specialties: newSpecialties })
  }

  save() {
    this.props.onSave(this.state.specialties)
  }

  select(i) {
    this.commitValue(null, this.state.selected)
    this.setState({ selected: i })
  }
}

export default SpecialtyItemList
