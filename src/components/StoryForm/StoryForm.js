import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";

class StoryForm extends React.Component {
  renderField({ input, label, placeholder, type, meta: { touched, error } }) {
    return (
      <div>
        <label>{label}</label>

        <div>
          <input {...input} placeholder={placeholder || label} type={type} />
          {touched && error && <span> {error} </span>}
        </div>
      </div>
    )
  };

  renderTags = ({ fields, meta: { error } }) => (
    <div>
      <label>Tags</label>
      <ul>
        <li>
          <button type="button" onClick={() => fields.push()}>
            Add Tag
        </button>
          {error && <span>{error}</span>}
        </li>
        {fields.map((tag, index) => (
          <li key={index}>
            <Field
              name={tag}
              type="text"
              component={this.renderField}
              placeholder="Tag"
            />
            <button
              type="button"
              title="Remove"
              onClick={() => fields.remove(index)}
            >Remove</button>
          </li>
        ))}
      </ul>
    </div>

  )

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>

          <div>
            <Field name="title" component={this.renderField} type="text" label="Title" />
            <Field name="description" component={this.renderField} type="text" label="Description" />
            <Field name="interviewee" component={this.renderField} type="email" label="Interviewee" placeholder="User's account email" />
            {/* <Field name="tags" component={this.renderField} type="text" label="Tags" placeholder="Tags (separate by commas)" /> */}
            <FieldArray name="tags" component={this.renderTags} />
            <Field name="public" component={this.renderField} type="checkbox" label="Make public?" />
            <Field name="image" component={this.renderField} type="file" label="Header image" />
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