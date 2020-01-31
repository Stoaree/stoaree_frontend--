import React from "react";
import { Field, reduxForm } from "redux-form";

class QuestionForm extends React.Component {
  renderField({ input, label, type, meta: { touched, error } }) {
    return (
      <div>
        <label>{label}</label>

        <input {...input} type={type} />
        {touched && error && <span> {error} </span>}
      </div>
    )
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <Field name="title" component={this.renderField} type="text" label={this.props.label} />
          <Field name="isYesOrNo" component={this.renderField} type="checkbox" label="Yes or no question?" />
          <button type="submit">Save</button> <button onClick={this.props.cancel}>Cancel</button>
        </form>
      </div>
    )
  }
}

QuestionForm = reduxForm({ form: "question" })(QuestionForm);

export default QuestionForm;