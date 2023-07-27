// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1aPmkJr448WJ2Cw6PDiPyRg_qKPP5mP8",
  authDomain: "ersgop01.firebaseapp.com",
  projectId: "ersgop01",
  storageBucket: "ersgop01.appspot.com",
  messagingSenderId: "73772731192",
  appId: "1:73772731192:web:56f044f8305980a2e98fcd",
  measurementId: "G-D3S2CEX7FZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);