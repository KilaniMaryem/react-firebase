
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBDKM8wb2y1gUUM1CTqFeQZGJnv8Ec8nr0",
  authDomain: "fir-frontend-153d4.firebaseapp.com",
  projectId: "fir-frontend-153d4",
  storageBucket: "fir-frontend-153d4.firebasestorage.app",
  messagingSenderId: "353756647612",
  appId: "1:353756647612:web:38b54286c709b5df2dc0b9",
  measurementId: "G-V96MRE7END"
};


export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);