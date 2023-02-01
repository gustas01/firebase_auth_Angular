// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_hQoKR4KBXAWVWlKmANvsrDQBFfvwzOE",
  authDomain: "fir-auth-angular-82364.firebaseapp.com",
  projectId: "fir-auth-angular-82364",
  storageBucket: "fir-auth-angular-82364.appspot.com",
  messagingSenderId: "796654257796",
  appId: "1:796654257796:web:92600922bf3d593603e4d1",
  measurementId: "G-97ZBT4R1DF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
auth.useDeviceLanguage()

const db = getFirestore(app)

export {auth, db}
