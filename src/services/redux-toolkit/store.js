import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import isLargeScreenReducer from "./large-screen/largeScreenSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    isLargeScreen: isLargeScreenReducer,
  },
});
