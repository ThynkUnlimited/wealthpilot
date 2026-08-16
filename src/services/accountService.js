import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore"

import { auth, db } from "../firebase/firebase"


/* =========================================
   USER ACCOUNTS
========================================= */

const accountsCollection = () => {

  const user = auth.currentUser

  if (!user) {
    throw new Error("User not authenticated")
  }

  return collection(
    db,
    "users",
    user.uid,
    "accounts"
  )

}


/* =========================================
   SUBSCRIBE TO ACCOUNTS
========================================= */

export function subscribeToAccounts(callback) {

  const user = auth.currentUser

  if (!user) {
    return () => {}
  }

  const q = query(
    accountsCollection(),
    where("userId", "==", user.uid)
  )

  return onSnapshot(q, (snapshot) => {

    callback(

      snapshot.docs.map((snapshotDoc) => ({

        id: snapshotDoc.id,

        ...snapshotDoc.data(),

      }))

    )

  })

}


/* =========================================
   CREATE ACCOUNT
========================================= */

export async function addAccount(data) {

  const user = auth.currentUser

  if (!user) {
    throw new Error("User not authenticated")
  }

  return addDoc(

    accountsCollection(),

    {

      userId: user.uid,

      name: data.name,

      type: data.type,

      subtype: data.subtype || null,

      balance: Number(data.balance || 0),

      currency: data.currency || "KES",

      description: data.description || "",

      createdAt: serverTimestamp(),

      updatedAt: serverTimestamp(),

    }

  )

}


/* =========================================
   UPDATE ACCOUNT
========================================= */

export async function updateAccount(id, data) {

  const user = auth.currentUser

  if (!user) {
    throw new Error("User not authenticated")
  }

  await updateDoc(

    doc(
      db,
      "users",
      user.uid,
      "accounts",
      id
    ),

    {

      ...data,

      updatedAt: serverTimestamp(),

    }

  )

}


/* =========================================
   DELETE ACCOUNT
========================================= */

export async function deleteAccount(id) {

  const user = auth.currentUser

  if (!user) {
    throw new Error("User not authenticated")
  }

  await deleteDoc(

    doc(
      db,
      "users",
      user.uid,
      "accounts",
      id
    )

  )

}


/* =========================================
   CHANGE ACCOUNT BALANCE
========================================= */

export async function updateAccountBalance(
  id,
  newBalance
) {

  const user = auth.currentUser

  if (!user) {
    throw new Error("User not authenticated")
  }

  await updateDoc(

    doc(
      db,
      "users",
      user.uid,
      "accounts",
      id
    ),

    {

      balance: Number(newBalance),

      updatedAt: serverTimestamp(),

    }

  )

}