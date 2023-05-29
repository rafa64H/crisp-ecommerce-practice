import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const ClothesCard = ({
  productImg,
  category,
  gender,
  productName,
  productPrice,
  productColors,
}) => {
  function handleDefault(e) {
    e.preventDefault();
  }
  const productColorsButtons = productColors.map((color) => (
    <button
      type="button"
      className={`clothes-card-colors__button ${color.class}`}
      aria-label={`${color.name}`}
      key={uuidv4()}
    />
  ));

  return (
    <li className="clothes-card-li">
      <a href="#" className="clothes-card">
        <img className="clothes-card__img" src={productImg} alt={productName} />
        <p className="clothes-card__category-gender">
          {category} {gender}
        </p>
        <h3 className="clothes-card__name">{productName}</h3>
        <p className="clothes-card__price">
          <strong>{productPrice}</strong>
        </p>

        <div className="clothes-card-colors" onClick={(e) => handleDefault(e)}>
          {productColorsButtons}
        </div>
      </a>
    </li>
  );
};

export default ClothesCard;
