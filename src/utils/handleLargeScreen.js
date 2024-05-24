import { store } from "../services/redux-toolkit/store";

import { setIsLargeScreen } from "../services/redux-toolkit/large-screen/largeScreenSlice";

function handleLargeScreen() {
  const mediaQuery = window.matchMedia("(min-width: 1200px)");

  if (mediaQuery.matches) {
    store.dispatch(setIsLargeScreen(true));
  } else {
    store.dispatch(setIsLargeScreen(false));
  }

  const handleMediaQueryChange = (event) => {
    store.dispatch(setIsLargeScreen(event.matches));
  };

  mediaQuery.addEventListener("change", handleMediaQueryChange);

  return () => {
    mediaQuery.removeEventListener("change", handleMediaQueryChange);
  };
}

export default handleLargeScreen;
