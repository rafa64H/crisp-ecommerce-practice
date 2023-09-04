import { onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect, useRef, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { auth, storage } from '../../config-firebase/firebase';
import {
  getCommunityPosts,
  getDataOfUser,
  getPostsOfUser,
  updateSpecifiedPost,
  updateUsersPosts,
} from '../../components/utils/firebaseFunctions';
import LikeDislikeComponent from '../../components/ui/smaller/likeDislikeContainer';
import {
  PostCommentOptions,
  PostCommentOptionsBtn,
} from '../../components/ui/smaller/postCommentOptions';
import FormInputTyping from '../../components/ui/smaller/formInputTyping';
import {
  removePost,
  likePost,
  dislikePost,
  editPost,
} from '../../components/utils/functionsPost';
import {
  dislikeComment,
  editComment,
  likeComment,
  removeComment,
  submitComment,
} from '../../components/utils/functionsComment';
import {
  dislikieReply,
  editReply,
  likeReply,
  removeReply,
  submitReply,
} from '../../components/utils/functionsReply';
import FormComment from '../../components/ui/smaller/formComment';

const PostComponent = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('postId');
  const editPostLinked = !!params.get('editPostLinked');

  const [post, setPost] = useState();
  const [user, setUser] = useState();
  const [likesPostState, setLikesPostState] = useState([]);
  const [dislikesPostState, setDislikesPostState] = useState([]);
  const [showPostOptionsState, setShowPostOptionsState] = useState(false);
  const [commentsState, setCommentsState] = useState([]);

  const [editPostState, setEditPostState] = useState(false || editPostLinked);
  const [previewImg, setPreviewImg] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessage2, setAlertMessage2] = useState('');

  const fileRef = useRef();
  const titleRef = useRef();
  const textRef = useRef();

  const writeCommentRef = useRef('');

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const allPostsFromFirestore = getCommunityPosts();

        const theIndicatedPost = (await allPostsFromFirestore).find(
          (postFromFirestore) => postFromFirestore.postId === id
        );

        setPost(theIndicatedPost);
        setUser(user);
        setLikesPostState([...theIndicatedPost.likes]);
        setDislikesPostState([...theIndicatedPost.dislikes]);
        setCommentsState([...theIndicatedPost.postComments]);
        setPreviewImg(theIndicatedPost.postImg);
      } else {
      }
    });
  }, []);

  async function handleSubmitComment(e) {
    e.preventDefault();

    if (writeCommentRef.current.value === '') return null;

    try {
      await submitComment(post, writeCommentRef, { setPost, setCommentsState });
    } catch (err) {
      console.log(err);
    }
  }

  // Like post
  async function handleLikePost() {
    try {
      const currentPost = post;

      await likePost(currentPost, user, {
        setPost,
        setLikesPostState,
        setDislikesPostState,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Dislike post
  async function handleDislikePost() {
    try {
      const currentPost = post;

      await dislikePost(currentPost, user, {
        setPost,
        setLikesPostState,
        setDislikesPostState,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleClickRemovePost(e) {
    e.preventDefault();

    try {
      await removePost(post);

      window.location.href = './community.html';
    } catch (err) {
      console.log(err);
    }
  }

  function handleFocusInput(e) {
    setAlertMessage('');
  }

  function handleUndoImg() {
    fileRef.current.value = null;
    setPreviewImg('');
  }

  function handleUploadFile(e) {
    const [file] = e.target.files;
    if (file) {
      setPreviewImg((prevUrl) => URL.createObjectURL(file));
    }
  }

  async function handleClickShowEditPost(e) {
    try {
      e.preventDefault();

      titleRef.current.value = post.postTitle;
      textRef.current.value = post.postText;
      setEditPostState((prevValue) => !prevValue);
      setShowPostOptionsState((prevValue) => !prevValue);
      setPreviewImg(post.postImg);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleEditPostSubmit(e) {
    e.preventDefault();

    const currentPost = post;

    try {
      await editPost(currentPost, fileRef, titleRef, textRef, {
        previewImg,
        setAlertMessage,
        setPost,
        setEditPostState,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return post ? (
    <section className="post">
      <section className="post-section" data-your-post={post.uid === user.uid}>
        <div className="flex-post-comment-options-btn">
          {post.uid === user.uid ? (
            <PostCommentOptionsBtn
              onClickBtnFunction={() =>
                setShowPostOptionsState((prevValue) => !prevValue)
              }
            />
          ) : null}

          {post.uid === user.uid ? (
            <PostCommentOptions
              showPostCommentOptions={showPostOptionsState}
              handleClickEdit={handleClickShowEditPost}
              handleClickRemove={handleClickRemovePost}
              editText="Edit post"
              removeText="Remove post"
            />
          ) : null}

          <button
            type="button"
            className="transparent-btn post-comment-options-goback"
            data-show-edit-post={editPostState}
            onClick={(e) => {
              e.preventDefault();
              setEditPostState((prevValue) => !prevValue);
            }}
          >
            Go back
          </button>
        </div>

        <form
          className="post-form post-form--edit"
          data-show-edit-post={editPostState}
          onSubmit={(e) => handleEditPostSubmit(e)}
        >
          <aside aria-live="assertive">{alertMessage}</aside>
          <div className="form-input-container form-input-container--file">
            <label className="form-input-label" htmlFor="the-file">
              Submit image
            </label>

            <div className="form-input-typing">
              <div className="post-form-file-btns-container">
                <input
                  type="file"
                  className="post-form-file black-btn"
                  accept="image/*"
                  htmlFor="the-file"
                  ref={fileRef}
                  onChange={(e) => handleUploadFile(e)}
                />

                {previewImg ? (
                  <button
                    type="button"
                    aria-label="Undo uploaded image"
                    className="transparent-btn undo-uploaded-file"
                    onClick={(e) => handleUndoImg(e)}
                  >
                    <i className="fa-solid fa-xmark" />
                  </button>
                ) : (
                  ''
                )}
              </div>

              <img
                src={previewImg}
                className="post-form-file-preview"
                alt={previewImg ? 'Preview of the mage to be uploaded' : ''}
              />
            </div>
          </div>

          <FormInputTyping
            required
            name="Title"
            type="text"
            id="title"
            theRef={titleRef}
            placeholderProp="Write your title here"
            onFocusFunction={handleFocusInput}
            defaultValueProp={post.postTitle}
          />

          <div className="form-input-container">
            <label className="form-input-label" htmlFor="the-text">
              Write everything you want about it:
            </label>
            <textarea
              className="form-input-typing post-form-textarea"
              id="the-text"
              ref={textRef}
              onFocus={handleFocusInput}
              defaultValue={post.postText}
            />
          </div>

          <button type="submit" className="black-btn">
            <i className="fa-solid fa-sticky-note" />
            Post
          </button>
          <aside aria-live="assertive">{alertMessage2}</aside>
        </form>

        {!editPostState ? (
          <>
            {post.postImg ? (
              <img
                src={post.postImg}
                className="post-section__img"
                alt={post.postTitle}
              />
            ) : null}

            <h1 className="post-section__title">{post.postTitle}</h1>
            <p className="post-section__paragraph">{post.postText}</p>

            <LikeDislikeComponent
              handleClickLikeFunction={handleLikePost}
              handleClickDislikeFunction={handleDislikePost}
              alreadyLikedLogicExpression={likesPostState.some(
                (likeUid) => likeUid === user.uid
              )}
              alreadyDislikedLogicExpression={dislikesPostState.some(
                (dislikeUid) => dislikeUid === user.uid
              )}
              likesArray={likesPostState}
              dislikesArray={dislikesPostState}
              children={
                <p>
                  {post.postDay}:0{post.postMonth}:{post.postYear}
                </p>
              }
            />
          </>
        ) : null}
      </section>

      <section className="comments-section">
        <form
          className="write-comment"
          onSubmit={(e) => {
            handleSubmitComment(e);
          }}
        >
          <label className="write-comment__label" htmlFor="write-comment">
            Put your comment
          </label>
          <textarea
            className="write-comment__textarea"
            id="write-comment"
            ref={writeCommentRef}
          />
          <button
            type="submit"
            className="write-comment__btn"
            className="black-btn"
          >
            Submit
          </button>
        </form>

        <ul className="comments">
          {commentsState.map((comment) => (
            <CommentItem
              key={uuidv4()}
              commentDay={comment.commentDay}
              commentMonth={comment.commentMonth}
              commentYear={comment.commentYear}
              commentId={comment.commentId}
              commentUser={comment.commentUser}
              commentUserUid={comment.commentUserUid}
              commentText={comment.commentText}
              commentLikes={comment.commentLikes}
              commentDislikes={comment.commentDislikes}
              commentReplies={comment.commentReplies}
              post={post}
              setPost={setPost}
              setCommentsState={setCommentsState}
              user={user}
            />
          ))}
        </ul>
      </section>
    </section>
  ) : (
    <div>null</div>
  );
};

export default PostComponent;

const CommentItem = ({
  commentUser,
  commentId,
  commentUserUid,
  commentDay,
  commentMonth,
  commentYear,
  commentText,
  commentLikes,
  commentDislikes,
  commentReplies,
  post,
  setPost,
  setCommentsState,
  user,
}) => {
  const [showWriteReply, setShowWriteReply] = useState(false);
  const [showFormEditComment, setShowFormEditComment] = useState(false);
  const [commentTextState, setCommentTextState] = useState(commentText);

  const [showCommentOptionsState, setShowCommentOptionsState] = useState(false);

  const [commentRepliesState, setCommentRepliesState] =
    useState(commentReplies);

  const [commentLikesState, setCommentLikesState] = useState([...commentLikes]);
  const [commentDislikesState, setCommentDislikesState] = useState([
    ...commentDislikes,
  ]);

  const [showReplies, setShowReplies] = useState([]);

  const replyRef = useRef('');
  const editCommentRef = useRef('');

  async function handleSubmitReply(e) {
    e.preventDefault();

    if (!replyRef.current.value) return null;

    try {
      await submitReply(post, user, replyRef, commentId, {
        setPost,
        setCommentRepliesState,
        setShowWriteReply,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Like comment
  async function handleClickLikeComment() {
    try {
      const currentPost = post;
      const { postComments } = currentPost;

      const theComment = postComments.find(
        (comment) => comment.commentId === commentId
      );

      await likeComment(user, currentPost, theComment, {
        setPost,
        setCommentLikesState,
        setCommentDislikesState,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Dislike comment
  async function handleClickDislikeComment() {
    try {
      const currentPost = post;
      const { postComments } = currentPost;

      const theComment = postComments.find(
        (comment) => comment.commentId === commentId
      );

      await dislikeComment(user, currentPost, theComment, {
        setPost,
        setCommentLikesState,
        setCommentDislikesState,
      });
    } catch (err) {
      console.log(err);
    }
  }
  async function handleRemoveComment(e) {
    try {
      const postAfterRemovingComment = await removeComment(post, commentId);
      setCommentsState([...postAfterRemovingComment.postComments]);
      setPost(postAfterRemovingComment);
    } catch (err) {
      console.log(err);
    }
  }

  function handleShowReplies() {
    const numberOfItemsToShow = [...showReplies];

    for (let i = showReplies.length; i <= showReplies.length + 4; i++) {
      if (i >= commentRepliesState.length) break;
      numberOfItemsToShow.push(i);
    }

    setShowReplies((prevValue) => [...numberOfItemsToShow]);
  }

  function handleShowEditComment(e) {
    setShowFormEditComment((prevValue) => !prevValue);
    setShowCommentOptionsState((prevValue) => !prevValue);
    editCommentRef.current.value = commentText;
  }

  async function handleSubmitEditComment(e) {
    const currentPost = post;
    const { postComments } = currentPost;
    const theComment = postComments.find(
      (comment) => comment.commentId === commentId
    );

    try {
      await editComment(currentPost, theComment, editCommentRef, {
        setPost,
        setCommentTextState,
        setShowFormEditComment,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <li className="comment">
      <div className="flex-post-comment-options-btn">
        {commentUserUid === user.uid ? (
          <PostCommentOptionsBtn
            onClickBtnFunction={() =>
              setShowCommentOptionsState((prevValue) => !prevValue)
            }
          />
        ) : null}

        {commentUserUid === user.uid ? (
          <PostCommentOptions
            showPostCommentOptions={showCommentOptionsState}
            handleClickEdit={handleShowEditComment}
            handleClickRemove={handleRemoveComment}
            editText="Edit comment"
            removeText="Remove comment"
          />
        ) : null}

        <button
          type="button"
          className="transparent-btn post-comment-options-goback"
          data-show-edit-post={showFormEditComment}
          onClick={(e) => {
            e.preventDefault();
            setShowFormEditComment((prevValue) => !prevValue);
          }}
        >
          Go back
        </button>
      </div>

      <div className="comment-user">
        <i className="fa-solid fa-user comment-user__icon" />
        <p className="comment-user__paragraph">
          {commentUser} {commentDay}/0{commentMonth}/{commentYear}
        </p>
      </div>

      <p className="comment-text">{commentTextState}</p>

      <FormComment
        showFormComment={showFormEditComment}
        handleSubmit={handleSubmitEditComment}
        propRef={editCommentRef}
      />

      <LikeDislikeComponent
        handleClickLikeFunction={handleClickLikeComment}
        handleClickDislikeFunction={handleClickDislikeComment}
        alreadyLikedLogicExpression={commentLikesState.some(
          (likeUid) => likeUid === user.uid
        )}
        alreadyDislikedLogicExpression={commentDislikesState.some(
          (dislikeUid) => dislikeUid === user.uid
        )}
        likesArray={commentLikesState}
        dislikesArray={commentDislikesState}
      />

      <div className="reply-buttons">
        <button
          type="button"
          className="transparent-btn reply-btn"
          onClick={(e) => setShowWriteReply((prevValue) => !prevValue)}
        >
          Reply <i className="fa-solid fa-reply" />
        </button>

        <button
          type="button"
          className="transparent-btn comment-show-replies"
          data-comment-show-replies-button={showReplies.length === 0}
          onClick={(e) => handleShowReplies(e)}
        >
          Show replies <i className="fa-solid fa-plus" />
        </button>
      </div>

      <FormComment
        showFormComment={showWriteReply}
        handleSubmit={handleSubmitReply}
        propRef={replyRef}
      />

      <ul className="comment-replies">
        {commentRepliesState.map((reply, index) => (
          <ReplyItem
            key={uuidv4()}
            commentId={commentId}
            replyUser={reply.replyUser}
            replyId={reply.replyId}
            replyUserUid={reply.replyUserUid}
            replyDay={reply.replyDay}
            replyMonth={reply.replyMonth}
            replyYear={reply.replyYear}
            replyText={reply.replyText}
            replyLikes={reply.replyLikes}
            replyDislikes={reply.replyDislikes}
            showReplies={showReplies}
            setShowReplies={setShowReplies}
            index={index}
            post={post}
            setPost={setPost}
            setCommentRepliesState={setCommentRepliesState}
            user={user}
          />
        ))}

        <button
          type="button"
          className="transparent-btn comment-show-replies comment-show-replies--inside-reply"
          data-comment-show-replies-button={
            commentRepliesState.length - showReplies.length !== 0 &&
            showReplies.length !== 0
          }
          onClick={(e) => handleShowReplies(e)}
        >
          Show replies <i className="fa-solid fa-plus" />
        </button>

        <aside>
          {commentRepliesState.length - showReplies.length === 0
            ? ''
            : `There are ${
                commentRepliesState.length - showReplies.length
              } replies`}
        </aside>
      </ul>
    </li>
  );
};

const ReplyItem = ({
  commentId,
  replyUser,
  replyId,
  replyUserUid,
  replyDay,
  replyMonth,
  replyYear,
  replyText,
  replyLikes,
  replyDislikes,
  showReplies,
  setShowReplies,
  index,
  post,
  setPost,
  setCommentRepliesState,
  user,
}) => {
  const [replyLikesState, setReplyLikesState] = useState([...replyLikes]);
  const [replyDislikesState, setReplyDislikesState] = useState([
    ...replyDislikes,
  ]);
  const [replyTextState, setReplyTextState] = useState(replyText);

  const [showReplyOptionsState, setShowReplyOptionsState] = useState(false);
  const [showFormEditReplyState, setShowFormEditReply] = useState(false);

  const editReplyRef = useRef('');

  // Like reply
  async function handleClickLikeReply() {
    const currentPost = post;

    const theComment = currentPost.postComments.find(
      (comment) => comment.commentId === commentId
    );

    const theReply = theComment.commentReplies.find(
      (replyFromTheComment) => replyFromTheComment.replyId === replyId
    );

    try {
      await likeReply(user, currentPost, theReply, {
        setPost,
        setReplyLikesState,
        setReplyDislikesState,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Dislike reply
  async function handleClickDislikeReply() {
    const currentPost = post;

    const theComment = currentPost.postComments.find(
      (comment) => comment.commentId === commentId
    );

    const theReply = theComment.commentReplies.find(
      (replyFromTheComment) => replyFromTheComment.replyId === replyId
    );

    try {
      await dislikieReply(user, currentPost, theReply, {
        setPost,
        setReplyLikesState,
        setReplyDislikesState,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRemoveReply(e) {
    try {
      e.preventDefault();

      const objAfterRemovingReply = await removeReply(post, commentId, replyId);

      const { currentPost, theComment } = objAfterRemovingReply;

      const removeReplyFromShowRepliesState = theComment.commentReplies.map(
        (replyItem, indexReply) => indexReply
      );

      setShowReplies([...removeReplyFromShowRepliesState]);
      setCommentRepliesState(theComment.commentReplies);
      setPost(currentPost);
    } catch (err) {
      console.log(err);
    }
  }

  function handleShowEditReply(e) {
    setShowFormEditReply((prevValue) => !prevValue);
    setShowReplyOptionsState((prevValue) => !prevValue);
    editReplyRef.current.value = replyText;
  }

  async function handleSubmitEditReply() {
    const currentPost = post;

    const theComment = currentPost.postComments.find(
      (comment) => comment.commentId === commentId
    );

    const theReply = theComment.commentReplies.find(
      (replyFromTheComment) => replyFromTheComment.replyId === replyId
    );

    try {
      await editReply(currentPost, theComment, theReply, editReplyRef, {
        setPost,
        setShowFormEditReply,
        setReplyTextState,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <li
      className="comment-reply"
      data-show-reply={showReplies.some(
        (indexFromShowRepliesState) => index === indexFromShowRepliesState
      )}
      key={uuidv4()}
    >
      {replyUserUid === user.uid ? (
        <div className="flex-post-comment-options-btn">
          <PostCommentOptionsBtn
            onClickBtnFunction={() =>
              setShowReplyOptionsState((prevValue) => !prevValue)
            }
          />

          <PostCommentOptions
            showPostCommentOptions={showReplyOptionsState}
            handleClickEdit={handleShowEditReply}
            handleClickRemove={handleRemoveReply}
            editText="Edit reply"
            removeText="Remove reply"
          />

          <button
            type="button"
            className="transparent-btn post-comment-options-goback"
            data-show-edit-post={showFormEditReplyState}
            onClick={(e) => {
              e.preventDefault();
              setShowFormEditReply((prevValue) => !prevValue);
            }}
          >
            Go back
          </button>
        </div>
      ) : null}

      <div className="comment-user">
        <i className="fa-solid fa-user comment-user__icon" />
        <p className="comment-user__paragraph">
          {replyUser} {replyDay}/0{replyMonth}/{replyYear}
        </p>
      </div>

      <p className="comment-text">{replyTextState}</p>

      <FormComment
        showFormComment={showFormEditReplyState}
        handleSubmit={handleSubmitEditReply}
        propRef={editReplyRef}
      />

      <LikeDislikeComponent
        handleClickLikeFunction={handleClickLikeReply}
        handleClickDislikeFunction={handleClickDislikeReply}
        alreadyLikedLogicExpression={replyLikesState.some(
          (likeUid) => likeUid === user.uid
        )}
        alreadyDislikedLogicExpression={replyDislikesState.some(
          (dislikeUid) => dislikeUid === user.uid
        )}
        likesArray={replyLikesState}
        dislikesArray={replyDislikesState}
      />
    </li>
  );
};
