import React from 'react';
import Logo from '../../../assets/logo.png';

const CompanyLogo = () => (
  <a href="./index.html" className="logo-link">
    <img src={Logo} alt="Company logo, go to home page" className="logo-img" />
  </a>
);

export default CompanyLogo;
