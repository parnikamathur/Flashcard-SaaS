// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1F2iP_C8hMOnEOa1EQI_LGvhES8lX74k",
  authDomain: "flashcard-saas-96f11.firebaseapp.com",
  databaseURL: "https://flashcard-saas-96f11-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "flashcard-saas-96f11",
  storageBucket: "flashcard-saas-96f11.appspot.com",
  messagingSenderId: "724695739836",
  appId: "1:724695739836:web:f19067c70f6334f30d8fb9",
  measurementId: "G-B6VWE292JH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics
let analytics;
isSupported().then(supported => {
  if (supported) {
    analytics = getAnalytics(app);
  }
}).catch(error => {
  console.error("Error initializing analytics:", error);
});

export { db, analytics };
