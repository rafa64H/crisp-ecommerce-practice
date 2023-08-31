import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { onAuthStateChanged } from 'firebase/auth';
import handleLargeScreen from '../../components/utils/handleLargeScreen';
import {
  getCommunityPosts,
  getPostsOfUser,
  updateSpecifiedPost,
  updateUsersPosts,
} from '../../components/utils/firebaseFunctions';
import { auth } from '../../config-firebase/firebase';
import LikeDislikeComponent from '../../components/ui/smaller/likeDislikeContainer';
import {
  PostCommentOptionsBtn,
  PostCommentOptions,
} from '../../components/ui/smaller/postCommentOptions';
import removePost from '../../components/utils/removePost';

const CommunityComponent = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [listOfPosts, setListOfPosts] = useState([]);
  const [postsToShow, setPostsToShow] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [user, setUser] = useState();

  function splitPostsIntoFive(array, size) {
    const newArray = [];

    for (let i = 0; i < array.length; i += size) {
      newArray.push(array.slice(i, i + size));
    }
    return newArray;
  }

  useEffect(() => {
    handleLargeScreen(setIsLargeScreen);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const communityPostsFromFirebase = await getCommunityPosts();
        const communityPostsSplitted = splitPostsIntoFive(
          communityPostsFromFirebase,
          5
        );

        setListOfPosts(communityPostsSplitted);
        setCurrentIndex(0);
        setUser(user);
      } else {
      }
    });
  }, []);

  useEffect(() => {
    setPostsToShow(listOfPosts[currentIndex]);
  }, [currentIndex]);

  function returningFunction() {
    if (listOfPosts && postsToShow) {
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
                user={user}
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
                    {'< <'}
                  </button>
                  <button
                    type="button"
                    className="arrow-btn black-btn"
                    onClick={() => setCurrentIndex((prev) => prev - 1)}
                  >
                    {'<'}
                  </button>
                </>
              ) : (
                ''
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
                  {'>'}
                </button>
                <button
                  type="button"
                  className="arrow-btn black-btn"
                  onClick={() => setCurrentIndex(listOfPosts.length - 1)}
                >
                  {'> >'}
                </button>
              </>
            ) : (
              ''
            )}
          </ul>
        </section>
      );
    }
    return <div>hola</div>;
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
  user,
}) => {
  const [likesPostState, setLikesPostState] = useState([...likes]);
  const [dislikesPostState, setDislikesPostState] = useState([...dislikes]);
  const [showPostOptionsState, setShowPostOptionsState] = useState(false);

  // Like post
  async function handleLikePost(e) {
    e.preventDefault();

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
    } catch (err) {
      console.log(err);
    }
  }

  // Dislike post
  async function handleDislikePost(e) {
    e.preventDefault();

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

  return (
    <li className="community-list-li">
      <a
        className="community-list-item"
        href={`./post.html?postId=${id}`}
        draggable="false"
        data-your-post={uid === user.uid}
      >
        {uid === user.uid ? (
          <PostCommentOptionsBtn
            onClickBtnFunction={() =>
              setShowPostOptionsState((prevValue) => !prevValue)
            }
          />
        ) : null}

        {uid === user.uid ? (
          <PostCommentOptions
            showPostCommentOptions={showPostOptionsState}
            handleClickRemove={handleClickRemovePost}
            editText="Edit post"
            removeText="Remove post"
          />
        ) : null}

        <div
          className={`community-list-item-div ${
            !paragraph && thumbnail ? 'thumbnail-and-not-paragraph' : ''
          }`}
        >
          {thumbnail ? (
            <img
              src={thumbnail}
              alt="img"
              className="community-list-item__img"
            />
          ) : (
            ''
          )}
          <div className="community-list-item-div-text">
            <h2
              style={{ fontSize: 'clamp(1.3rem, 1.5vw, 3rem)' }}
              className="community-list-item__title"
            >
              {title}
            </h2>
            {paragraph ? (
              <p className="community-list-item__paragraph">{paragraph}</p>
            ) : (
              ''
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
              {day}:0{month}:{year}
            </p>
          }
        />
      </a>
    </li>
  );
};
