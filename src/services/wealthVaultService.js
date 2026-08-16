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
  increment,
} from "firebase/firestore"

import { auth, db } from "../firebase/firebase"


/* =========================================
   USER WEALTH VAULT COLLECTION
========================================= */

const vaultCollection = () => {

  const user = auth.currentUser

  if (!user) {

    throw new Error("User not authenticated")

  }

  return collection(
    db,
    "users",
    user.uid,
    "wealthVaults"
  )

}


/* =========================================
   REALTIME VAULT SUBSCRIPTION
========================================= */

export function subscribeToWealthVaults(callback) {

  const q = query(
    vaultCollection(),
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


/* =========================================
   CREATE WEALTH VAULT
========================================= */

export async function addWealthVault(data) {

  const target = Number(data.target || 0)

  const monthlyContribution = Number(
    data.monthlyContribution || 0
  )

  await addDoc(

    vaultCollection(),

    {

      title: data.title,

      target,

      balance: 0,

      monthlyContribution,

      priority: data.priority || "Medium",

      icon: data.icon || "🔐",

      createdAt: serverTimestamp(),

    }

  )

}


/* =========================================
   UPDATE WEALTH VAULT
========================================= */

export async function updateWealthVault(
  id,
  data
) {

  await updateDoc(

    doc(
      db,
      "users",
      auth.currentUser.uid,
      "wealthVaults",
      id
    ),

    data

  )

}


/* =========================================
   DELETE WEALTH VAULT
========================================= */

export async function deleteWealthVault(id) {

  await deleteDoc(

    doc(
      db,
      "users",
      auth.currentUser.uid,
      "wealthVaults",
      id
    )

  )

}


/* =========================================
   DEPOSIT INTO WEALTH VAULT
========================================= */

export async function depositToWealthVault(
  id,
  amount
) {

  const deposit = Number(amount)

  if (!deposit || deposit <= 0) {

    throw new Error(
      "Deposit amount must be greater than zero"
    )

  }

  await updateDoc(

    doc(
      db,
      "users",
      auth.currentUser.uid,
      "wealthVaults",
      id
    ),

    {

      balance: increment(deposit),

    }

  )

}