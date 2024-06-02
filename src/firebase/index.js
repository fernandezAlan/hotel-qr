// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWmUAHyE3l7ruFVbR4a9ij202q2oo-1NA",
  authDomain: "qr-hotel-66353.firebaseapp.com",
  projectId: "qr-hotel-66353",
  storageBucket: "qr-hotel-66353.appspot.com",
  messagingSenderId: "743915222163",
  appId: "1:743915222163:web:6fd738fa8c8788f1ae8966",
  measurementId: "G-ECTNJSF316"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
//const analytics = getAnalytics(app);