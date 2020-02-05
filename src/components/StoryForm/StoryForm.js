import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import FormFileInput from "../FormFileInput/FormFileInput"
import FormField from "../FormField/FormField";

// CSS 
import "./StoryForm.css";

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

  renderSubmit = () => {
    if (this.props.editing) {
      return (
        <div className="story-form-container">
          <button type="submit" className="create-story-button">Update Story</button>
        </div>
      )
    }
    else {
      return (
        <div className="story-form-container">
          <p>Once you save, you will be redirected to the questions so you can start recording.</p>
          <button type="submit" className="create-story-button"> Save Story </button>
        </div>
      )
    }
  }

  render() {
    const { imageURL } = this.props;

    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>

          <div className="story-form-container">
            <div className="story-form-input-container">
              <Field name="title" component={FormField} type="text" label="Title" />
            </div>

            <div className="story-form-input-container">
              <Field name="description" component={FormField} placeholder="Description" label="Description"/>
            </div>

            <div className="story-form-input-container">
              <Field name="interviewee" component={FormField} type="email" label="Interviewee" placeholder="User's account email" />
            </div>

            

            <div className="story-form-click-ables-container">
              <ol className="story-form-click-ables">
                <FieldArray name="tags" component={this.renderTags} />
              </ol>

              <ol className="story-form-click-ables">
                <Field name="isPublic" component={FormField} type="checkbox" label="Make public?" />
              </ol>

              <ol className="story-form-click-ables">
                <label for="imageHeader"> Header Image </label>
                {imageURL && <img src={imageURL} alt="Current story header" />}
                <Field name="image" label="Header Image" component={FormFileInput} id="imageHeader" />
              </ol>
            </div>

            {this.renderSubmit()}
          </div>
        </form>
      </div>
    )
  }
}

StoryForm = reduxForm({ form: "story", validate })(StoryForm);

export default StoryForm;