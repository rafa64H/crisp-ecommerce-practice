import { React, useState } from 'react';

import Logo from '../assets/logo.png';

function Header() {
  return (
    <header>
      <OpenNavBtn />
      <CompanyLogo />

      <nav data-nav-list-open="false">
        <ul className="nav-list">
          <NavItem text="Home" />
          <NavItem text="Shop" />
          <NavItem text="Blog" />
          <NavItem text="Sale" />
          <NavItem text="Contact" />
          <SearchBtn desktopOrMobile="desktop" />

          <div className="login-sign-cont">
            <NavItem text="Sign in" />
            <NavItem text="Create an account" />
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
}

export default Header;

function OpenNavBtn() {
  function handleOpenNav(e) {
    const navMenu = document.querySelector('[data-nav-list-open]');

    const navBtn = document.querySelector('.open-nav');
    const openNavBtnIcon = document.querySelector('[data-open-nav-btn-icon]');

    if (navMenu.dataset.navListOpen === 'true') {
      navMenu.dataset.navListOpen = 'false';

      // change icon of the openNavBtn
      openNavBtnIcon.classList.remove('fa-xmark');
      openNavBtnIcon.classList.add('fa-bars');

      navBtn.setAttribute('aria-expanded', 'false');
      return;
    }
    navMenu.dataset.navListOpen = 'true';

    openNavBtnIcon.classList.remove('fa-bars');
    openNavBtnIcon.classList.add('fa-xmark');
    navBtn.setAttribute('aria-expanded', 'true');
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
}

function SearchBtn({ desktopOrMobile }) {
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
}

function ShopBtn({ desktopOrMobile }) {
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
}

function NavItem({ text, link }) {
  return (
    <li className="nav-item">
      <a href="#" className="nav-link">
        {text}
      </a>
    </li>
  );
}

function CompanyLogo() {
  return (
    <a href="#" className="logo-link">
      <img
        src={Logo}
        alt="Company logo, go to home page"
        className="logo-img"
      />
    </a>
  );
}
