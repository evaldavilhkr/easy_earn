// js/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyChG38Jq4soYwSj4qyBje45ZrrD8DcPclk",
  authDomain: "easy-50e2d.firebaseapp.com",
  projectId: "easy-50e2d",
  storageBucket: "easy-50e2d.firebasestorage.app",
  messagingSenderId: "137085905024",
  appId: "1:137085905024:web:2195237879f0d644a35e65",
  measurementId: "G-WT28EDD9N8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);