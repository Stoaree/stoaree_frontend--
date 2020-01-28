import React from "react";
import { Field, reduxForm } from "redux-form";

class StoryForm extends React.Component {
  renderField({ input, label, placeholder, type, meta: { touched, error } }) {
    return (
      <div>
        <label> {label} </label>

        <div>
          <input {...input} placeholder={placeholder || label} type={type} />
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
            <Field name="title" component={this.renderField} type="text" label="Title" />
            <Field name="description" component={this.renderField} type="text" label="Description" />
            <Field name="interviewee" component={this.renderField} type="email" label="Interviewee" placeholder="User's account email" />
            <Field name="tags" component={this.renderField} type="text" label="Tags" placeholder="Tags (separate by commas)" />
            <Field name="public" component={this.renderField} type="checkbox" label="Make public?" />
          </div>

          <div>
            Once you save, you will be redirected to the recording page.
            <button type="submit"> Save Story </button>
          </div>
        </form>
      </div>
    )
  }
}

StoryForm = reduxForm({ form: "story" })(StoryForm);

export default StoryForm;