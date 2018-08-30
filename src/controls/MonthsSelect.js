import React, { Component } from 'react'

import './css/MonthsSelect.css'

import AutoTextbox from './AutoTextbox'
import Button from './Button'

export class MonthsSelect extends Component {
  state = { from: 0, to: 11, except: [] }

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December']

  render() {
    return (
      <div className='months-wrapper'>
        <div className='months-controls'>
          <AutoTextbox
            label='From'
            value={this.months[this.state.from]}
            options={this.months}
            onChange={value => this.startAt(value)} />
          <AutoTextbox
            label='To'
            value={this.months[this.state.to]}
            options={this.months}
            onChange={value => this.endAt(value)} />
        </div>
        <div className='months-view'>
          <p>Select a month to exclude it</p>
          <div className='months'>
            {this.listMonths()}
          </div>
        </div>
      </div>
    )
  }

  listMonths() {
    const { from, to, except } = this.state

    return this.months.map((m, i) => {
      const isSelected = (i >= from && i <= to && !except.includes(i))

      return (
        <div key={i} className='month'>
          <Button
            customClass={isSelected ? 'selected' : ''}
            onClick={e => this.select(i)}>
            {i+1}
          </Button>
        </div>
      )
    })
  }

  startAt(month) {
    const index = this.months.indexOf(month)

    if (index !== -1) {
      this.makeChange({
        from: this.months.indexOf(month),
        except: this.state.except.filter(i => i > index)
      })
    }
  }

  endAt(month) {
    const index = this.months.indexOf(month)

    if (index !== -1) {
      this.makeChange({
        to: this.months.indexOf(month),
        except: this.state.except.filter(i => i < index)
      })
    }
  }

  select(i) {
    const { from, to, except } = this.state

    if (i > from && i < to) {
      const index = except.indexOf(i)
      if (index === -1) {
        this.makeChange({ except: [...except, i] })
      } else {
        this.makeChange({ except: [
          ...except.slice(0, index),
          ...except.slice(index+1)
        ] })
      }
    }
  }

  makeChange(newState) {
    this.setState(newState)
    this.props.onChange(this.state)
  }
}

export default MonthsSelect
