import React from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from "axios";

class LoginForm extends React.Component {

  renderField({ input, label, type, meta: {touched, error}}) {
    return (
      <div>
        <label> {label} </label>

        <div>
          <input {...input} placeholder={label} type={type} />
          {
            touched && ((error && <span> {error} </span>))
          }
        </div>
      </div>
    )
  };

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>

          <div>
            <Field name="email" component={this.renderField} type="email" label="Email Address" />
            <Field name="password" component={this.renderField} type="password" label="Password" />
          </div>

          <div>
            <button type="submit"> Login </button>
          </div>
        </form>
      </div>
    )
  }
};

LoginForm = reduxForm({form: 'login'})(LoginForm);

export default LoginForm;



