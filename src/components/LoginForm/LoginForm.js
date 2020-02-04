import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FormField from "../FormField/FormField";

// CSS
import "./LoginForm.css";

class LoginForm extends React.Component {
  render() {

    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>

          <div className="login-container">

            <div className="login-container-field">
              <Field name="email" component={FormField} type="email" label="Email Address" />
            </div>

            <div className="login-container-field">
              <Field name="password" component={FormField} type="password" label="Password" />
            </div>
            <div className="login-button-container">
              <button type="submit" className="login-button"> Login </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
};

LoginForm = reduxForm({ form: 'login' })(LoginForm);

export default LoginForm;
