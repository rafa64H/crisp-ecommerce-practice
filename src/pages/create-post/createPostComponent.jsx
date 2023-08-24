import React, { useEffect, useState, useRef } from 'react';
import FormInputTyping from '../../components/ui/smaller/formInputTyping';
import {
  createPost,
  getPostsOfUser,
} from '../../components/utils/firebaseFunctions';

const CreatePostComponent = () => {
  const [loading, setLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState();
  const [alertMessage, setAlertMessage] = useState('');

  const fileRef = useRef();
  const titleRef = useRef();
  const textRef = useRef();

  function handleUploadFile(e) {
    const [file] = e.target.files;
    if (file) {
      setPreviewImg((prevUrl) => URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!titleRef.current.value) {
      titleRef.current.dataset.errorInputTyping = true;
      setAlertMessage('Error: Title is required');
      return null;
    }

    const regex = /\//;
    if (titleRef.current.value.match(regex)) {
      titleRef.current.dataset.errorInputTyping = true;
      setAlertMessage("Error: Please don't use '/' in the post's name");
      return null;
    }

    const [file] = fileRef.current.files;

    try {
      await createPost(file, titleRef.current.value, textRef.current.value);
    } catch (err) {
      console.log(err);
    }
  }

  function handleFocusInput(e) {
    e.target.dataset.errorInputTyping = 'false';
    setAlertMessage('');
  }

  function handleUndoImg() {
    fileRef.current.value = null;
    setPreviewImg('');
  }

  return (
    <section className="create-post">
      <h1 className="create-post__title">Create post</h1>
      <form className="create-post-form" onSubmit={(e) => handleSubmit(e)}>
        <aside aria-live="assertive">{alertMessage}</aside>
        <div className="form-input-container form-input-container--file">
          <label className="form-input-label" htmlFor="the-file">
            Submit image
          </label>

          <div className="form-input-typing">
            <div className="create-post-file-btns-container">
              <input
                type="file"
                className="create-post-file black-btn"
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
              className="create-post-file-preview"
              alt={previewImg ? 'Preview of the mage to be uploaded' : ''}
            />
          </div>
        </div>

        <FormInputTyping
          required
          name="Title"
          type="text"
          id="title"
          loading={loading}
          theRef={titleRef}
          placeholderProp="Write your title here"
          onFocusFunction={handleFocusInput}
        />

        <div className="form-input-container">
          <label className="form-input-label" htmlFor="the-text">
            Write everything you want about it:
          </label>
          <textarea
            className="form-input-typing create-post-textarea"
            id="the-text"
            ref={textRef}
          />
        </div>

        <button type="submit" className="black-btn">
          <i className="fa-solid fa-sticky-note" />
          Post
        </button>
      </form>
    </section>
  );
};

export default CreatePostComponent;
