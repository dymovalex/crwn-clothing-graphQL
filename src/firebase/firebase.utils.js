import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDgaYIA-P5HGyvNIic1V0TsRO6Jl0FpLBE",
  authDomain: "crwn-db-71061.firebaseapp.com",
  databaseURL: "https://crwn-db-71061.firebaseio.com",
  projectId: "crwn-db-71061",
  storageBucket: "crwn-db-71061.appspot.com",
  messagingSenderId: "365195629505",
  appId: "1:365195629505:web:65f0e1fc6f215bca7d5540",
  measurementId: "G-4J07PFQ7RZ"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
