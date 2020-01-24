import React from 'react';
import { Field, reduxForm } from 'redux-form';

class UserForm extends React.Component {

  render () {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            <Field name="firstName" component={this.renderField} type="text" />
          </div>
        </form>
      </div>
    )
  }
};