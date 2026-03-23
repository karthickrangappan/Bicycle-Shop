import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCurZWTZAUl7WgBZe1ahmlgmm2sCJ9rfwA",
  authDomain: "bicycle-ea2d9.firebaseapp.com",
  projectId: "bicycle-ea2d9",
  storageBucket: "bicycle-ea2d9.firebasestorage.app",
  messagingSenderId: "363053122030",
  appId: "1:363053122030:web:990221fccbc8931d8aceff",
  measurementId: "G-ND22NCRLGS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);