import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore"

import { auth, db } from "../firebase/firebase"

const incomeCollection = () => {

  const user = auth.currentUser

  if (!user) {

    throw new Error("User not authenticated")

  }

  return collection(db, "users", user.uid, "income")

}

/* --------------------------
   Listen for changes
--------------------------- */

export function subscribeToIncome(callback) {

  const q = query(

    incomeCollection(),

    orderBy("createdAt", "desc")

  )

  return onSnapshot(q, (snapshot) => {

    callback(

      snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data(),

      }))

    )

  })

}

/* --------------------------
   Add
--------------------------- */

export async function addIncome(data) {

  await addDoc(

    incomeCollection(),

    {

      ...data,

      amount: Number(data.amount),

      status: "active",

      createdAt: serverTimestamp(),

    }

  )

}

/* --------------------------
   Update
--------------------------- */

export async function updateIncome(id, data) {

  await updateDoc(

    doc(db, "users", auth.currentUser.uid, "income", id),

    data

  )

}

/* --------------------------
   Delete
--------------------------- */

export async function deleteIncome(id) {

  await deleteDoc(

    doc(db, "users", auth.currentUser.uid, "income", id)

  )

}