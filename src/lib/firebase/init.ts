// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyRJOv6KEm5IzTCG6YTAv_UQsnNRO0qWM",
  authDomain: "my-next-router-app-621e7.firebaseapp.com",
  projectId: "my-next-router-app-621e7",
  storageBucket: "my-next-router-app-621e7.appspot.com",
  messagingSenderId: "738703340193",
  appId: "1:738703340193:web:458d3322b08c5a9e5476e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;