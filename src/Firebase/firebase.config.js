// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdvfDwohdBt1aTYPn_q_uFUhG7e0ib7vs",
    authDomain: "task-magnet-hub.firebaseapp.com",
    projectId: "task-magnet-hub",
    storageBucket: "task-magnet-hub.appspot.com",
    messagingSenderId: "882983296817",
    appId: "1:882983296817:web:f7213b99d775ec50ccda10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;