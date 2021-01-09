import firebase from "firebase/app";
import "firebase/auth";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDAUUDbgbJRVNjS1QuexfZdKv1VDcfS5DI",
  authDomain: "onshop-cddcb.firebaseapp.com",
  projectId: "onshop-cddcb",
  storageBucket: "onshop-cddcb.appspot.com",
  messagingSenderId: "624818024932",
  appId: "1:624818024932:web:b75f0125b0e595bd6517f1",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
