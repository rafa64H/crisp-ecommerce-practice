import React, { useState } from 'react';

// data
import clothesData from '../../data/clothes_data.json';

// Components
import HeaderProduct from '../product/headerProduct';
import Footer from '../../components/ui/footer';
import SectionThree from '../../components/ui/section3';

const BuyClothesPage = () => {
  const [shoppingBagItems, setShoppingBagItems] = useState([]);
  return (
    <>
      <HeaderProduct
        shoppingBagItems={shoppingBagItems}
        setShoppingBagItems={setShoppingBagItems}
      />
      <SectionThree />
      <Footer />
    </>
  );
};

export default BuyClothesPage;
