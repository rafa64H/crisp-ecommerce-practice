import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getDataOfUser, updateSpecifiedPost } from './firebaseFunctions';

export async function submitReply(
  currentPost,
  user,
  replyRef,
  commentId,
  statesAndSetStates
) {
  const { setPost, setCommentRepliesState, setShowWriteReply } =
    statesAndSetStates;

  const today = new Date();

  const todayDate = today.getDate();
  const todayMonth = today.getMonth() + 1;
  const todayYear = today.getFullYear();

  const { postComments } = currentPost;

  const userData = await getDataOfUser();

  const newReply = {
    replyId: uuidv4(),
    replyUser: `${userData.firstName} ${userData.lastName}`,
    replyUserUid: user.uid,
    replyDay: todayDate,
    replyMonth: todayMonth,
    replyYear: todayYear,
    replyText: replyRef.current.value,
    replyLikes: [],
    replyDislikes: [],
  };

  const theComment = postComments.find(
    (comment) => commentId === comment.commentId
  );
  const indexOfComment = postComments.indexOf(theComment);

  theComment.commentReplies = [...theComment.commentReplies, newReply];

  setCommentRepliesState(
    currentPost.postComments[indexOfComment].commentReplies
  );

  setShowWriteReply(false);

  await updateSpecifiedPost(currentPost);

  setPost(currentPost);
}

export async function editReply(
  currentPost,
  commentId,
  editReplyRef,
  statesAndSetStates
) {
  const theComment = currentPost.postComments.find(
    (comment) => comment.commentId === commentId
  );

  const theReply = theComment.commentReplies.find(
    (replyFromTheComment) => replyFromTheComment.replyId === replyId
  );

  const { setPost, setShowFormEditReply, setReplyTextState } =
    statesAndSetStates;

  if (editReplyRef.current.value === theReply.replyText) return null;
  if (!editReplyRef.current.value) return null;

  theReply.replyText = editReplyRef.current.value;

  setPost(currentPost);
  setShowFormEditReply((prevValue) => !prevValue);
  await updateSpecifiedPost(currentPost);
  setReplyTextState(editReplyRef.current.value);
}

export async function createObjectRemovedReply(post, commentId, replyId) {
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

export async function likeReply(user, currentPost, commentId, statesSetStates) {
  const theComment = currentPost.postComments.find(
    (comment) => comment.commentId === commentId
  );

  const theReply = theComment.commentReplies.find(
    (replyFromTheComment) => replyFromTheComment.replyId === replyId
  );

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
  commentId,
  statesSetStates
) {
  const theComment = currentPost.postComments.find(
    (comment) => comment.commentId === commentId
  );

  const theReply = theComment.commentReplies.find(
    (replyFromTheComment) => replyFromTheComment.replyId === replyId
  );

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
