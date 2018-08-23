import React, { Component } from 'react'

export class Button extends Component {
  render() {
    const { children, isPrimary=false, onClick } = this.props
    const cls = isPrimary ? 'btn btn-primary' : 'btn'
    return (
      <a className={cls} onClick={onClick}>
        <div>
          {children}
        </div>
      </a>
    )
  }
}

export default Button

