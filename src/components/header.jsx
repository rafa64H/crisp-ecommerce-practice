import { React, useEffect, useState, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../services/firebase/config-firebase/firebase.js";

import CompanyLogo from "./ui/companyLogo";
import handleLargeScreen from "../utils/handleLargeScreen";
import calculatePriceShoppingBagFromFirestore from "../utils/calculatePriceShoppingBagFromFirestore";
import {
  getDataOfUser,
  updateCart,
} from "../services/firebase/utils/firebaseFunctions.js";
import clothesData from "../data/clothes_data.json";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../services/redux-toolkit/store.js";
import { setCart } from "../services/redux-toolkit/auth/authSlice.js";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [shoppingBagOpen, setShoppingBagOpen] = useState(false);
  const [showSearchClothes, setShowSearchClothes] = useState(false);

  const isLargeScreen = useSelector(
    (store) => store.isLargeScreen.isLargeScreen
  );

  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();

  return (
    <header>
      <OpenNavBtn
        isNavOpen={isNavOpen}
        setIsNavOpen={setIsNavOpen}
        setShoppingBagOpen={setShoppingBagOpen}
        setShowSearchClothes={setShowSearchClothes}
      />
      <CompanyLogo />

      <nav
        data-nav-list-open={isNavOpen}
        aria-hidden={!isLargeScreen && !isNavOpen}
      >
        <ul className="nav-list">
          <NavItem
            text="Home"
            link="./index.html"
            shouldShowTabIndex={isLargeScreen || isNavOpen}
          />
          <NavItem
            text="Shop"
            link="./shop.html"
            shouldShowTabIndex={isLargeScreen || isNavOpen}
          />
          <NavItem
            text="Community"
            link="./community.html"
            shouldShowTabIndex={isLargeScreen || isNavOpen}
          />
          <NavItem
            text="Contact"
            link="./contact.html"
            shouldShowTabIndex={isLargeScreen || isNavOpen}
          />
          <SearchClothesComponent
            desktopOrMobile="desktop"
            showSearchClothes={showSearchClothes}
            setShowSearchClothes={setShowSearchClothes}
            setShoppingBagOpen={setShoppingBagOpen}
            setIsNavOpen={setIsNavOpen}
          />

          <div className="login-sign-cont">
            <NavItemAccount
              link="./login.html"
              text="Sign in"
              userLoggedIn={user.uid}
              shouldShowTabIndex={isLargeScreen || isNavOpen}
            />
            <NavItemAccount
              link="./create-account.html"
              text="Create an account"
              userLoggedIn={user.uid}
              shouldShowTabIndex={isLargeScreen || isNavOpen}
            />
            <ProfileLink
              link="./account.html"
              shouldShowTabIndex={isLargeScreen || isNavOpen}
              userLoggedIn={user.uid}
            />

            <ShopBtn
              desktopOrMobile="desktop"
              shoppingBagOpen={shoppingBagOpen}
              setShoppingBagOpen={setShoppingBagOpen}
              setShowSearchClothes={setShowSearchClothes}
              setIsNavOpen={setIsNavOpen}
            >
              {calculatePriceShoppingBagFromFirestore()}
            </ShopBtn>
          </div>
        </ul>
      </nav>

      <div className="search-shop-btns-cont">
        <SearchClothesComponent
          desktopOrMobile="mobile"
          showSearchClothes={showSearchClothes}
          setShowSearchClothes={setShowSearchClothes}
          setShoppingBagOpen={setShoppingBagOpen}
          setIsNavOpen={setIsNavOpen}
        />
        <ShopBtn
          desktopOrMobile="mobile"
          shoppingBagOpen={shoppingBagOpen}
          setShoppingBagOpen={setShoppingBagOpen}
          setShowSearchClothes={setShowSearchClothes}
          setIsNavOpen={setIsNavOpen}
        />
      </div>

      <ShoppingBag
        userLoggedIn={user.uid}
        shoppingBagOpen={shoppingBagOpen}
        setShoppingBagOpen={setShoppingBagOpen}
        calculatePriceShoppingBagFromFirestore={
          calculatePriceShoppingBagFromFirestore
        }
      />
    </header>
  );
};

export default Header;

const OpenNavBtn = ({
  isNavOpen,
  setIsNavOpen,
  setShoppingBagOpen,
  setShowSearchClothes,
}) => {
  const [iconNavBtn, setIconNavBtn] = useState("fa-bars");

  function handleOpenNav(e) {
    setIsNavOpen(!isNavOpen);
    setShoppingBagOpen(false);
    setShowSearchClothes(false);
  }

  useEffect(() => {
    setIconNavBtn(isNavOpen ? "fa-xmark" : "fa-bars");
  }, [isNavOpen]);

  return (
    <button
      className="open-nav"
      aria-label="open navigation"
      aria-expanded="false"
      type="button"
      onClick={(e) => handleOpenNav(e)}
    >
      <i className={`fa-solid ${iconNavBtn}`} data-open-nav-btn-icon />
    </button>
  );
};

const SearchClothesComponent = ({
  desktopOrMobile,
  showSearchClothes,
  setShowSearchClothes,
  setShoppingBagOpen,
  setIsNavOpen,
}) => {
  const [clothesDataState, setClothesDataState] = useState(clothesData[0]);

  function handleChangeSearchText(e) {
    if (e.target.value === "") {
      console.log("true");
      return setClothesDataState(clothesData[0]);
    }

    const filteredItems = clothesData[0].filter((item) =>
      item.productName.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setClothesDataState(filteredItems);
  }

  return desktopOrMobile === "mobile" ? (
    <>
      <button
        type="button"
        className="search-btn-mobile"
        aria-label="Search something"
        onClick={() => {
          setIsNavOpen(false);
          setShoppingBagOpen(false);
          setShowSearchClothes((prevValue) => !prevValue);
        }}
      >
        <i className="fas fa-search" />
      </button>

      <div
        className="search-clothes-list"
        data-show-clothes-list={showSearchClothes}
        aria-hidden={!showSearchClothes}
      >
        <button
          type="button"
          className="transparent-btn search-clothes-list-close-btn"
          onClick={() => setShowSearchClothes((prevValue) => !prevValue)}
        >
          <i className="fa-solid fa-xmark" />
        </button>
        <input
          type="text"
          className="form-input-typing search-clothes-list__input"
          onChange={(e) => {
            handleChangeSearchText(e);
          }}
        />

        <ul className="search-clothes-list-ul">
          {clothesDataState.map((clothesItem) => (
            <SearchClothesListItem
              key={uuidv4()}
              link={`./product.html?productId=${clothesItem.productId}`}
              clothesItem={clothesItem}
            />
          ))}
        </ul>
      </div>
    </>
  ) : (
    <>
      <button
        className="search-btn-desktop"
        type="button"
        onClick={() => {
          setIsNavOpen(false);
          setShoppingBagOpen(false);
          setShowSearchClothes((prevValue) => !prevValue);
        }}
      >
        <i className="fas fa-search" />

        <p className="search__p">Search</p>
      </button>

      <div
        className="search-clothes-list search-clothes-list--desktop"
        data-show-clothes-list={showSearchClothes}
        aria-hidden={!showSearchClothes}
      >
        <button
          type="button"
          className="transparent-btn search-clothes-list-close-btn"
          onClick={() => setShowSearchClothes((prevValue) => !prevValue)}
        >
          <i className="fa-solid fa-xmark" />
        </button>
        <input
          type="text"
          className="form-input-typing search-clothes-list__input"
          onChange={(e) => {
            handleChangeSearchText(e);
          }}
        />

        <ul className="search-clothes-list-ul">
          {clothesDataState.map((clothesItem) => (
            <SearchClothesListItem
              key={uuidv4()}
              link={`./product.html?productId=${clothesItem.productId}`}
              clothesItem={clothesItem}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

const SearchClothesListItem = ({ clothesItem, link }) => (
  <li>
    <a href={link} className="search-clothes-list-item">
      <img
        className="search-clothes-list-item__img"
        src={clothesItem.otherImages[0]}
        alt={clothesItem.productName}
      />
      <div className="search-clothes-list-item-text">
        <p className="search-clothes-list-item-text__paragraph">
          {clothesItem.productName}
        </p>
        <p className="search-clothes-list-item-text__paragraph">
          {clothesItem.price}
        </p>
      </div>
    </a>
  </li>
);

const ShopBtn = ({
  desktopOrMobile,
  shoppingBagOpen,
  setShoppingBagOpen,
  setShowSearchClothes,
  setIsNavOpen,
  children,
}) => {
  async function handleClickOpenShoppingBag() {
    setShoppingBagOpen(!shoppingBagOpen);
    setIsNavOpen(false);
    setShowSearchClothes(false);
  }

  // This will have display:none if window width > 1200px
  if (desktopOrMobile === "mobile") {
    return (
      <button
        type="button"
        className="shop-btn-mobile"
        aria-label="Shopping bag"
        onClick={handleClickOpenShoppingBag}
      >
        <i className="fas fa-shopping-bag" />
      </button>
    );
  }

  // This will have display:none if window width < 1200px
  return (
    <button
      type="button"
      className="shop-btn-desktop"
      onClick={handleClickOpenShoppingBag}
    >
      <i className="fas fa-shopping-bag" />
      <div className="shop-btn-text">
        <p className="shop-btn-text__p">Shopping bag</p>
        <p className="shop-btn-text__usd">{children} USD</p>
      </div>
    </button>
  );
};

const NavItem = ({ text, link, shouldShowTabIndex }) => (
  <li className="nav-item">
    <a href={link} tabIndex={shouldShowTabIndex ? 0 : -1} className="nav-link">
      {text}
    </a>
  </li>
);

const NavItemAccount = ({ text, userLoggedIn, link, shouldShowTabIndex }) => (
  <li
    className="nav-item"
    data-user-loggedin-nav-item-account={`${userLoggedIn !== false}`}
  >
    <a href={link} tabIndex={shouldShowTabIndex ? 0 : -1} className="nav-link">
      {text}
    </a>
  </li>
);

const ProfileLink = ({ userLoggedIn, link, shouldShowTabIndex }) => {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();

  return (
    <li
      className="nav-item"
      data-user-loggedin-profile-link={`${userLoggedIn !== false}`}
    >
      <a
        href={link}
        tabIndex={shouldShowTabIndex ? 0 : -1}
        className="nav-link--profile"
        aria-label="Go to account settings"
      >
        <i className="fa-solid fa-user" />
      </a>

      <p
        className="header-not-verified-email"
        data-user-loggedin-profile-link={`${!user.emailVerified}`}
      >
        Email is not verified!
      </p>
    </li>
  );
};

export const ShoppingBagListItem = ({
  productImg,
  productName,
  productSize,
  productColor,
  productQuantity,
  productPrice,
  onClickDeleteItemShoppingBagFunction,
  extraClassNames,
}) => (
  <li className={`shopping-bag-list-item ${extraClassNames}`}>
    <img src={`${productImg}`} className="shopping-bag-list-item__img" alt="" />
    <div className="shopping-bag-list-item-text">
      <p className="shopping-bag-list-item-text__paragraph">
        <strong>{productName}</strong>
      </p>

      <div className="shopping-bag-list-item-text-details">
        <p>Size: {productSize}</p>
        <p>Color: {productColor}</p>
        <p>Quantity: {productQuantity}</p>
      </div>

      <p>
        <strong>
          Price: {` ${(productPrice * productQuantity).toFixed(2)}$`}
        </strong>
      </p>
    </div>

    <button
      type="button"
      onClick={onClickDeleteItemShoppingBagFunction}
      aria-label="Delete item from shopping bag"
      className="shopping-bag-list-item__delete-btn"
    >
      <i className="fa-solid fa-trash" />
    </button>
  </li>
);

const ShoppingBag = ({
  userLoggedIn,
  shoppingBagOpen,
  setShoppingBagOpen,
  calculatePriceShoppingBagFromFirestore,
}) => {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();

  const [shoppingBagItemsNotFound, setShoppingBagItemsNotFound] =
    useState(true);

  useEffect(() => {
    if (user.uid) {
      if (user.cart.length !== 0) {
        setShoppingBagItemsNotFound(false);
      } else {
        setShoppingBagItemsNotFound(true);
      }
    }
  }, [user.cart]);

  function buildAllShoppingBagItems() {
    if (user.cart === undefined) return null;
    if (user.cart.length !== 0) {
      const allCartItems = user.cart.map((itemFromCart) => {
        const { name, id, color, size, quantity, price, img } = itemFromCart;

        return (
          <ShoppingBagListItem
            key={uuidv4()}
            productImg={img}
            productColor={color}
            productSize={size}
            productName={name}
            productQuantity={quantity}
            productPrice={price}
            onClickDeleteItemShoppingBagFunction={() =>
              deleteShoppingItemFromState(id, name, color, size)
            }
          />
        );
      });

      return allCartItems;
    }
  }

  function deleteShoppingItemFromState(
    productCartId,
    productCartName,
    productCartColor,
    productCartSize
  ) {
    const user = store.getState().auth.user;

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

    changeShoppingItemFromFirestore(cartToUpdate);
  }

  async function changeShoppingItemFromFirestore(cartToUpdate) {
    try {
      await updateCart(cartToUpdate);

      if (cartToUpdate.length === 0) setShoppingBagItemsNotFound(true);
      else if (cartToUpdate.length !== 0) setShoppingBagItemsNotFound(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="shopping-bag" data-open-shopping-bag={shoppingBagOpen}>
      <button
        type="button"
        className="shopping-bag__close-btn"
        aria-label="Close shopping bag"
        onClick={() => setShoppingBagOpen(false)}
      >
        <i className="fa-solid fa-xmark" />
      </button>
      <ul className="shopping-bag-list">
        <p className="not-found" data-not-found={shoppingBagItemsNotFound}>
          There are no items in the cart
        </p>
        {buildAllShoppingBagItems()}
      </ul>
      <p className="total-price">
        Total price is: {calculatePriceShoppingBagFromFirestore()}$
      </p>
      {userLoggedIn !== false ? (
        <a href="./buy-clothes.html" className="black-btn">
          Buy clothes
        </a>
      ) : (
        ""
      )}
    </div>
  );
};
