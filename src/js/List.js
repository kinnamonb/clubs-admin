import React, { Component } from "react";

import "../css/List.css";

export class List extends Component {
  render() {
    const { onAdd } = this.props;

    return (
      <div className="list-wrapper">
        {this.listItems()}
        <button
          type="button"
          className="btn btn-list btn-add"
          onClick={() => onAdd()}
        >
          + Add New
        </button>
      </div>
    );
  }

  listItems() {
    const { items, editIndex, onSelect, onDelete } = this.props;

    return items.map((item, i) => {
      if (editIndex === i) {
        return (
          <div key={i} className="list-item">
            <div className="inline-form">
              <input
                ref={el => (this.inputElement = el)}
                type="text"
                defaultValue={item}
                autoFocus={true}
                placeholder="Nth ???day from month to month except month, month, ..."
                onKeyDown={e => this.handleKeyDown(e)}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.saveItem()}
              >
                Save
              </button>
            </div>
          </div>
        );
      } else {
        return (
          <div key={i} className="list-item">
            <button
              type="button"
              className="btn btn-list"
              onClick={() => onSelect(i)}
            >
              {item}
            </button>
            <button
              type="buttom"
              className="btn btn-delete"
              onClick={() => onDelete(i)}
            >
              X
            </button>
          </div>
        );
      }
    });
  }

  handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.saveItem();
    }
  }

  saveItem() {
    this.props.onSave(this.inputElement.value);
  }
}

export default List;
