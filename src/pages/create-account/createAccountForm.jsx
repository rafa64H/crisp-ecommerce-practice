import React, { useState, useRef, useEffect } from 'react';
import { createUser } from '../../components/utils/firebaseFunctions';
import { auth } from '../../config-firebase/firebase';

const CreateAccountForm = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    setAlertMessage('Loading');

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

      setAlertMessage('Error: Complete the required spaces');
      setLoading(false);
      return null;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setAlertMessage('Error: Passwords do not match');
      setLoading(false);
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
      setLoading(false);
      setAlertMessage(err.message);
    }
  }

  function handleFocusInput(e) {
    e.target.dataset.errorInputTyping = 'false';
    setAlertMessage('');
  }

  return (
    <>
      <h1 className="create-account-title">Create New Customer Account</h1>

      <form
        action=""
        className="form-account"
        onSubmit={(e) => handleSubmit(e)}
      >
        <aside
          className="error-message-form"
          role="alert"
          aria-live="assertive"
        >
          {alertMessage}
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
            disabled={loading}
            ref={firstNameRef}
            onFocus={(e) => handleFocusInput(e)}
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
            disabled={loading}
            ref={lastNameRef}
            onFocus={(e) => handleFocusInput(e)}
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
            disabled={loading}
            ref={emailRef}
            onFocus={(e) => handleFocusInput(e)}
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
            onFocus={(e) => handleFocusInput(e)}
            className="form-input-typing"
            disabled={loading}
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
            disabled={loading}
            ref={confirmPasswordRef}
            onFocus={(e) => handleFocusInput(e)}
            placeholder="Confirm password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          aria-label="Sign up, after creating account you will be redirected to home page"
          className="black-btn"
        >
          Create Account
        </button>
      </form>
    </>
  );
};

export default CreateAccountForm;
