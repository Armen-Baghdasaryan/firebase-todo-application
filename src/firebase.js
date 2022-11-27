import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_KEY,
  apiKey: "AIzaSyCwr79UWBqeqVZUD2OF1_GrdgSUmscmPYk",
  authDomain: "fir-todo-app-94340.firebaseapp.com",
  projectId: "fir-todo-app-94340",
  storageBucket: "fir-todo-app-94340.appspot.com",
  messagingSenderId: "275826960820",
  appId: "1:275826960820:web:01a15850c7a643e61deae1",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
