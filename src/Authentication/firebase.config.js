// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT6pVx--dI8DRypMCnimMH1FB7m05PuZ4",
  authDomain: "bloodspring-7db88.firebaseapp.com",
  projectId: "bloodspring-7db88",
  storageBucket: "bloodspring-7db88.appspot.com",
  messagingSenderId: "1071041652148",
  appId: "1:1071041652148:web:dadbd5f30d64caa4f73ee1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
