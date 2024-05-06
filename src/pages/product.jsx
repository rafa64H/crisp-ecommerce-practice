import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import HeaderProduct from "../components/headerProduct";
import ProductComponent from "../components/productComponent";
import SectionThree from "../components/section3";
import clothesData from "../data/clothes_data.json";
import Footer from "../components/footer";

import "../assets/styles.scss";

const Page = () => {
  const [shoppingBagItems, setShoppingBagItems] = useState([]);
  return (
    <>
      <HeaderProduct
        shoppingBagItems={shoppingBagItems}
        setShoppingBagItems={setShoppingBagItems}
      />
      <ProductComponent
        clothesData={clothesData[0]}
        shoppingBagItems={shoppingBagItems}
        setShoppingBagItems={setShoppingBagItems}
      />
      <SectionThree />
      <Footer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Page></Page>
  </React.StrictMode>
);
