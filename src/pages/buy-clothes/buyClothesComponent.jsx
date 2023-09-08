import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import {
  getDataOfUser,
  updateOrdersHistory,
} from '../../components/utils/firebaseFunctions';
import { auth } from '../../config-firebase/firebase';

import calculatePriceShoppingBagFromFirestore from '../../components/utils/calculatePriceShoppingBagFromFirestore';
import handleLargeScreen from '../../components/utils/handleLargeScreen';

import { ShoppingBagListItem } from '../product/headerProduct';

const BuyClothesComponent = ({ shoppingBagItems, setShoppingBagItems }) => {
  const [orderDetailsOpened, setOrderDetailsOpened] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [addressFromFirestore, setAddressFromFirestore] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [succededOrder, setSuccededOrder] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getDataOfUser();
        const userAddress = userData.address;
        setAddressFromFirestore(userAddress);
        setIsLoading(false);
      } else {
      }
    });
    handleLargeScreen(setIsLargeScreen);
  }, []);

  function handleClickExpandDetails() {
    setOrderDetailsOpened((prevValue) => !prevValue);
  }

  function deleteShoppingItemFromState(
    productCartId,
    productCartName,
    productCartColor,
    productCartSize
  ) {
    const itemToDelete = shoppingBagItems.find(
      (itemFromState) =>
        itemFromState.id === productCartId &&
        itemFromState.name === productCartName &&
        itemFromState.color === productCartColor &&
        itemFromState.size === productCartSize
    );
    setShoppingBagItems((prevShoppingBagItems) =>
      prevShoppingBagItems.filter(
        (itemFromState) => itemFromState !== itemToDelete
      )
    );
  }

  async function handlePlaceOrder() {
    if (addressFromFirestore.streetAddress === '') {
      setAlertMessage('You have not changed the address settings');
      setTimeout(() => {
        setAlertMessage('');
      }, 1000);
      return null;
    }

    if (shoppingBagItems.length === 0) {
      setAlertMessage('There are no items');
      setTimeout(() => {
        setAlertMessage('');
      }, 1000);
      return null;
    }

    try {
      const userData = await getDataOfUser();
      const userPrevOrdersHistory = await userData.ordersHistory;

      const today = new Date();

      const shoppingBagItemsWithAddedDate = shoppingBagItems.map(
        (itemFromState) => {
          itemFromState.date = `${
            today.getMonth() + 1
          }/${today.getDate()}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
          return itemFromState;
        }
      );

      const ordersHistoryToUpdate = [
        ...userPrevOrdersHistory,
        ...shoppingBagItemsWithAddedDate,
      ];
      await updateOrdersHistory(ordersHistoryToUpdate);
      await setShoppingBagItems([]);
      await setSuccededOrder(true);
    } catch (err) {
      console.log(err);
    }
  }

  const itemsToShow = () => {
    if (isLoading) {
      return <h3 className="items-not-found">Loading...</h3>;
    }
    if (shoppingBagItems.length === 0) {
      return <h3 className="items-not-found">Items not found</h3>;
    }
    return shoppingBagItems.map((item) => (
      <ShoppingBagListItem
        key={uuidv4()}
        productImg={item.img}
        productName={item.name}
        productSize={item.size}
        productColor={item.color}
        productQuantity={item.quantity}
        productPrice={item.price}
        onClickDeleteItemShoppingBagFunction={deleteShoppingItemFromState}
        extraClassNames="shopping-bag-list-item--place-order"
      />
    ));
  };

  function returningHtml() {
    if (succededOrder) {
      return (
        <div className="order-placed">
          <h1 aria-live="assertive">Order placed!</h1>
          <i className="fa-solid fa-check" />
        </div>
      );
    }
    return (
      <div className="place-order">
        <h1 className="place-order__title">Buy items from shopping bag</h1>

        <div className="place-order-div">
          <section className="address-and-buy">
            <a className="edit-address" href="./account.html?option=Address">
              <i className="fa-solid fa-pencil" />
              Edit address
            </a>

            <h2>Address of client:</h2>

            <address className="address-and-buy__address-tag">
              {`Name: ${addressFromFirestore.firstNameAddress || '...'} ${
                addressFromFirestore.lastNameAddress || '...'
              }`}
              <br />
              {`Phone number: ${
                addressFromFirestore.phoneNumber || '...'
              }`}{' '}
              <br />
              {`Street address: ${addressFromFirestore.streetAddress || '...'}`}
              <br />
              {`Country: ${addressFromFirestore.country || '...'} `}
              <br />
              {`State/Province: ${addressFromFirestore.state || '...'}`}
              <br />
              {`Zip/Postal code: ${addressFromFirestore.postalCode || '...'}`}
              <br />
            </address>

            <button
              type="submit"
              className="black-btn"
              onClick={handlePlaceOrder}
            >
              Place order
            </button>
            <aside>{alertMessage}</aside>
          </section>

          <section className="order-summary">
            <button
              type="button"
              className="button-expand2 button-expand2--place-order"
              onClick={handleClickExpandDetails}
              data-show-btn-expand2={!isLargeScreen}
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

            <div
              className="order-summary-div"
              data-show-summary-div={orderDetailsOpened || isLargeScreen}
            >
              <h2>Order Summary</h2>

              <h3>
                {`Total price: ${calculatePriceShoppingBagFromFirestore(
                  shoppingBagItems
                )}$`}
              </h3>

              <ul>{itemsToShow()}</ul>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return returningHtml();
};

export default BuyClothesComponent;
