import React, { useRef } from 'react';

const FormInputTyping = ({
  required,
  name,
  type,
  loading,
  id,
  theRef,
  onFocusFunction,
  placeholderProp,
}) => {
  if (required) {
    return (
      <div className="form-input-container">
        <label htmlFor={id} className="form-input-label">
          {name}
          <span className="input-required" aria-label="Required">
            *
          </span>
        </label>
        <input
          type={type}
          disabled={loading}
          id={id}
          className="form-input-typing"
          ref={theRef}
          onFocus={(e) => onFocusFunction(e)}
          placeholder={placeholderProp || name}
        />
      </div>
    );
  }

  return (
    <div className="form-input-container">
      <label htmlFor={id} className="form-input-label">
        {name}
      </label>
      <input
        type={type}
        disabled={loading}
        id={id}
        className="form-input-typing"
        ref={theRef}
        onFocus={(e) => onFocusFunction(e)}
        placeholder={placeholderProp || name}
      />
    </div>
  );
};

export default FormInputTyping;
