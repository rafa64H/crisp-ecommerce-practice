import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ClothesCard from './smaller/clothesCard';

const ShopSection = ({ clothesData, iterations }) => {
  function getAllClothesFromJson() {
    const clothes = clothesData.map((item, index) => (
      <ClothesCard
        productName={item.productName}
        productColors={item.colors}
        productImg={item.colors[0].imageUrl}
        gender={item.gender}
        price={item.price}
        category={item.category}
        key={uuidv4()}
      />
    ));
    return clothes;
  }

  console.log(getAllClothesFromJson());

  return (
    <section className="shop-section">
      <ul className="shop-section-list">{getAllClothesFromJson()}</ul>
    </section>
  );
};

export default ShopSection;
