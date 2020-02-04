import React from 'react';
import axiosAPI from "../../api/stoareeAPI.js";
import Cookies from 'universal-cookie';

// Component
import SignupForm from '../../components/SignupForm/SignupForm.js';

// CSS 
import "./SignupPage.css";

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
      <div className="signup-container-page">
        <div className="signup-text-container-page">
          <h3 className="signnup-text-page"> Let's hear about your stories... </h3>
          <p className="signnup-text-page"> Please fill in the information below </p>
          <SignupForm onSubmit={this.onSubmit} initialValues={this.data} />
        </div>
      </div>
    )
  }
};

export default SignupPage;