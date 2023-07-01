import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  Query,
  getDocs,
  doc,
  setDoc,
} from 'firebase/firestore';
import { auth, db } from '../../config-firebase/firebase';

const usersCollectionRef = collection(db, 'users');

export async function createUser(firstName, lastName, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid } = userCredential.user;

    await setDoc(doc(usersCollectionRef, uid), {
      firstName,
      lastName,
      uid,
      wishlist: [],
      cart: [],
      ordersHistory: [],
    });
  } catch (err) {
    console.error(err);
  }
}

export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  } catch (err) {
    return err.message;
  }
}
