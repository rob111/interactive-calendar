import React from 'react';

const FormField = (props) => {
  return(
    <div className="form-row">
      <label>{props.label}
        <input
          name={props.name}
          type="text"
          value={props.content}
          onChange={props.onChange}
          />
        <br />
      </label>
    </div>
  )
}

export default FormField;
