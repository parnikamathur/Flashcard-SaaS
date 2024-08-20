// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAgbkTWCa_ULzTfz5xmEPs7M3m7HhXHD8",
  authDomain: "flashcardsaas-1eb43.firebaseapp.com",
  projectId: "flashcardsaas-1eb43",
  storageBucket: "flashcardsaas-1eb43.appspot.com",
  messagingSenderId: "672873918086",
  appId: "1:672873918086:web:e818720826b4a9a33cab07",
  measurementId: "G-XH7R0LWPW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);