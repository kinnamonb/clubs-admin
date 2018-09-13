import React, { Component } from "react";

import firebase from "../firebase";

export class Auth extends Component {
  componentDidMount() {
    window.fbAsyncInit = () => {
      this.FB = window.FB;
      this.FB.init({
        appId: "2174292932842816",
        cookie: true,
        xfbml: true,
        version: "v3.1"
      });

      this.FB.AppEvents.logPageView();

      this.FB.Event.subscribe("auth.login", response =>
        this.statusChange(response)
      );
      this.FB.Event.subscribe("auth.logout", response =>
        this.statusChange(response)
      );

      this.checkLogin();
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src =
        "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.1&appId=2174292932842816&autoLogAppEvents=1";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  render() {
    return (
      <div>
        <div
          className="fb-login-button"
          data-max-rows="1"
          data-size="medium"
          data-button-type="continue_with"
          data-show-faces="false"
          data-auto-logout-link="true"
          data-use-continue-as="true"
          data-scope="pages_show_list"
        />
      </div>
    );
  }

  checkLogin() {
    if (!this.FB) return;

    this.FB.getLoginStatus(response => this.statusChange(response));
  }

  statusChange(response) {
    if (response.status === "connected") {
      this.FB.api("/me/accounts", "GET", {}, r => {
        const index = r.data.findIndex(page => page.id === "178791702195984");
        if (index !== -1) {
          const credential = firebase.auth.FacebookAuthProvider.credential(
            response.authResponse.accessToken
          );
          firebase
            .auth()
            .signInAndRetrieveDataWithCredential(credential)
            .catch(error => console.error(error));
          this.props.onAuth(true);
        } else {
          firebase.auth().signOut();
          this.props.onAuth(false);
        }
      });
    } else {
      firebase.auth().signOut();
      this.props.onAuth(false);
    }
  }
}

export default Auth;
