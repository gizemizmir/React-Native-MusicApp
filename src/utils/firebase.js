// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQnNcsp5P8a-YKUvyG5r3urSd0OC7qz3s",
  authDomain: "musicapp-assignment-5.firebaseapp.com",
  projectId: "musicapp-assignment-5",
  storageBucket: "musicapp-assignment-5.appspot.com",
  messagingSenderId: "913416643777",
  appId: "1:913416643777:web:992821a41d70da6b566040",
  measurementId: "G-DZLFNJBWYL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
