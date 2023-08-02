import React, { useEffect, useState, useRef } from 'react';
import { signIn } from '../../components/utils/firebaseFunctions';
import FormInputTyping from '../../components/ui/smaller/formInputTyping';

const LoginForm = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setAlertMessage('Loading');

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
      setAlertMessage('Error: Invalid Email or password.');
      emailRef.current.dataset.errorInputTyping = 'true';
      passwordRef.current.dataset.errorInputTyping = 'true';
      setLoading(false);
      return null;
    }
    if (signInValue === 'Firebase: Error (auth/too-many-requests).') {
      setAlertMessage('Error: Too many requests, try again later');
      setLoading(false);
      return null;
    }
    if (signInValue === 'Firebase: Error (auth/network-error).') {
      setAlertMessage('Error: Network error');
      setLoading(false);
      return null;
    }

    setLoading(false);
    window.location.href = 'index.html';
  }

  function handleFocusInput(e) {
    e.target.dataset.errorInputTyping = 'false';
    setAlertMessage('');
  }

  return (
    <>
      <h1 className="create-account-title">Sign in</h1>

      <form className="form-account" onSubmit={(e) => handleSubmit(e)}>
        <aside
          className="error-message-form"
          role="alert"
          aria-live="assertive"
        >
          {alertMessage}
        </aside>

        <FormInputTyping
          required
          name="Email"
          type="email"
          id="email"
          loading={loading}
          theRef={emailRef}
          placeholderProp="ThisIsExample@example.com"
          onFocusFunction={handleFocusInput}
        />

        <FormInputTyping
          required
          name="Password"
          type="password"
          id="password"
          loading={loading}
          theRef={passwordRef}
          onFocusFunction={handleFocusInput}
        />

        <button
          type="submit"
          disabled={loading}
          aria-label="Login, after login you will be redirected to home page"
          className="black-btn"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
