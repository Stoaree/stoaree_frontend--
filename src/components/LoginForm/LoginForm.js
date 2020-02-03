import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FormField from "../FormField/FormField";

class LoginForm extends React.Component {
  render() {

    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>

          <div>
            <Field name="email" component={FormField} type="email" label="Email Address" />
            <Field name="password" component={FormField} type="password" label="Password" />
          </div>

          <div>
            <button type="submit"> Login </button>
          </div>
        </form>
      </div>
    )
  }
};

LoginForm = reduxForm({ form: 'login' })(LoginForm);

export default LoginForm;
