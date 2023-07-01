import React, { useEffect, useState, useRef } from 'react';
import { signIn } from '../../components/utils/authFunctions';

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const signInValue = await signIn(
      emailRef.current.value,
      passwordRef.current.value
    );

    if (
      signInValue === 'Firebase: Error (auth/missing-password).' ||
      signInValue === 'Firebase: Error (auth/wrong-password).' ||
      signInValue === 'Firebase: Error (auth/invalid-email).' ||
      signInValue === 'Firebase: Error (auth/user-not-found).'
    ) {
      setErrorMessage('Error: Invalid Email or password.');
      emailRef.current.dataset.errorInputTyping = 'true';
      passwordRef.current.dataset.errorInputTyping = 'true';
      return null;
    }
    if (signInValue === 'Firebase: Error (auth/too-many-requests).') {
      setErrorMessage('Error: Too many requests, try again later');
      return null;
    }
    if (signInValue === 'Firebase: Error (auth/network-error).') {
      setErrorMessage('Error: Network error');
      return null;
    }

    window.location.href = 'index.html';
  }

  function handleClickInput(e) {
    e.target.dataset.errorInputTyping = 'false';
    setErrorMessage('');
  }

  return (
    <>
      <h1 className="create-account-title">Sign in</h1>

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
          {errorMessage}
        </aside>

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

        <input
          type="submit"
          aria-label="Login, after login you will be redirected to home page"
          value="Login"
          className="black-btn"
        />
      </form>
    </>
  );
};

export default LoginForm;
