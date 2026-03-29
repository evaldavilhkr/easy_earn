import { auth, db } from "./firebase.js";
import { doc, getDoc } from "firebase/firestore";

export async function showBalance(containerId) {
  auth.onAuthStateChanged(async (user) => {
    if(user) {
      const docSnap = await getDoc(doc(db, "users", user.uid));
      document.getElementById(containerId).innerText = docSnap.data().balance + " Tk";
    }
  });
}