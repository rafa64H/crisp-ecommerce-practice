// Index page
import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import HeaderProduct from "../components/headerProduct";
import BuyClothesComponent from "../components/buyClothesComponent";
import SectionThree from "../components/section3";
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
      <BuyClothesComponent
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
    <Page />
  </React.StrictMode>
);
