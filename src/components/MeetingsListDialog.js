import React, { Component } from "react";

import Dialog from "./Dialog";
import MeetingDetailsDialog from "./MeetingDetailsDialog";
import ItemList from "./ItemList";
import ListItemButton from "../controls/ListItemButton";
import SaveButton from "../controls/SaveButton";

export class MeetingsListDialog extends Component {
  state = {
    selected: null,
    changes: {}
  };

  render() {
    const { meetings, isOpen, z } = this.props;
    const { selected } = this.state;

    return (
      <div>
        <Dialog
          title="Meetings"
          isOpen={isOpen}
          onAdd={() => this.addMeeting()}
          onClose={() => this.cancel()}
        >
          <ItemList>{this.listItems()}</ItemList>
          <SaveButton onClick={() => this.save()} />
        </Dialog>
        <MeetingDetailsDialog
          z={z + 1}
          isOpen={selected !== null}
          meeting={meetings[selected]}
          onSave={m => this.saveMeeting(m)}
          onCancel={() => this.setState({ selected: null })}
        />
      </div>
    );
  }

  listItems() {
    const { meetings = [] } = this.props;

    return meetings.map((m, i) => (
      <ListItemButton key={i} onClick={() => this.select(i)}>
        {m.from} - {m.to}
        (except: {m.except})
      </ListItemButton>
    ));
  }

  addMeeting() {}

  saveMeeting(meeting) {
    const { changes, selected } = this.state;
    const newChanges = [changes];
    newChanges[selected] = Object.assign(newChanges[selected], meeting);
    this.setState({ changes: newChanges });
  }

  select(i) {
    this.setState({ selected: i });
  }

  save() {
    this.props.onSave(this.state.changes);
  }

  cancel() {
    console.log("closing");
    // this.props.onCancel();
  }
}

export default MeetingsListDialog;
