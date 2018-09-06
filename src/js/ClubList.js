import React, { Component } from "react";

import List from "./List";
import Dialog from "./Dialog";
import ClubForm from "./ClubForm";

export class ClubList extends Component {
  state = {
    selected: null
  };

  months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ];

  days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  render() {
    const { selected } = this.state;
    const { clubs } = this.props;
    const items = clubs.map(club => club.name);

    return (
      <div>
        <List
          items={items}
          onAdd={() => this.newClub()}
          onSelect={i => this.select(i)}
          onDelete={i => this.delete(i)}
        />
        {selected !== null && (
          <Dialog
            title={clubs[selected].name}
            onClose={value => this.handleClose(value)}
          >
            <ClubForm
              club={clubs[selected]}
              months={this.months}
              days={this.days}
            />
          </Dialog>
        )}
      </div>
    );
  }

  newClub() {}

  select(i) {
    this.setState({ selected: i });
  }

  delete(i) {
    this.props.onDelete(i);
    this.setState({ selected: null });
  }

  handleClose(value) {
    if (value) {
      console.log(`value = ${value}`);
    } else {
      console.log(`value not set`);
    }
    this.setState({ selected: null });
  }
}

export default ClubList;
