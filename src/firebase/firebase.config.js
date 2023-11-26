// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNBbPY2HqJnLIbQRL-73nOX7rtJpbMUpY",
  authDomain: "assigments-de09b.firebaseapp.com",
  projectId: "assigments-de09b",
  storageBucket: "assigments-de09b.appspot.com",
  messagingSenderId: "872561699033",
  appId: "1:872561699033:web:b88d720aec424ccebb76c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);