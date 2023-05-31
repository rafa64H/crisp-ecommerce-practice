// Index page
import React from 'react';
import ReactDOM from 'react-dom/client';

// data
import clothesData from '../../data/clothes_data.json';

// Components and sass
import '../../assets/styles.scss';
import Header from '../../components/ui/header';
import SectionTwo from '../../components/ui/section2';
import ShopSection from '../../components/ui/shopSection';
import SectionThree from '../../components/ui/section3';
import Footer from '../../components/ui/footer';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <SectionTwo
      textTitleSectionTwo="SHOPING WITHOUT LIMITS"
      textParaSectionTwo="You can choose the best option for you, and it does not matter whether you are in Prague or San Fransisco"
      linkText="SHOW NOW"
      classesSection2="section2-shop1"
    />

    <ShopSection clothesData={clothesData[0]} iterations={2} />

    <Footer />
  </React.StrictMode>
);
