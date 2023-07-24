import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import handleLargeScreen from '../../components/utils/handleLargeScreen';

const ProductComponent = ({ clothesData }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [showSizeOptions, setShowSizeOptions] = useState(false);
  const [changeIcon, setChangeIcon] = useState('fa-plus');
  const [selectedSize, setSelectedSize] = useState('');

  function handleClickExpand() {
    if (showSizeOptions) {
      setShowSizeOptions(false);
      setChangeIcon('fa-plus');
    } else {
      setShowSizeOptions(true);
      setChangeIcon('fa-minus');
    }
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get('productId');
  const product = clothesData.find((item) => item.productId === Number(id));
  const sizes = [];
  Object.values(product.sizes).forEach((sizeArr) => sizes.push(sizeArr));

  const images = product.otherImages;
  useEffect(() => {
    handleLargeScreen(setIsLargeScreen);

    setSelectedImage(images[0]);
    setSelectedSize(sizes[0][0]);
  }, []);

  function handleChangeSelectedImage(image) {
    setSelectedImage(image);
  }

  function handleClickOptionSize(clickedSize) {
    setSelectedSize(clickedSize);
  }

  return (
    <section className="product">
      <section className="product-img-section">
        <img className="product-img-section__main-img" src={selectedImage} />

        <div className="product-img-section__square-btns">
          {images.map((image, index) => (
            <button
              key={uuidv4()}
              data-square-active={selectedImage === image}
              aria-pressed={selectedImage === image}
              aria-label={`See image ${index + 1}`}
              type="button"
              className="square"
              onClick={(e) => handleChangeSelectedImage(image)}
            />
          ))}
        </div>
      </section>

      <section className="product-details-section">
        <h1>{product.productName}</h1>
        <p>{product.productDescription}</p>

        <div className="product-quantity-price-color">
          <div className="product-quantity">
            <label className="quantity-label" htmlFor="quantity">
              QUANTITY
            </label>
            <div className="select-quantity">
              <button
                className="select-quantity__btn"
                type="button"
                aria-label="Reduce quantity of items"
              >
                <i className="fa-solid fa-minus select-quantity__btn-icon" />
              </button>

              <input
                type="number"
                className="select-quantity-number"
                readOnly
                min={0}
                max={99}
                id="quantity"
              />

              <button
                className="select-quantity__btn"
                type="button"
                aria-label="Increase quantity of items"
              >
                <i className="fa-solid fa-plus select-quantity__btn-icon" />
              </button>
            </div>
          </div>

          <div className="product-color">
            <h2>
              <strong>{product.priceString}$</strong>
            </h2>

            <h3>SELECT COLOR</h3>

            <div className="select-color">
              {product.colors.map((colorObj) => (
                <button
                  type="button"
                  className="select-color__btn"
                  key={uuidv4()}
                  aria-label={`Select ${colorObj.name}`}
                  className={`clothes-color-btn ${colorObj.class}`}
                />
              ))}
            </div>
          </div>
        </div>

        <h2>Select size</h2>

        <div className="button-expand-container">
          <button
            type="button"
            className="button-expand"
            onClick={handleClickExpand}
          >
            Select Size
            <i className={`fa-solid ${changeIcon} icon`} />
          </button>

          <ul
            className="button-expand-options"
            data-show-button-expand-options={showSizeOptions}
          >
            {sizes.map((sizeElementArr) => (
              <li key={uuidv4()} className="button-expand-options__li">
                <button
                  onClick={() => handleClickOptionSize(sizeElementArr[0])}
                  tabIndex={isLargeScreen || showSizeOptions ? 0 : -1}
                  type="button"
                  className="button-expand-options__btn"
                  aria-pressed={selectedSize === sizeElementArr[0]}
                  data-selected-option-acc-settings={
                    selectedSize === sizeElementArr[0]
                  }
                >
                  {sizeElementArr}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="product-decision">
          <button className="black-btn product-decision__btn" type="button">
            Add to bag
          </button>

          <button
            className=" transparent-btn product-decision__btn"
            type="button"
          >
            Save
          </button>
        </div>
      </section>
    </section>
  );
};

export default ProductComponent;
