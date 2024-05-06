// The filename should be named "firebase.js" and should be like this

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "Placeholder",
  authDomain: "Placeholder",
  projectId: "Placeholder",
  storageBucket: "Placeholder",
  messagingSenderId: "Placeholder",
  appId: "Placeholder",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
