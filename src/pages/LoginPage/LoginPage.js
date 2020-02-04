import React from 'react'
import axiosAPI from "../../api/stoareeAPI";
import Cookies from 'universal-cookie';
import { connect } from "react-redux";

import { setCurrentUser } from "../../redux/userReducer"
import { setAlert, resetAlert } from "../../redux/alertReducer";

// Component
import LoginForm from './../../components/LoginForm/LoginForm.js';

// CSS
import "./LoginPage.css";

const cookies = new Cookies();

function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser
  };
}

const mapDispatchToProps = {
  setCurrentUser,
  setAlert,
  resetAlert
}

class LoginPage extends React.Component {
  onSubmit = (values) => {

    axiosAPI.post("/login", {
      email: values.email,
      password: values.password

    }).then(response => {
      const token = response.data.token;
      cookies.set("stoaree", token, { path: "/" })

      this.props.resetAlert();
      window.location.assign("/");

    }).catch(error => {
      console.error(error.response.data);
      this.props.setAlert(error.response.data);
    })
  };

  render() {
    return (
      <div className="login-container-page">
        <div className="login-text-container-page">
          <h3 className="login-text-page"> Let's start hearing your stories... </h3>
          <p className="login-text-page">  Login </p>
          {this.renderError()}
          <LoginForm onSubmit={this.onSubmit} className="login-test" />
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);