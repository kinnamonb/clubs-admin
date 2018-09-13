import React, { Component } from "react";

import "../css/Header.css";
import Logo from "../img/ume_4h_logo.png";

import Auth from "./Auth";

export class Header extends Component {
  render() {
    const { onAuth } = this.props;

    return (
      <header>
        <div>
          <img src={Logo} alt="UME 4-H Logo" />
        </div>
        <div>
          <h1>Club List Manager</h1>
        </div>
        <div>
          <Auth onAuth={isAuth => onAuth(isAuth)} />
        </div>
      </header>
    );
  }
}

export default Header;
