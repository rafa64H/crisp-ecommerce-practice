import React, { useEffect, useState, useContext } from 'react';

import handleLargeScreen from '../../components/utils/handleLargeScreen';
import ListClothesCardShopPage from './listClothesCardShopPage';
import FiltersForListClothesCard from './filtersForListClothesCard';

export const FiltersContext = React.createContext();

const ClothesListWithFilters = ({ clothesData }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    gender: null,
    size: null,
    color: null,
    maxPrice: 200,
  });
  const [applyFilters, setApplyFilters] = useState(0);

  useEffect(() => {
    handleLargeScreen(setIsLargeScreen);
  }, []);

  useEffect(() => {
    console.log(activeFilters);
  }, [activeFilters]);

  return (
    <section className="shop-section">
      <FiltersContext.Provider
        value={{
          activeFilters,
          setActiveFilters,
          applyFilters,
          setApplyFilters,
        }}
      >
        <FiltersForListClothesCard isLargeScreen={isLargeScreen} />
        <ListClothesCardShopPage
          clothesData={clothesData}
          isLargeScreen={isLargeScreen}
        />
      </FiltersContext.Provider>
    </section>
  );
};

export default ClothesListWithFilters;
