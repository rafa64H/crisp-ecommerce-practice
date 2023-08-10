import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { onAuthStateChanged } from 'firebase/auth';
import { getDataOfUser, updateWishlist } from '../../utils/firebaseFunctions';
import { auth } from '../../../config-firebase/firebase';

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
}) => {
  const [imageSrc, setImageSrc] = useState(`${productImg}`);
  const [activeBtn, setActiveBtn] = useState(0);
  const [addedToWishList, setAddedToWishList] = useState(false);

  async function getWishlistFromFirestore() {
    const userData = await getDataOfUser();
    const { wishlist } = userData;

    return wishlist;
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const wishList = await getWishlistFromFirestore();
        const wishListItem = await wishList.find(
          (itemFromFirestore) => itemFromFirestore == productId
        );
        if (wishListItem) {
          setAddedToWishList(true);
        }
      }
    });
  }, []);

  async function handleAddOrRemoveOfWishlist() {
    try {
      if (addedToWishList) {
        const wishList = await getWishlistFromFirestore();
        const wishListWithRemovedItem = await wishList.filter(
          (itemFromFirestore) => itemFromFirestore !== productId
        );

        await updateWishlist(wishListWithRemovedItem);
        return null;
      }

      const wishList = await getWishlistFromFirestore();
      const wishListWithAddedItem = [...wishList, productId];

      await updateWishlist(wishListWithAddedItem);
    } catch (err) {
      console.log(err);
    }
  }

  function handleDefault(e) {
    e.preventDefault();
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

        <div className="clothes-card-colors" onClick={(e) => handleDefault(e)}>
          {productColorsButtons}
        </div>

        <button
          type="button"
          className="clothes-card-heart"
          aria-label={`Add to wishlist ${
            addedToWishList ? 'Already added' : ''
          }`}
          onClick={(e) => {
            handleDefault(e);
            handleAddOrRemoveOfWishlist();
            setAddedToWishList((prevValue) => !prevValue);
          }}
        >
          <i
            className="fa-solid fa-heart"
            data-added-to-wishlist={addedToWishList}
          />
        </button>
      </a>
    </li>
  );
};

export default ClothesCard;
