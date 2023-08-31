import React from 'react';
import { updateSpecifiedPost } from './firebaseFunctions';

async function removeComment(post, commentId) {
  const currentPost = post;

  const { postComments } = currentPost;

  const filteredComments = postComments.filter(
    (comment) => comment.commentId !== commentId
  );

  currentPost.postComments = filteredComments;

  await updateSpecifiedPost(currentPost);

  return currentPost;
}

export default removeComment;
