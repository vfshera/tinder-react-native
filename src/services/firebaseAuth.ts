import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMZAyHT4He2bzB9PnrZT3t1aQHTX8lAjs",
  authDomain: "rntndr.firebaseapp.com",
  projectId: "rntndr",
  storageBucket: "rntndr.appspot.com",
  messagingSenderId: "1098769377953",
  appId: "1:1098769377953:web:601806d46c26cdf448dee0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
