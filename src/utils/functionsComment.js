import { v4 as uuidv4 } from "uuid";
import {
  getDataOfUser,
  updateSpecifiedPost,
} from "../services/firebase/utils/firebaseFunctions";
import removeSpacesOfString from "./removeSpacesOfString";
import doesIncludeBadWord from "./doesIncludeBadWord";

export async function submitComment(
  currentPost,
  writeCommentRef,
  statesAndSetStates
) {
  const { setPost, setCommentsState, setWriteCommentAlertMessage } =
    statesAndSetStates;

  setWriteCommentAlertMessage("");

  if (!removeSpacesOfString(writeCommentRef.current.value)) {
    setWriteCommentAlertMessage("Error: There is nothing written");
    return null;
  }

  const writeCommentOffensive = doesIncludeBadWord(
    writeCommentRef.current.value
  );

  if (writeCommentOffensive) {
    setWriteCommentAlertMessage(
      "Error: You must not write something offensive"
    );
    return null;
  }

  const today = new Date();

  const todayDate = today.getDate();
  const todayMonth = today.getMonth() + 1;
  const todayYear = today.getFullYear();

  const userData = await getDataOfUser();

  const newComment = {
    commentId: uuidv4(),
    commentUser: `${userData.firstName} ${userData.lastName}`,
    commentUserUid: userData.uid,
    commentDay: todayDate,
    commentMonth: todayMonth,
    commentYear: todayYear,
    commentText: writeCommentRef.current.value,
    commentLikes: [],
    commentDislikes: [],
    commentReplies: [],
  };

  currentPost.postComments = [...currentPost.postComments, newComment];

  await updateSpecifiedPost(currentPost);

  setPost(currentPost);
  setCommentsState([...currentPost.postComments]);
}

export async function editComment(
  currentPost,
  commentId,
  editCommentRef,
  statesAndSetStates
) {
  const { postComments } = currentPost;
  const theComment = postComments.find(
    (comment) => comment.commentId === commentId
  );

  const {
    setPost,
    setCommentTextState,
    setShowFormEditComment,
    setEditCommentAlertMessage,
  } = statesAndSetStates;

  if (theComment.commentText === editCommentRef.current.value) {
    setEditCommentAlertMessage("There are no changes");
    return null;
  }

  if (!removeSpacesOfString(editCommentRef.current.value)) {
    setEditCommentAlertMessage(`There is nothing written`);
    return null;
  }
  const editCommentOffensive = doesIncludeBadWord(editCommentRef.current.value);

  if (editCommentOffensive) {
    setEditCommentAlertMessage("You must not write something offensive");
    return null;
  }

  theComment.commentText = editCommentRef.current.value;

  setPost(currentPost);
  setShowFormEditComment((prevValue) => !prevValue);
  await updateSpecifiedPost(currentPost);
  setCommentTextState(editCommentRef.current.value);
}

export async function removeComment(currentPost, commentId) {
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
  commentId,
  statesAndSetStates
) {
  const { postComments } = currentPost;

  const theComment = postComments.find(
    (comment) => comment.commentId === commentId
  );

  const { setPost, setCommentLikesState, setCommentDislikesState } =
    statesAndSetStates;

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
  commentId,
  statesAndSetStates
) {
  const { postComments } = currentPost;

  const theComment = postComments.find(
    (comment) => comment.commentId === commentId
  );

  const { setPost, setCommentLikesState, setCommentDislikesState } =
    statesAndSetStates;

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
