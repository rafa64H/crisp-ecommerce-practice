import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLargeScreen: null,
};

const isLargeScreenSlice = createSlice({
  name: "isLargeScreen",
  initialState,
  reducers: {
    setIsLargeScreen: (state, action) => {
      state.isLargeScreen = action.payload;
    },
  },
});

export const { setIsLargeScreen } = isLargeScreenSlice.actions;

export default isLargeScreenSlice.reducer;
