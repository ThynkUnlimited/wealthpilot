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

const expenseCollection = () => {

  const user = auth.currentUser

  if (!user) {

    throw new Error("User not authenticated")

  }

  return collection(db, "users", user.uid, "expenses")

}

export function subscribeToExpenses(callback) {

  const q = query(

    expenseCollection(),

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

export async function addExpense(data) {

  await addDoc(

    expenseCollection(),

    {

      ...data,

      amount: Number(data.amount),

      status: "active",

      createdAt: serverTimestamp(),

    }

  )

}

export async function updateExpense(id, data) {

  await updateDoc(

    doc(db, "users", auth.currentUser.uid, "expenses", id),

    data

  )

}

export async function deleteExpense(id) {

  await deleteDoc(

    doc(db, "users", auth.currentUser.uid, "expenses", id)

  )

}