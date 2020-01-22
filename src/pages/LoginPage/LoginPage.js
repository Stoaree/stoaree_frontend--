import React from 'react'

// Component
import LoginForm from './../../components/LoginForm/LoginForm.js';

class LoginPage extends React.Component {

  onSubmit = (values) => {
    console.log(values);
  }

  render() {
    return (
      <div>
        <h3> Login Page </h3>
        <LoginForm onSubmit={this.onSubmit} />
      </div>
    )
  }
}
export default LoginPage;