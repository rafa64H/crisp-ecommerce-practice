import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
            }
            ordersHistory: {
                
            }
            wishlist: {

            }
        }
    }
}