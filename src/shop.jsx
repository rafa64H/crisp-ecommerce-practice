// Index page
import React from 'react';
import ReactDOM from 'react-dom/client';

// Components and sass
import './styles.scss';
import Header from './components/header';
import SectionTwo from './components/section2';
import ShopSection from './components/shopSection';
import SectionThree from './components/section3';
import Footer from './components/footer';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <SectionTwo
      textTitleSectionTwo="SHOPING WITHOUT LIMITS"
      textParaSectionTwo="You can choose the best option for you, and it does not matter whether you are in Prague or San Fransisco"
      linkText="SHOW NOW"
      classesSection2="section2-shop1"
    />

    <ShopSection />

    <Footer />
  </React.StrictMode>
);
