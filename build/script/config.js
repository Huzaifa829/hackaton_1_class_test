import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBYJGY25uDD0-6_w7iR4qXcby9mLaZsNdE",
  authDomain: "hackatonclasstest1.firebaseapp.com",
  projectId: "hackatonclasstest1",
  storageBucket: "hackatonclasstest1.appspot.com",
  messagingSenderId: "591409223689",
  appId: "1:591409223689:web:351ae55d6553512e7140d8",
  measurementId: "G-CF39387F6P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);