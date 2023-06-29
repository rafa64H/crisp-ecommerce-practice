// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB6VDV6UyLnvQL-k2dsR0DdU0GeD6X3RTY',
  authDomain: 'crisp-ecommerce-developm-4e4a7.firebaseapp.com',
  projectId: 'crisp-ecommerce-developm-4e4a7',
  storageBucket: 'crisp-ecommerce-developm-4e4a7.appspot.com',
  messagingSenderId: '968865285142',
  appId: '1:968865285142:web:97eb70e8e45f0b6d3b2137',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
