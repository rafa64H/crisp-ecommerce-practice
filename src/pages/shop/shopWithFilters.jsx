import React, { useEffect, useState, useContext } from 'react';

import handleLargeScreen from '../../components/utils/handleLargeScreen';
import ListClothesCard from '../../components/ui/listClothesCard';
import FiltersForListClothesCard from '../../components/ui/filtersForListClothesCard';

export const FiltersContext = React.createContext();

const ClothesListWithFilters = ({ clothesData }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    gender: null,
    size: null,
    color: null,
  });

  useEffect(() => {
    handleLargeScreen(setIsLargeScreen);
  }, []);

  return (
    <section className="shop-section">
      <FiltersContext.Provider value={{ activeFilters, setActiveFilters }}>
        <FiltersForListClothesCard isLargeScreen={isLargeScreen} />
        <ListClothesCard
          clothesData={clothesData}
          isLargeScreen={isLargeScreen}
        />
      </FiltersContext.Provider>
    </section>
  );
};

export default ClothesListWithFilters;
