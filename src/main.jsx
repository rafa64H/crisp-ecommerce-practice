// Index page
import React from 'react';
import ReactDOM from 'react-dom/client';

// Components and sass
import './styles.scss';
import Header from './components/header';
import SectionOne from './components/section1';
import SectionTwo from './components/section2';
import BrandSection from './components/brandSection';

// Images
import womanHomeOne from './assets/home/woman-home2.png';
import womanHomeTwo from './assets/home/woman-home1.png';
import womanHomeThree from './assets/home/woman-home3.png';
import womanHomeFour from './assets/home/woman-home4.png';
import womanHomeFive from './assets/home/woman-home5.png';
import womanHomeSix from './assets/home/woman-home6.png';

// Data
import brandsData from './data/brands.json';

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

    <BrandSection brandsTitle="Choose your brand" brandsObject={brandsData} />

    <section className="grid-section2">
      <SectionTwo
        textTitleSectionTwo="CHOOSE YOUR LOOK"
        textParaSectionTwo="See our clothing collections"
        linkText="SEE OFFERS"
        classesSection2="section2-home1 grid-section2-item1"
      />
      <SectionTwo
        textTitleSectionTwo="UP TO 40% OFF"
        textParaSectionTwo="Special offers and great deals"
        linkText="SHOP NOW"
        classesSection2="section2-home2 grid-section2-item2"
      />
      <SectionTwo
        textTitleSectionTwo="BRAND NEW STYLE"
        textParaSectionTwo="Popular clothing brands"
        linkText="SEE OFFERS"
        classesSection2="section2-home3 grid-section2-item3"
      />
    </section>
    <SectionTwo
      textTitleSectionTwo="SHOPING WITHOUT LIMITS"
      textParaSectionTwo="Choose the best option for you, and it does not matter whether you are"
      linkText="SHOW NOW"
      classesSection2="section2-home4"
    />
  </React.StrictMode>
);
