// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVhfYrRuNkayNWroF1gEl0ceWM4d8nKDw",
  authDomain: "mern-estate-ac36a.firebaseapp.com",
  projectId: "mern-estate-ac36a",
  storageBucket: "mern-estate-ac36a.appspot.com",
  messagingSenderId: "913654435804",
  appId: "1:913654435804:web:e20fa3aa2b5b357d184919"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);