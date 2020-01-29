import React from "react";

class FormFileInput extends React.Component {
  adaptFileEventToValue = delegate =>
    e => delegate(e.target.files[0])

  render() {
    const { input: { onChange, onBlur }, meta: { touched, error } } = this.props;

    return (
      <div>
        <input
          onChange={this.adaptFileEventToValue(onChange)}
          onBlur={this.adaptFileEventToValue(onBlur)}
          type="file"
        />
        {touched && error && <span> {error} </span>}
      </div>

    );
  }
}

export default FormFileInput;