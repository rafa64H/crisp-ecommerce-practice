import React, { useState, useRef, useEffect } from "react";
import { createUser } from "../services/firebase/utils/firebaseFunctions";
import { auth } from "../services/firebase/config-firebase/firebase.js";
import FormInputTyping from "./ui/formInputTyping";

const CreateAccountForm = () => {
  const [alertMessage, setAlertMessage] = useState("");
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
    setAlertMessage("Loading");

    if (
      firstNameRef.current.value === "" ||
      lastNameRef.current.value === "" ||
      emailRef.current.value === "" ||
      passwordRef.current.value === "" ||
      confirmPasswordRef.current.value === ""
    ) {
      const emptyRefs = allRefs.filter((ref) => ref.current.value === "");

      emptyRefs.map(
        (emptyRef) => (emptyRef.current.dataset.errorInputTyping = "true")
      );

      setAlertMessage("Error: Complete the required spaces");
      setLoading(false);
      return null;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setAlertMessage("Error: Passwords do not match");
      setLoading(false);
      passwordRef.current.dataset.errorInputTyping = "true";
      confirmPasswordRef.current.dataset.errorInputTyping = "true";
      return null;
    }

    try {
      await createUser(
        firstNameRef.current.value,
        lastNameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      // window.location.href = "index.html";
    } catch (err) {
      setLoading(false);
      setAlertMessage(err.message);
    }
  }

  function handleFocusInput(e) {
    e.target.dataset.errorInputTyping = "false";
    setAlertMessage("");
  }

  return (
    <>
      <h1 className="create-account-title">Create New Customer Account</h1>

      <form className="form-account" onSubmit={(e) => handleSubmit(e)}>
        <aside
          className="error-message-form"
          role="alert"
          aria-live="assertive"
        >
          {alertMessage}
        </aside>
        <h2 className="form-account__title">Personal information</h2>

        <FormInputTyping
          required
          name="First name"
          type="text"
          id="first-name"
          loading={loading}
          theRef={firstNameRef}
          onFocusFunction={handleFocusInput}
        />

        <FormInputTyping
          required
          name="Last name"
          type="text"
          id="last-name"
          loading={loading}
          theRef={lastNameRef}
          onFocusFunction={handleFocusInput}
        />

        <h2 className="form-account__title">Email and password</h2>

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

        <FormInputTyping
          required
          name="Confirm assword"
          type="password"
          id="confirm-password"
          loading={loading}
          theRef={confirmPasswordRef}
          onFocusFunction={handleFocusInput}
        />

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
