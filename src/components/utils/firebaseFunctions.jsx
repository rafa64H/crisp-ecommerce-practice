import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  verifyBeforeUpdateEmail,
  updatePassword,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  Query,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../../config-firebase/firebase';

export async function getDataOfUser() {
  const user = await auth.currentUser;
  const docRef = doc(db, 'users', user.uid);
  const docSnap = await getDoc(docRef);
  const docData = docSnap.data();

  return docData;
}

const usersCollectionRef = collection(db, 'users');

export async function createUser(firstName, lastName, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid } = userCredential.user;
    const currentUser = await auth.currentUser;

    await setDoc(doc(usersCollectionRef, uid), {
      firstName,
      lastName,
      password,
      uid,
      wishlist: [],
      cart: [],
      ordersHistory: [],
      address: {},
      phoneNumber: NaN,
    });

    await sendEmailVerification(currentUser);
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

export async function changeAccountInformation(
  newFirstName,
  newLastName,
  newEmail,
  newPassword,
  oldFirstName,
  oldLastName,
  oldEmail,
  oldPassword
) {
  const currentUser = await auth.currentUser;
  const { uid } = currentUser;

  await setDoc(doc(usersCollectionRef, uid), {
    firstName: newFirstName,
    lastName: newLastName,
    password: newPassword,
  });

  const credential = EmailAuthProvider.credential(
    currentUser.email,
    oldPassword
  );

  await reauthenticateWithCredential(currentUser, credential);

  if (oldEmail !== newEmail) {
    await updateEmail(currentUser, newEmail);
    sendEmailVerification(currentUser);
  }
  if (oldPassword !== newPassword)
    await updatePassword(currentUser, newPassword);

  console.log('sent');
}

export async function changeAccountAddress(
  firstNameAddress,
  lastNameAddress,
  phoneNumber,
  streetAddress,
  country,
  state,
  postalCode
) {
  const currentUser = await auth.currentUser;
  const { uid } = currentUser;

  // await setDoc(doc(usersCollectionRef, uid), {
  //   address: {
  //     firstNameAddress,
  //     lastNameAddress,
  //     phoneNumber,
  //     streetAddress,
  //     country,
  //     state,
  //     postalCode,
  //   },
  // });

  console.log(
    firstNameAddress,
    lastNameAddress,
    phoneNumber,
    streetAddress,
    country,
    state,
    postalCode
  );

  const addressToUpdate = {
    firstNameAddress,
    lastNameAddress,
    phoneNumber,
    streetAddress,
    country,
    state,
    postalCode,
  };

  const userRef = doc(db, 'users', uid);

  await updateDoc(userRef, {
    address: addressToUpdate,
  });

  console.log('sent');
}
