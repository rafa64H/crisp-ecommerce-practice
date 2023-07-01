import React, { useEffect, useState, useRef } from 'react';
import { signIn } from '../../components/utils/authFunctions';

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signIn(emailRef.current.value, passwordRef.current.value);
      window.location.href = 'index.html';
    } catch (err) {
      console.log(err);
      setErrorMessage(err);
    }
  }

  return (
    <>
      <h1 className="create-account-title">Sign in</h1>

      <form
        action=""
        className="form-account"
        onSubmit={(e) => handleSubmit(e)}
      >
        <aside className="error-message-form" role="alert">
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
            className="form-input-typing"
            placeholder="Password"
          />
        </div>

        <input type="submit" value="Login" className="black-btn" />
      </form>
    </>
  );
};

export default LoginForm;
