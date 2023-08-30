import React from 'react';

const PostCommentOptionsBtn = ({ onClickBtnFunction }) => (
  <button
    type="button"
    className="transparent-btn show-post-comment-options"
    onClick={(e) => {
      e.preventDefault();
      onClickBtnFunction();
    }}
  >
    ...
  </button>
);

export { PostCommentOptionsBtn };

export const PostCommentOptions = ({
  showPostCommentOptions,
  handleClickRemove,
  editText,
  removeText,
}) => (
  <ul
    className="post-comment-options"
    data-show-post-comment-options={showPostCommentOptions}
    onClick={(e) => e.preventDefault()}
  >
    <li className="post-comment-option">
      <button type="button" className="post-comment-option-btn">
        {editText}
      </button>
    </li>
    <li>
      <button
        type="button"
        className="post-comment-option-btn"
        onClick={(e) => handleClickRemove(e)}
      >
        {removeText}
      </button>
    </li>
  </ul>
);
