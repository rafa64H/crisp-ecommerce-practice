import React, { useState, useEffect } from 'react';
import ClothesCard from './smaller/clothesCard';

import clothesData from '../../data/clothes_data.json';

const ShopSection = () => {
  console.log(clothesData[0]);
  return (
    <section className="shop-section">
      <ul className="shop-section-list">
        <ClothesCard
          productName={clothesData[0][0].productName}
          productColors={clothesData[0][0].colors}
          productImg={clothesData[0][0].otherImages[0]}
          gender={clothesData[0][0].gender}
          price={clothesData[0][0].price}
          category={clothesData[0][0].category}
        />
      </ul>
    </section>
  );
};

export default ShopSection;
