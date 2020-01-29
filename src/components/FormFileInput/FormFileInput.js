import React from "react";

class FormFileInput extends React.Component {
  adaptFileEventToValue = delegate =>
    e => delegate(e.target.files[0])

  render() {
    const { input: { onChange, onBlur } } = this.props;

    return (
      <input
        onChange={this.adaptFileEventToValue(onChange)}
        onBlur={this.adaptFileEventToValue(onBlur)}
        type="file"
      />
    );
  }
}

export default FormFileInput;