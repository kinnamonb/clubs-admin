import React, { Component } from "react";

import "../css/Header.css";
import Logo from "../img/ume_4h_logo.png";

export class Header extends Component {
  render() {
    return (
      <header>
        <div>
          <img src={Logo} alt="UME 4-H Logo" />
        </div>
        <div>
          <h1>Club List Manager</h1>
        </div>
        <div>
          <a onClick={e => this.login()}>Login</a>
        </div>
      </header>
    );
  }
}

export default Header;
