import React, { Component } from "react";

import "./App.css";

import { database } from "./firebase";

import Header from "./js/Header";
import ClubList from "./js/ClubList";

export class App extends Component {
  state = {
    clubs: []
  };

  componentDidMount() {
    database
      .collection("clubs")
      .get()
      .then(querySnapshot => {
        const clubs = querySnapshot.docs.map(doc => doc.data());
        this.setState({ clubs: clubs });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { clubs } = this.state;

    return (
      <div>
        <Header />
        <ClubList clubs={clubs} onDelete={i => this.deleteClub(i)} />
      </div>
    );
  }

  deleteClub(i) {
    console.log(`Deleting ${this.state.clubs[i].name}`);
  }
}

export default App;
