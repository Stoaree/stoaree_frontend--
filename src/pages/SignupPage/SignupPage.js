import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

// Component
import SignupForm from '../../components/SignupForm/SignupForm.js';

const cookies = new Cookies();
class SignupPage extends React.Component {

  onSubmit = (values) => {
    axios.post("http://localhost:3001/signup", {
      firstName: values.firstName,
      lastName: values.lastName,
      displayName: values.displayName,
      email: values.email,
      password: values.password
    }).then(response => {
      if (response.status === 200) {
        axios.post("http://localhost:3001/login", {
          email: values.email,
          password: values.password
        }).then(response => {
          const token = response.data.token;
          cookies.set(token, true, { path: "/" })
        })
      }
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