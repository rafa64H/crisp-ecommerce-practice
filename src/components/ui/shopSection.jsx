import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ClothesCard from './smaller/clothesCard';
import handleLargeScreen from '../utils/handleLargeScreen';

const ShopSection = ({ clothesData, iterations }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    handleLargeScreen(setIsLargeScreen);
  }, []);

  const [filterGenderActive, setFilterGenderActive] = useState(null);
  const [filterSizeActive, setFilterSizeActive] = useState(null);
  const [filterColorActive, setFilterColorActive] = useState(null);

  const [showShopSectionFilters, setShowShopSectionFilters] = useState(false);
  const [expandFiltersIcon, setExpandFiltersIcon] = useState('fa-plus');

  const allGenders = ['MEN', 'WOMEN', 'UNISEX'];
  const allSizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', '3xl'];
  const allColors = [
    ['00 WHITE', 'clothes-00white'],
    ['02 LIGHT GRAY', 'clothes-02light-gray'],
    ['09 BLACK', 'clothes-09black'],
    ['18 WINE', 'clothes-18wine'],
    ['69 NAVY', 'clothes-69navy'],
    ['64 BLUE', 'clothes-64blue'],
    ['35 BROWN', 'clothes-35brown'],
    ['06 GRAY', 'clothes-06gray'],
    ['32 BEIGE', 'clothes-32beige'],
    ['08 DARK GRAY', 'clothes-08dark-gray'],
    ['57 OLIVE', 'clothes-57olive'],
    ['03 GRAY', 'clothes-03gray'],
    ['11 PINK', 'clothes-11pink'],
    ['60 LIGHT BLUE', 'clothes-60light-blue'],
    ['26 ORANGE', 'clothes-26orange'],
    ['30 NATURAL', 'clothes-30natural'],
    ['55 GREEN', 'clothes-55green'],
    ['13 RED', 'clothes-13red'],
  ];

  function handleClickExpandFilters() {
    if (expandFiltersIcon === 'fa-plus') {
      setExpandFiltersIcon('fa-minus');
      setShowShopSectionFilters(true);
    } else {
      setExpandFiltersIcon('fa-plus');
      setShowShopSectionFilters(false);
    }
  }

  function handleClickFilter(index, filterBtnState, setFilterBtnState) {
    if (index === filterBtnState) return setFilterBtnState(null);
    return setFilterBtnState(index);
  }

  function getAllClothesFromJson() {
    const clothes = clothesData.map((item, index) => (
      <ClothesCard
        productName={item.productName}
        productColors={item.colors}
        productImg={item.colors[0].imageUrl}
        gender={item.gender}
        productPrice={item.price}
        category={item.category}
        key={uuidv4()}
      />
    ));
    return clothes;
  }

  return (
    <section className="shop-section">
      <button
        type="button"
        className="shop-section-expand-filters"
        aria-expanded={showShopSectionFilters}
        onClick={handleClickExpandFilters}
      >
        Filters
        <i className={`fa-solid ${expandFiltersIcon} icon`} />
      </button>

      <div
        className="shop-section-filters"
        data-show-shop-section-filters={showShopSectionFilters}
        aria-hidden={!showShopSectionFilters && !isLargeScreen}
      >
        <h3 type="button" className="shop-section-filters__title">
          Gender
        </h3>

        <ul className="shop-section-filters-list">
          {allGenders.map((gender, index) => (
            <GenderFilterItem
              gender={gender}
              isActiveGender={filterGenderActive === index}
              onClick={() =>
                handleClickFilter(
                  index,
                  filterGenderActive,
                  setFilterGenderActive
                )
              }
              key={uuidv4()}
              changeTabIndex={showShopSectionFilters || isLargeScreen}
            />
          ))}
        </ul>

        <h3 type="button" className="shop-section-filters__title">
          Size
        </h3>
        <ul className="shop-section-filters-list">
          {allSizes.map((size, index) => (
            <SizeFilterItem
              size={`${size}`}
              isActiveSize={filterSizeActive === index}
              onClick={() =>
                handleClickFilter(index, filterSizeActive, setFilterSizeActive)
              }
              changeTabIndex={showShopSectionFilters || isLargeScreen}
              key={uuidv4()}
            />
          ))}
        </ul>

        <h3 type="button" className="shop-section-filters__title">
          Colors
        </h3>
        <ul className="shop-section-filters-list">
          {allColors.map((color, index) => (
            <ColorFilterItem
              color={color[0]}
              colorClass={color[1]}
              isActiveColor={filterColorActive === index}
              onClick={() =>
                handleClickFilter(
                  index,
                  filterColorActive,
                  setFilterColorActive
                )
              }
              changeTabIndex={showShopSectionFilters || isLargeScreen}
              key={uuidv4()}
            />
          ))}
        </ul>

        <h3 type="button" className="shop-section-filters__title">
          Price
        </h3>
        <ul className="shop-section-filters-list" />
      </div>

      <ul className="shop-section-list">{getAllClothesFromJson()}</ul>
    </section>
  );
};

export default ShopSection;

const GenderFilterItem = ({
  key,
  gender,
  isActiveGender,
  changeTabIndex,
  onClick,
}) => (
  <button
    key={key}
    type="button"
    className="shop-section-filters-list__gender"
    data-active-filter-gender={isActiveGender}
    aria-pressed={isActiveGender}
    tabIndex={changeTabIndex ? '0' : '-1'}
    onClick={onClick}
  >
    {gender}
  </button>
);

const SizeFilterItem = ({
  key,
  size,
  isActiveSize,
  changeTabIndex,
  onClick,
}) => (
  <button
    key={key}
    type="button"
    className="shop-section-filters-list__size"
    data-active-filter-size={isActiveSize}
    aria-pressed={isActiveSize}
    tabIndex={changeTabIndex ? '0' : '-1'}
    onClick={onClick}
  >
    {size.toUpperCase()}
  </button>
);

const ColorFilterItem = ({
  key,
  color,
  colorClass,
  changeTabIndex,
  isActiveColor,
  onClick,
}) => (
  <button
    key={key}
    type="button"
    className={`clothes-color-btn ${colorClass}`}
    data-color-active={isActiveColor}
    aria-label={color}
    tabIndex={changeTabIndex ? '0' : '-1'}
    onClick={onClick}
  />
);
