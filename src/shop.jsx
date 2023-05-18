// Index page
import React from 'react';
import ReactDOM from 'react-dom/client';

// Components and sass
import './styles.scss';
import Header from './components/header';
import SectionOne from './components/section1';
import SectionTwo from './components/section2';
import BrandSection from './components/brandSection';
import SectionThree from './components/section3';
import Footer from './components/footer';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <Footer />
  </React.StrictMode>
);
