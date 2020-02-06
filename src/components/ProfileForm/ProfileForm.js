import React from "react";
import { Field, reduxForm } from "redux-form";
import FormFileInput from "../FormFileInput/FormFileInput";
import FormField from "../FormField/FormField";

// CSS 
import "./ProfileForm.css";
class ProfileForm extends React.Component {
  render() {
    const { avatarURL } = this.props;
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>

          <div className="profile-form-container">
            <div className="profile-form-input-container">
              <Field name="email" component={FormField} type="email" label="Email"  />
            </div>

            <div className="profile-form-input-container">
              <Field name="firstName" component={FormField} type="text" label="First Name" />
            </div>

            <div className="profile-form-input-container">
              <Field name="lastName" component={FormField} type="text" label="Last Name" />
            </div>

            <div className="profile-form-input-container">
              <Field name="displayName" component={FormField} type="text" label="Display Name" />
            </div>

            <div className="profile-form-input-container">
              <Field name="location" component={FormField} type="text" label="Location" />
            </div>
          </div>
          
          <div className="profile-form-avatar-container">
            <label>Avatar</label>
            <div>
              {avatarURL && <img src={avatarURL} alt="Current avatar" />}
              <Field name="avatar" component={FormFileInput} />
            </div>
            <button type="submit" className="profile-form-submit-button">Update Profile</button>
          </div>
        </form>
      </div>
    )
  }
}

ProfileForm = reduxForm({ form: "profile" })(ProfileForm);

export default ProfileForm;