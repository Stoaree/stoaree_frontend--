import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FormField from "../FormField/FormField";

// CSS
import "./SignupFrom.css";

function validate(values) {
  let errors = {}

  if (!values.displayName) {
    errors.displayName = 'Required';
  } else if (values.displayName.length < 2) {
    errors.displayName = 'Must be above 2 characters'
  };

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid Email';
  };

  if (values.password !== values.confirmPassword) {
    errors.email = 'Passwords don\'t match'
  }
};

class SignupForm extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <div className="signup-container">
            <div className="signup-input-container">
              <Field name="firstName" component={FormField} type="text" label="First Name" />
            </div>
            <div className="signup-input-container">
              <Field name="lastName" component={FormField} type="text" label="Last Name" />
            </div>
            <div className="signup-input-container">
              <Field name="displayName" component={FormField} type="text" label="Display Name" />
            </div>

            <div className="signup-input-container">
              <Field name="email" component={FormField} type="email" label="Email Address" />
            </div>

            <div className="signup-input-container">
              <Field name="password" component={FormField} type="password" label="Password" />
              <Field name="confirmPassword" component={FormField} type="password" label="Confirm Password" />
            </div>
            
            <div className="signup-button-container">
              <button className="signup-button" type="submit" disabled={this.props.submitting}> Sign Up </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

SignupForm = reduxForm({ form: 'signup', validate })(SignupForm);

export default SignupForm;
