import React from 'react';

const FormComment = ({ showFormComment, handleSubmit, propRef }) => (
  <form
    className="form-comment"
    data-show-form-comment={showFormComment}
    onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(e);
    }}
  >
    <textarea
      className="form-comment__textarea"
      ref={propRef}
      defaultValue={propRef.current.value}
    />

    <button type="submit" className="black-btn form-comment__btn">
      Submit
    </button>
  </form>
);

export default FormComment;
