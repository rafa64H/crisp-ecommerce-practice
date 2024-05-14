import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: {
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    emailVerified: null,
    firestoreData: {
      uid: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      address: {
        adressFirstName: null,
        adressLastName: null,
        phoneNumber: null,
        streetAddress: null,
        country: null,
        state: null,
        postalCode: null,
      },
      ordersHistory: [],
      wishlist: [],
    },
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCart: (state, action) => {
      state.user.cart = action.payload;
    },
    setWishlist: (state, action) => {
      state.user.firestoreData.wishlist = action.payload;
    },
  },
});

export const { setUser, setCart, setWishlist } = authSlice.actions;

export default authSlice.reducer;
