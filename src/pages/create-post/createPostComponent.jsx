import React, { useEffect, useState, useRef } from 'react';
import FormInputTyping from '../../components/ui/smaller/formInputTyping';

const CreatePostComponent = () => {
  const [loading, setLoading] = useState(false);

  const fileRef = useRef();
  const titleRef = useRef();
  const textRef = useRef();

  return (
    <section className="create-post">
      <h1 className="create-post__title">Create post</h1>
      <form className="create-post-form">
        <div className="form-input-container">
          <label className="form-input-label" htmlFor="the-file">
            Submit image
          </label>

          <input
            type="file"
            className="form-input-typing create-post-file black-btn"
            accept="image/*"
            htmlFor="the-file"
            ref={fileRef}
          />
        </div>

        <FormInputTyping
          required
          name="Title"
          type="text"
          id="title"
          loading={loading}
          theRef={titleRef}
          placeholderProp="Write your title here"
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
          <p>{textRef.current.value.length}</p>
        </div>

        <button type="button" className="black-btn">
          <i className="fa-solid fa-sticky-note" />
          Post
        </button>
      </form>
    </section>
  );
};

export default CreatePostComponent;
