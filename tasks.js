import { db, storage } from "./firebase.js";
import { collection, getDocs, addDoc, doc, updateDoc, increment } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Fetch all active tasks
export async function fetchTasks(containerId) {
  const snapshot = await getDocs(collection(db, "tasks"));
  snapshot.forEach(docItem => {
    const task = docItem.data();
    if(task.status === "active") {
      document.getElementById(containerId).innerHTML += `
        <div>
          <h3>${task.title}</h3>
          <p>Reward: ${task.reward} Tk</p>
          <a href="submit.html?id=${docItem.id}">Submit Task</a>
        </div>
      `;
    }
  });
}

// Admin: Add Task
export async function addTask(title, reward) {
  await addDoc(collection(db, "tasks"), { title, reward: Number(reward), status: "active" });
  alert("Task Added!");
}

// Submit Task with screenshot
export async function submitTask(taskId, postLink, file, userId) {
  const storageRef = ref(storage, "proofs/" + file.name);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  await addDoc(collection(db, "submissions"), {
    taskId,
    postLink,
    proof: url,
    userId,
    status: "pending"
  });
  alert("Task Submitted!");
}

// Admin: Approve Submission
export async function approveSubmission(subId, reward, userId) {
  await updateDoc(doc(db, "submissions", subId), { status: "approved" });
  await updateDoc(doc(db, "users", userId), { balance: increment(reward) });
}