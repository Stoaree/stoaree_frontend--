import React from 'react'
import axios from "axios";
import Cookies from 'universal-cookie';

// Component
import LoginForm from './../../components/LoginForm/LoginForm.js';

const cookies = new Cookies();
class LoginPage extends React.Component {

  onSubmit = (values) => {
    axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password
    }).then(response => {
      const token = response.data.token;
      cookies.set(token, true, {path: "/"})
      console.log(cookies.get(token))


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
export default LoginPage;