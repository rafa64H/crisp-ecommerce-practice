// Index page
import React from "react";
import ReactDOM from "react-dom/client";

// data
import clothesData from "../data/clothes_data.json";

// Components and sass
import "../assets/styles.scss";
import Header from "../components/header";
import Footer from "../components/footer";
import SectionThree from "../components/section3";
import AccountSettings from "../components/accountSettings";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header />

    <AccountSettings clothesData={clothesData[0]} />

    <SectionThree />
    <Footer />
  </React.StrictMode>
);
