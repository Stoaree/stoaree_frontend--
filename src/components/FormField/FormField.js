import React from "react";

function renderField({ input, label, placeholder, type, meta: { touched, error } }) {
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

export default renderField;