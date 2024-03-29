import React, { useEffect, useState, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import FormInputTyping from '../../components/ui/smaller/formInputTyping';
import {
  createPost,
  getPostsOfUser,
} from '../../components/utils/firebaseFunctions';
import PostForm from '../../components/ui/postForm';
import { auth } from '../../config-firebase/firebase';
import doesIncludeBadWord from '../../components/utils/doesIncludeBadWord';
import removeSpacesOfString from '../../components/utils/removeSpacesOfString';

const CreatePostComponent = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [previewImg, setPreviewImg] = useState();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessage2, setAlertMessage2] = useState('');

  const fileRef = useRef();
  const titleRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setUser(user || false);
    });
  }, []);

  function handleUploadFile(e) {
    const [file] = e.target.files;
    if (file) {
      setPreviewImg((prevUrl) => URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setAlertMessage2('Loading...');

    const titleOffensive = doesIncludeBadWord(titleRef.current.value);

    const textOffensive = doesIncludeBadWord(textRef.current.value);

    if (titleOffensive || textOffensive) {
      titleOffensive
        ? (titleRef.current.dataset.errorInputTyping = true)
        : null;

      textOffensive ? (textRef.current.dataset.errorInputTyping = true) : null;
      setAlertMessage('Error: You must not write offensive words');
      return null;
    }

    if (!user) {
      setAlertMessage2(`You're not an user`);
      return null;
    }

    if (!removeSpacesOfString(titleRef.current.value)) {
      titleRef.current.dataset.errorInputTyping = true;
      setAlertMessage('Error: Title is required');

      setLoading(false);
      setAlertMessage2('');
      return null;
    }

    const regex = /\//;
    if (titleRef.current.value.match(regex)) {
      titleRef.current.dataset.errorInputTyping = true;
      setAlertMessage("Error: Please don't use '/' in the post's name");
      setLoading(false);
      setAlertMessage2('');
      return null;
    }

    const today = new Date();

    const todaySecond = today.getSeconds();
    const todayMinute = today.getMinutes();
    const todayHour = today.getHours();
    const todaydDate = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();

    const [file] = fileRef.current.files;

    try {
      await createPost(
        file,
        titleRef.current.value,
        textRef.current.value,
        todaySecond,
        todayMinute,
        todayHour,
        todaydDate,
        todayMonth,
        todayYear
      );
      setLoading(false);
      setAlertMessage2('');
      window.location.href = './community.html';
    } catch (err) {
      console.log(err);
      setLoading(false);
      setAlertMessage2('');
    }
  }

  function handleFocusInput(e) {
    e.target.dataset.errorInputTyping = 'false';
    setAlertMessage('');
    setAlertMessage2('');
  }

  function handleUndoImg() {
    fileRef.current.value = null;
    setPreviewImg('');
  }

  return (
    <section className="create-post">
      <h1 className="create-post__title">Create post</h1>

      <PostForm
        showEditPostAttribute
        handleSubmitPostForm={handleSubmit}
        alertMessageState={alertMessage}
        imgRefProp={fileRef}
        previewImgState={previewImg}
        titleRefProp={titleRef}
        handleUploadImage={handleUploadFile}
        handleUndoImgProp={handleUndoImg}
        handleFocusInput={handleFocusInput}
        alertMessage2State={alertMessage2}
        textRefProp={textRef}
      />
    </section>
  );
};

export default CreatePostComponent;
