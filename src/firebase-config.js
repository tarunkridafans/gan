import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCD8yiPhO84JfzSgm7q844VpFn3p9VF7s",
  authDomain: "ganesh-529a8.firebaseapp.com",
  projectId: "ganesh-529a8",
  storageBucket: "ganesh-529a8.appspot.com",
  messagingSenderId: "213273986891",
  appId: "1:213273986891:web:6ced42869a79b5ddd84ace",
  measurementId: "G-VHYD6SWKFJ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
