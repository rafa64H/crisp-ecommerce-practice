// Index page
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import BuyClothesComponent from "../components/buyClothesComponent";
import SectionThree from "../components/section3";
import Footer from "../components/footer";

import "../assets/styles.scss";
import { useDispatch, useSelector } from "react-redux";
import handleLargeScreen from "../utils/handleLargeScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase/config-firebase/firebase";
import { getDataOfUser } from "../services/firebase/utils/firebaseFunctions";
import { setUser } from "../services/redux-toolkit/auth/authSlice";
import { store } from "../services/redux-toolkit/store";
import LoadingHeader from "../components/loadingHeader";
import LoadingPage from "../components/loadingPage";
import Header from "../components/header";

const Page = () => {
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
