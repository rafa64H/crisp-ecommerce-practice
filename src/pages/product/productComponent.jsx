import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ProductComponent = ({ clothesData }) => {
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
    <section>
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 'min(100%, 25rem)',
          margin: '0 auto',
        }}
      >
        <img src={selectedImage} />

        <div style={{ margin: '0.5em 0' }}>
          {images.map((image) => (
            <button
              key={uuidv4()}
              data-square-active={selectedImage === image}
              type="button"
              className="square"
              onClick={(e) => handleChangeSelectedImage(image)}
            />
          ))}
        </div>
      </section>

      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>{product.productName}</h1>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: 'min(95%, 40rem)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '2px solid gray',
              maxWidth: '50%',
              padding: '0.75em',
            }}
          >
            <label style={{ fontWeight: '500' }} htmlFor="quantity">
              QUANTITY
            </label>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '20%',
              }}
            >
              <button type="button" aria-label="Reduce quantity of items">
                <i style={{ color: 'black' }} className="fa-solid fa-minus" />
              </button>

              <input
                type="number"
                style={{ border: 'transparent', textAlign: 'center' }}
                min={0}
                id="quantity"
              />

              <button type="button" aria-label="Increase quantity of items">
                <i style={{ color: 'black' }} className="fa-solid fa-plus" />
              </button>
            </div>
          </div>

          <div>
            <h2>
              <strong>{product.priceString}$</strong>
            </h2>

            <h3>SELECT COLOR</h3>

            <div>
              {product.colors.map((colorObj) => (
                <button
                  type="button"
                  key={uuidv4()}
                  aria-label={`Select ${colorObj.name}`}
                  className={`clothes-color-btn ${colorObj.class}`}
                />
              ))}
            </div>
          </div>
        </div>

        <h2>Select size</h2>

        <div style={{ width: '100%' }}>
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

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '1em',
          }}
        >
          <button
            style={{ margin: '0 0.5em' }}
            type="button"
            className="black-btn"
          >
            Add to bag
          </button>

          <button
            style={{ margin: '0 0.5em' }}
            type="button"
            className="transparent-btn"
          >
            Save
          </button>
        </div>
      </section>
    </section>
  );
};

export default ProductComponent;
