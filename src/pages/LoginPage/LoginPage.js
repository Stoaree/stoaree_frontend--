import React from 'react'
import axiosAPI from "../../api/stoareeAPI";
import Cookies from 'universal-cookie';

// Component
import LoginForm from './../../components/LoginForm/LoginForm.js';

const cookies = new Cookies();
class LoginPage extends React.Component {

  onSubmit = (values) => {

    axiosAPI.post("/login", {
      email: values.email,
      password: values.password
    }).then(response => {
      console.log(response)
      const token = response.data.token;
      cookies.set(token, true, { path: "/" })
      axiosAPI.defaults.headers.common['Authorization'] = token;
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