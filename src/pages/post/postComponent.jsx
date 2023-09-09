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
  createObjectRemovedReply,
  submitReply,
} from '../../components/utils/functionsReply';
import FormComment from '../../components/ui/smaller/formComment';
import PostForm from '../../components/ui/postForm';
import removeSpacesOfString from '../../components/utils/removeSpacesOfString';

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
      const allPostsFromFirestore = getCommunityPosts();

      const theIndicatedPost = (await allPostsFromFirestore).find(
        (postFromFirestore) => postFromFirestore.postId === id
      );

      setPost(theIndicatedPost);
      setUser(user || false);
      setLikesPostState([...theIndicatedPost.likes]);
      setDislikesPostState([...theIndicatedPost.dislikes]);
      setCommentsState([...theIndicatedPost.postComments]);
      setPreviewImg(theIndicatedPost.postImg);
    });
  }, []);

  async function handleSubmitComment(e) {
    e.preventDefault();
    if (!user) return null;

    try {
      const currentPost = post;
      await submitComment(currentPost, writeCommentRef, {
        setPost,
        setCommentsState,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Like post
  async function handleLikePost() {
    if (!user) return null;
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
    if (!user) return null;
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
      const currentPost = post;
      await removePost(currentPost);

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
            <>
              <PostCommentOptionsBtn
                onClickBtnFunction={() =>
                  setShowPostOptionsState((prevValue) => !prevValue)
                }
              />
              <PostCommentOptions
                showPostCommentOptions={showPostOptionsState}
                handleClickEdit={handleClickShowEditPost}
                handleClickRemove={handleClickRemovePost}
                editText="Edit post"
                removeText="Remove post"
              />
            </>
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

        <PostForm
          showEditPostAttribute={editPostState}
          handleSubmitPostForm={handleEditPostSubmit}
          imgRefProp={fileRef}
          handleUploadImage={handleUploadFile}
          previewImgState={previewImg}
          handleUndoImgProp={handleUndoImg}
          titleRefProp={titleRef}
          handleFocusInput={handleFocusInput}
          defaultValueTitle={post.postTitle}
          defaultValueTextArea={post.postText}
          textRefProp={textRef}
          alertMessageState={alertMessage}
          alertMessage2State={alertMessage2}
        />

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
                  {post.postMonth}/{post.postDay}/{post.postYear}
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
          <button type="submit" className="black-btn write-comment__btn">
            Submit
          </button>
        </form>

        <ul className="comments">
          {commentsState.map((comment) => (
            <CommentItem
              key={uuidv4()}
              commentObj={comment}
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
    <section className="post-section post-section--loading">
      <h1 className="post-section__title post-section--loading__title">
        Loading...
      </h1>
    </section>
  );
};

export default PostComponent;

const CommentItem = ({ commentObj, post, setPost, setCommentsState, user }) => {
  const {
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
  } = commentObj;

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
    if (!user) return null;

    if (!replyRef.current.value) return null;

    try {
      const currentPost = post;
      await submitReply(currentPost, user, replyRef, commentId, {
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
    if (!user) return null;
    try {
      const currentPost = post;

      await likeComment(user, currentPost, commentId, {
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
    if (!user) return null;
    try {
      const currentPost = post;

      await dislikeComment(user, currentPost, commentId, {
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
      const currentPost = post;
      const postAfterRemovingComment = await removeComment(
        currentPost,
        commentId
      );
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

    try {
      await editComment(currentPost, commentId, editCommentRef, {
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
          <>
            <PostCommentOptionsBtn
              onClickBtnFunction={() =>
                setShowCommentOptionsState((prevValue) => !prevValue)
              }
            />

            <PostCommentOptions
              showPostCommentOptions={showCommentOptionsState}
              handleClickEdit={handleShowEditComment}
              handleClickRemove={handleRemoveComment}
              editText="Edit comment"
              removeText="Remove comment"
            />
          </>
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
          {commentUser} {commentMonth}/{commentDay}/{commentYear}
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
            reply={reply}
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
  reply,
  showReplies,
  setShowReplies,
  index,
  post,
  setPost,
  setCommentRepliesState,
  user,
}) => {
  const {
    replyUser,
    replyId,
    replyUserUid,
    replyDay,
    replyMonth,
    replyYear,
    replyText,
    replyLikes,
    replyDislikes,
  } = reply;

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

    try {
      await likeReply(user, currentPost, commentId, {
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

    try {
      await dislikieReply(user, currentPost, commentId, {
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

      const commentRepliesObjAfterRemovingReply =
        await createObjectRemovedReply(post, commentId, replyId);

      const { currentPost, theComment } = commentRepliesObjAfterRemovingReply;

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

    try {
      await editReply(currentPost, commentId, replyId, editReplyRef, {
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
