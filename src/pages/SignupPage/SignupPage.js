import React from 'react';

// Component
import SignupForm from '../../components/SignupForm/SignupForm.js';

class SignupPage extends React.Component {

  onSubmit = (values) => {
    console.log(values.displayName);
  };

  render() {
    return (
      <div>
        <h3> SignUp Page </h3>
        <SignupForm onSubmit={this.onSubmit} initialValues={this.data} />
      </div>
    )
  }
};

export default SignupPage;