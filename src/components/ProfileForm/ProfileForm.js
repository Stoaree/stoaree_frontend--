import React from "react";
import { Field, reduxForm } from "redux-form";
import FormFileInput from "../FormFileInput/FormFileInput";
import FormField from "../FormField/FormField";

class ProfileForm extends React.Component {
  render() {
    const { avatarURL } = this.props;
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>

          <div>
            <Field name="email" component={FormField} type="email" label="Email" />
            <Field name="firstName" component={FormField} type="text" label="First Name" />
            <Field name="lastName" component={FormField} type="text" label="Last Name" />
            <Field name="displayName" component={FormField} type="text" label="Display Name" />
            <Field name="location" component={FormField} type="text" label="Location" />
            <label>Avatar</label>
            <div>
              {avatarURL && <img src={avatarURL} alt="Current avatar" />}
              <Field name="avatar" component={FormFileInput} />
            </div>
            <button type="submit">Update Profile</button>
          </div>
        </form>
      </div>
    )
  }
}

ProfileForm = reduxForm({ form: "profile" })(ProfileForm);

export default ProfileForm;