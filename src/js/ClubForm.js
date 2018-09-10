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
    selectedSpecialty: null,
    newClub: {}
  };

  club() {
    return Object.assign(this.props.club, this.state.newClub);
  }

  render() {
    const { selectedMeeting, selectedSpecialty } = this.state;
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
              value={club.name}
              placeholder="Club name"
              onChange={e => this.change("name", e.target.value)}
            />
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={club.location.address}
              placeholder="Full meeting address"
              onChange={e => this.change("location.address", e.target.value)}
            />
          </div>
          <div className="form-group">
            <h3 className="group-title">Leader</h3>
            <label htmlFor="leader-name">Name</label>
            <input
              type="text"
              id="leader-name"
              value={club.leader.name}
              placeholder="Leader name"
              onChange={e => this.change("leader.name", e.target.value)}
            />
            <label htmlFor="leader-phone">Phone</label>
            <input
              type="text"
              id="leader-phone"
              value={club.leader.phone}
              placeholder="Leader phone number"
              onChange={e => this.change("leader.phone", e.target.value)}
            />
            <label htmlFor="leader-email">Email</label>
            <input
              type="email"
              id="leader-email"
              value={club.leader.email}
              placeholder="Leader email"
              onChange={e => this.change("leader.email", e.target.value)}
            />
          </div>
          <div className="form-group">
            <h3 className="group-title">Meetings</h3>
            <List
              items={this.listMeetings()}
              editIndex={selectedMeeting}
              editPlaceholder="Nth day of week from month to month except month, etc..."
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
              editIndex={selectedSpecialty}
              editPlaceholder="Club specialty"
              onSave={value => this.saveSpecialty(value)}
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

  change(prop, value) {
    let club = { ...this.state.newClub };
    let props = prop.split(".");
    let targetProp = props.pop();
    let target = club;
    props.forEach(p => {
      if (!target[p]) {
        target[p] = {};
      }
      target = target[p];
    });
    target[targetProp] = value;
    this.setState({ newClub: club });
  }

  saveClub(e) {
    e.preventDefault();
    this.props.onSave(this.club());
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

    let newClub = { ...this.state.newClub };
    newClub.meetings = this.club().meetings;
    let newMeetings = [...newClub.meetings];
    newMeetings[this.state.selectedMeeting] = newMeeting;

    this.setState({ selectedMeeting: null, newClub: newClub });
  }

  selectMeeting(i) {
    this.setState({ selectedMeeting: i });
  }

  deleteMeeting(i) {
    let club = { ...this.state.newClub };
    club.meetings = [
      ...club.meetings.slice(0, i),
      ...club.meetings.slice(i + 1)
    ];
    this.setState({ selectedMeeting: null, newClub: club });
  }

  newSpecialty() {
    let club = { ...this.state.newClub };
    club.specialties = this.club().specialties;
    let index = 0;
    if (club.specialties) {
      index = club.specialties.push("") - 1;
    } else {
      club.specialties = [];
    }
    this.setState({ selectedSpecialty: index, newClub: club });
  }

  selectSpecialty(i) {
    this.setState({ selectedSpecialty: i });
  }

  saveSpecialty(value) {
    if (value === "") {
      this.deleteSpecialty(this.state.selectedSpecialty);
    } else {
      let club = { ...this.state.newClub };
      club.specialties = this.club().specialties;
      club.specialties[this.state.selectedSpecialty] = value;
      this.setState({ selectedSpecialty: null, newClub: club });
    }
  }

  deleteSpecialty(i) {
    let club = { ...this.state.newClub };
    club.specialties = [
      ...club.specialties.slice(0, i),
      ...club.specialties.slice(i + 1)
    ];
    this.setState({ selectedSpecialty: null, newClub: club });
  }
}

export default ClubForm;
