// Index page
import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import handleLargeScreen from "../utils/handleLargeScreen";
import { onAuthStateChanged } from "firebase/auth";
import { getDataOfUser } from "../services/firebase/utils/firebaseFunctions";
import { setUser } from "../services/redux-toolkit/auth/authSlice";
import { auth } from "../services/firebase/config-firebase/firebase";
import { store } from "../services/redux-toolkit/store";
import LoadingHeader from "../components/loadingHeader";
import LoadingPage from "../components/loadingPage";
import { Provider } from "react-redux";

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
    <Provider store={store}>
      <Page></Page>
    </Provider>
  </React.StrictMode>
);
