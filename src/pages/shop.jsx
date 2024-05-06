// Index page
import React from "react";
import ReactDOM from "react-dom/client";

// data
import clothesData from "../data/clothes_data.json";

// Components and sass
import "../assets/styles.scss";
import Header from "../components/header";
import SectionTwo from "../components/section2";
import SectionThree from "../components/section3";
import Footer from "../components/footer";
import ClothesListWithFilters from "../components/shopWithFilters";

const Page = () => {
  return (
    <>
      <Header />
      <SectionTwo
        textTitleSectionTwo="SHOPING WITHOUT LIMITS"
        textParaSectionTwo="You can choose the best option for you, and it does not matter whether you are in Prague or San Fransisco"
        linkText="SHOW NOW"
        classesSection2="section2-shop-contact-us section2-background-center"
      />

      <ClothesListWithFilters clothesData={clothesData[0]} />
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
