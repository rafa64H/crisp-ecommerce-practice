import React from 'react';

const LikeDislikeComponent = ({
  handleClickLikeFunction,
  handleClickDislikeFunction,
  alreadyLikedLogicExpression,
  alreadyDislikedLogicExpression,
  likesArray,
  dislikesArray,
  children,
}) => (
  <div className="like-dislike-container">
    <button
      onClick={(e) => {
        handleClickLikeFunction(e);
      }}
      type="button"
      alt="Like"
      className="like-dislike like"
      data-already-liked-disliked={alreadyLikedLogicExpression}
    >
      <i className="fa-solid fa-arrow-up" />
      <p>{likesArray.length}</p>
    </button>

    <button
      onClick={(e) => handleClickDislikeFunction(e)}
      type="button"
      alt="Dislike"
      className="like-dislike dislike"
      data-already-liked-disliked={alreadyDislikedLogicExpression}
    >
      <i className="fa-solid fa-arrow-down" />
      <p>{dislikesArray.length}</p>
    </button>
    {children}
  </div>
);

export default LikeDislikeComponent;
