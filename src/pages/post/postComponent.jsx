import { onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '../../config-firebase/firebase';
import {
  getCommunityPosts,
  getDataOfUser,
  updateSpecifiedPost,
} from '../../components/utils/firebaseFunctions';

const PostComponent = () => {
  const [post, setPost] = useState();

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

  function returningFunction() {
    if (post) {
      return (
        <section className="post">
          <section className="post-section">
            <h1 className="post-section__title">{post.postTitle}</h1>
            <p className="post-section__paragraph">{post.postText}</p>

            <div className="like-dislike-container">
              <button
                onClick={(e) => e.preventDefault()}
                type="button"
                alt="Like"
                className="like-dislike like"
              >
                <i className="fa-solid fa-arrow-up" />
                <p>{post.likes.length}</p>
              </button>

              <button
                onClick={(e) => e.preventDefault()}
                type="button"
                alt="Dislike"
                className="like-dislike dislike"
              >
                <i className="fa-solid fa-arrow-down" />
                <p>{post.dislikes.length}</p>
              </button>
              <p>
                {post.postDay}:0{post.postMonth}:{post.postYear}
              </p>
            </div>
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
                />
              ))}
            </ul>
          </section>
        </section>
      );
    }
    return <div>Null</div>;
  }

  return returningFunction();
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
}) => (
  <li className="comment">
    <div className="comment-user">
      <i className="fa-solid fa-user comment-user__icon" />
      <p className="comment-user__paragraph">
        {commentUser} {commentDay}/0{commentMonth}/{commentYear}
      </p>
    </div>
    <p className="comment-text">{commentText}</p>
    <div className="like-dislike-container">
      <button
        onClick={(e) => e.preventDefault()}
        type="button"
        alt="Like"
        className="like-dislike like"
      >
        <i className="fa-solid fa-arrow-up" />
        <p>{commentLikes}</p>
      </button>

      <button
        onClick={(e) => e.preventDefault()}
        type="button"
        alt="Dislike"
        className="like-dislike dislike"
      >
        <i className="fa-solid fa-arrow-down" />
        <p>{commentDislikes}</p>
      </button>
    </div>

    <div className="reply-buttons">
      <button type="button" className="transparent-btn reply-btn">
        Reply <i className="fa-solid fa-reply" />
      </button>

      <button type="button" className="transparent-btn comment-show-replies">
        Show replies <i className="fa-solid fa-plus" />
      </button>
    </div>

    <ul className="comment-replies">
      {commentReplies.map((reply) => (
        <li className="comment-reply" key={uuidv4()}>
          <div className="comment-user">
            <i className="fa-solid fa-user comment-user__icon" />
            <p className="comment-user__paragraph">
              {reply.replyUser} {reply.replyDay}/0{reply.replyMonth}/
              {reply.replyYear}
            </p>
          </div>
          <p className="comment-text">{reply.replyText}</p>
          <div className="like-dislike-container">
            <button
              onClick={(e) => e.preventDefault()}
              type="button"
              alt="Like"
              className="like-dislike like"
            >
              <i className="fa-solid fa-arrow-up" />
              <p>{reply.replyLikes.length}</p>
            </button>

            <button
              onClick={(e) => e.preventDefault()}
              type="button"
              alt="Dislike"
              className="like-dislike dislike"
            >
              <i className="fa-solid fa-arrow-down" />
              <p>{reply.replyDislikes.length}</p>
            </button>
          </div>
        </li>
      ))}
    </ul>
  </li>
);
