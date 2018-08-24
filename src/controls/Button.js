import React, { Component } from 'react'

import './css/Button.css'

export class Button extends Component {
  render() {
    const {
      children,
      isPrimary=false,
      isIcon=false,
      isListItem=false,
      onClick } = this.props

    let cls = 'btn'
    if (isPrimary) { cls += ' btn-primary' }
    if (isIcon) { cls += ' btn-icon' }
    if (isListItem) { cls += ' btn-list-item' }

    return (
      <a className={cls} onMouseDown={onClick}>
        {children}
      </a>
    )
  }
}

export default Button

