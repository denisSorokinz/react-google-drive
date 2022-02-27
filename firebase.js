// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQa_1S0nDaAN-kjeGGD6CfvG0sNyrQ7kA",
  authDomain: "react--drive-9ad20.firebaseapp.com",
  projectId: "react--drive-9ad20",
  storageBucket: "react--drive-9ad20.appspot.com",
  messagingSenderId: "725585958084",
  appId: "1:725585958084:web:fcb4effd35da94938a6591",
};

// Initialize Firebase
const app = firebase.apps[0] ?? firebase.initializeApp(firebaseConfig);

const firestore = app.firestore();

export { firestore };
