// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnxx_YuX6EhgkS-0r8VSlB7q_ZLDsrpAY",
  authDomain: "galawell-alruch.firebaseapp.com",
  projectId: "galawell-alruch",
  storageBucket: "galawell-alruch.appspot.com",
  messagingSenderId: "1063740480367",
  appId: "1:1063740480367:web:7d6762fa512c523a02269a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { fireDB, auth, storage };