import React from 'react';
import axiosAPI from "../../api/stoareeAPI.js";
import Cookies from 'universal-cookie';

// Component
import SignupForm from '../../components/SignupForm/SignupForm.js';

const cookies = new Cookies();
class SignupPage extends React.Component {

  onSubmit = (values) => {
    axiosAPI.post("/signup", {
      firstName: values.firstName,
      lastName: values.lastName,
      displayName: values.displayName,
      email: values.email,
      password: values.password
    }).then(response => {
      if (response.status === 200) {
        axiosAPI.post("/login", {
          email: values.email,
          password: values.password
        }).then(response => {
          const token = response.data.token;
          cookies.set(token, true, { path: "/" })
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  };

  render() {
    return (
      <div>
        <h3> SignUp Page </h3>
        <SignupForm onSubmit={this.onSubmit} initialValues={this.data} />
      </div>
    )
  }
};

export default SignupPage;