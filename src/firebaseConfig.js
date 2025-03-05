
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "placeholder",
  authDomain: "placeholder",
  projectId: "placeholder",
  storageBucket: "placeholder",
  messagingSenderId: "placeholder",
  appId: "placeholder",
  measurementId: "placeholder"
};


export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
// export const storage = getStorage(app);