// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

// Your web app's Firebase configuration
//Kartoshka
const firebaseConfig = {
  apiKey: "AIzaSyBBmE-9anUdaId29Cc9eTuG_GuQJsHdrAk",
  authDomain: "my-yt-clone-project-60232.firebaseapp.com",
  projectId: "my-yt-clone-project-60232",
  storageBucket: "my-yt-clone-project-60232.appspot.com",
  messagingSenderId: "464309693659",
  appId: "1:464309693659:web:4a3ee734dde9281d7d70fe",
  measurementId: "G-NNJT923MEW"
};

// Initialize Firebase App (modular SDK)
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Firestore for Database
const db = getFirestore(app);

// Firebase Auth for authentication
const auth = getAuth(app);

export { app, analytics, db, auth,onAuthStateChanged };
export type { User };