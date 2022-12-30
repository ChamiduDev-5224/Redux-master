import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDY9ExH68-9s0DdkKfmpSVSGBlYMCSTroc",
  authDomain: "welocome-project.firebaseapp.com",
  projectId: "welocome-project",
  storageBucket: "welocome-project.appspot.com",
  messagingSenderId: "59152098429",
  appId: "1:59152098429:web:6c803221f0a57cc5967d14",
  measurementId: "G-WZFMBW2W49",
};
const app = initializeApp(firebaseConfig);
export const connection = getFirestore(app);
export const auth = getAuth(app);
