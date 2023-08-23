// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCYPfeYDlDLaZ17ZKzwbMTAR9u6-6iNcAk",
  authDomain: "e-shopping-b7870.firebaseapp.com",
  projectId: "e-shopping-b7870",
  storageBucket: "e-shopping-b7870.appspot.com",
  messagingSenderId: "717217679255",
  appId: "1:717217679255:web:32f9341784457ed2bd66d2",
  measurementId: "G-MBX92KSLT2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const fireDB = getFirestore(app);
const auth =  getAuth(app);

export {fireDB, auth }
