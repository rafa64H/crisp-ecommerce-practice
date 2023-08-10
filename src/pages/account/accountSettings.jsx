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
import FormInputTyping from '../../components/ui/smaller/formInputTyping';
import handleLargeScreen from '../../components/utils/handleLargeScreen';
import ClothesCard from '../../components/ui/smaller/clothesCard';

const AccountSettings = ({ clothesData }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
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

  const settingsOptions = [
    'Account information',
    'Address',
    'History of orders',
    'My wishlist',
    'Log out',
  ];

  const params = new URLSearchParams(window.location.search);
  const selectOptionFromParam = params.get('option');

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
    handleLargeScreen(setIsLargeScreen);

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

    if (selectOptionFromParam) {
      setSelectedOption(selectOptionFromParam);
    }
  }, []);

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

  // I don't know, but I add this just in case an user can
  // open the <dialog> of confirm password with inspect element
  function showConfirmSubmitBtn() {
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
        <div className="button-expand-container">
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
            className={
              isLargeScreen ? 'account-expand-options' : 'button-expand-options' // I will use button-expand-options in other place so I do this
            }
            data-show-button-expand-options={showSettingsOptions}
          >
            {settingsOptions.map((settingOption) => (
              <li key={uuidv4()} className="button-expand-options__li">
                <button
                  onClick={() => handleClickOption(settingOption)}
                  tabIndex={isLargeScreen || showSettingsOptions ? 0 : -1}
                  type="button"
                  className={
                    isLargeScreen
                      ? 'account-expand-options__btn'
                      : 'button-expand-options__btn' // Same here
                  }
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
        </div>

        <FormAccountInformation
          selectedOption={selectedOption}
          alertMessage={alertMessage}
          setAlertMessage={setAlertMessage}
          emailVerified={emailVerified}
          setNotFormYet={setNotFormYet}
          setTypeOfChange={setTypeOfChange}
          dialogPasswordRef={dialogPasswordRef}
          loading={loading}
          handleFocusInput={handleFocusInput}
          firstNameRef={firstNameRef}
          lastNameRef={lastNameRef}
          emailRef={emailRef}
          newPasswordRef={newPasswordRef}
          confirmNewPasswordRef={confirmNewPasswordRef}
        />

        <FormAddress
          firstNameAddressRef={firstNameAddressRef}
          lastNameAddressRef={lastNameAddressRef}
          streetAddressRef={streetAddressRef}
          countryAddressRef={countryAddressRef}
          stateAddressRef={stateAddressRef}
          postalCodeAddressRef={postalCodeAddressRef}
          dialogPasswordRef={dialogPasswordRef}
          emailVerified={emailVerified}
          phoneNumberAddressRef={phoneNumberAddressRef}
          alertMessage={alertMessage}
          setAlertMessage={setAlertMessage}
          setNotFormYet={setNotFormYet}
          setTypeOfChange={setTypeOfChange}
          selectedOption={selectedOption}
          loading={loading}
          handleFocusInput={handleFocusInput}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          arrayAllCountriesName={arrayAllCountriesName}
        />

        <WishList clothesData={clothesData} selectedOption={selectedOption} />

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
            <FormInputTyping
              required
              name="Introduce your current password"
              type="password"
              id="confirm-current-password"
              loading={loading}
              theRef={confirmCurrentPasswordRef}
              onFocusFunction={handleFocusInput}
              placeholderProp="Confirm password"
            />

            {showConfirmSubmitBtn()}
          </form>
        </dialog>
      </section>
    </>
  );
};

export default AccountSettings;

const FormAccountInformation = ({
  firstNameRef,
  lastNameRef,
  emailRef,
  newPasswordRef,
  confirmNewPasswordRef,
  dialogPasswordRef,
  selectedOption,
  alertMessage,
  setAlertMessage,
  setNotFormYet,
  setTypeOfChange,
  loading,
  emailVerified,
  handleFocusInput,
}) => {
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

  return (
    <form
      className="form-account-settings"
      data-show-form-account-settings={selectedOption === 'Account information'}
      onSubmit={(e) => handleSubmitAccountInformation(e)}
    >
      <h2 className="form-account-settings__title">
        Edit - Account information
      </h2>

      <aside className="error-message-form" role="alert" aria-live="assertive">
        {alertMessage}
      </aside>
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

      <FormInputTyping
        required
        name="Email"
        type="email"
        id="email"
        loading={loading}
        theRef={emailRef}
        onFocusFunction={handleFocusInput}
        placeholderProp="ThisIsExample@example.com"
      />

      <FormInputTyping
        name="New password"
        type="password"
        id="new-password"
        loading={loading}
        theRef={newPasswordRef}
        onFocusFunction={handleFocusInput}
      />

      <FormInputTyping
        name="Confirm new password"
        type="password"
        id="confirm-new-password"
        loading={loading}
        theRef={confirmNewPasswordRef}
        onFocusFunction={handleFocusInput}
      />

      <button type="submit" disabled={loading} className="black-btn">
        Save changes
      </button>
    </form>
  );
};

const FormAddress = ({
  firstNameAddressRef,
  lastNameAddressRef,
  streetAddressRef,
  countryAddressRef,
  stateAddressRef,
  postalCodeAddressRef,
  dialogPasswordRef,
  emailVerified,
  phoneNumberAddressRef,
  alertMessage,
  setAlertMessage,
  setNotFormYet,
  setTypeOfChange,
  selectedOption,
  loading,
  handleFocusInput,
  selectedCountry,
  setSelectedCountry,
  arrayAllCountriesName,
}) => {
  function handleCountryChange(e) {
    setSelectedCountry(e.target.value);
  }
  async function handleSubmitAddress(e) {
    e.preventDefault();

    const allRequiredRefsAddress = [
      firstNameAddressRef,
      lastNameAddressRef,
      streetAddressRef,
      countryAddressRef,
      stateAddressRef,
      postalCodeAddressRef,
    ];

    const emptyRequiredInputs = allRequiredRefsAddress.filter(
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

  return (
    <form
      className="form-account-settings"
      data-show-form-account-settings={selectedOption === 'Address'}
      onSubmit={(e) => handleSubmitAddress(e)}
    >
      <h2 className="form-account-settings__title">
        Edit - Address and contact information
      </h2>

      <aside className="error-message-form" role="alert" aria-live="assertive">
        {alertMessage}
      </aside>
      <FormInputTyping
        required
        name="First name"
        type="text"
        id="first-name-address"
        loading={loading}
        theRef={firstNameAddressRef}
        onFocusFunction={handleFocusInput}
      />

      <FormInputTyping
        required
        name="Last name"
        type="text"
        id="last-name-address"
        loading={loading}
        theRef={lastNameAddressRef}
        onFocusFunction={handleFocusInput}
      />

      <FormInputTyping
        name="Phone number"
        type="number"
        id="phone-number"
        loading={loading}
        theRef={phoneNumberAddressRef}
        onFocusFunction={handleFocusInput}
      />

      <FormInputTyping
        required
        name="Street address"
        type="text"
        id="street-address"
        loading={loading}
        theRef={streetAddressRef}
        onFocusFunction={handleFocusInput}
      />

      <div className="form-input-container">
        <label htmlFor="country" className="form-input-label">
          Select your country{' '}
          <span className="input-required" aria-label="required">
            *
          </span>
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

      <FormInputTyping
        required
        name="Your state/province"
        type="text"
        id="state"
        loading={loading}
        theRef={stateAddressRef}
        onFocusFunction={handleFocusInput}
        placeholderProp="Introduce your state or province"
      />

      <FormInputTyping
        required
        name="Zip/Postal code"
        type="number"
        id="postal-code"
        loading={loading}
        theRef={postalCodeAddressRef}
        onFocusFunction={handleFocusInput}
        placeholderProp="Introduce your postal code"
      />

      <button type="submit" disabled={loading} className="black-btn">
        Save changes
      </button>
    </form>
  );
};

const WishList = ({ clothesData, selectedOption }) => {
  const [wishListState, setWishListState] = useState([]);

  async function getWishlistFromFirestore() {
    const userData = await getDataOfUser();
    const { wishlist } = userData;

    return wishlist;
  }

  async function changeWishList(id) {
    setWishListState((prevValue) =>
      prevValue.filter((itemFromState) => itemFromState.productId !== id)
    );
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const wishlistFromFirestore = await getWishlistFromFirestore();
        const wishList = wishlistFromFirestore.map((idFromFirestore) =>
          clothesData.find((item) => item.productId === idFromFirestore)
        );

        setWishListState(wishList);
      }
    });
  }, []);

  function elementsToShow() {
    if (wishListState.length === 0) {
      return null;
    }

    return (
      <>
        {wishListState.map((item) => (
          <ClothesCard
            link={`./product.html?productId=${item.productId}`}
            productId={item.productId}
            productName={item.productName}
            productColors={item.colors}
            productImg={item.colors[0].imageUrl}
            gender={item.gender}
            productPrice={item.price}
            category={item.category}
            key={uuidv4()}
            additionalOnClickWishListFunction={() =>
              changeWishList(item.productId)
            }
          />
        ))}
      </>
    );
  }

  return (
    <ul
      className="form-account-settings wishlist"
      data-show-wishlist={selectedOption === 'My wishlist'}
    >
      <h2
        data-show-wishlist-not-found={wishListState.length === 0}
        className="wishlist-not-found"
      >
        Loading or nothing found
      </h2>
      {elementsToShow()}
    </ul>
  );
};
