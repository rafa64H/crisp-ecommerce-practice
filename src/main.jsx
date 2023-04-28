// Index page
import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/header';
import SectionOne from './components/section1';
import './styles.scss';

import womanHomeOne from './assets/home/woman-home2.png';
import womanHomeTwo from './assets/home/woman-home1.png';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <SectionOne
      classesSectionOne="section1 section1-background1"
      h1Text="SUMMER SALE GET 30% OFF ON ALL DRESS"
      linkText="SHOP NOW"
      srcImg1={womanHomeOne}
      srcImg2={womanHomeTwo}
    />
  </React.StrictMode>
);
