import { React, useEffect } from 'react';
import CompanyLogo from './smaller/companyLogo';

function Footer() {
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
        />

        <ul
          className="footer-section__list"
          aria-label="hidden"
          data-footer-list-expanded="false"
        >
          <FooterListItem footerItemText="MEN" />
          <FooterListItem footerItemText="WOMEN" />
          <FooterListItem footerItemText="NEW ARRIVALS" />
          <FooterListItem footerItemText="SHOES" />
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
        />

        <ul
          className="footer-section__list"
          aria-label="hidden"
          data-footer-list-expanded="false"
        >
          <FooterListItem footerItemText="ABOUT US" />
          <FooterListItem footerItemText="MY ACCOUNT" />
          <FooterListItem footerItemText="ORDERS HISTORY" />
          <FooterListItem footerItemText="MY WISHLIST" />
          <FooterListItem footerItemText="BLOG" />
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
        />

        <ul
          className="footer-section__list"
          aria-label="hidden"
          data-footer-list-expanded="false"
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
        />

        <ul
          className="footer-section__list"
          aria-label="hidden"
          data-footer-list-expanded="false"
        >
          <FooterListItemSocial
            socialLink="#"
            socialText="Facebook"
            socialIcon="fa-brands fa-facebook-f"
          />
          <FooterListItemSocial
            socialLink="#"
            socialText="Twitter"
            socialIcon="fa-brands fa-twitter"
          />
          <FooterListItemSocial
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
}

export default Footer;

const FooterSectionTitle = ({ desktopOrMobile, footerSectionTitleText }) => {
  function showToScreenReaderIfDesktop() {
    const footerLinkElems = document.querySelectorAll('.footer-link');
    const footerSectionListElems = document.querySelectorAll(
      '.footer-section__list'
    );

    if (window.matchMedia('(min-width: 1200px)').matches) {
      showAllToScreenReaders(footerLinkElems, footerSectionListElems);
    } else {
      hideAllToScreenReaders(footerLinkElems, footerSectionListElems);
    }

    function showAllToScreenReaders(footerLinks, footerLists) {
      footerLinks.forEach((elem) => (elem.tabIndex = 0));
      footerLists.forEach((elem) => elem.setAttribute('aria-hidden', 'false'));
    }
    function hideAllToScreenReaders(footerLinks, footerLists) {
      footerLinks.forEach((elem) => (elem.tabIndex = -1));
      footerLists.forEach((elem) => elem.setAttribute('aria-hidden', 'true'));
    }
  }

  useEffect(() => {
    showToScreenReaderIfDesktop();
  }, []);

  // This is for mobiles <FooterSectionTitle>
  function handleFooterSectionTitleBtn(e) {
    const btn = e.target.closest('button');
    const footerSectionList = btn.nextElementSibling;
    const isExpanded = footerSectionList.getAttribute(
      'data-footer-list-expanded'
    );
    const footerLinks = footerSectionList.querySelectorAll('.footer-link');

    if (isExpanded === 'true') {
      collapseAndHideToScreenReaders();
      changeIconBtn(true);
    } else {
      expandAndShowToScreenReaders();
      changeIconBtn(false);
    }

    function expandAndShowToScreenReaders() {
      footerSectionList.dataset.footerListExpanded = 'true';
      footerSectionList.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      footerLinks.forEach((link) => link.setAttribute('tabIndex', '0'));
    }

    function collapseAndHideToScreenReaders() {
      footerSectionList.dataset.footerListExpanded = 'false';
      footerSectionList.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
      footerLinks.forEach((link) => link.setAttribute('tabIndex', '-1'));
    }

    function changeIconBtn(boolean) {
      const btnIcon = btn.querySelector('.footer-section__btn-icon');
      if (boolean) {
        btnIcon.classList.remove('fa-minus');
        btnIcon.classList.add('fa-plus');
      } else {
        btnIcon.classList.remove('fa-plus');
        btnIcon.classList.add('fa-minus');
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
      aria-expanded="false"
      className="footer-section__btn"
    >
      {footerSectionTitleText}
      <i className="fa-solid fa-plus footer-section__btn-icon" />
    </button>
  );
};

const FooterListItem = ({ footerLink, footerItemText }) => (
  <li className="footer-section__list-item">
    <a href="#" className="footer-link">
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

const FooterListItemSocial = ({ socialLink, socialText, socialIcon }) => (
  <li className="footer-section__list-item footer-section__list-item--social">
    <a href={socialLink} className="footer-link">
      <i
        className={`footer-social__icon ${socialIcon}`}
        aria-label={socialText}
      />
    </a>

    <a href={socialLink} className="footer-link">
      {socialText}
    </a>
  </li>
);
