import React, { Component } from "react";

import "./App.css";

import { database } from "./firebase";

import Header from "./js/Header";
import ClubList from "./js/ClubList";

export class App extends Component {
  state = {
    clubs: [],
    keys: {}
  };

  componentDidMount() {
    database
      .collection("clubs")
      .orderBy("name")
      .onSnapshot(querySnapshot => {
        const keys = {};
        const clubs = querySnapshot.docs.map((doc, i) => {
          keys[i] = doc.id;
          return doc.data();
        });
        this.setState({ clubs: clubs, keys: keys });
      });
  }

  render() {
    const { clubs } = this.state;

    return (
      <div>
        <Header />
        <ClubList
          clubs={clubs}
          onChange={(i, value) => this.changeClub(i, value)}
          onDelete={i => this.deleteClub(i)}
        />
      </div>
    );
  }

  changeClub(i, value) {
    const { keys } = this.state;

    const url = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBqqzlzQIcS9FxvI672fllCpIXVNOO45Vk&address=${
      value.location.address
    } Carroll County MD`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        value.location = Object.assign(
          value.location,
          data.results[0].geometry.location
        );
      })
      .then(() => {
        if (keys[i]) {
          database
            .collection("clubs")
            .doc(keys[i])
            .set(value);
        } else {
          database.collection("clubs").add(value);
        }
      });
  }

  deleteClub(i) {
    const { keys } = this.state;
    database
      .collection("clubs")
      .doc(keys[i])
      .delete();
  }
}

export default App;
