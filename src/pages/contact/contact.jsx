// Index page
import React from 'react';
import ReactDOM from 'react-dom/client';

// data
import clothesData from '../../data/clothes_data.json';

// Components and sass
import '../../assets/styles.scss';
import Header from '../../components/ui/header';
import Footer from '../../components/ui/footer';
import SectionThree from '../../components/ui/section3';
import SectionTwo from '../../components/ui/section2';
import ContactPage from './contactPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />

    <SectionTwo
      textTitleSectionTwo="Contact us"
      textParaSectionTwo="You can contact us to ask any question to us"
      classesSection2="section2-shop-contact-us section2-background-center"
    />

    <ContactPage />

    <SectionThree />

    <Footer />
  </React.StrictMode>
);
