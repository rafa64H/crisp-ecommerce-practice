import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import handleLargeScreen from '../../components/utils/handleLargeScreen';

const ProductComponent = ({
  clothesData,
  shoppingBagItems,
  setShoppingBagItems,
}) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [colorImage, setColorImage] = useState();
  const [showSizeOptions, setShowSizeOptions] = useState(false);
  const [changeIcon, setChangeIcon] = useState('fa-plus');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const quantityRef = useRef();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('productId');
  const product = clothesData.find((item) => item.productId === Number(id));

  if (!product) {
    return <h1 className="product-not-found"> Prodcut not found</h1>;
  }

  const { sizes } = product;

  const images = product.otherImages;

  function handleClickExpandSelectSize() {
    if (showSizeOptions) {
      setShowSizeOptions(false);
      setChangeIcon('fa-plus');
    } else {
      setShowSizeOptions(true);
      setChangeIcon('fa-minus');
    }
  }

  useEffect(() => {
    quantityRef.current.value = 1;
    handleLargeScreen(setIsLargeScreen);

    setSelectedColor(product.colors[0].name);
    setColorImage(product.colors[0].imageUrl);
    setSelectedImage(product.colors[0].imageUrl);
    setSelectedSize(sizes[0]);
  }, []);

  function handleAddToBag(newQuantity) {
    const checkThereIsSameItem = shoppingBagItems.find(
      (itemFromState) =>
        itemFromState.name === product.productName &&
        itemFromState.id === product.productId &&
        itemFromState.color === selectedColor &&
        itemFromState.size === selectedSize
    );

    if (checkThereIsSameItem !== undefined) {
      setShoppingBagItems((prevShoppingBagItems) =>
        prevShoppingBagItems.filter(
          (itemFromState) => itemFromState !== checkThereIsSameItem
        )
      );

      checkThereIsSameItem.quantity =
        Number(checkThereIsSameItem.quantity) + Number(newQuantity);

      setShoppingBagItems((prevShoppingBagItems) => [
        ...prevShoppingBagItems,
        checkThereIsSameItem,
      ]);

      return null;
    }

    setShoppingBagItems([
      ...shoppingBagItems,
      {
        name: product.productName,
        id: product.productId,
        size: selectedSize,
        quantity: quantityRef.current.value,
        price: product.price,
        color: selectedColor,
      },
    ]);
  }

  return (
    <>
      <section className="product">
        <section className="product-img-section">
          <img className="product-img-section__main-img" src={selectedImage} />

          <ProductImgSquareBtns
            selectedImage={selectedImage}
            colorImage={colorImage}
            selectedColor={selectedColor}
            images={images}
            setSelectedImage={setSelectedImage}
          />
        </section>

        <section className="product-choices-section">
          <h1>{product.productName}</h1>
          <p>{product.productDescription}</p>

          <div className="product-quantity-price-color">
            <ProductQuantity quantityRef={quantityRef} />

            <ProductColors
              product={product}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              setColorImage={setColorImage}
              setSelectedImage={setSelectedImage}
            />
          </div>

          <h2>Select size</h2>

          <div className="button-expand-container">
            <button
              type="button"
              className="button-expand"
              onClick={handleClickExpandSelectSize}
            >
              Select Size
              <i className={`fa-solid ${changeIcon} icon`} />
            </button>

            <ProductSizeOptions
              sizes={sizes}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              isLargeScreen={isLargeScreen}
              showSizeOptions={showSizeOptions}
            />
          </div>

          <div className="product-decision">
            <button
              className="black-btn product-decision__btn"
              type="button"
              onClick={() => handleAddToBag(quantityRef.current.value)}
            >
              Add to bag
            </button>

            <button
              className=" transparent-btn product-decision__btn"
              type="button"
            >
              Save
            </button>
          </div>

          <ProductCodeAndSocialMedia product={product} />
        </section>
      </section>

      <ProductDetailsSection product={product} />
    </>
  );
};

export default ProductComponent;

const ProductImgSquareBtns = ({
  selectedImage,
  colorImage,
  selectedColor,
  images,
  setSelectedImage,
}) => {
  function handleChangeSelectedImage(image) {
    setSelectedImage(image);
  }

  return (
    <div className="product-img-section__square-btns">
      <button
        data-square-active={selectedImage === colorImage}
        aria-pressed={selectedImage === colorImage}
        aria-label={`See image ${selectedColor}`}
        type="button"
        className="square"
        onClick={(e) => handleChangeSelectedImage(colorImage)}
      />
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
  );
};

const ProductQuantity = ({ quantityRef }) => {
  function handleChangeQuantity(increaseOrDicrease) {
    if (increaseOrDicrease) {
      if (Number(quantityRef.current.value) === 99) return null;

      return (quantityRef.current.value =
        Number(quantityRef.current.value) + 1);
    }

    if (Number(quantityRef.current.value) === 1) return null;

    return (quantityRef.current.value = Number(quantityRef.current.value) - 1);
  }

  return (
    <div className="product-quantity">
      <label className="quantity-label" htmlFor="quantity">
        QUANTITY
      </label>
      <div className="select-quantity">
        <button
          className="select-quantity__btn"
          onClick={() => handleChangeQuantity(false)}
          type="button"
          aria-label="Reduce quantity of items"
        >
          <i className="fa-solid fa-minus select-quantity__btn-icon" />
        </button>

        <input
          type="number"
          ref={quantityRef}
          className="select-quantity-number"
          readOnly
          min={0}
          max={99}
          id="quantity"
        />

        <button
          className="select-quantity__btn"
          onClick={() => handleChangeQuantity(true)}
          type="button"
          aria-label="Increase quantity of items"
        >
          <i className="fa-solid fa-plus select-quantity__btn-icon" />
        </button>
      </div>
    </div>
  );
};

const ProductColors = ({
  product,
  selectedColor,
  setSelectedColor,
  setColorImage,
  setSelectedImage,
}) => (
  <div className="product-color">
    <h2>
      <strong>{product.priceString}$</strong>
    </h2>

    <h3>SELECT COLOR</h3>

    <div className="select-color">
      {product.colors.map((colorObj) => (
        <button
          type="button"
          data-color-active={selectedColor === colorObj.name}
          key={uuidv4()}
          aria-label={`Select ${colorObj.name}`}
          onClick={() => {
            setSelectedColor(colorObj.name);
            setColorImage(colorObj.imageUrl);
            setSelectedImage(colorObj.imageUrl);
          }}
          className={`clothes-color-btn ${colorObj.class}`}
        />
      ))}
    </div>
  </div>
);

const ProductSizeOptions = ({
  sizes,
  selectedSize,
  setSelectedSize,
  isLargeScreen,
  showSizeOptions,
}) => {
  function handleClickOptionSize(clickedSize) {
    setSelectedSize(clickedSize);
  }

  return (
    <ul
      className={
        isLargeScreen ? 'product-size-options' : 'button-expand-options'
      }
      data-show-button-expand-options={showSizeOptions}
    >
      {sizes.map((sizeString) => (
        <li key={uuidv4()} className="button-expand-options__li">
          <button
            onClick={() => handleClickOptionSize(sizeString)}
            tabIndex={isLargeScreen || showSizeOptions ? 0 : -1}
            type="button"
            className={
              isLargeScreen
                ? 'button-product-size-options__btn'
                : 'button-expand-options__btn'
            }
            aria-pressed={selectedSize === sizeString}
            data-selected-option-acc-settings={selectedSize === sizeString}
          >
            {sizeString}
          </button>
        </li>
      ))}
    </ul>
  );
};

const ProductCodeAndSocialMedia = ({ product }) => (
  <div className="product-code-social-media">
    <div className="product-social-media">
      <h4>SHARE: </h4>
      <a href="#" className="product-social-links-atag">
        <i className="fa-brands fa-twitter" />
      </a>
      <a href="#" className="product-social-links-atag">
        <i className="fa-brands fa-facebook-f" />
      </a>
      <a href="#" className="product-social-links-atag">
        <i className="fa-brands fa-instagram" />
      </a>
    </div>

    <p className="product-code">
      <strong>PRODUCT CODE: </strong>
      {product.productId}
    </p>
  </div>
);

const ProductDetailsSection = ({ product }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [changeIcon2, setChangeIcon2] = useState('fa-plus');

  function handleClickExpandDetails() {
    if (showDetails) {
      setShowDetails(false);
      setChangeIcon2('fa-plus');
    } else {
      setShowDetails(true);
      setChangeIcon2('fa-minus');
    }
  }

  return (
    <section className="product-details-section">
      <h2 className="product-details-section__h2">DETAILS</h2>

      <button
        type="button"
        className="button-expand2"
        onClick={handleClickExpandDetails}
      >
        Details
        <i className={`fa-solid ${changeIcon2} icon`} />
      </button>

      <div
        className="product-details-section-div"
        data-show-product-details-div={showDetails}
      >
        <h3 className="product-details-section-div__h3">ABOUT PRODUCT</h3>
        <p>{product.productDescription}</p>

        <h3 className="product-details-section-div__h3">OVERVIEW</h3>
        <ul className="product-details-section-div-list">
          {product.productOverview.map((text) => (
            <li
              key={uuidv4()}
              className="product-details-section-div-list__item"
            >
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
