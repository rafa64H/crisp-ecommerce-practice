import React from "react";
import { v4 as uuidv4 } from "uuid";
import ClothesCard from "../components/ui/clothesCard";

function getAllClothesFromJson(returnAsComponents, clothesData) {
  if (returnAsComponents) {
    const clothes = clothesData.map((item, index) => (
      <ClothesCard
        link={`./product.html?productId=${item.productId}`}
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

export default getAllClothesFromJson;
