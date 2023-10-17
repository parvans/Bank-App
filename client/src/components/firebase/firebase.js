// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCFs778FPIT9JZ3oMGSpMmFKufQ5J908I0",
  authDomain: "bank-13234.firebaseapp.com",
  databaseURL: "https://bank-13234-default-rtdb.firebaseio.com",
  projectId: "bank-13234",
  storageBucket: "bank-13234.appspot.com",
  messagingSenderId: "671632469410",
  appId: "1:671632469410:web:405986d2795f1f6ad2d6fb",
  measurementId: "G-82PQNW0NTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app)

export { auth }