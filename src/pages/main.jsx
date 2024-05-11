import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";

// Components and sass
import "../assets/styles.scss";
import Header from "../components/header";
import SectionOne from "../components/section1";
import SectionTwo from "../components/section2";
import BrandSection from "../components/brandSection";
import SectionThree from "../components/section3";
import Footer from "../components/footer";
import ProductSlider from "../components/productSlider";
import handleLargeScreen from "../utils/handleLargeScreen";
// Images
import womanHomeOne from "../assets/home/woman-home2.png";
import womanHomeTwo from "../assets/home/woman-home1.png";

// Data
import brandsData from "../data/brands.json";
import LoadingHeader from "../components/loadingHeader";
import LoadingPage from "../components/loadingPage";
import { store } from "../services/redux-toolkit/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase/config-firebase/firebase";
import {
  initialState,
  setUser,
} from "../services/redux-toolkit/auth/authSlice";
import { getDataOfUser } from "../services/firebase/utils/firebaseFunctions";

const Page = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const user = useSelector((store) => store.auth.user);
  const isLargeScreen = useSelector(
    (store) => store.isLargeScreen.isLargeScreen
  );
  const dispatch = useDispatch();

  useEffect(() => {
    handleLargeScreen();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        getDataOfUser().then((userInfo) => {
          store.dispatch(setUser(userInfo));
          return userInfo;
        });
      } else {
        store.dispatch(setUser({ uid: false }));
      }
    });
  }, []);

  if (user.uid === null) {
    return (
      <>
        <LoadingHeader />
        <LoadingPage></LoadingPage>
        <Footer></Footer>
      </>
    );
  }

  return (
    <>
      <Header />
      <SectionOne
        classesSectionOne="section1 section1-background1"
        h1Texts={[
          "GET 30% DISCOUNT",
          "CHOOSE YOUR LOOK",
          "SHOPING WITHOUT LIMITS",
          "EXLORE THE BEST OF YOU",
        ]}
        links={[
          ["SHOP NOW", "./shop.html"],
          ["SHOP NOW", "./shop.html"],
          ["SHOP NOW", "./shop.html"],
          ["SHOP NOW", "./shop.html"],
        ]}
        pairSrcImgs={[
          [womanHomeOne, womanHomeTwo],
          [womanHomeTwo, womanHomeOne],
          [womanHomeOne, womanHomeTwo],
          [womanHomeTwo, womanHomeOne],
        ]}
      />

      <BrandSection brandsTitle="Choose your brand" brandsObject={brandsData} />

      <section className="grid-section2">
        <SectionTwo
          textTitleSectionTwo="CHOOSE YOUR LOOK"
          textParaSectionTwo="See our clothing collections"
          showLink
          linkText="SEE OFFERS"
          linkHref="./shop.html"
          classesSection2="section2-home1 section2-background-left grid-section2-item1"
        />
        <SectionTwo
          textTitleSectionTwo="UP TO 40% OFF"
          textParaSectionTwo="Special offers and great deals"
          showLink
          linkText="SHOP NOW"
          linkHref="./shop.html"
          classesSection2="section2-home2 section2-background-right grid-section2-item2"
        />
        <SectionTwo
          textTitleSectionTwo="BRAND NEW STYLE"
          textParaSectionTwo="Popular clothing brands"
          showLink
          linkText="SEE OFFERS"
          linkHref="./shop.html"
          classesSection2="section2-home3 section2-background-right grid-section2-item3"
        />
      </section>
      <SectionTwo
        textTitleSectionTwo="SHOPING WITHOUT LIMITS"
        textParaSectionTwo="Choose the best option for you, and it does not matter whether you are"
        showLink
        linkText="SHOW NOW"
        linkHref="./shop.html"
        classesSection2="section2-home4 section2-background-right"
      />
      <SectionTwo
        textTitleSectionTwo="EXLORE THE BEST OF YOU"
        textParaSectionTwo="You can choose the best option for you, and it does not matter whether you are in Prague or San Fransisco"
        showLink
        linkText="SHOW NOW"
        linkHref="./shop.html"
        classesSection2="section2-home5 section2-background-center"
      />

      <ProductSlider title="Our products:" />
      <SectionThree />
      <Footer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Page></Page>
    </Provider>
  </React.StrictMode>
);
