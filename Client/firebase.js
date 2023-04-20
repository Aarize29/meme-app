
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import {getDatabase} from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDQ3O3uTZ0a19UKijC-BIw1fGHrhiS-rGQ",
  authDomain: "memeapp-598db.firebaseapp.com",
  projectId: "memeapp-598db",
  storageBucket: "memeapp-598db.appspot.com",
  messagingSenderId: "897226387484",
  appId: "1:897226387484:web:971e87eb51882f73ceafd9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
