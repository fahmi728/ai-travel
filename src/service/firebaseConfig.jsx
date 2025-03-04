// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAz2JA7jnx2z-IZsTdKTyqSLOcr_CUwuxE",
  authDomain: "aitravelplanner-25944.firebaseapp.com",
  projectId: "aitravelplanner-25944",
  storageBucket: "aitravelplanner-25944.firebasestorage.app",
  messagingSenderId: "685051687215",
  appId: "1:685051687215:web:e9e454b8a28c6f84b331da",
  measurementId: "G-JJPXVLTREG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);