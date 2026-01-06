// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyOskN5f0SG-0XmdV6IS54hu1bIEBpzyA",
  authDomain: "loveapp-f52ac.firebaseapp.com",
  projectId: "loveapp-f52ac",
  storageBucket: "loveapp-f52ac.firebasestorage.app",
  messagingSenderId: "275695565842",
  appId: "1:275695565842:web:c9d2a4a7781289e56c2ccb",
  measurementId: "G-8LQ6GZHTXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);