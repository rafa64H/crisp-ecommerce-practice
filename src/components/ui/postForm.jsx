import React from 'react';
import FormInputTyping from './smaller/formInputTyping';

const PostForm = ({
  showEditPostAttribute,
  handleSubmitPostForm,
  alertMessageState,
  imgRefProp,
  handleUploadImage,
  previewImgState,
  handleUndoImgProp,
  titleRefProp,
  handleFocusInput,
  defaultValueTitle,
  defaultValueTextArea,
  textRefProp,
  alertMessage2State,
}) => (
  <form
    className="post-form post-form--edit"
    data-show-edit-post={showEditPostAttribute}
    onSubmit={(e) => handleSubmitPostForm(e)}
  >
    <aside aria-live="assertive">{alertMessageState}</aside>
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
            ref={imgRefProp}
            onChange={(e) => handleUploadImage(e)}
          />

          {previewImgState ? (
            <button
              type="button"
              aria-label="Undo uploaded image"
              className="transparent-btn undo-uploaded-file"
              onClick={(e) => handleUndoImgProp(e)}
            >
              <i className="fa-solid fa-xmark" />
            </button>
          ) : (
            ''
          )}
        </div>

        <img
          src={previewImgState}
          className="post-form-file-preview"
          alt={previewImgState ? 'Preview of the mage to be uploaded' : ''}
        />
      </div>
    </div>

    <FormInputTyping
      required
      name="Title"
      type="text"
      id="title"
      theRef={titleRefProp}
      placeholderProp="Write your title here"
      onFocusFunction={handleFocusInput}
      defaultValueProp={defaultValueTitle}
    />

    <div className="form-input-container">
      <label className="form-input-label" htmlFor="the-text">
        Write everything you want about it:
      </label>
      <textarea
        className="form-input-typing post-form-textarea"
        id="the-text"
        ref={textRefProp}
        onFocus={(e) => {
          e.target.dataset.errorInputTyping = false;
          handleFocusInput();
        }}
        defaultValue={defaultValueTextArea}
      />
    </div>

    <button type="submit" className="black-btn">
      <i className="fa-solid fa-sticky-note" />
      Post
    </button>
    <aside aria-live="assertive">{alertMessage2State}</aside>
  </form>
);

export default PostForm;
