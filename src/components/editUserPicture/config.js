// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcFju7xOjbyjN25A7TQ3lQivhz8ZdG5P8",
  authDomain: "fypimage-7a140.firebaseapp.com",
  projectId: "fypimage-7a140",
  storageBucket: "fypimage-7a140.appspot.com",
  messagingSenderId: "246536601632",
  appId: "1:246536601632:web:263a70ff2053ff20563c45",
  measurementId: "G-R8ZB8SYVE8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db  = getFirestore(app);
export const storage = getStorage(app)
// export {db, storage}