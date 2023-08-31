import React from 'react';
import { updateSpecifiedPost } from './firebaseFunctions';

async function removeReply(post, commentId, replyId) {
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

export default removeReply;
