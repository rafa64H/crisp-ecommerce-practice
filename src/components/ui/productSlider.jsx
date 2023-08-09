import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import ClothesCard from './smaller/clothesCard';

import Image from '../../assets/home/woman-home1.png';
import clothesData from '../../data/clothes_data.json';

const ProductSlider = ({ title }) => {
  function handleArrowBtnPressNext() {
    const productSliderContainer = document.querySelector(
      '.product-slider-container'
    );

    const width = productSliderContainer.clientWidth;
    productSliderContainer.scrollLeft += width;
  }

  function handleArrowBtnPressPrev() {
    const productSliderContainer = document.querySelector(
      '.product-slider-container'
    );

    const width = productSliderContainer.clientWidth;
    productSliderContainer.scrollLeft -= width;
  }

  return (
    <section className="product-slider">
      <div className="title-and-arrows-container">
        <h2 className="title">{title}</h2>

        <div className="arrows-container">
          <button
            type="button"
            aria-label="Go to next image"
            className="arrow-left arrow"
            onClick={() => handleArrowBtnPressPrev()}
          >
            <i className="fa-solid fa-arrow-left" />
          </button>
          <button
            type="button"
            aria-label="Go to next image"
            className="arrow-right arrow"
            onClick={() => handleArrowBtnPressNext()}
          >
            <i className="fa-solid fa-arrow-right" />
          </button>
        </div>
      </div>

      <ul className="product-slider-container">
        {clothesData[0].map((item) => (
          <ClothesCard
            link={`./product.html?productId=${item.productId}`}
            productName={item.productName}
            productColors={item.colors}
            productImg={item.colors[0].imageUrl}
            gender={item.gender}
            productPrice={item.price}
            category={item.category}
            key={uuidv4()}
            extraClassNames="item-product-slider"
          />
        ))}
      </ul>
    </section>
  );
};

export default ProductSlider;
