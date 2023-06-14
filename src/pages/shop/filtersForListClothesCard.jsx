import React, { useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FiltersContext } from './shopWithFilters';

const FiltersForListClothesCard = ({ isLargeScreen }) => {
  const { activeFilters, setActiveFilters, applyFilters, setApplyFilters } =
    useContext(FiltersContext);

  const [filterGenderActive, setFilterGenderActive] = useState(null);
  const [filterSizeActive, setFilterSizeActive] = useState(null);
  const [filterColorActive, setFilterColorActive] = useState(null);

  const [showShopSectionFilters, setShowShopSectionFilters] = useState(false);
  const [expandFiltersIcon, setExpandFiltersIcon] = useState('fa-plus');

  const [maxPrice, setMaxPrice] = useState(200);

  useEffect(() => {
    setActiveFilters({ ...activeFilters, maxPrice: parseFloat(maxPrice) });
  }, [maxPrice]);

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

  function handleClickFilter(
    index,
    filterName,
    filterBtnState,
    setFilterBtnState
  ) {
    if (index === filterBtnState) {
      setFilterBtnState(null);
    } else {
      setFilterBtnState(index);
    }
  }

  function handleChangeFiltersContext(
    index,
    filterBtnState,
    filterName,
    filterValue
  ) {
    if (filterName === 'gender') {
      if (index === filterBtnState)
        return setActiveFilters({ ...activeFilters, gender: null });
      setActiveFilters({ ...activeFilters, gender: filterValue });
    } else if (filterName === 'size') {
      if (index === filterBtnState)
        return setActiveFilters({ ...activeFilters, size: null });
      setActiveFilters({ ...activeFilters, size: filterValue });
    } else {
      if (index === filterBtnState)
        return setActiveFilters({ ...activeFilters, color: null });
      setActiveFilters({ ...activeFilters, color: filterValue });
    }
  }

  return (
    <>
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
          Gender filters
        </h3>

        <ul className="shop-section-filters-list">
          {allGenders.map((gender, index) => (
            <GenderFilterItem
              gender={gender}
              isActiveGender={filterGenderActive === index}
              onClick={() => {
                handleClickFilter(
                  index,
                  gender,
                  filterGenderActive,
                  setFilterGenderActive
                );
                handleChangeFiltersContext(
                  index,
                  filterGenderActive,
                  'gender', // filterName
                  gender // filterValue
                );
              }}
              key={uuidv4()}
              changeTabIndex={showShopSectionFilters || isLargeScreen}
            />
          ))}
        </ul>

        <h3 type="button" className="shop-section-filters__title">
          Size filters
        </h3>
        <ul className="shop-section-filters-list">
          {allSizes.map((size, index) => (
            <SizeFilterItem
              size={`${size}`}
              isActiveSize={filterSizeActive === index}
              onClick={() => {
                handleClickFilter(
                  index,
                  size.toUpperCase(),
                  filterSizeActive,
                  setFilterSizeActive
                );
                handleChangeFiltersContext(
                  index,
                  filterSizeActive,
                  'size', // filterName
                  size.toUpperCase() // filterValue
                );
              }}
              changeTabIndex={showShopSectionFilters || isLargeScreen}
              key={uuidv4()}
            />
          ))}
        </ul>

        <h3 type="button" className="shop-section-filters__title">
          Colors filters
        </h3>
        <ul className="shop-section-filters-list">
          {allColors.map((color, index) => (
            <ColorFilterItem
              color={color[0]}
              colorClass={color[1]}
              isActiveColor={filterColorActive === index}
              onClick={() => {
                handleClickFilter(
                  index,
                  color[0],
                  filterColorActive,
                  setFilterColorActive
                );
                handleChangeFiltersContext(
                  index,
                  filterColorActive,
                  'color', // filterName
                  color[0] // filterValue
                );
              }}
              changeTabIndex={showShopSectionFilters || isLargeScreen}
              key={uuidv4()}
            />
          ))}
        </ul>

        <h3 type="button" className="shop-section-filters__title">
          Maximum Price
        </h3>

        <input
          type="range"
          aria-label="Set the maximum price"
          min="0"
          max="200"
          step="8"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <p>{maxPrice}$</p>
        <ul className="shop-section-filters-list" />

        <button
          type="button"
          aria-label={`Apply filters, current filters are Gender ${activeFilters.gender}. Size ${activeFilters.size}. Color ${activeFilters.color}. Max price ${activeFilters.maxPrice}`}
          tabIndex={showShopSectionFilters || isLargeScreen ? '0' : '-1'}
          className="link-btn-component"
          onClick={() => setApplyFilters((prev) => prev + 1)}
        >
          Apply filters
        </button>
      </div>
    </>
  );
};

export default FiltersForListClothesCard;

const GenderFilterItem = ({
  gender,
  isActiveGender,
  changeTabIndex,
  onClick,
}) => (
  <button
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

const SizeFilterItem = ({ size, isActiveSize, changeTabIndex, onClick }) => (
  <button
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
  color,
  colorClass,
  changeTabIndex,
  isActiveColor,
  onClick,
}) => (
  <button
    type="button"
    className={`clothes-color-btn ${colorClass}`}
    data-color-active={isActiveColor}
    aria-label={color}
    tabIndex={changeTabIndex ? '0' : '-1'}
    onClick={onClick}
  />
);
