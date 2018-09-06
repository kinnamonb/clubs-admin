import React, { Component } from "react";

import "../css/Dialog.css";

export class Dialog extends Component {
  render() {
    const { title, children, onClose } = this.props;
    return (
      <div className="dialog-wrapper">
        <div className="dialog">
          <div className="dialog-header">
            <h2 className="dialog-title">{title}</h2>
            <button
              type="button"
              className="btn btn-close"
              onClick={() => onClose()}
            >
              X
            </button>
          </div>
          <div className="dialog-body">{children}</div>
        </div>
      </div>
    );
  }
}

export default Dialog;
