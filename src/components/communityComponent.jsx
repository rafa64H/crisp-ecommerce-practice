import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { onAuthStateChanged } from "firebase/auth";
import handleLargeScreen from "../utils/handleLargeScreen";
import {
  getCommunityPosts,
  getPostsOfUser,
  updateSpecifiedPost,
  updateUsersPosts,
} from "../services/firebase/utils/firebaseFunctions.js";
import { auth } from "../services/firebase/config-firebase/firebase.js";
import LikeDislikeComponent from "./ui/likeDislikeContainer.jsx";
import {
  PostCommentOptionsBtn,
  PostCommentOptions,
} from "./ui/postCommentOptions.jsx";
import { dislikePost, likePost, removePost } from "../utils/functionsPost.js";
import { useDispatch, useSelector } from "react-redux";

const CommunityComponent = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [postsToShow, setPostsToShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState();

  const user = useSelector((store) => store.auth.user);
  const isLargeScreen = useSelector(
    (store) => store.isLargeScreen.isLargeScreen
  );
  const dispatch = useDispatch();

  function splitPostsIntoFive(array, size) {
    const newArray = [];

    for (let i = 0; i < array.length; i += size) {
      newArray.push(array.slice(i, i + size));
    }
    return newArray;
  }

  useEffect(() => {
    const setPostsFirstTimeFunction = async () => {
      try {
        const communityPostsFromFirebase = await getCommunityPosts();
        const communityPostsSplitted = splitPostsIntoFive(
          communityPostsFromFirebase,
          5
        );

        setListOfPosts(communityPostsSplitted);
        setCurrentIndex(0);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    setPostsFirstTimeFunction();
  }, []);

  useEffect(() => {
    setPostsToShow(listOfPosts[currentIndex]);
  }, [currentIndex]);

  function returningFunction() {
    if (!loading && listOfPosts.length === 0) {
      return (
        <section className="community">
          {isLargeScreen ? (
            <a
              href="./create-post.html"
              className="create-post-btn-desktop black-btn"
            >
              <i className="fa-solid fa-plus" /> Create post
            </a>
          ) : (
            <a
              href="./create-post.html"
              className="create-post-btn-mobile black-btn"
            >
              <i className="fa-solid fa-plus" /> Create post
            </a>
          )}

          <section className="post-section post-section--loading">
            <h1 className="post-section__title post-section--loading__title">
              Posts not found
            </h1>
          </section>
        </section>
      );
    }

    if (listOfPosts && postsToShow && !loading) {
      return (
        <section className="community">
          {isLargeScreen ? (
            <a
              href="./create-post.html"
              className="create-post-btn-desktop black-btn"
            >
              <i className="fa-solid fa-plus" /> Create post
            </a>
          ) : (
            <a
              href="./create-post.html"
              className="create-post-btn-mobile black-btn"
            >
              <i className="fa-solid fa-plus" /> Create post
            </a>
          )}

          <ul className="community-list">
            {postsToShow.map((post) => (
              <CommunityPostListItem
                key={uuidv4()}
                post={post}
                id={post.postId}
                uid={post.uid}
                thumbnail={post.postImg}
                title={post.postTitle}
                paragraph={post.postText}
                likes={post.likes}
                dislikes={post.dislikes}
                seconds={post.postSecond}
                minutes={post.postMinutes}
                hours={post.postHour}
                day={post.postDay}
                month={post.postMonth}
                year={post.postYear}
              />
            ))}
          </ul>

          <ul className="list-indexes">
            <li>
              {listOfPosts[currentIndex - 1] !== undefined ? (
                <>
                  <button
                    type="button"
                    className="arrow-btn black-btn"
                    onClick={() => setCurrentIndex(0)}
                  >
                    {"< <"}
                  </button>
                  <button
                    type="button"
                    className="arrow-btn black-btn"
                    onClick={() => setCurrentIndex((prev) => prev - 1)}
                  >
                    {"<"}
                  </button>
                </>
              ) : (
                ""
              )}
            </li>

            {listOfPosts.map((item, index) => {
              if (index < currentIndex - 2) return null;
              if (index > currentIndex + 2) return null;

              return (
                <li key={uuidv4()} className="list-indexes-item">
                  <button
                    type="button"
                    className="list-indexes-btn transparent-btn"
                    data-active-index={currentIndex === index}
                    onClick={(e) => setCurrentIndex(index)}
                  >
                    {index + 1}
                  </button>
                </li>
              );
            })}

            {listOfPosts[currentIndex + 1] !== undefined ? (
              <>
                <button
                  type="button"
                  className="arrow-btn black-btn"
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                >
                  {">"}
                </button>
                <button
                  type="button"
                  className="arrow-btn black-btn"
                  onClick={() => setCurrentIndex(listOfPosts.length - 1)}
                >
                  {"> >"}
                </button>
              </>
            ) : (
              ""
            )}
          </ul>
        </section>
      );
    }

    return (
      <section className="post-section post-section--loading">
        <h1 className="post-section__title post-section--loading__title">
          Loading...
        </h1>
      </section>
    );
  }

  return returningFunction();
};

export default CommunityComponent;

const CommunityPostListItem = ({
  post,
  id,
  uid,
  thumbnail,
  title,
  paragraph,
  likes,
  dislikes,
  seconds,
  minutes,
  hours,
  day,
  month,
  year,
}) => {
  const [likesPostState, setLikesPostState] = useState([...likes]);
  const [dislikesPostState, setDislikesPostState] = useState([...dislikes]);
  const [showPostOptionsState, setShowPostOptionsState] = useState(false);

  const user = useSelector((store) => store.auth.user);

  // Like post
  async function handleLikePost(e) {
    e.preventDefault();

    if (!user.uid) return null;

    try {
      const currentPost = post;

      await likePost(currentPost, user, {
        setLikesPostState,
        setDislikesPostState,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Dislike post
  async function handleDislikePost(e) {
    e.preventDefault();

    if (!user) return null;

    try {
      const currentPost = post;

      await dislikePost(currentPost, user, {
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
      window.location.href = "./community.html";
    } catch (err) {
      console.log(err);
    }
  }

  async function handleClickEditLink(e) {
    window.location.href = `./post.html?postId=${id}&editPostLinked=${true}`;
  }

  return (
    <li className="community-list-li">
      <a
        className="community-list-item"
        href={`./post.html?postId=${id}`}
        draggable="false"
        data-your-post={uid === user.uid}
      >
        {uid === user.uid ? (
          <>
            <PostCommentOptionsBtn
              onClickBtnFunction={() =>
                setShowPostOptionsState((prevValue) => !prevValue)
              }
            />

            <PostCommentOptions
              showPostCommentOptions={showPostOptionsState}
              handleClickEdit={handleClickEditLink}
              handleClickRemove={handleClickRemovePost}
              editText="Edit post"
              removeText="Remove post"
            />
          </>
        ) : null}

        <div
          className={`community-list-item-div ${
            !paragraph && thumbnail ? "thumbnail-and-not-paragraph" : ""
          }`}
        >
          {thumbnail ? (
            <img
              src={thumbnail}
              alt="img"
              className="community-list-item__img"
            />
          ) : (
            ""
          )}
          <div className="community-list-item-div-text">
            <h2
              style={{ fontSize: "clamp(1.3rem, 1.5vw, 3rem)" }}
              className="community-list-item__title"
            >
              {title}
            </h2>
            {paragraph ? (
              <p className="community-list-item__paragraph">{paragraph}</p>
            ) : (
              ""
            )}
          </div>
        </div>

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
              {month}/{day}/{year}
            </p>
          }
        />
      </a>
    </li>
  );
};
