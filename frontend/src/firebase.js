// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfODmm2QCb5vxk69YYs3qWktgijqu8xqM",
  authDomain: "fingertrax-df67d.firebaseapp.com",
  projectId: "fingertrax-df67d",
  storageBucket: "fingertrax-df67d.appspot.com",
  messagingSenderId: "978768727601",
  appId: "1:978768727601:web:ba567aec083218bf634f10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireDb = getDatabase(app);

