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
import CreateAccountForm from "../components/createAccountForm";
import LoadingHeader from "../components/loadingHeader";

import handleLargeScreen from "../utils/handleLargeScreen";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../services/redux-toolkit/store";
import LoadingPage from "../components/loadingPage";

const Page = () => {
  const user = useSelector((store) => store.auth.user);
  const isLargeScreen = useSelector(
    (store) => store.isLargeScreen.isLargeScreen
  );
  const dispatch = useDispatch();

  useEffect(() => {
    handleLargeScreen();
  }, []);

  if (
    user.uid !== null &&
    window.location.pathname !== "/create-account.html"
  ) {
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
      <Header></Header>
      <CreateAccountForm />

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
