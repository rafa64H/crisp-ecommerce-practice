import React from 'react';
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

        <ul className="footer-section__list">
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

        <ul className="footer-section__list">
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

        <ul className="footer-section__list">
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

        <ul className="footer-section__list">
          <li className="footer-section__list-item" />
        </ul>
      </section>
      <p className="footer-copyright">©2019. CRISP THEME DEVELOPED BY BELVG</p>
      <p className="footer-copyright">
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
  if (desktopOrMobile === 'desktop') {
    return <h3 className="footer-section__title">{footerSectionTitleText}</h3>;
  }

  return (
    <button type="button" aria-expanded="false" className="footer-section__btn">
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
    <h4 className="footer-contact-title">{footerContactTitle}</h4>
    <p>{footerContactPara}</p>
  </li>
);
