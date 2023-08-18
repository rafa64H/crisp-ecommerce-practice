import { React, useEffect, useState } from 'react';
import CompanyLogo from './smaller/companyLogo';
import handleLargeScreen from '../utils/handleLargeScreen';

const Footer = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const [isListOpen1, setIsListOpen1] = useState(false);
  const [isListOpen2, setIsListOpen2] = useState(false);
  const [isListOpen3, setIsListOpen3] = useState(false);
  const [isListOpen4, setIsListOpen4] = useState(false);

  useEffect(() => {
    handleLargeScreen(setIsLargeScreen);
  }, []);

  return (
    <footer>
      <section className="footer-section">
        <CompanyLogo />
      </section>
      <section className="footer-section">
        <FooterSectionTitle
          desktopOrMobile="desktop"
          footerSectionTitleText="FEATURES"
        />

        <FooterSectionTitle
          desktopOrMobile="mobile"
          footerSectionTitleText="FEATURES"
          isListOpen={isListOpen1}
          setIsListOpen={setIsListOpen1}
        />

        <ul
          className="footer-section__list"
          aria-hidden={!isLargeScreen && !isListOpen1}
          data-footer-list-expanded={isListOpen1.toString()}
        >
          <FooterListItem
            shouldShowTabIndex={isLargeScreen || isListOpen1}
            footerItemText="MEN"
          />
          <FooterListItem
            shouldShowTabIndex={isLargeScreen || isListOpen1}
            footerItemText="WOMEN"
          />
          <FooterListItem
            shouldShowTabIndex={isLargeScreen || isListOpen1}
            footerItemText="NEW ARRIVALS"
          />
          <FooterListItem
            shouldShowTabIndex={isLargeScreen || isListOpen1}
            footerItemText="SHOES"
          />
        </ul>
      </section>
      <section className="footer-section">
        <FooterSectionTitle
          desktopOrMobile="desktop"
          footerSectionTitleText="MENU"
        />

        <FooterSectionTitle
          desktopOrMobile="mobile"
          footerSectionTitleText="MENU"
          isListOpen={isListOpen2}
          setIsListOpen={setIsListOpen2}
        />

        <ul
          className="footer-section__list"
          aria-hidden={!isLargeScreen && !isListOpen2}
          data-footer-list-expanded={isListOpen2.toString()}
        >
          <FooterListItem
            shouldShowTabIndex={isLargeScreen || isListOpen2}
            footerItemText="ABOUT US"
          />
          <FooterListItem
            shouldShowTabIndex={isLargeScreen || isListOpen2}
            footerItemText="MY ACCOUNT"
            footerLink="./account.html"
          />
          <FooterListItem
            shouldShowTabIndex={isLargeScreen || isListOpen2}
            footerItemText="ORDERS HISTORY"
            footerLink="./account.html?option=History of orders"
          />
          <FooterListItem
            shouldShowTabIndex={isLargeScreen || isListOpen2}
            footerItemText="MY WISHLIST"
            footerLink="./account.html?option=My wishlist"
          />
          <FooterListItem
            shouldShowTabIndex={isLargeScreen || isListOpen2}
            footerItemText="COMMUNITY"
            footerLink="./community.html"
          />
        </ul>
      </section>
      <section className="footer-section">
        <FooterSectionTitle
          desktopOrMobile="desktop"
          footerSectionTitleText="CONTACT US"
        />

        <FooterSectionTitle
          desktopOrMobile="mobile"
          footerSectionTitleText="CONTACT US"
          isListOpen={isListOpen3}
          setIsListOpen={setIsListOpen3}
        />

        <ul
          className="footer-section__list"
          aria-hidden={!isLargeScreen && !isListOpen3}
          data-footer-list-expanded={isListOpen3.toString()}
        >
          <FooterListItemContact
            footerContactTitle="ADDRESS:"
            footerContactPara="123 STREET NAME, CITY, ENGLAND"
          />
          <FooterListItemContact
            footerContactTitle="PHONE:"
            footerContactPara="(123) 456-7890"
          />
          <FooterListItemContact
            footerContactTitle="EMAIL:"
            footerContactPara="companyemail@crisp.com"
          />
          <FooterListItemContact
            footerContactTitle="WORKING DAYS/HOURS:"
            footerContactPara="MON - SUN / 9:00AM - 8:00PM"
          />
        </ul>
      </section>
      <section className="footer-section">
        <FooterSectionTitle
          desktopOrMobile="desktop"
          footerSectionTitleText="FOLLOW US"
        />

        <FooterSectionTitle
          desktopOrMobile="mobile"
          footerSectionTitleText="FOLLOW US"
          isListOpen={isListOpen4}
          setIsListOpen={setIsListOpen4}
        />

        <ul
          className="footer-section__list"
          aria-hidden={!isLargeScreen && !isListOpen4}
          data-footer-list-expanded={isListOpen4.toString()}
        >
          <FooterListItemSocial
            shouldShowTabIndex={isLargeScreen || isListOpen4}
            socialLink="#"
            socialText="Facebook"
            socialIcon="fa-brands fa-facebook-f"
          />
          <FooterListItemSocial
            shouldShowTabIndex={isLargeScreen || isListOpen4}
            socialLink="#"
            socialText="Twitter"
            socialIcon="fa-brands fa-twitter"
          />
          <FooterListItemSocial
            shouldShowTabIndex={isLargeScreen || isListOpen4}
            socialLink="#"
            socialText="Instagram"
            socialIcon="fa-brands fa-instagram"
          />
        </ul>
      </section>
      <p className="footer-copyright">©2019. CRISP THEME DEVELOPED BY BELVG</p>
      <p className="footer-copyright footer-copyright--2">
        This page was made by{' '}
        <a href="https://github.com/rafa64H" className="footer-my-github">
          Rafael Pacheco
        </a>
      </p>
    </footer>
  );
};

export default Footer;

const FooterSectionTitle = ({
  desktopOrMobile,
  footerSectionTitleText,
  isListOpen,
  setIsListOpen,
}) => {
  const [iconBtnFooter, setIconBtnFooter] = useState('fa-plus');

  // This is for mobiles <FooterSectionTitle>
  function handleFooterSectionTitleBtn(e) {
    if (isListOpen) {
      changeIconBtn(true);
    } else {
      changeIconBtn(false);
    }
    setIsListOpen(!isListOpen);

    function changeIconBtn(boolean) {
      if (boolean) {
        setIconBtnFooter('fa-plus');
      } else {
        return setIconBtnFooter('fa-minus');
      }
    }
  }

  // I the h3 will have display:none; on screen size less than 1200px
  if (desktopOrMobile === 'desktop') {
    return <h3 className="footer-section__title">{footerSectionTitleText}</h3>;
  }

  // This will have display: none; on screen size greater than 1200px
  return (
    <button
      type="button"
      onClick={(e) => {
        handleFooterSectionTitleBtn(e);
      }}
      aria-expanded={isListOpen}
      className="footer-section__btn"
    >
      {footerSectionTitleText}
      <i className={`fa-solid ${iconBtnFooter} footer-section__btn-icon`} />
    </button>
  );
};

const FooterListItem = ({ footerLink, footerItemText, shouldShowTabIndex }) => (
  <li className="footer-section__list-item">
    <a
      href={footerLink}
      className="footer-link"
      tabIndex={shouldShowTabIndex ? 0 : -1}
    >
      {footerItemText}
    </a>
  </li>
);

const FooterListItemContact = ({ footerContactTitle, footerContactPara }) => (
  <li className="footer-section__list-item">
    <h4 className="footer-contact__title">{footerContactTitle}</h4>
    <p>{footerContactPara}</p>
  </li>
);

const FooterListItemSocial = ({
  socialLink,
  socialText,
  socialIcon,
  shouldShowTabIndex,
}) => (
  <li className="footer-section__list-item footer-section__list-item--social">
    <a
      href={socialLink}
      className="footer-link"
      tabIndex={shouldShowTabIndex ? 0 : -1}
    >
      <i
        className={`footer-social__icon ${socialIcon}`}
        aria-label={socialText}
      />
    </a>

    <a
      href={socialLink}
      className="footer-link"
      tabIndex={shouldShowTabIndex ? 0 : -1}
    >
      {socialText}
    </a>
  </li>
);
