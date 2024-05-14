// Index page
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

// data
import clothesData from "../data/clothes_data.json";

// Components and sass
import "../assets/styles.scss";
import Header from "../components/header";
import Footer from "../components/footer";
import SectionThree from "../components/section3";
import SectionTwo from "../components/section2";
import ContactPage from "../components/contactPage";
import { useDispatch, useSelector } from "react-redux";
import handleLargeScreen from "../utils/handleLargeScreen";
import { store } from "../services/redux-toolkit/store";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "../services/redux-toolkit/auth/authSlice";
import { getDataOfUser } from "../services/firebase/utils/firebaseFunctions";
import { auth } from "../services/firebase/config-firebase/firebase";
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
        textTitleSectionTwo="Contact us"
        textParaSectionTwo="You can contact us to ask any question to us"
        classesSection2="section2-shop-contact-us section2-background-center"
      />

      <ContactPage />

      <SectionThree />

      <Footer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Page />
    </Provider>
  </React.StrictMode>
);
