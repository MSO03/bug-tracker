// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUFGV0uBPAozCOCTLy8NT4pLUqSo_xEFs",
  authDomain: "bugtracker-ceaa0.firebaseapp.com",
  projectId: "bugtracker-ceaa0",
  storageBucket: "bugtracker-ceaa0.appspot.com",
  messagingSenderId: "928705069135",
  appId: "1:928705069135:web:e22a3802751bad6e252a3a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
