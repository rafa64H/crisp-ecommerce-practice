import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ClothesCard = ({
  productImg,
  category,
  gender,
  productName,
  productPrice,
  productColors,
}) => {
  const [imageSrc, setImageSrc] = useState(`${productImg}`);
  const [activeBtn, setActiveBtn] = useState(0);

  function handleDefault(e) {
    e.preventDefault();
  }

  function changeImage(imageUrl) {
    setImageSrc(imageUrl);
  }

  function changeActiveBtn(index) {
    setActiveBtn(index);
  }

  const productColorsButtons = productColors.map((color, index) => (
    <button
      type="button"
      className={`clothes-color-btn ${color.class}`}
      aria-label={`See ${color.name} of ${productName}`}
      onClick={(e) => {
        changeImage(color.imageUrl);
        changeActiveBtn(index);
      }}
      data-color-active={activeBtn === index}
      aria-pressed={activeBtn === index}
      key={uuidv4()}
    />
  ));

  return (
    <li className="clothes-card-li">
      <a href="#" className="clothes-card">
        <img className="clothes-card__img" src={imageSrc} alt={productName} />

        <div className="clothes-card-text">
          <p className="clothes-card-text__category-gender">
            {category} {gender}
          </p>
          <h3 className="clothes-card-text__name">{productName}</h3>
          <p className="clothes-card-text__price">
            <strong>{productPrice}$</strong>
          </p>
        </div>

        <div className="clothes-card-colors" onClick={(e) => handleDefault(e)}>
          {productColorsButtons}
        </div>
      </a>
    </li>
  );
};

export default ClothesCard;
