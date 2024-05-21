import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { onAuthStateChanged } from "firebase/auth";
import {
  getDataOfUser,
  updateWishlist,
} from "../../services/firebase/utils/firebaseFunctions";
import { auth } from "../../services/firebase/config-firebase/firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../services/redux-toolkit/store.js";
import { setWishlist } from "../../services/redux-toolkit/auth/authSlice.js";

const ClothesCard = ({
  link,
  productImg,
  productId,
  category,
  gender,
  productName,
  productPrice,
  productColors,
  extraClassNames,
  additionalOnClickWishListFunction,
}) => {
  const [imageSrc, setImageSrc] = useState(`${productImg}`);
  const [activeBtn, setActiveBtn] = useState(0);
  const [addedToWishlist, setAddedToWishlist] = useState(false);

  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.uid) {
      const wishlistItem = user.firestoreData.wishlist.find(
        (itemFromState) => itemFromState.productId == productId
      );
      if (wishlistItem) {
        setAddedToWishlist(true);
      }
    }
  }, []);

  async function handleAddOrRemoveOfWishlist() {
    try {
      if (addedToWishlist) {
        const wishlist = user.firestoreData.wishlist;
        const wishlistWithRemovedItem = await wishlist.filter(
          (itemFromFirestore) => itemFromFirestore.productId !== productId
        );

        await updateWishlist(wishlistWithRemovedItem);
        dispatch(setWishlist(wishlistWithRemovedItem));
        return null;
      }

      const wishlist = user.firestoreData.wishlist;
      const wishlistWithAddedItem = [
        ...wishlist,
        {
          productId: productId,
          productName: productName,
          productImg: productImg,
          category: category,
          gender: gender,
          price: productPrice,
          colors: productColors,
        },
      ];

      await updateWishlist(wishlistWithAddedItem);
      dispatch(setWishlist(wishlistWithAddedItem));
    } catch (err) {
      console.log(err);
    }
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
    <li className={`clothes-card-li ${extraClassNames}`}>
      <a href={link} className="clothes-card">
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

        <div
          className="clothes-card-colors"
          onClick={(e) => e.preventDefault()}
        >
          {productColorsButtons}
        </div>

        <button
          type="button"
          className="clothes-card-heart"
          aria-label={`Add to wishlist ${
            addedToWishlist ? "Already added" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            if (user.uid === false) return null;

            handleAddOrRemoveOfWishlist();
            setAddedToWishlist((prevValue) => !prevValue);
            if (typeof additionalOnClickWishListFunction === "function")
              additionalOnClickWishListFunction();
          }}
        >
          <i
            className="fa-solid fa-heart"
            data-added-to-wishlist={addedToWishlist}
          />
        </button>
      </a>
    </li>
  );
};

export default ClothesCard;
