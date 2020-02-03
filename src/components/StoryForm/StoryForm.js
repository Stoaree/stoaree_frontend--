import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import FormFileInput from "../FormFileInput/FormFileInput"
import FormField from "../FormField/FormField";

function validate(values) {
  let errors = {};
  const FILE_SIZE_LIMIT = 200; // in kb
  const FILE_TYPES = ["image/jpg", "image/jpeg", "image/png"];

  if (!values.title) {
    errors.title = 'Required';
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.interviewee)) {
    errors.email = 'Invalid email address'
  }

  if (!values.age) {
    errors.age = 'Required';
  }

  if (values.image) {
    if (values.image.size > (FILE_SIZE_LIMIT * 1024)) {
      errors.image = `Must be smaller than ${FILE_SIZE_LIMIT} KB`;
    }

    if (!FILE_TYPES.includes(values.image.type)) {
      errors.image = "File type must be .jpg, .jpeg or .png"
    }
  }
  return errors;
}

class StoryForm extends React.Component {
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
            <Field name="title" component={FormField} type="text" label="Title" />
            <label>Description</label>
            <div><Field name="description" component="textarea" placeholder="Description" /></div>
            <Field name="interviewee" component={FormField} type="email" label="Interviewee" placeholder="User's account email" />
            <FieldArray name="tags" component={this.renderTags} />
            <Field name="public" component={FormField} type="checkbox" label="Make public?" />
            <label>Header image</label>
            <div><Field name="image" component={FormFileInput} /></div>
          </div>

          <div>
            Once you save, you will be redirected to the questions so you can start recording.<br />
            <button type="submit"> Save Story </button>
          </div>
        </form>
      </div>
    )
  }
}

StoryForm = reduxForm({ form: "story", validate })(StoryForm);

export default StoryForm;