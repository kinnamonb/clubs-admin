import React, { Component } from "react";

import List from "./List";
import Meeting from "./Meeting";

export class ClubForm extends Component {
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

  state = {
    selectedMeeting: null,
    newClub: {}
  };

  club() {
    return Object.assign(this.props.club, this.state.newClub);
  }

  render() {
    const { selectedMeeting } = this.state;
    const club = this.club();

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
              editIndex={selectedMeeting}
              onSave={value => this.saveMeeting(value)}
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
      </div>
    );
  }

  saveClub(e) {
    e.preventDefault();
  }

  meetingString(i) {
    const club = this.club();
    const { months, days } = this.props;
    const meeting = club.meetings[i];
    const except =
      meeting.except.length === 0
        ? ""
        : "except " +
          meeting.except
            .map(m => months[m])
            .reduce((prev, curr) => `${prev}, ${curr}`);

    return `${this.nthify(meeting.nth)} ${days[meeting.dayOfWeek]} from ${
      months[meeting.from]
    } to ${months[meeting.to]} ${except}`;
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
    const club = this.club();

    return club.meetings.map((m, i) => this.meetingString(i));
  }

  newMeeting() {
    const club = this.club();

    const index = club.meetings.push(new Meeting()) - 1;
    this.setState({ selectedMeeting: index, newClub: club });
  }

  saveMeeting(value) {
    const userInput = value.toLowerCase();
    const nthRegex = /([0-9]+)(?:st|nd|rd|th) ([a-z]+)/;
    const fromRegex = /from ([^\s]+)/;
    const toRegex = /to ([^\s]+)/;
    const exceptRegex = /except ([a-z]+)(?:, ([a-z]+))*/;

    const nthArray = nthRegex.exec(userInput);
    if (!nthArray || nthArray.length !== 3) {
      return;
    }
    const nth = parseInt(nthArray[1], 10);
    const dayOfWeek = nthArray[2];

    const fromArray = fromRegex.exec(userInput);
    if (!fromArray || fromArray.length !== 2) {
      return;
    }
    const from = fromArray[1];

    const toArray = toRegex.exec(userInput);
    if (!toArray || toArray.length !== 2) {
      return;
    }
    const to = toArray[1];

    const exceptArray = exceptRegex.exec(userInput);
    if (exceptArray && exceptArray.length < 3) {
      return;
    }
    const except = exceptArray
      ? exceptArray.filter(e => e !== undefined && !e.startsWith("except"))
      : [];

    const newMeeting = {
      nth: nth,
      dayOfWeek: this.days.findIndex(d =>
        dayOfWeek.startsWith(d.toLowerCase())
      ),
      from: this.months.findIndex(m => from.startsWith(m.toLowerCase())),
      to: this.months.findIndex(m => to.startsWith(m.toLowerCase())),
      except: except.map(e =>
        this.months.findIndex(m => e.startsWith(m.toLowerCase()))
      )
    };

    let newClub = this.club();
    let newMeetings = [...newClub.meetings];
    newMeetings[this.state.selectedMeeting] = newMeeting;

    this.setState({ selectedMeeting: null, newClub: newClub });
  }

  selectMeeting(i) {
    this.setState({ selectedMeeting: i });
  }

  deleteMeeting(i) {
    let club = this.club();
    club.meetings = [
      ...club.meetings.slice(0, i),
      ...club.meetings.slice(i + 1)
    ];
    this.setState({ newClub: club });
  }

  closeMeetingEdit(value) {
    this.setState({ selectedMeeting: null });
  }

  newSpecialty() {}

  selectSpecialty(i) {}

  deleteSpecialty(i) {}
}

export default ClubForm;
