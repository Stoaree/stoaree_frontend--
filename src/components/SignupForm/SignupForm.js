import React from 'react';
import { Field, reduxForm } from 'redux-form';

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

class ContactForm extends React.Component {

  renderField({ input, label, type, meta: {touched, error, warning }}) {
    return (
      <div>
        <label> {label} </label>

        <div>
          <input {...input} placeholder={label} type={type} />
          {
            touched && 
            ((error && <span> {error} </span>) || 
            (warning && <span> {warning} </span>))
          }
        </div>
      </div>

    )
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
        
          <div>
            <Field name="firstName" component={this.renderField} type="text" label="First Name" />
            <Field name="lastName" component={this.renderField} type="text" label="Last Name" />
            <Field name= "displayName" component={this.renderField} type="text" label="Display Name" />
          </div>

          <div>
            <Field name="email" component={this.renderField} type="email" label="Email Address" />
          </div>

          <div>
            <Field name="password" component={this.renderField} type="password" label="Password" />
            <Field name="confirmPassword" component={this.renderField} type="password" label="Confirm Password" />
          </div>

          <div>
            <button type="submit" disabled={this.props.submitting}> Sign Up </button>
          </div>
        </form>
      </div>
    )
  }
}

ContactForm = reduxForm({ form: 'contact', validate })(ContactForm);

export default ContactForm;
