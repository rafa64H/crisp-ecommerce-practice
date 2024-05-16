import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { onAuthStateChanged } from "firebase/auth";
import {
  getDataOfUser,
  updateCart,
  updateOrdersHistory,
} from "../services/firebase/utils/firebaseFunctions.js";
import { auth } from "../services/firebase/config-firebase/firebase.js";

import calculatePriceShoppingBagFromFirestore from "../utils/calculatePriceShoppingBagFromFirestore.js";

import { ShoppingBagListItem } from "./headerProduct";
import { setCart } from "../services/redux-toolkit/auth/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

const BuyClothesComponent = ({ shoppingBagItems, setShoppingBagItems }) => {
  const [orderDetailsOpened, setOrderDetailsOpened] = useState(false);
  const [succededOrder, setSuccededOrder] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const user = useSelector((store) => store.auth.user);
  const isLargeScreen = useSelector(
    (store) => store.isLargeScreen.isLargeScreen
  );
  const dispatch = useDispatch();

  function handleClickExpandDetails() {
    setOrderDetailsOpened((prevValue) => !prevValue);
  }

  function deleteShoppingItemFromState(
    productCartId,
    productCartName,
    productCartColor,
    productCartSize
  ) {
    const itemToDelete = user.cart.find(
      (itemFromState) =>
        itemFromState.id === productCartId &&
        itemFromState.name === productCartName &&
        itemFromState.color === productCartColor &&
        itemFromState.size === productCartSize
    );

    const cartToUpdate = user.cart.filter(
      (itemFromState) => itemFromState !== itemToDelete
    );

    dispatch(setCart(cartToUpdate));
  }

  async function handlePlaceOrder() {
    if (user.firestoreData.address.streetAddress === "") {
      setAlertMessage("You have not changed the address settings");
      return null;
    }

    if (user.cart.length === 0) {
      setAlertMessage("There are no items");
      setTimeout(() => {
        setAlertMessage("");
      }, 1000);
      return null;
    }

    try {
      const userData = await getDataOfUser();
      const userPrevOrdersHistory = user.firestoreData.ordersHistory;

      const today = new Date();

      const dateString = `${
        today.getMonth() + 1
      }/${today.getDate()}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

      const cartCopy = userData.cart;

      const shoppingBagItemsWithAddedDate = cartCopy.map((itemFromState) => {
        itemFromState.date = dateString;
        return itemFromState;
      });

      const ordersHistoryToUpdate = [
        ...shoppingBagItemsWithAddedDate,
        ...userPrevOrdersHistory,
      ];
      await updateOrdersHistory(ordersHistoryToUpdate);
      await updateCart([]);
      dispatch(setCart([]));
      setSuccededOrder(true);
    } catch (err) {
      console.log(err);
    }
  }

  const itemsToShow = () => {
    if (user.cart.length === 0) {
      return <h3 className="items-not-found">Items not found</h3>;
    }
    return user.cart.map((item) => (
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
              {`Name: ${user.firestoreData.address.firstNameAddress || "..."} ${
                user.firestoreData.address.lastNameAddress || "..."
              }`}
              <br />
              {`Phone number: ${
                user.firestoreData.address.phoneNumber || "..."
              }`}{" "}
              <br />
              {`Street address: ${
                user.firestoreData.address.streetAddress || "..."
              }`}
              <br />
              {`Country: ${user.firestoreData.address.country || "..."} `}
              <br />
              {`State/Province: ${user.firestoreData.address.state || "..."}`}
              <br />
              {`Zip/Postal code: ${
                user.firestoreData.address.postalCode || "..."
              }`}
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
              {`${calculatePriceShoppingBagFromFirestore()}$ See details`}
              <i
                className={`fa-solid ${
                  orderDetailsOpened ? "fa-minus" : "fa-plus"
                } icon`}
              />
            </button>

            <div
              className="order-summary-div"
              data-show-summary-div={orderDetailsOpened || isLargeScreen}
            >
              <h2>Order Summary</h2>

              <h3>
                {`Total price: ${calculatePriceShoppingBagFromFirestore()}$`}
              </h3>

              <ul className="list-items-place-order">{itemsToShow()}</ul>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return returningHtml();
};

export default BuyClothesComponent;
