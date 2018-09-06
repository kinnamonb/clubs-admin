import React, { Component } from "react";

import List from "./List";
import Dialog from "./Dialog";

export class ClubForm extends Component {
  state = {
    selectedMeeting: null
  };

  render() {
    const { selectedMeeting } = this.state;
    const { club } = this.props;

    return (
      <div>
        <form onSubmit={e => this.saveClub(e)}>
          <div className="form-group">
            <h3 className="group-title">Club</h3>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              defaultValue={club.name || ""}
              placeholder="Club name"
            />
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              defaultValue={club.address}
              placeholder="Full meeting address"
            />
          </div>
          <div className="form-group">
            <h3 className="group-title">Leader</h3>
            <label htmlFor="leader-name">Name</label>
            <input
              type="text"
              id="leader-name"
              defaultValue={club.leader.name || ""}
              placeholder="Leader name"
            />
            <label htmlFor="leader-phone">Phone</label>
            <input
              type="text"
              id="leader-phone"
              defaultValue={club.leader.phone || ""}
              placeholder="Leader phone number"
            />
            <label htmlFor="leader-email">Email</label>
            <input
              type="email"
              id="leader-email"
              defaultValue={club.leader.email || ""}
              placeholder="Leader email"
            />
          </div>
          <div className="form-group">
            <h3 className="group-title">Meetings</h3>
            <List
              items={this.listMeetings()}
              onAdd={() => this.newMeeting()}
              onSelect={i => this.selectMeeting(i)}
              onDelete={i => this.deleteMeeting(i)}
            />
          </div>
          <div className="form-group">
            <h3 className="group-title">Specialties</h3>
            <List
              items={club.specialties || []}
              onAdd={() => this.newSpecialty()}
              onSelect={i => this.selectSpecialty(i)}
              onDelete={i => this.deleteSpecialty(i)}
            />
          </div>
          <div className="text-right">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
        {selectedMeeting !== null && (
          <Dialog
            title={this.meetingString(selectedMeeting)}
            onClose={value => this.closeMeetingEdit(value)}
          />
        )}
      </div>
    );
  }

  saveClub(e) {
    e.preventDefault();
  }

  meetingString(i) {
    const { club, months, days } = this.props;
    const meeting = club.meetings[i];
    const except = meeting.except
      .map(m => months[m])
      .reduce((prev, curr) => `${prev}, ${curr}`);

    return `${this.nthify(meeting.nth)} ${days[meeting.dayOfWeek]} from ${
      months[meeting.from]
    } to ${months[meeting.to]} except ${except}`;
  }

  nthify(n) {
    const tens = (n / 10) % 10;
    const ones = n % 10;

    let postfix = "th";
    if (tens !== 1) {
      if (ones === 1) {
        postfix = "st";
      } else if (ones === 2) {
        postfix = "nd";
      } else if (ones === 3) {
        postfix = "rd";
      }
    }

    return `${n}${postfix}`;
  }

  listMeetings() {
    const { club } = this.props;

    return club.meetings.map((m, i) => this.meetingString(i));
  }

  newMeeting() {}

  selectMeeting(i) {
    this.setState({ selectedMeeting: i });
  }

  deleteMeeting(i) {}

  closeMeetingEdit(value) {
    this.setState({ selectedMeeting: null });
  }

  newSpecialty() {}

  selectSpecialty(i) {}

  deleteSpecialty(i) {}
}

export default ClubForm;
