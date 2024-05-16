import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  collection,
  query,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { auth, db, storage } from "../config-firebase/firebase";

export async function getDataOfUser() {
  const user = await auth.currentUser;
  const docUserRef = doc(db, "users", user.uid);
  const mainUserSnap = await getDoc(docUserRef);
  const mainUserData = mainUserSnap.data();

  const otherInfoRef = collection(docUserRef, "otherInfo");

  const addressRef = doc(otherInfoRef, "address");
  const ordersHistoryRef = doc(otherInfoRef, "ordersHistory");
  const wishlistRef = doc(otherInfoRef, "wishlist");
  const postsRef = doc(otherInfoRef, "posts");

  const addressSnap = await getDoc(addressRef);
  const ordersHistorySnap = await getDoc(ordersHistoryRef);
  const wishlistSnap = await getDoc(wishlistRef);
  const postsSnap = await getDoc(postsRef);
  const addressData = addressSnap.data();
  const ordersHistoryData = ordersHistorySnap.data();
  const wishlistData = wishlistSnap.data();
  const postsData = postsSnap.data();

  let emailVerified = false;

  if (user.emailVerified) {
    emailVerified = true;
  }

  const userDataForReduxState = {
    uid: mainUserData.uid,
    phoneNumber: mainUserData.phoneNumber,
    firstName: mainUserData.firstName,
    lastName: mainUserData.lastName,
    email: mainUserData.email,
    password: mainUserData.password,
    cart: mainUserData.cart,
    emailVerified: emailVerified,
    firestoreData: {
      address: addressData.address,
      ordersHistory: ordersHistoryData.ordersHistory,
      wishlist: wishlistData.wishlist,
      posts: postsData.posts,
    },
  };

  return userDataForReduxState;
}

export async function getPostsOfUser() {
  const user = await auth.currentUser;
  const docRef = doc(db, "communityPosts", user.uid);
  const docSnap = await getDoc(docRef);
  const docData = docSnap.data();

  return docData.posts;
}

export async function sendEmailVerificationToUser() {
  const user = await auth.currentUser;

  sendEmailVerification(user);
  console.log("hola");
}

export async function createUser(firstName, lastName, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid } = userCredential.user;
    const currentUser = await auth.currentUser;

    const communityPostsUserDocRef = doc(db, "communityPosts", uid);
    const userRef = doc(db, "users", uid);

    await setDoc(userRef, {
      firstName,
      lastName,
      password,
      uid,
      cart: [],
      phoneNumber: NaN,
    });

    const otherInfoCollectionRef = collection(userRef, "otherInfo");
    const addressDocRef = doc(otherInfoCollectionRef, "address");
    const ordersHistoryDocRef = doc(otherInfoCollectionRef, "ordersHistory");
    const wishlistDocRef = doc(otherInfoCollectionRef, "wishlist");
    const postsDocRef = doc(otherInfoCollectionRef, "posts");

    await setDoc(addressDocRef, {
      address: {
        firstNameAddress: null,
        lastNameAddress: null,
        phoneNumber: null,
        streetAddress: null,
        country: null,
        state: null,
        postalCode: null,
      },
    });

    await setDoc(ordersHistoryDocRef, {
      ordersHistory: [],
    });

    await setDoc(wishlistDocRef, {
      wishlist: [],
    });
    await setDoc(postsDocRef, {
      posts: [],
    });
    await setDoc(communityPostsUserDocRef, {
      posts: [],
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

  const userDocRef = doc(db, "users", uid);

  await updateDoc(userDocRef, {
    firstName: newFirstName,
    lastName: newLastName,
  });

  if (oldEmail !== newEmail) {
    await updateEmail(currentUser, newEmail);
    sendEmailVerification(currentUser);
    await updateDoc(userDocRef, {
      email: newEmail,
    });
  }
  if (oldPassword !== newPassword) {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      oldPassword
    );

    await reauthenticateWithCredential(currentUser, credential);

    await updatePassword(currentUser, newPassword);

    await updateDoc(userDocRef, {
      password: newPassword,
    });
  }

  console.log("sent");
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

  const userAddressRef = doc(db, "users", uid, "otherInfo", "address");

  const addressToUpdate = {
    firstNameAddress,
    lastNameAddress,
    phoneNumber,
    streetAddress,
    country,
    state,
    postalCode,
  };

  await updateDoc(userAddressRef, { address: addressToUpdate });

  console.log("sent");
}

export async function logOutUser() {
  await signOut(auth);
}

export async function updateCart(cartToUpdate) {
  const currentUser = await auth.currentUser;
  const { uid } = currentUser;

  const userRef = doc(db, "users", uid);
  console.log(cartToUpdate);

  updateDoc(userRef, { cart: cartToUpdate });

  console.log("sent");
}

export async function updateWishlist(wishlistToUpdate) {
  const currentUser = await auth.currentUser;
  const { uid } = currentUser;

  const wishlistRef = doc(db, "users", uid, "otherInfo", "wishlist");

  updateDoc(wishlistRef, { wishlist: wishlistToUpdate });

  console.log("sent wishlist");
}

export async function updateOrdersHistory(ordersHistoryToUpdate) {
  const currentUser = await auth.currentUser;
  const { uid } = currentUser;

  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, {
    ordersHistory: ordersHistoryToUpdate,
  });

  console.log("sent history of orders");
}

export async function updateUsersPosts(usersPostsToUpdate) {
  const currentUser = await auth.currentUser;
  const { uid } = currentUser;

  const userRef = doc(db, "communityPosts", uid);

  await updateDoc(userRef, {
    posts: usersPostsToUpdate,
  });

  console.log("sent communityPosts");
}

export async function createPost(
  postImgFile,
  postTitle,
  postText,
  postSecond,
  postMinute,
  postHour,
  postDay,
  postMonth,
  postYear
) {
  const user = await auth.currentUser;

  if (postImgFile) {
    const imageStringForRef = `communityPostsImgs/${postTitle}/${
      postImgFile.name + uuidv4()
    }`;

    const imageRef = ref(storage, imageStringForRef);

    await uploadBytes(imageRef, postImgFile).then(() => {
      console.log("uploaded image");
    });

    const getImageUrl = await getDownloadURL(imageRef);

    const imageUrl = (await getImageUrl).toString();

    const posts = await getPostsOfUser();
    const newPostsArray = [
      ...posts,
      {
        postImg: imageUrl,
        postImgRef: imageStringForRef,
        postTitle,
        postText,
        postComments: [],
        postId: uuidv4(),
        likes: [],
        dislikes: [],
        uid: user.uid,
        postSecond,
        postMinute,
        postHour,
        postDay,
        postMonth,
        postYear,
      },
    ];
    await updateUsersPosts(newPostsArray);
  } else {
    const posts = await getPostsOfUser();
    const newPostsArray = [
      ...posts,
      {
        postImg: null,
        postTitle,
        postText,
        postComments: [],
        postId: uuidv4(),
        likes: [],
        dislikes: [],
        uid: user.uid,
        postSecond,
        postMinute,
        postHour,
        postDay,
        postMonth,
        postYear,
      },
    ];
    await updateUsersPosts(newPostsArray);
  }
}

export async function getCommunityPosts() {
  const queryCommunityPosts = query(collection(db, "communityPosts"));
  const communityPostsSnapshot = await getDocs(queryCommunityPosts);

  const communityPostsArray = [];

  communityPostsSnapshot.forEach((doc) => {
    const docPosts = doc.data().posts;
    communityPostsArray.push(...docPosts);
  });

  const compareDates = (a, b) => {
    const dateA = new Date(
      a.postYear,
      a.postMonth - 1,
      a.postDay,
      a.postHour,
      a.postMinute,
      a.postSecond
    );
    const dateB = new Date(
      b.postYear,
      b.postMonth - 1,
      b.postDay,
      b.postHour,
      b.postMinute,
      b.postSecond
    );

    return dateB - dateA;
  };

  communityPostsArray.sort(compareDates);

  return communityPostsArray;
}

export async function updateSpecifiedPost(passedPostData) {
  const postsOfPosterRef = doc(db, "communityPosts", passedPostData.uid);
  const docSnap = await getDoc(postsOfPosterRef);
  const postsOfPosterData = docSnap.data().posts;

  const editPost = postsOfPosterData.filter(
    (post) => post.postId !== passedPostData.postId
  );

  console.log(passedPostData);

  await updateDoc(postsOfPosterRef, {
    posts: [...editPost, passedPostData],
  });

  console.log("sent post");
}

export async function deleteImageOfPost(passedPostData) {
  const imgRefCurrent = ref(storage, passedPostData.postImgRef);

  deleteObject(imgRefCurrent)
    .then(() => {
      console.log("Deleted current image");
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function uploadImageOfPostToStorage(
  file,
  passedImageStringForRef
) {
  const imageRefToUpload = ref(storage, passedImageStringForRef);

  await uploadBytes(imageRefToUpload, file).then(() => {
    console.log("uploaded new image");
  });

  const getUploadedImageUrl = await getDownloadURL(imageRefToUpload);

  const uploadedImageUrl = (await getUploadedImageUrl).toString();

  return uploadedImageUrl;
}
