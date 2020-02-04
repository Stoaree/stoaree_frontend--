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
            <Field name="email" component={FormField} type="email" label="Email Address" className="input-field"/>
            <Field name="password" component={FormField} type="password" label="Password" className="input-field"/>
          
            <button type="submit"> Login </button>
          </div>
        </form>
      </div>
    )
  }
};

LoginForm = reduxForm({ form: 'login' })(LoginForm);

export default LoginForm;
