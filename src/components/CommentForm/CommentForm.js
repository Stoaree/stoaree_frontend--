import React from "react";
import { Field, reduxForm } from "redux-form";

function validate(values) {
  let errors = {};

  if (!values.text) {
    errors.text = "Required"
  }

  return errors;
}

class CommentForm extends React.Component {
  renderField({ meta: { touched, error } }) {
    return (
      <div>
        <Field name="text" component="textarea" placeholder="Write your comment here..." />
        {touched && error && <span> {error} </span>}
      </div>
    )
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <h3>Add Comment</h3>
          <Field name="text" component={this.renderField} placeholder="Write your comment here..." />
          <button type="submit">Post Comment</button>
        </form>

      </div>
    )
  }
}

CommentForm = reduxForm({ form: "comment", validate })(CommentForm);

export default CommentForm;