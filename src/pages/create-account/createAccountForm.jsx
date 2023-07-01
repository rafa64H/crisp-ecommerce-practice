import React, { useState, useRef, useEffect } from 'react';
import { createUser } from '../../components/utils/authFunctions';
import { auth } from '../../config-firebase/firebase';

const CreateAccountForm = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const allRefs = [
    firstNameRef,
    lastNameRef,
    emailRef,
    passwordRef,
    confirmPasswordRef,
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      firstNameRef.current.value === '' ||
      lastNameRef.current.value === '' ||
      emailRef.current.value === '' ||
      passwordRef.current.value === '' ||
      confirmPasswordRef.current.value === ''
    ) {
      const emptyRefs = allRefs.filter((ref) => ref.current.value === '');

      emptyRefs.map(
        (emptyRef) => (emptyRef.current.dataset.errorInputTyping = 'true')
      );

      setErrorMessage('* Complete the required spaces');
      return null;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrorMessage('* Passwords do not match');
      passwordRef.current.dataset.errorInputTyping = 'true';
      confirmPasswordRef.current.dataset.errorInputTyping = 'true';
      return null;
    }

    try {
      await createUser(
        firstNameRef.current.value,
        lastNameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      window.location.href = 'index.html';
    } catch (err) {
      console.log(err);
    }
  }

  function handleClickInput(e) {
    e.target.dataset.errorInputTyping = 'false';
  }

  return (
    <>
      <h1 className="create-account-title">Create New Customer Account</h1>

      <form
        action=""
        className="form-account"
        onSubmit={(e) => handleSubmit(e)}
      >
        <aside className="error-message-form" role="alert">
          {errorMessage}
        </aside>
        <h2 className="form-account__title">Personal information</h2>
        <div className="form-input-container">
          <label htmlFor="first-name" className="form-input-label">
            First name <span className="input-required">*</span>
          </label>
          <input
            type="text"
            id="first-name"
            className="form-input-typing"
            ref={firstNameRef}
            onClick={(e) => handleClickInput(e)}
            placeholder="First name"
          />
        </div>

        <div className="form-input-container">
          <label htmlFor="last-name" className="form-input-label">
            Last name <span className="input-required">*</span>
          </label>
          <input
            type="text"
            id="last-name"
            className="form-input-typing"
            ref={lastNameRef}
            onClick={(e) => handleClickInput(e)}
            placeholder="Last name"
          />
        </div>

        <h2 className="form-account__title">Email and password</h2>

        <div className="form-input-container">
          <label htmlFor="email" className="form-input-label">
            Email <span className="input-required">*</span>
          </label>
          <input
            type="email"
            id="email"
            className="form-input-typing"
            ref={emailRef}
            onClick={(e) => handleClickInput(e)}
            placeholder="ThisIsExample@example.com"
          />
        </div>

        <div className="form-input-container">
          <label htmlFor="password" className="form-input-label">
            Password <span className="input-required">*</span>
          </label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            onClick={(e) => handleClickInput(e)}
            className="form-input-typing"
            placeholder="Password"
          />
        </div>

        <div className="form-input-container">
          <label htmlFor="confirm-password" className="form-input-label">
            Confirm password <span className="input-required">*</span>
          </label>
          <input
            type="password"
            id="confirm-password"
            className="form-input-typing"
            ref={confirmPasswordRef}
            onClick={(e) => handleClickInput(e)}
            placeholder="Confirm password"
          />
        </div>

        <input type="submit" value="Create account" className="black-btn" />
      </form>
    </>
  );
};

export default CreateAccountForm;
