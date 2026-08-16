import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDIperY8u34-6o3QeYCkNcT32kwKPYztN8",
  authDomain: "wealthpilot-c0baa.firebaseapp.com",
  databaseURL: "https://wealthpilot-c0baa-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wealthpilot-c0baa",
  storageBucket: "wealthpilot-c0baa.firebasestorage.app",
  messagingSenderId: "205894008726",
  appId: "1:205894008726:web:62d53e18ecdc91ed7be7b7",
  measurementId: "G-NQ9E2DLK0K",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

export default app