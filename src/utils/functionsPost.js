import { v4 as uuidv4 } from "uuid";
import { deleteObject, ref } from "firebase/storage";
import {
  deleteImageOfPost,
  getPostsOfUser,
  updateSpecifiedPost,
  updateUsersPosts,
  uploadImageOfPostToStorage,
} from "../services/firebase/utils/firebaseFunctions";
import { storage } from "../services/firebase/config-firebase/firebase";
import removeSpacesOfString from "./removeSpacesOfString";
import doesIncludeBadWord from "./doesIncludeBadWord";

export async function editPost(
  currentPost,
  fileRef,
  titleRef,
  textRef,
  statesAndSetStates
) {
  const { previewImg, setAlertMessage, setEditPostState } = statesAndSetStates;

  const titleOffensive = doesIncludeBadWord(titleRef.current.value);

  const textOffensive = doesIncludeBadWord(textRef.current.value);

  if (!removeSpacesOfString(titleRef.current.value)) {
    setAlertMessage("There is no title");
    return null;
  }
  if (titleOffensive || textOffensive) {
    titleOffensive ? (titleRef.current.dataset.errorInputTyping = true) : null;

    textOffensive ? (textRef.current.dataset.errorInputTyping = true) : null;
    setAlertMessage("Error: You must not write offensive words");
    return null;
  }
  if (
    currentPost.postTitle === titleRef.current.value &&
    currentPost.postText === textRef.current.value &&
    previewImg === currentPost.postImg
  ) {
    setAlertMessage(`Error: There are no changes`);
    return null;
  }

  if (previewImg === currentPost.postImg) {
    currentPost.postTitle = titleRef.current.value;
    currentPost.postText = textRef.current.value;

    await updateSpecifiedPost(currentPost);
    setEditPostState((prevValue) => !prevValue);
    return null;
  }
  if (!previewImg) {
    await deleteImageOfPost(currentPost);

    currentPost.postImg = "";
    currentPost.postImgRef = "";
    currentPost.postTitle = titleRef.current.value;
    currentPost.postText = textRef.current.value;

    await updateSpecifiedPost(currentPost);
    setEditPostState((prevValue) => !prevValue);
    return null;
  }

  if (currentPost.postImg) {
    await deleteImageOfPost(currentPost);
  }

  const [file] = fileRef.current.files;

  const imageStringForRefNew = `communityPostsImgs/${titleRef.current.value}/${
    file.name + uuidv4()
  }`;

  const imageUrlNew = await uploadImageOfPostToStorage(
    file,
    imageStringForRefNew
  );

  currentPost.postImg = imageUrlNew;
  currentPost.postImgRef = imageStringForRefNew;
  currentPost.postTitle = titleRef.current.value;
  currentPost.postText = textRef.current.value;

  await updateSpecifiedPost(currentPost);
  setEditPostState((prevValue) => !prevValue);
}

export async function removePost(currentPost) {
  const allPostsFromFirestore = await getPostsOfUser();

  const filteredPosts = allPostsFromFirestore.filter(
    (postFromFirestore) => postFromFirestore.postId !== currentPost.postId
  );

  if (currentPost.postImg) {
    console.log(currentPost.postImgRef);
    const imgRef = ref(storage, currentPost.postImgRef);

    deleteObject(imgRef)
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  await updateUsersPosts(filteredPosts);
}

export async function likePost(currentPost, user, stateFunctions) {
  const { setPost, setLikesPostState, setDislikesPostState } = stateFunctions;

  const alreadyLikedPost = currentPost.likes.some(
    (likeUid) => likeUid === user.uid
  );

  const alreadyDislikedPost = currentPost.dislikes.some(
    (dislikeUid) => dislikeUid === user.uid
  );

  console.log(currentPost);

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

  console.log(currentPost);

  await updateSpecifiedPost(currentPost);

  setPost(currentPost);
}

export async function dislikePost(currentPost, user, stateFunctions) {
  const { setPost, setLikesPostState, setDislikesPostState } = stateFunctions;

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
}
