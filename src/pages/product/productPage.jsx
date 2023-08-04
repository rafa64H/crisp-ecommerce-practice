import React, { useState } from 'react';

// data
import clothesData from '../../data/clothes_data.json';

// Components
import ProductComponent from './productComponent';
import HeaderProduct from './headerProduct';
import Footer from '../../components/ui/footer';
import SectionThree from '../../components/ui/section3';

const ProductPage = () => {
  const [shoppingBagItems, setShoppingBagItems] = useState([]);
  return (
    <>
      <HeaderProduct
        shoppingBagItems={shoppingBagItems}
        setShoppingBagItems={setShoppingBagItems}
      />
      <ProductComponent
        clothesData={clothesData[0]}
        shoppingBagItems={shoppingBagItems}
        setShoppingBagItems={setShoppingBagItems}
      />
      <SectionThree />
      <Footer />
    </>
  );
};

export default ProductPage;
