import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQa_1S0nDaAN-kjeGGD6CfvG0sNyrQ7kA",
  authDomain: "react--drive-9ad20.firebaseapp.com",
  projectId: "react--drive-9ad20",
  storageBucket: "react--drive-9ad20.appspot.com",
  messagingSenderId: "725585958084",
  appId: "1:725585958084:web:fcb4effd35da94938a6591",
};

if (!firebase.apps[0]) firebase.initializeApp(firebaseConfig);

const firebaseAuth = firebase.auth();
const firebaseFirestore = firebase.firestore();

export { firebase, firebaseAuth, firebaseFirestore };
