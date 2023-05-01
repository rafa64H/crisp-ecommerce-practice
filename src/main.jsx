// Index page
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.scss';
import Header from './components/header';
import SectionOne from './components/section1';
import SectionTwo from './components/section2';

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
    <section className="grid">
      <SectionTwo
        backgroundImage="section2-background1"
        textTitleSectionTwo="CHOOSE YOUR LOOK"
        textParaSectionTwo="See our clothing collections"
      />
    </section>
  </React.StrictMode>
);
