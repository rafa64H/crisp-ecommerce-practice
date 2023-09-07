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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />

    <SectionThree />

    <Footer />
  </React.StrictMode>
);
