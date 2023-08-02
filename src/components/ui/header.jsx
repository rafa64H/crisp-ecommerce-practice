import { React, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '../../config-firebase/firebase';

import CompanyLogo from './smaller/companyLogo';
import handleLargeScreen from '../utils/handleLargeScreen';
import { getDataOfUser, updateCart } from '../utils/firebaseFunctions';
import clothesData from '../../data/clothes_data.json';

const Header = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [shoppingBagOpen, setShoppingBagOpen] = useState(false);

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userEmailVerified, setUserEmailVerified] = useState(true);
  const [shoppingBagItems, setShoppingBagItems] = useState();
  const [shoppingBagItemsNotFound, setShoppingBagItemsNotFound] =
    useState(true);

  useEffect(() => {
    handleLargeScreen(setIsLargeScreen);
  }, []);

  async function getAndSetCartItems() {
    const userData = await getDataOfUser();
    setShoppingBagItems(userData.cart);
  }

  function buildAllShoppingBagItems() {
    if (shoppingBagItems === undefined) return null;
    if (shoppingBagItems.length !== 0) {
      const allCartItems = shoppingBagItems.map((itemFromShoppingBagState) => {
        const { name, id, color, size, quantity } = itemFromShoppingBagState;

        const product = clothesData[0].find(
          (clothesDataItem) => clothesDataItem.productId === id
        );

        const colorImg = product.colors.find(
          (colorObj) => colorObj.name === color
        ).imageUrl;

        return (
          <ShoppingBagListItem
            key={uuidv4()}
            productImg={colorImg}
            productColor={color}
            productSize={size}
            productName={name}
            productQuantity={quantity}
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
  async function changeShoppingItemFromFirestore(cartToUpdate) {
    if (!shoppingBagItems) {
      return null;
    }
    try {
      await updateCart(cartToUpdate);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserLoggedIn(true);
        if (!user.emailVerified) {
          setUserEmailVerified(false);
        }
        await getAndSetCartItems();
      } else {
        setUserLoggedIn(false);
      }
    });
  }, []);

  useEffect(() => {
    changeShoppingItemFromFirestore(shoppingBagItems);
    if (shoppingBagItems === undefined) {
    } else if (shoppingBagItems.length === 0) setShoppingBagItemsNotFound(true);
    else if (shoppingBagItems.length !== 0) setShoppingBagItemsNotFound(false);
  }, [shoppingBagItems]);

  return (
    <header>
      <OpenNavBtn isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <CompanyLogo />

      <nav
        data-nav-list-open={isNavOpen.toString()}
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
            text="Blog"
            shouldShowTabIndex={isLargeScreen || isNavOpen}
          />
          <NavItem
            text="Sale"
            shouldShowTabIndex={isLargeScreen || isNavOpen}
          />
          <NavItem
            text="Contact"
            shouldShowTabIndex={isLargeScreen || isNavOpen}
          />
          <SearchBtn desktopOrMobile="desktop" />

          <div className="login-sign-cont">
            <NavItemAccount
              link="./login.html"
              text="Sign in"
              userLoggedIn={userLoggedIn}
              shouldShowTabIndex={isLargeScreen || isNavOpen}
            />
            <NavItemAccount
              link="./create-account.html"
              text="Create an account"
              userLoggedIn={userLoggedIn}
              shouldShowTabIndex={isLargeScreen || isNavOpen}
            />
            <ProfileLink
              link="./account.html"
              shouldShowTabIndex={isLargeScreen || isNavOpen}
              userLoggedIn={userLoggedIn}
              userEmailVerified={userEmailVerified}
            />

            <ShopBtn
              desktopOrMobile="desktop"
              shoppingBagOpen={shoppingBagOpen}
              setShoppingBagOpen={setShoppingBagOpen}
            />
          </div>
        </ul>
      </nav>

      <div className="search-shop-btns-cont">
        <SearchBtn desktopOrMobile="mobile" />
        <ShopBtn
          desktopOrMobile="mobile"
          shoppingBagOpen={shoppingBagOpen}
          setShoppingBagOpen={setShoppingBagOpen}
        />
      </div>

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
            Items not found or you aren't logged in yet
          </p>
          {buildAllShoppingBagItems()}
        </ul>
      </div>
    </header>
  );
};

export default Header;

const OpenNavBtn = ({ isNavOpen, setIsNavOpen }) => {
  const [iconNavBtn, setIconNavBtn] = useState('fa-bars');

  function handleOpenNav(e) {
    changeNavBtnIcon(isNavOpen);
    setIsNavOpen(!isNavOpen);
  }

  function changeNavBtnIcon(isNavOpen) {
    if (isNavOpen) {
      setIconNavBtn('fa-bars');
    } else {
      setIconNavBtn('fa-xmark');
    }
  }

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

const SearchBtn = ({ desktopOrMobile }) => {
  // This will have display:none if window width > 1200px
  if (desktopOrMobile === 'mobile') {
    return (
      <button
        type="button"
        className="search-btn-mobile"
        aria-label="Search something"
      >
        <i className="fas fa-search" />
      </button>
    );
  }

  // This will have display:none if window width < 1200px
  return (
    <button className="search-btn-desktop" type="button">
      <i className="fas fa-search" />

      <p className="search__p">Search</p>
    </button>
  );
};

const ShopBtn = ({ desktopOrMobile, shoppingBagOpen, setShoppingBagOpen }) => {
  async function handleClickOpenShoppingBag() {
    setShoppingBagOpen(!shoppingBagOpen);
  }

  // This will have display:none if window width > 1200px
  if (desktopOrMobile === 'mobile') {
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
        <p className="shop-btn-text__eur">0.00 EUR</p>
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
    data-user-loggedin-nav-item-account={`${userLoggedIn}`}
  >
    <a href={link} tabIndex={shouldShowTabIndex ? 0 : -1} className="nav-link">
      {text}
    </a>
  </li>
);

const ProfileLink = ({
  userLoggedIn,
  userEmailVerified,
  link,
  shouldShowTabIndex,
}) => (
  <li className="nav-item" data-user-loggedin-profile-link={`${userLoggedIn}`}>
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
      data-user-loggedin-profile-link={`${!userLoggedIn || !userEmailVerified}`}
    >
      Email is not verified!
    </p>
  </li>
);

const ShoppingBagListItem = ({
  productImg,
  productName,
  productSize,
  productColor,
  productQuantity,
  onClickDeleteItemShoppingBagFunction,
}) => (
  <li className="shopping-bag-list-item">
    <img src={`${productImg}`} className="shopping-bag-list-item__img" alt="" />
    <div className="shopping-bag-list-item-text">
      <p className="shopping-bag-list-item-text__paragraph">
        <strong>{productName}</strong>
      </p>

      <p>Size: {productSize}</p>
      <p>Color: {productColor}</p>
      <p>Quantity: {productQuantity}</p>
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
