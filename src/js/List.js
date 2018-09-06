import React, { Component } from "react";

import "../css/List.css";

export class List extends Component {
  render() {
    const { onAdd } = this.props;
    if (!onAdd) {
      return null;
    }

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
    const { items, onSelect, onDelete } = this.props;
    if (!items || !onSelect) {
      return null;
    }

    return items.map((item, i) => (
      <div key={i} className="list-item">
        <button
          type="button"
          className="btn btn-list"
          onClick={() => onSelect(i)}
        >
          {item}
        </button>
        <button
          type="button"
          className="btn btn-delete"
          onClick={() => onDelete(i)}
        >
          X
        </button>
      </div>
    ));
  }
}

export default List;
