import React from 'react';
import { updateSpecifiedPost } from './firebaseFunctions';

export async function removeReply(post, commentId, replyId) {
  const currentPost = post;

  const theComment = currentPost.postComments.find(
    (comment) => comment.commentId === commentId
  );

  const filteredReplies = theComment.commentReplies.filter(
    (replyItem) => replyItem.replyId !== replyId
  );

  theComment.commentReplies = filteredReplies;

  await updateSpecifiedPost(currentPost);

  return { currentPost, theComment };
}

export async function likeReply(user, currentPost, theReply, statesSetStates) {
  const { setPost, setReplyLikesState, setReplyDislikesState } =
    statesSetStates;

  const alreadyLikedReply = theReply.replyLikes.some(
    (likeUid) => likeUid === user.uid
  );

  const alreadyDislikedReply = theReply.replyDislikes.some(
    (dislikeUid) => dislikeUid === user.uid
  );

  if (alreadyLikedReply) {
    const indexOfLikeUser = theReply.replyLikes.indexOf(user.uid);

    theReply.replyLikes.splice(indexOfLikeUser, 1);

    setReplyLikesState([...theReply.replyLikes]);

    await updateSpecifiedPost(currentPost);

    setPost(currentPost);

    return null;
  }

  if (alreadyDislikedReply) {
    const indexOfDislikeUser = theReply.replyDislikes.indexOf(user.uid);

    theReply.replyDislikes.splice(indexOfDislikeUser, 1);
    setReplyDislikesState([...theReply.replyDislikes]);
  }

  theReply.replyLikes.push(user.uid);

  setReplyLikesState([...theReply.replyLikes]);

  await updateSpecifiedPost(currentPost);

  setPost(currentPost);
}

export async function dislikieReply(
  user,
  currentPost,
  theReply,
  statesSetStates
) {
  const { setPost, setReplyLikesState, setReplyDislikesState } =
    statesSetStates;

  const alreadyLikedReply = theReply.replyLikes.some(
    (likeUid) => likeUid === user.uid
  );

  const alreadyDislikedReply = theReply.replyDislikes.some(
    (dislikeUid) => dislikeUid === user.uid
  );

  if (alreadyDislikedReply) {
    const indexOfDislikeUser = theReply.replyDislikes.indexOf(user.uid);

    theReply.replyDislikes.splice(indexOfDislikeUser, 1);

    setReplyDislikesState([...theReply.replyDislikes]);

    await updateSpecifiedPost(currentPost);

    setPost(currentPost);

    return null;
  }

  if (alreadyLikedReply) {
    const indexOfLikeUser = theReply.replyLikes.indexOf(user.uid);

    theReply.replyLikes.splice(indexOfLikeUser, 1);

    setReplyLikesState([...theReply.replyLikes]);
  }
  theReply.replyDislikes.push(user.uid);

  setReplyDislikesState([...theReply.replyDislikes]);

  await updateSpecifiedPost(currentPost);

  setPost(currentPost);
}
