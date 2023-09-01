import React from 'react';
import { updateSpecifiedPost } from './firebaseFunctions';

export async function removeComment(post, commentId) {
  const currentPost = post;

  const { postComments } = currentPost;

  const filteredComments = postComments.filter(
    (comment) => comment.commentId !== commentId
  );

  currentPost.postComments = filteredComments;

  await updateSpecifiedPost(currentPost);

  return currentPost;
}

export async function likeComment(
  user,
  currentPost,
  postComments,
  commentId,
  statesAndSetStates
) {
  const { setPost, setCommentLikesState, setCommentDislikesState } =
    statesAndSetStates;

  const theComment = postComments.find(
    (comment) => comment.commentId === commentId
  );

  const alreadyLikedComment = theComment.commentLikes.some(
    (uidLike) => uidLike === user.uid
  );
  const alreadyDislikedComment = theComment.commentDislikes.some(
    (uidDislike) => uidDislike === user.uid
  );

  if (alreadyLikedComment) {
    const indexOfLikeUser = theComment.commentLikes.indexOf(user.uid);

    theComment.commentLikes.splice(indexOfLikeUser, 1);

    setCommentLikesState([...theComment.commentLikes]);

    await updateSpecifiedPost(currentPost);

    setPost(currentPost);

    return null;
  }

  if (alreadyDislikedComment) {
    const indexOfDislikeUser = theComment.commentDislikes.indexOf(user.uid);

    theComment.commentDislikes.splice(indexOfDislikeUser, 1);
    setCommentDislikesState([...theComment.commentDislikes]);
  }

  theComment.commentLikes.push(user.uid);

  setCommentLikesState([...theComment.commentLikes]);

  await updateSpecifiedPost(currentPost);

  setPost(currentPost);
}

export async function dislikeComment(
  user,
  currentPost,
  postComments,
  commentId,
  statesAndSetStates
) {
  const { setPost, setCommentLikesState, setCommentDislikesState } =
    statesAndSetStates;

  const theComment = postComments.find(
    (comment) => comment.commentId === commentId
  );

  const alreadyLikedComment = theComment.commentLikes.some(
    (uidLike) => uidLike === user.uid
  );
  const alreadyDislikedComment = theComment.commentDislikes.some(
    (uidDislike) => uidDislike === user.uid
  );

  if (alreadyDislikedComment) {
    const indexOfDislikeUser = theComment.commentDislikes.indexOf(user.uid);

    theComment.commentDislikes.splice(indexOfDislikeUser, 1);

    setCommentDislikesState([...theComment.commentDislikes]);

    await updateSpecifiedPost(currentPost);

    setPost(currentPost);
    return null;
  }

  if (alreadyLikedComment) {
    const indexOfLikeUser = theComment.commentLikes.indexOf(user.uid);
    theComment.commentLikes.splice(indexOfLikeUser, 1);

    setCommentLikesState([...theComment.commentLikes]);
  }

  theComment.commentDislikes.push(user.uid);

  setCommentDislikesState([...theComment.commentDislikes]);

  await updateSpecifiedPost(currentPost);

  setPost(currentPost);
}
