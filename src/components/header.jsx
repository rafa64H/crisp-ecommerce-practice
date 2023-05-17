import { React, useEffect, useState } from 'react';

import CompanyLogo from './smaller/companyLogo';

const Header = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1200px)');

    if (mediaQuery.matches) {
      setIsLargeScreen(true);
    }

    const handleMediaQueryChange = (event) => {
      setIsLargeScreen(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <header>
      <OpenNavBtn />
      <CompanyLogo />

      <nav data-nav-list-open="false" aria-hidden={!isLargeScreen}>
        <ul className="nav-list">
          <NavItem
            text="Home"
            link="./index.html"
            isLargeScreen={isLargeScreen}
          />
          <NavItem text="Shop" isLargeScreen={isLargeScreen} />
          <NavItem text="Blog" isLargeScreen={isLargeScreen} />
          <NavItem text="Sale" isLargeScreen={isLargeScreen} />
          <NavItem text="Contact" isLargeScreen={isLargeScreen} />
          <SearchBtn desktopOrMobile="desktop" />

          <div className="login-sign-cont">
            <NavItem text="Sign in" isLargeScreen={isLargeScreen} />
            <NavItem text="Create an account" isLargeScreen={isLargeScreen} />
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

const OpenNavBtn = () => {
  function handleOpenNav(e) {
    const navMenu = document.querySelector('[data-nav-list-open]');

    const navBtn = document.querySelector('.open-nav');
    const openNavBtnIcon = document.querySelector('[data-open-nav-btn-icon]');

    const allNavLinks = navMenu.querySelectorAll('.nav-link');

    if (navMenu.dataset.navListOpen === 'true') {
      // close nav menu
      navMenu.dataset.navListOpen = 'false';

      changeNavBtnIcon(openNavBtnIcon, 'true');

      hideScreenReaders(navMenu, navBtn, allNavLinks);
      return;
    }
    // open nav menu
    navMenu.dataset.navListOpen = 'true';

    changeNavBtnIcon(openNavBtnIcon, 'false');
    showScreenReaders(navMenu, navBtn, allNavLinks);
  }

  function changeNavBtnIcon(icon, navMenuOpen) {
    if (navMenuOpen === 'true') {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    } else {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    }
  }

  function hideScreenReaders(navMenu, navBtn, allNavLinks) {
    navMenu.setAttribute('aria-hidden', 'true');
    navBtn.setAttribute('aria-expanded', 'false');
    navBtn.setAttribute('aria-label', 'open navigation');

    allNavLinks.forEach((navLink) => {
      navLink.tabIndex = -1;
    });
  }

  function showScreenReaders(navMenu, navBtn, allNavLinks) {
    navMenu.setAttribute('aria-hidden', 'false');
    navBtn.setAttribute('aria-expanded', 'true');
    navBtn.setAttribute('aria-label', 'close navigation');

    allNavLinks.forEach((navLink) => {
      navLink.tabIndex = 0;
    });
  }

  return (
    <button
      className="open-nav"
      aria-label="open navigation"
      aria-expanded="false"
      type="button"
      onClick={(e) => handleOpenNav(e)}
    >
      <i className="fa-solid fa-bars" data-open-nav-btn-icon />
    </button>
  );
};

const SearchBtn = ({ desktopOrMobile }) => {
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

  return (
    <button className="search-btn-desktop" type="button">
      <i className="fas fa-search" />

      <p className="search__p">Search</p>
    </button>
  );
};

const ShopBtn = ({ desktopOrMobile }) => {
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

const NavItem = ({ text, link, isLargeScreen }) => (
  <li className="nav-item">
    <a href={link} tabIndex={isLargeScreen ? 0 : -1} className="nav-link">
      {text}
    </a>
  </li>
);
