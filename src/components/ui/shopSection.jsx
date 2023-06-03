import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ClothesCard from './smaller/clothesCard';

const ShopSection = ({ clothesData, iterations }) => {
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

  function handleClickFilter(index, filterBtnState, setFilterBtnState) {
    if (index === filterBtnState) return setFilterBtnState(null);
    return setFilterBtnState(index);
  }
  function handleClickExpandFilters() {
    if (expandFiltersIcon === 'fa-plus') {
      setExpandFiltersIcon('fa-minus');
      setShowShopSectionFilters(true);
    } else {
      setExpandFiltersIcon('fa-plus');
      setShowShopSectionFilters(false);
    }
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
        onClick={handleClickExpandFilters}
      >
        Filters
        <i className={`fa-solid ${expandFiltersIcon} icon`} />
      </button>

      <div
        className="shop-section-filters"
        data-show-shop-section-filters={showShopSectionFilters}
      >
        <button type="button" className="shop-section-filters__btn">
          Gender
        </button>

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
            />
          ))}
        </ul>

        <button type="button" className="shop-section-filters__btn">
          Size
        </button>
        <ul className="shop-section-filters-list">
          {allSizes.map((size, index) => (
            <SizeFilterItem
              size={`${size}`}
              isActiveSize={filterSizeActive === index}
              onClick={() =>
                handleClickFilter(index, filterSizeActive, setFilterSizeActive)
              }
            />
          ))}
        </ul>

        <button type="button" className="shop-section-filters__btn">
          Colors
        </button>
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
            />
          ))}
        </ul>

        <button type="button" className="shop-section-filters__btn">
          Price
        </button>
        <ul className="shop-section-filters-list" />
      </div>

      <ul className="shop-section-list">{getAllClothesFromJson()}</ul>
    </section>
  );
};

export default ShopSection;

const GenderFilterItem = ({ gender, isActiveGender, onClick }) => (
  <button
    type="button"
    data-active-filter-gender={isActiveGender}
    aria-pressed={isActiveGender}
    className="shop-section-filters-list__gender"
    onClick={onClick}
  >
    {gender}
  </button>
);

const SizeFilterItem = ({ size, isActiveSize, onClick }) => (
  <button
    type="button"
    data-active-filter-size={isActiveSize}
    aria-pressed={isActiveSize}
    className="shop-section-filters-list__size"
    onClick={onClick}
  >
    {size.toUpperCase()}
  </button>
);

const ColorFilterItem = ({ color, colorClass, isActiveColor, onClick }) => (
  <button
    type="button"
    aria-label={color}
    className={`clothes-color-btn ${colorClass}`}
    data-color-active={isActiveColor}
    onClick={onClick}
  />
);
