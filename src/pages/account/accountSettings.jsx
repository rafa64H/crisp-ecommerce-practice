import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../config-firebase/firebase';
import {
  changeAccountAddress,
  changeAccountInformation,
  getDataOfUser,
  logOutUser,
} from '../../components/utils/firebaseFunctions';

const AccountSettings = () => {
  const [selectedOption, setSelectedOption] = useState('Account information');
  const [showSettingsOptions, setShowSettingsOptions] = useState(false);
  const [changeIcon, setChangeIcon] = useState('fa-plus');
  const [alertMessage, setAlertMessage] = useState('Loading');
  const [alertMessageDialog, setAlertMessageDialog] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFormYet, setNotFormYet] = useState(true);
  const [emailVerified, setEmailVerified] = useState(true);
  const [typeOfChange, setTypeOfChange] = useState('');
  const [arrayAllCountriesName, setArrayAllCountriesName] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();
  const dialogPasswordRef = useRef();
  const confirmCurrentPasswordRef = useRef();

  const firstNameAddressRef = useRef();
  const lastNameAddressRef = useRef();
  const phoneNumberAddressRef = useRef();
  const streetAddressRef = useRef();
  const countryAddressRef = useRef();
  const stateAddressRef = useRef();
  const postalCodeAddressRef = useRef();

  async function getAllCountriesName() {
    try {
      const response = await fetch(
        'https://countriesnow.space/api/v0.1/countries/states'
      );
      const data = await response.json();
      const arrayOfCountries = data.data;
      const allCountriesNames = arrayOfCountries.map((country) => country.name);
      return allCountriesNames;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docData = await getDataOfUser();
        firstNameRef.current.value = docData.firstName;
        lastNameRef.current.value = docData.lastName;
        emailRef.current.value = user.email;

        firstNameAddressRef.current.value = docData.address.firstNameAddress;
        lastNameAddressRef.current.value = docData.address.lastNameAddress;
        phoneNumberAddressRef.current.value = docData.address.phoneNumber;
        streetAddressRef.current.value = docData.address.streetAddress;
        setSelectedCountry(docData.address.country);
        stateAddressRef.current.value = docData.address.state;
        postalCodeAddressRef.current.value = docData.address.postalCode;
        setLoading(false);
        setAlertMessage('');
        if (!user.emailVerified) {
          setEmailVerified(false);
          setAlertMessage(
            'Please verify your Email Address first, if you want to change information, after verifying reload this page'
          );
        }

        const allCountriesNames = await getAllCountriesName();
        setArrayAllCountriesName(allCountriesNames);
      } else {
        setAlertMessage(`Error: Couldn't get user data`);
      }
    });
  }, []);

  const settingsOptions = [
    'Account information',
    'Address',
    'History of orders',
    'My wishlist',
    'Log out',
  ];

  function handleClickExpand() {
    if (showSettingsOptions) {
      setShowSettingsOptions(false);
      setChangeIcon('fa-plus');
    } else {
      setShowSettingsOptions(true);
      setChangeIcon('fa-minus');
    }
  }

  async function handleClickOption(settingOption) {
    if (settingOption === 'Log out') {
      try {
        await logOutUser();
        window.location.href = 'index.html';
      } catch (error) {
        setAlertMessage(error.message);
      }
      return null;
    }
    setSelectedOption(settingOption);
  }

  async function handleSubmitAccountInformation(e) {
    e.preventDefault();

    const allRefsAccountInformation = [firstNameRef, lastNameRef, emailRef];

    const emptyRequiredInputs = allRefsAccountInformation.filter(
      (ref) => ref.current.value === ''
    );

    if (!emailVerified) {
      setAlertMessage(
        'Error: Please verify your Email Address first, if you want to change information'
      );
      return null;
    }
    if (emptyRequiredInputs.length !== 0) {
      setAlertMessage('Error: Complete the required spaces');
      emptyRequiredInputs.map((ref) => {
        ref.current.dataset.errorInputTyping = 'true';
      });
      return null;
    }

    if (newPasswordRef.current.value !== confirmNewPasswordRef.current.value) {
      setAlertMessage('Error: new password does not match with the confirm');
      newPasswordRef.current.dataset.errorInputTyping = 'true';
      confirmNewPasswordRef.current.dataset.errorInputTyping = 'true';
      return null;
    }
    if (
      newPasswordRef.current.value.length < 6 &&
      newPasswordRef.current.value.length !== 0
    ) {
      setAlertMessage('Error: New password should be 6 characters length');
      newPasswordRef.current.dataset.errorInputTyping = 'true';
      confirmNewPasswordRef.current.dataset.errorInputTyping = 'true';
      return null;
    }

    setNotFormYet(false);
    setTypeOfChange('accountInformation');
    dialogPasswordRef.current.showModal();
  }

  async function handleSubmitAddress(e) {
    e.preventDefault();

    const allRefsAddress = [
      firstNameAddressRef,
      lastNameAddressRef,
      phoneNumberAddressRef,
      streetAddressRef,
      countryAddressRef,
      stateAddressRef,
      postalCodeAddressRef,
    ];

    const emptyRequiredInputs = allRefsAddress.filter(
      (ref) => ref.current.value === ''
    );

    if (!emailVerified) {
      setAlertMessage(
        'Error: Please verify your Email Address first, if you want to change information'
      );
      return null;
    }
    if (emptyRequiredInputs.length !== 0) {
      setAlertMessage('Error: Complete the required spaces');
      emptyRequiredInputs.map((ref) => {
        ref.current.dataset.errorInputTyping = 'true';
      });
      return null;
    }

    setNotFormYet(false);
    setTypeOfChange('address');
    dialogPasswordRef.current.showModal();
  }

  function handleCloseModal() {
    dialogPasswordRef.current.close();
    setNotFormYet(true);
  }

  function handleFocusInput(e) {
    e.target.dataset.errorInputTyping = 'false';
    setAlertMessage('');
    setAlertMessageDialog('');
  }

  async function handleConfirmSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setAlertMessageDialog('Loading');

    const user = auth.currentUser;
    const docData = await getDataOfUser();

    try {
      if (confirmCurrentPasswordRef.current.value !== docData.password) {
        setLoading(false);
        setAlertMessageDialog('Error: Wrong password');

        confirmCurrentPasswordRef.current.dataset.errorInputTyping = 'true';
        return null;
      }

      switch (typeOfChange) {
        case 'accountInformation':
          await changeAccountInformation(
            firstNameRef.current.value,
            lastNameRef.current.value,
            emailRef.current.value,
            newPasswordRef.current.value,
            docData.firstName,
            docData.lastName,
            user.email,
            confirmCurrentPasswordRef.current.value
          );
          setAlertMessageDialog('');
          window.location.href = 'account.html';
          break;

        case 'address':
          await changeAccountAddress(
            firstNameAddressRef.current.value,
            lastNameAddressRef.current.value,
            phoneNumberAddressRef.current.value,
            streetAddressRef.current.value,
            countryAddressRef.current.value,
            stateAddressRef.current.value,
            postalCodeAddressRef.current.value
          );
          setAlertMessageDialog('');
          window.location.href = 'account.html';
          break;

        default:
          console.log('error');
          break;
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setAlertMessageDialog(err.message);
    }
  }

  function handleCountryChange(e) {
    setSelectedCountry(e.target.value);
  }

  // I don't know, but I add this just in case an user can
  // open the <dialog> of confirm password with inspect element
  function showConfirmBtn() {
    if (notFormYet)
      return (
        <button type="button" className="black-btn">
          You haven't submitted
        </button>
      );
    return (
      <button
        type="submit"
        disabled={loading}
        className="black-btn"
        aria-label="Confirm changes"
      >
        Confirm
      </button>
    );
  }

  return (
    <>
      <h1 className="account-settings-title">Account settings</h1>

      <section className="account-settings">
        <button
          type="button"
          className="button-expand"
          aria-expanded={showSettingsOptions}
          onClick={handleClickExpand}
        >
          {selectedOption}
          <i className={`fa-solid ${changeIcon} icon`} />
        </button>

        <ul
          className="settings-options"
          data-show-settings-options={showSettingsOptions}
        >
          {settingsOptions.map((settingOption) => (
            <li key={uuidv4()} className="settings-options__li">
              <button
                onClick={() => handleClickOption(settingOption)}
                type="button"
                className="settings-options__btn"
                aria-pressed={selectedOption === settingOption}
                data-selected-option-acc-settings={
                  selectedOption === settingOption
                }
              >
                {settingOption}
              </button>
            </li>
          ))}
        </ul>

        <form
          className="form-account-settings"
          data-show-form-account-settings={
            selectedOption === 'Account information'
          }
          onSubmit={(e) => handleSubmitAccountInformation(e)}
        >
          <h2 className="form-account-settings__title">
            Edit - Account information
          </h2>

          <aside
            className="error-message-form"
            role="alert"
            aria-live="assertive"
          >
            {alertMessage}
          </aside>
          <div className="form-input-container">
            <label htmlFor="first-name" className="form-input-label">
              First name
            </label>
            <input
              type="text"
              disabled={loading}
              id="first-name"
              className="form-input-typing"
              ref={firstNameRef}
              onFocus={(e) => handleFocusInput(e)}
              placeholder="First name"
            />
          </div>

          <div className="form-input-container">
            <label htmlFor="last-name" className="form-input-label">
              Last name
            </label>
            <input
              type="text"
              disabled={loading}
              id="last-name"
              className="form-input-typing"
              ref={lastNameRef}
              onFocus={(e) => handleFocusInput(e)}
              placeholder="Last name"
            />
          </div>

          <div className="form-input-container">
            <label htmlFor="email" className="form-input-label">
              Email
            </label>
            <input
              type="email"
              disabled={loading}
              id="email"
              className="form-input-typing"
              ref={emailRef}
              onFocus={(e) => handleFocusInput(e)}
              placeholder="ThisIsExample@example.com"
            />
          </div>

          <div className="form-input-container">
            <label htmlFor="new-password" className="form-input-label">
              New password
            </label>
            <input
              type="password"
              disabled={loading}
              id="new-password"
              ref={newPasswordRef}
              onFocus={(e) => handleFocusInput(e)}
              className="form-input-typing"
              placeholder="Password"
            />
          </div>

          <div className="form-input-container">
            <label htmlFor="confirm-new-password" className="form-input-label">
              Confirm new password
            </label>
            <input
              type="password"
              disabled={loading}
              id="confirm-new-password"
              className="form-input-typing"
              ref={confirmNewPasswordRef}
              onFocus={(e) => handleFocusInput(e)}
              placeholder="Confirm password"
            />
          </div>

          <button type="submit" disabled={loading} className="black-btn">
            Save changes
          </button>
        </form>

        <form
          className="form-account-settings"
          data-show-form-account-settings={selectedOption === 'Address'}
          onSubmit={(e) => handleSubmitAddress(e)}
        >
          <h2 className="form-account-settings__title">
            Edit - Address and contact information
          </h2>

          <aside
            className="error-message-form"
            role="alert"
            aria-live="assertive"
          >
            {alertMessage}
          </aside>
          <div className="form-input-container">
            <label htmlFor="first-name-address" className="form-input-label">
              First name
            </label>
            <input
              type="text"
              disabled={loading}
              id="first-name-address"
              className="form-input-typing"
              ref={firstNameAddressRef}
              onFocus={(e) => handleFocusInput(e)}
              placeholder="First name"
            />
          </div>

          <div className="form-input-container">
            <label htmlFor="last-name-address" className="form-input-label">
              Last name
            </label>
            <input
              type="text"
              disabled={loading}
              id="last-name-address"
              className="form-input-typing"
              ref={lastNameAddressRef}
              onFocus={(e) => handleFocusInput(e)}
              placeholder="Last name"
            />
          </div>

          <div className="form-input-container">
            <label htmlFor="phone-number" className="form-input-label">
              Phone number
            </label>
            <input
              type="number"
              disabled={loading}
              id="phone-number"
              className="form-input-typing"
              ref={phoneNumberAddressRef}
              onFocus={(e) => handleFocusInput(e)}
              placeholder="Phone number"
            />
          </div>

          <div className="form-input-container">
            <label htmlFor="street-address" className="form-input-label">
              Street address
            </label>
            <input
              type="text"
              disabled={loading}
              id="street-address"
              ref={streetAddressRef}
              onFocus={(e) => handleFocusInput(e)}
              className="form-input-typing"
              placeholder="Introduce your street address"
            />
          </div>

          <div className="form-input-container">
            <label htmlFor="country" className="form-input-label">
              Select your country
            </label>
            <select
              name="country"
              id="country"
              ref={countryAddressRef}
              value={selectedCountry}
              className="form-input-typing"
              onFocus={(e) => handleFocusInput(e)}
              onChange={(e) => handleCountryChange(e)}
            >
              {arrayAllCountriesName.map((countryName) => (
                <option key={uuidv4()} value={countryName}>
                  {countryName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-input-container">
            <label htmlFor="state" className="form-input-label">
              Your state/province
            </label>
            <input
              type="text"
              disabled={loading}
              id="state"
              ref={stateAddressRef}
              onFocus={(e) => handleFocusInput(e)}
              className="form-input-typing"
              placeholder="Introduce your state or province"
            />
          </div>

          <div className="form-input-container">
            <label htmlFor="postal-code" className="form-input-label">
              Zip/Postal code
            </label>
            <input
              type="number"
              disabled={loading}
              id="postal-code"
              ref={postalCodeAddressRef}
              onFocus={(e) => handleFocusInput(e)}
              className="form-input-typing"
              placeholder="Introduce your state or province"
            />
          </div>

          <button type="submit" disabled={loading} className="black-btn">
            Save changes
          </button>
        </form>

        <dialog
          className="account-settings-modal"
          role="alert"
          aria-live="polite"
          ref={dialogPasswordRef}
        >
          <button
            className=""
            aria-label="Close modal"
            type="button"
            onClick={(e) => {
              handleCloseModal(e);
            }}
          >
            <i
              className="fa-solid fa-xmark close-modal-icon"
              data-open-nav-btn-icon
            />
          </button>

          <h3>Verify your identity before saving</h3>

          <aside
            className="error-message-form"
            role="alert"
            aria-live="assertive"
          >
            {alertMessageDialog}
          </aside>

          <form onSubmit={handleConfirmSubmit}>
            <div className="form-input-container">
              <label
                htmlFor="confirm-current-password"
                className="form-input-label"
              >
                Introduce your current password
              </label>
              <input
                type="password"
                id="confirm-current-password"
                className="form-input-typing"
                ref={confirmCurrentPasswordRef}
                onFocus={(e) => handleFocusInput(e)}
                placeholder="Confirm password"
              />
            </div>

            {showConfirmBtn()}
          </form>
        </dialog>
      </section>
    </>
  );
};

export default AccountSettings;
