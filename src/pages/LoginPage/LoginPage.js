import React from 'react'
import axiosAPI from "../../api/stoareeAPI";
import Cookies from 'universal-cookie';
import { connect } from "react-redux";

import { setCurrentUser } from "../../redux/userReducer"

// Component
import LoginForm from './../../components/LoginForm/LoginForm.js';

const cookies = new Cookies();

function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser
  };
}

const mapDispatchToProps = {
  setCurrentUser
}
class LoginPage extends React.Component {

  onSubmit = (values) => {

    axiosAPI.post("/login", {
      email: values.email,
      password: values.password

    }).then(response => {
      const token = response.data.token;
      cookies.set("stoaree", token, { path: "/" })

      return window.location.reload();
    }).catch(error => {
      console.error(error);
    })
  };

  render() {
    return (
      <div>
        <h3> Lets start hearing your stories... </h3>
        <p>  Login</p>
        <LoginForm onSubmit={this.onSubmit} className="login-test" />
      </div>
    )
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);