import { onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '../../config-firebase/firebase';
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

const PostComponent = () => {
  const [post, setPost] = useState();
  const [user, setUser] = useState();
  const [likesPostState, setLikesPostState] = useState([]);
  const [dislikesPostState, setDislikesPostState] = useState([]);
  const [showPostOptionsState, setShowPostOptionsState] = useState(false);
  const writeCommentRef = useRef('');
  const params = new URLSearchParams(window.location.search);
  const id = params.get('postId');

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
      } else {
      }
    });
  }, []);

  async function handleSubmitComment(e) {
    e.preventDefault();

    if (writeCommentRef.current.value === '') return null;

    const today = new Date();

    const todayDate = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();

    try {
      const { postComments } = post;

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

      const newPostComments = [...post.postComments, newComment];
      const newPostInfo = { ...post, postComments: newPostComments };

      await updateSpecifiedPost(newPostInfo);

      setPost(newPostInfo);
    } catch (err) {
      console.log(err);
    }
  }

  // Like post
  async function handleLikePost() {
    try {
      const currentPost = post;

      const alreadyLikedPost = currentPost.likes.some(
        (likeUid) => likeUid === user.uid
      );

      const alreadyDislikedPost = currentPost.dislikes.some(
        (dislikeUid) => dislikeUid === user.uid
      );

      if (alreadyLikedPost) {
        const indexOfLikeUser = currentPost.likes.indexOf(user.uid);

        currentPost.likes.splice(indexOfLikeUser, 1);

        setLikesPostState([...currentPost.likes]);

        await updateSpecifiedPost(currentPost);

        setPost(currentPost);
        return null;
      }

      if (alreadyDislikedPost) {
        const indexOfDislikeUser = currentPost.dislikes.indexOf(user.uid);

        currentPost.dislikes.splice(indexOfDislikeUser, 1);
        setDislikesPostState(currentPost.dislikes);
      }

      currentPost.likes.push(user.uid);

      setLikesPostState([...currentPost.likes]);

      await updateSpecifiedPost(currentPost);

      setPost(currentPost);
    } catch (err) {
      console.log(err);
    }
  }

  // Dislike post
  async function handleDislikePost() {
    try {
      const currentPost = post;

      const alreadyLikedPost = currentPost.likes.some(
        (likeUid) => likeUid === user.uid
      );

      const alreadyDislikedPost = currentPost.dislikes.some(
        (dislikeUid) => dislikeUid === user.uid
      );

      if (alreadyDislikedPost) {
        const indexOfDislikeUser = currentPost.dislikes.indexOf(user.uid);

        currentPost.dislikes.splice(indexOfDislikeUser, 1);

        setDislikesPostState([...currentPost.dislikes]);

        await updateSpecifiedPost(currentPost);

        setPost(currentPost);
        return null;
      }

      if (alreadyLikedPost) {
        const indexOfLikeUser = currentPost.likes.indexOf(user.uid);

        currentPost.likes.splice(indexOfLikeUser, 1);

        setLikesPostState([...currentPost.likes]);
      }

      currentPost.dislikes.push(user.uid);

      setDislikesPostState([...currentPost.dislikes]);

      await updateSpecifiedPost(currentPost);

      setPost(currentPost);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleClickRemovePost(e) {
    e.preventDefault();

    try {
      const allPostsFromFirestore = await getPostsOfUser();

      const filteredPosts = allPostsFromFirestore.filter(
        (postFromFirestore) => postFromFirestore.postId !== id
      );

      await updateUsersPosts(filteredPosts);
      window.location.href = './community.html';
    } catch (err) {
      console.log(err);
    }
  }

  return post ? (
    <section className="post">
      <section className="post-section">
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
            handleClickRemove={handleClickRemovePost}
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
          {post.postComments.map((comment) => (
            <CommentItem
              key={uuidv4()}
              commentDay={comment.commentDay}
              commentMonth={comment.commentMonth}
              commentYear={comment.commentYear}
              commentId={comment.commentId}
              commentUser={comment.commentUser}
              commentText={comment.commentText}
              commentLikes={comment.commentLikes}
              commentDislikes={comment.commentDislikes}
              commentReplies={comment.commentReplies}
              post={post}
              setPost={setPost}
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
  user,
}) => {
  const [showWriteReply, setShowWriteReply] = useState(false);

  const [commentRepliesState, setCommentRepliesState] =
    useState(commentReplies);

  const [commentLikesState, setCommentLikesState] = useState([...commentLikes]);
  const [commentDislikesState, setCommentDislikesState] = useState([
    ...commentDislikes,
  ]);

  const [showReplies, setShowReplies] = useState([]);

  const replyRef = useRef('');

  async function handleSubmitReply(e) {
    e.preventDefault();

    if (!replyRef.current.value) return null;

    const today = new Date();

    const todayDate = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();

    try {
      const currentPost = post;
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

  return (
    <li className="comment">
      <div className="comment-user">
        <i className="fa-solid fa-user comment-user__icon" />
        <p className="comment-user__paragraph">
          {commentUser} {commentDay}/0{commentMonth}/{commentYear}
        </p>
      </div>

      <p className="comment-text">{commentText}</p>

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

      <form
        className="write-reply"
        data-show-write-reply={showWriteReply}
        onSubmit={(e) => {
          handleSubmitReply(e);
        }}
      >
        <textarea className="write-reply__textarea" ref={replyRef} />

        <button type="submit" className="black-btn write-reply__btn">
          Submit
        </button>
      </form>

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
            index={index}
            post={post}
            setPost={setPost}
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
  index,
  post,
  setPost,
  user,
}) => {
  const [replyLikesState, setReplyLikesState] = useState([...replyLikes]);
  const [replyDislikesState, setReplyDislikesState] = useState([
    ...replyDislikes,
  ]);

  // Like reply
  async function handleClickLikeReply() {
    const currentPost = post;

    const theComment = currentPost.postComments.find(
      (comment) => comment.commentId === commentId
    );

    const theReply = theComment.commentReplies.find(
      (replyFromTheComment) => replyFromTheComment.replyId === replyId
    );

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

  // Dislike reply
  async function handleClickDislikeReply() {
    const currentPost = post;

    const theComment = currentPost.postComments.find(
      (comment) => comment.commentId === commentId
    );

    const theReply = theComment.commentReplies.find(
      (replyFromTheComment) => replyFromTheComment.replyId === replyId
    );

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

  return (
    <li
      className="comment-reply"
      data-show-reply={showReplies.some((indexState) => index === indexState)}
      key={uuidv4()}
    >
      <div className="comment-user">
        <i className="fa-solid fa-user comment-user__icon" />
        <p className="comment-user__paragraph">
          {replyUser} {replyDay}/0{replyMonth}/{replyYear}
        </p>
      </div>

      <p className="comment-text">{replyText}</p>

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
