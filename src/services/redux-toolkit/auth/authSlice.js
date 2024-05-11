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
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
