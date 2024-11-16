import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "eccomerce-multimedia.firebaseapp.com",
  projectId: "eccomerce-multimedia",
  storageBucket: "eccomerce-multimedia.firebasestorage.app",
  messagingSenderId: "1012716422058",
  appId: "1:1012716422058:web:be9e1cd67d9875e5a461d3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
