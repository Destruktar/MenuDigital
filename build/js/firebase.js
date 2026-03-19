// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAEn8NW8fLQ6FoxEUUnvmcrsEuSTFZwe3E",
    authDomain: "magnolia-carta-digital.firebaseapp.com",
    projectId: "magnolia-carta-digital",
    storageBucket: "magnolia-carta-digital.firebasestorage.app",
    messagingSenderId: "7156148984",
    appId: "1:7156148984:web:713afc69d8b3b614dda90d",
    measurementId: "G-HELP5G60NX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);