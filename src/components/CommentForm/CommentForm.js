import React from "react";
import { Field, reduxForm } from "redux-form";


// Components
import Button from "../Button/Button";

// CSS
import "./CommentForm.css";

function validate(values) {
  let errors = {};

  if (!values.text) {
    errors.text = "Required";
  }

  return errors;
}

class CommentForm extends React.Component {
  renderField({ meta: { touched, error } }) {
    return (
      <div>
        <Field
          name="text"
          component="textarea"
          placeholder="Write your comment here..."
        />
        {touched && error && <span> {error} </span>}
      </div>
    );
  }

  render() {
    return (
      <div className="comment-form-container">
        <form onSubmit={this.props.handleSubmit}>
          <h3>Add Comment</h3>
          <div className="input-field-container">
            <Field
              name="text"
              component={this.renderField}
              placeholder="Write your comment here..."
            />
          </div>
          <Button type="submit">
            Post Comment
          </Button>
        </form>
      </div>
    );
  }
}

CommentForm = reduxForm({ form: "comment", validate })(CommentForm);

export default CommentForm;
