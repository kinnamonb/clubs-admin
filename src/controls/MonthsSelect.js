import React, { Component } from 'react'

import './css/MonthsSelect.css'

import AutoTextbox from './AutoTextbox'
import Button from './Button'

export class MonthsSelect extends Component {
  state = { start: 0, end: 11, except: [] }

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  render() {
    return (
      <div className='months-wrapper'>
        <div className='months-controls'>
          <AutoTextbox
            label='Starting'
            value={this.months[this.state.start]}
            options={this.months}
            onChange={value => this.startAt(value)} />
          <AutoTextbox
            label='Ending'
            value={this.months[this.state.end]}
            options={this.months}
            onChange={value => this.endAt(value)} />
        </div>
        <div className='months-view'>
          <p>Click a month to exclude it</p>
          {this.listMonths()}
        </div>
      </div>
    )
  }

  listMonths() {
    const { start, end, except } = this.state

    return this.months.map((m, i) => {
      const isSelected = (i >= start && i <= end && !except.includes(i))

      return (
        <Button
          key={i}
          customClass={isSelected ? 'selected' : ''}
          onClick={e => this.select(i)}>
          {m}
        </Button>
      )
    })
  }

  startAt(month) {
    const index = this.months.indexOf(month)
    if (index !== -1) {
      this.setState({
        start: this.months.indexOf(month),
        except: this.state.except.filter(i => i > index)
      })
    }
  }

  endAt(month) {
    const index = this.months.indexOf(month)
    if (index !== -1) {
      this.setState({
        end: this.months.indexOf(month),
        except: this.state.except.filter(i => i < index)
      })
    }
  }

  select(i) {
    const { start, end, except } = this.state

    if (i > start && i < end) {
      const index = except.indexOf(i)
      if (index === -1) {
        this.setState({ except: [...except, i] })
      } else {
        this.setState({ except: [
          ...except.slice(0, index),
          ...except.slice(index+1)
        ] })
      }
    }
  }
}

export default MonthsSelect
