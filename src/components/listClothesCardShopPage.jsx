import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import ClothesCard from "./ui/clothesCard";
import getAllClothesFromJson from "../utils/getAllClothesFromJson";
import { FiltersContext } from "./shopWithFilters";
// ITERATIONS PROP ALSO COUNTS THE 0

const ListClothesCardShopPage = ({ clothesData, isLargeScreen }) => {
  const { activeFilters, setActiveFilters, applyFilters, setApplyFilters } =
    useContext(FiltersContext);
  const [itemsToShow, setItemsToShow] = useState(
    getAllClothesFromJson(true, clothesData)
  );

  function filterItems(filterGender, filterSize, filterColor, filterMaxPrice) {
    const filteredClothes = clothesData
      // filter by gender
      .filter((cloth) => {
        if (filterGender === null) return cloth;
        if (cloth.gender === filterGender) return cloth;
      })
      // Then filter by the size
      .filter((cloth) => {
        if (filterSize === null) return cloth;
        if (cloth.sizes.some((size) => size === filterSize)) return cloth;
      })
      // Then filter by the color
      .filter((cloth) => {
        if (filterColor === null) return cloth;
        if (cloth.colors.some((colorObj) => colorObj.name === filterColor))
          return cloth;
      })
      // Then filter by the maxPrice
      .filter((cloth) => {
        if (filterMaxPrice === null) return cloth;
        if (cloth.price <= filterMaxPrice) return cloth;
      });

    const clothes = filteredClothes.map((item, index) => (
      <ClothesCard
        link={`./product.html?productId=${item.productId}`}
        productId={item.productId}
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
    setItemsToShow(getAllClothesFromJson(true, clothesData));
    setItemsToShow(
      filterItems(
        activeFilters.gender,
        activeFilters.size,
        activeFilters.color,
        activeFilters.maxPrice
      )
    );
  }, [applyFilters]);

  return <ul className="list-clothes-card">{itemsToShow}</ul>;
};

export default ListClothesCardShopPage;
