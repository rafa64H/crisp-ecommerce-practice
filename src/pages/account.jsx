// Index page
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../services/redux-toolkit/store";

// data
import clothesData from "../data/clothes_data.json";

// Components and sass
import "../assets/styles.scss";
import Header from "../components/header";
import Footer from "../components/footer";
import SectionThree from "../components/section3";
import AccountSettings from "../components/accountSettings";
import LoadingHeader from "../components/loadingHeader";
import LoadingPage from "../components/loadingPage";
import handleLargeScreen from "../utils/handleLargeScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase/config-firebase/firebase";
import { setUser } from "../services/redux-toolkit/auth/authSlice";
import { getDataOfUser } from "../services/firebase/utils/firebaseFunctions";

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

      <AccountSettings clothesData={clothesData[0]} />

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
