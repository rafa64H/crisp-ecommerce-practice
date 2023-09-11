import React from 'react';

const ButtonExpand = ({ showTheOtherElement, handleClickFunction }) => (
  <button
    type="button"
    className="button-expand"
    aria-expanded={showTheOtherElement}
    onClick={handleClickFunction}
  >
    Select Size
    <i
      className={`fa-solid ${
        showTheOtherElement ? 'fa-minus' : 'fa-plus'
      } icon`}
    />
  </button>
);

export default ButtonExpand;
