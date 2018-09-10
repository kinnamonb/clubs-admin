import React, { Component } from "react";

import List from "./List";
import Dialog from "./Dialog";
import ClubForm from "./ClubForm";
import Club from "./Club";

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
    let club = null;
    if (selected === -1) {
      club = { ...new Club() };
    } else if (selected !== null) {
      club = clubs[selected];
    }

    return (
      <div>
        <List
          items={items}
          onAdd={() => this.newClub()}
          onSelect={i => this.select(i)}
          onDelete={i => this.delete(i)}
        />
        {club !== null && (
          <Dialog
            title={club.name || "New Club"}
            onClose={value => this.handleClose(value)}
          >
            <ClubForm
              club={club}
              months={this.months}
              days={this.days}
              onSave={value => this.save(value)}
            />
          </Dialog>
        )}
      </div>
    );
  }

  newClub() {
    this.setState({ selected: -1 });
  }

  select(i) {
    this.setState({ selected: i });
  }

  save(value) {
    const index = this.state.selected || this.props.clubs.push(value) - 1;
    this.props.onChange(index, value);
    this.setState({ selected: null, newClub: false });
  }

  delete(i) {
    this.props.onDelete(i);
    this.setState({ selected: null });
  }

  handleClose(value) {
    this.setState({ selected: null });
  }
}

export default ClubList;
