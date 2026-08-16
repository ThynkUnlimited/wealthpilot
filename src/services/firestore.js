import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore"

import { db, auth } from "../firebase/firebase"

/* -----------------------------
   Income
------------------------------ */

export async function addIncomeToFirestore(income) {

  const user = auth.currentUser

  if (!user) {

    throw new Error("User not logged in")

  }

  await addDoc(

    collection(db, "users", user.uid, "income"),

    {

      ...income,

      amount: Number(income.amount),

      createdAt: serverTimestamp(),

    }

  )

}

/* -----------------------------
   Load Income
------------------------------ */

export async function getIncomeFromFirestore() {

  const user = auth.currentUser

  if (!user) return []

  const q = query(

    collection(db, "users", user.uid, "income"),

    orderBy("createdAt", "desc")

  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map(doc => ({

    id: doc.id,

    ...doc.data(),

  }))

}