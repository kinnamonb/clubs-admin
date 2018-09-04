import React, { Component } from "react";

import "./css/Dialog.css";

import DialogTitle from "./DialogTitle";

export class Dialog extends Component {
  render() {
    const { z = 1, title = "", children = null, isOpen = false } = this.props;

    if (isOpen) {
      return (
        <div
          style={{ zIndex: z }}
          className="dialog-wrapper"
          tabIndex={-1}
          onKeyDown={e => this.handleKeyDown(e)}
          onClick={e => this.handleWrapperClick(e)}
        >
          <div className="dialog">
            <DialogTitle onClose={() => this.close()}>{title}</DialogTitle>
            <div className="dialog-body">{children}</div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  handleKeyDown(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  handleWrapperClick(e) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  close() {
    this.props.onClose();
  }
}

export default Dialog;
