import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Register
export async function register(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", userCredential.user.uid), { balance: 0 });
    alert("Account Created!");
    window.location = "dashboard.html";
  } catch (err) {
    alert(err.message);
  }
}

// Login
export async function login(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location = "dashboard.html";
  } catch (err) {
    alert(err.message);
  }
}