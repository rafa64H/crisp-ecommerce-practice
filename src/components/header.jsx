import { React, useState } from 'react';
import SearchBtn from './small/searchBtn';
import OpenNavBtn from './small/openNavBtn';
import ShopBtn from './small/shopBtn';

import Logo from '../assets/logo.png';

function Header() {
  return (
    <header>
      <OpenNavBtn />
      <img src={Logo} alt="Company logo" className="logo" />

      <nav data-nav-list-open="false">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="#" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Shop
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Blog
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Sale
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Contact
            </a>
          </li>
          <li className="nav-item nav-item--search">
            <SearchBtn />
            <p href="#" className="nav-search-text">
              Search
            </p>
          </li>
          <div className="login-sign-cont">
            <li className="nav-item">
              <a href="#" className="nav-link">
                Sign in
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Create an account
              </a>
            </li>
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
