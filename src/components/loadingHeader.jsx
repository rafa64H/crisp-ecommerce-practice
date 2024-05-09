import { React, useEffect, useState, useRef } from "react";

import CompanyLogo from "./ui/companyLogo";
import { useDispatch, useSelector } from "react-redux";

const LoadingHeader = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isLargeScreen = useSelector(
    (store) => store.isLargeScreen.isLargeScreen
  );
  const dispatch = useDispatch();

  return (
    <header>
      <CompanyLogo />

      <OpenNavBtn isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />

      <nav
        data-nav-list-open={isNavOpen}
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
            text="Community"
            link="./community.html"
            shouldShowTabIndex={isLargeScreen || isNavOpen}
          />
          <NavItem
            text="Contact"
            link="./contact.html"
            shouldShowTabIndex={isLargeScreen || isNavOpen}
          />
          <div className="login-sign-cont">
            <aside>Loading...</aside>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default LoadingHeader;

const NavItem = ({ text, link, shouldShowTabIndex }) => (
  <li className="nav-item">
    <a href={link} tabIndex={shouldShowTabIndex ? 0 : -1} className="nav-link">
      {text}
    </a>
  </li>
);

const OpenNavBtn = ({ isNavOpen, setIsNavOpen }) => {
  const [iconNavBtn, setIconNavBtn] = useState("fa-bars");

  function handleOpenNav(e) {
    setIsNavOpen(!isNavOpen);
  }

  useEffect(() => {
    setIconNavBtn(isNavOpen ? "fa-xmark" : "fa-bars");
  }, [isNavOpen]);

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
