import { React, useState } from 'react';

import Logo from '../assets/logo.png';

function Header() {
  return (
    <header>
      <OpenNavBtn />
      <img src={Logo} alt="Company logo" className="logo" />

      <nav data-nav-list-open="false">
        <ul className="nav-list">
          <NavItem text="Home" />
          <NavItem text="Shop" />
          <NavItem text="Blog" />
          <NavItem text="Sale" />
          <NavItem text="Contact" />
          <div className="login-sign-cont">
            <NavItem text="Sign in" />
            <NavItem text="Create an account" />
          </div>
        </ul>
      </nav>

      <div>
        <SearchBtn />
        <ShopBtn />
      </div>
    </header>
  );
}

export default Header;

function OpenNavBtn() {
  function handleOpenNav(e) {
    const navMenu = document.querySelector('[data-nav-list-open]');
    const openNavBtnIcon = document.querySelector('[data-open-nav-btn-icon]');

    if (navMenu.dataset.navListOpen === 'true') {
      navMenu.dataset.navListOpen = 'false';

      // change icon of the openNavBtn
      openNavBtnIcon.classList.remove('fa-xmark');
      openNavBtnIcon.classList.add('fa-bars');
      return;
    }
    navMenu.dataset.navListOpen = 'true';

    openNavBtnIcon.classList.remove('fa-bars');
    openNavBtnIcon.classList.add('fa-xmark');
  }
  return (
    <button
      className="open-nav"
      type="button"
      onClick={(e) => handleOpenNav(e)}
    >
      <i className="fa-solid fa-bars" data-open-nav-btn-icon />
    </button>
  );
}

function SearchBtn() {
  return (
    <button type="button">
      <i className="fas fa-search" />
    </button>
  );
}

function ShopBtn() {
  return (
    <button type="button">
      <i className="fas fa-shopping-bag" />
    </button>
  );
}

function NavItem({ text, link }) {
  return (
    <li className="nav-item">
      <a href={link} className="nav-link">
        {text}
      </a>
    </li>
  );
}
