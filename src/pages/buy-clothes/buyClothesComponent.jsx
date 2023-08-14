import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import calculatePriceShoppingBagFromFirestore from '../../components/utils/calculatePriceShoppingBagFromFirestore';

const BuyClothesComponent = ({ shoppingBagItems, setShoppingBagItems }) => {
  const [orderDetailsOpened, setOrderDetailsOpened] = useState(false);

  function handleClickExpandDetails() {
    setOrderDetailsOpened((prevValue) => !prevValue);
  }

  console.log('BuyClothesComponent');
  return (
    <div className="place-order">
      <h1 className="place-order__title">Buy items from shopping bag</h1>

      <div className="place-order-div">
        <section className="address-and-buy">
          <h2>Address of client:</h2>
          <address>
            Name: John Titor <br />
            Phone number: 555578852154 <br />
            Street address: Grove street
            <br />
            Country: United States <br />
            State/Province: North Dakota
            <br />
            Zip/Postal code: 5231 <br />
          </address>

          <button className="black-btn">Place order</button>
        </section>

        <section className="order-summary">
          <button
            type="button"
            className="button-expand2 button-expand2--place-order"
            onClick={handleClickExpandDetails}
          >
            {`${calculatePriceShoppingBagFromFirestore(
              shoppingBagItems
            )}$ See details`}
            <i
              className={`fa-solid ${
                orderDetailsOpened ? 'fa-minus' : 'fa-plus'
              } icon`}
            />
          </button>

          <h2>Order Summary</h2>

          <h3>
            {`Total price: ${calculatePriceShoppingBagFromFirestore(
              shoppingBagItems
            )}$`}
          </h3>

          <ul>
            {shoppingBagItems.map((item) => (
              <li className="shopping-bag-list-item shopping-bag-list-item--place-order">
                <img
                  src={`${item.img}`}
                  className="shopping-bag-list-item__img shopping-bag-list-item--place-order__img"
                  alt=""
                />
                <div className="shopping-bag-list-item-text">
                  <p className="shopping-bag-list-item-text__paragraph">
                    <strong>{item.name}</strong>
                  </p>

                  <div className="shopping-bag-list-item-text-details">
                    <p>Size: {item.size}</p>
                    <p>Color: {item.color}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>

                  <p>
                    <strong>
                      Price:
                      {` ${(item.price * item.quantity).toFixed(2)}$`}
                    </strong>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={console.log('hola')}
                  aria-label="Delete item from shopping bag"
                  className="shopping-bag-list-item__delete-btn"
                >
                  <i className="fa-solid fa-trash" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default BuyClothesComponent;
