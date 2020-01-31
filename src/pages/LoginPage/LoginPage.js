import React from 'react'
import axiosAPI from "../../api/stoareeAPI";
import Cookies from 'universal-cookie';
import {connect} from "react-redux";

import {setCurrentUser} from "../../redux/userReducer"
import {getUserData} from "../../services/getUserData"

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
      cookies.set(token, true, { path: "/" })

      getUserData(response.data.user_id).then(response => {
        this.props.setCurrentUser(response.data)
      })
      
      axiosAPI.defaults.headers.common['Authorization'] = token;
    }).catch(error => {
      console.error(error);
    })
  };

  render() {
    return (
      <div>
        <h3> Login Page </h3>
        <LoginForm onSubmit={this.onSubmit} />
      </div>
    )
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);