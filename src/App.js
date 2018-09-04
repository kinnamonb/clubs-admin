import React, { Component } from "react";

import "./App.css";

import MeetingsListDialog from "./components/MeetingsListDialog";

export class App extends Component {
  state = {
    isOpen: true,
    clubs: [
      {
        meetings: [
          {
            from: 0,
            to: 8,
            except: [7],
            time: "7:30pm",
            dayOfWeek: 2,
            nth: 2
          },
          {
            from: 9,
            to: 11,
            except: [],
            time: "7:30pm",
            dayOfWeek: 3,
            nth: 3
          }
        ]
      }
    ]
  };

  componentDidUpdate() {
    console.dir(this.state);
  }

  render() {
    const { isOpen, clubs } = this.state;

    return (
      <MeetingsListDialog
        z={1}
        isOpen={isOpen}
        meetings={clubs[0].meetings}
        onSave={value => console.log(value)}
        onCancel={() => this.setState({ isOpen: false })}
      />
    );
  }
}

export default App;
