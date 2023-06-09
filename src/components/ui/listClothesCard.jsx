import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ClothesCard from './smaller/clothesCard';
import { FiltersContext } from '../../pages/shop/shopWithFilters';
// ITERATIONS PROP ALSO COUNTS THE 0

const ListClothesCard = ({ clothesData, isLargeScreen }) => {
  const { activeFilters, setActiveFilters } = useContext(FiltersContext);
  const [itemsToShow, setItemsToShow] = useState(getAllClothesFromJson(true));

  function getAllClothesFromJson(withoutFilters) {
    // For example: when loading the page the first time
    if (withoutFilters) {
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

    const clothes = clothesData.map((item, index) => item);
    return clothes;
  }

  function filterItems(filterGender, filterSize, filterColor) {
    const filteredClothes = clothesData
      // filter by gender
      .filter((cloth) => {
        if (filterGender === null) return cloth;
        if (cloth.gender === filterGender) return cloth;
      })
      // filter by the size
      .filter((cloth) => {
        if (filterSize === null) return cloth;
        if (
          Object.values(cloth.sizes).some(
            (size) => size[0] === filterSize && size[1]
          )
        )
          return cloth;
      })
      // filter by the color
      .filter((cloth) => {
        if (filterColor === null) return cloth;
        if (cloth.colors.some((colorObj) => colorObj.name === filterColor))
          return cloth;
      });

    const clothes = filteredClothes.map((item, index) => (
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

    if (clothes.length === 0) return <h2>No items found</h2>;
    return clothes;
  }

  useEffect(() => {
    setItemsToShow(getAllClothesFromJson(true));
    setItemsToShow(
      filterItems(activeFilters.gender, activeFilters.size, activeFilters.color)
    );
  }, [activeFilters]);

  /*
  <ClothesCard
  productName={item.productName}
  productColors={item.colors}
  productImg={item.colors[0].imageUrl}
  gender={item.gender}
  productPrice={item.price}
  category={item.category}
  key={uuidv4()}
/>
*/
  //
  return <ul className="list-clothes-card">{itemsToShow}</ul>;
};

export default ListClothesCard;
