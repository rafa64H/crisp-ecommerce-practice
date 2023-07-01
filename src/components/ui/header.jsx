import { React, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config-firebase/firebase';

import CompanyLogo from './smaller/companyLogo';
import handleLargeScreen from '../utils/handleLargeScreen';

const Header = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    handleLargeScreen(setIsLargeScreen);
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    });
  }, []);

  return (
    <header>
      <OpenNavBtn isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <CompanyLogo />

      <nav
        data-nav-list-open={isNavOpen.toString()}
        aria-hidden={!isLargeScreen && !isNavOpen}
      >
        <ul className="nav-list">
          <NavItem
            text="Home"
            link="./index.html"
            shouldShowTabIndex={isLargeScreen || isNavOpen}
          />
          <NavItem
            text="Shop"
            link="./shop.html"
            shouldShowTabIndex={isLargeScreen || isNavOpen}
          />
          <NavItem
            text="Blog"
            shouldShowTabIndex={isLargeScreen || isNavOpen}
          />
          <NavItem
            text="Sale"
            shouldShowTabIndex={isLargeScreen || isNavOpen}
          />
          <NavItem
            text="Contact"
            shouldShowTabIndex={isLargeScreen || isNavOpen}
          />
          <SearchBtn desktopOrMobile="desktop" />

          <div className="login-sign-cont">
            <NavItemAccount
              link="./login.html"
              text="Sign in"
              userLoggedIn={userLoggedIn}
              shouldShowTabIndex={isLargeScreen || isNavOpen}
            />
            <NavItemAccount
              link="./create-account.html"
              text="Create an account"
              userLoggedIn={userLoggedIn}
              shouldShowTabIndex={isLargeScreen || isNavOpen}
            />
            <ProfileLink userLoggedIn={userLoggedIn} />

            <ShopBtn desktopOrMobile="desktop" />
          </div>
        </ul>
      </nav>

      <div className="search-shop-btns-cont">
        <SearchBtn desktopOrMobile="mobile" />
        <ShopBtn desktopOrMobile="mobile" />
      </div>
    </header>
  );
};

export default Header;

const OpenNavBtn = ({ isNavOpen, setIsNavOpen }) => {
  const [iconNavBtn, setIconNavBtn] = useState('fa-bars');

  function handleOpenNav(e) {
    changeNavBtnIcon(isNavOpen);
    setIsNavOpen(!isNavOpen);
  }

  function changeNavBtnIcon(isNavOpen) {
    if (isNavOpen) {
      setIconNavBtn('fa-bars');
    } else {
      setIconNavBtn('fa-xmark');
    }
  }

  return (
    <button
      className="open-nav"
      aria-label="open navigation"
      aria-expanded="false"
      type="button"
      onClick={(e) => handleOpenNav(e)}
    >
      <i className={`fa-solid ${iconNavBtn}`} data-open-nav-btn-icon />
    </button>
  );
};

const SearchBtn = ({ desktopOrMobile }) => {
  // This will have display:none if window width > 1200px
  if (desktopOrMobile === 'mobile') {
    return (
      <button
        type="button"
        className="search-btn-mobile"
        aria-label="Search something"
      >
        <i className="fas fa-search" />
      </button>
    );
  }

  // This will have display:none if window width < 1200px
  return (
    <button className="search-btn-desktop" type="button">
      <i className="fas fa-search" />

      <p className="search__p">Search</p>
    </button>
  );
};

const ShopBtn = ({ desktopOrMobile }) => {
  // This will have display:none if window width > 1200px
  if (desktopOrMobile === 'mobile') {
    return (
      <button
        type="button"
        className="shop-btn-mobile"
        aria-label="Shopping cart"
      >
        <i className="fas fa-shopping-bag" />
      </button>
    );
  }

  // This will have display:none if window width < 1200px
  return (
    <button type="button" className="shop-btn-desktop">
      <i className="fas fa-shopping-bag" />
      <div className="shop-btn-text">
        <p className="shop-btn-text__p">Shopping cart</p>
        <p className="shop-btn-text__eur">0.00 EUR</p>
      </div>
    </button>
  );
};

const NavItem = ({ text, link, shouldShowTabIndex }) => (
  <li className="nav-item">
    <a href={link} tabIndex={shouldShowTabIndex ? 0 : -1} className="nav-link">
      {text}
    </a>
  </li>
);

const NavItemAccount = ({ text, userLoggedIn, link, shouldShowTabIndex }) => (
  <li
    className="nav-item"
    data-user-loggedin-nav-item-account={`${userLoggedIn}`}
  >
    <a href={link} tabIndex={shouldShowTabIndex ? 0 : -1} className="nav-link">
      {text}
    </a>
  </li>
);

const ProfileLink = ({ userLoggedIn, link, shouldShowTabIndex }) => (
  <li className="nav-item" data-user-loggedin-profile-link={`${userLoggedIn}`}>
    <a
      href={link}
      tabIndex={shouldShowTabIndex ? 0 : -1}
      className="nav-link--profile"
    >
      <i className="fa-solid fa-user" />
    </a>
  </li>
);
