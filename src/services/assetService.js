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

const assetCollection = () => {

  const user = auth.currentUser

  if (!user) {
    throw new Error("User not authenticated")
  }

  return collection(
    db,
    "users",
    user.uid,
    "assets"
  )

}


/* =====================================
   REALTIME ASSET SUBSCRIPTION
===================================== */

export function subscribeToAssets(callback) {

  const q = query(
    assetCollection(),
    orderBy("createdAt", "desc")
  )

  return onSnapshot(q, (snapshot) => {

    callback(

      snapshot.docs.map((document) => ({

        id: document.id,

        ...document.data(),

      }))

    )

  })

}


/* =====================================
   ADD ASSET
===================================== */

export async function addAsset(data) {

  await addDoc(

    assetCollection(),

    {

      ...data,

      value: Number(data.value || 0),

      status: "active",

      createdAt: serverTimestamp(),

    }

  )

}


/* =====================================
   UPDATE ASSET
===================================== */

export async function updateAsset(id, data) {

  await updateDoc(

    doc(
      db,
      "users",
      auth.currentUser.uid,
      "assets",
      id
    ),

    {

      ...data,

      ...(data.value !== undefined
        ? { value: Number(data.value) }
        : {}),

    }

  )

}


/* =====================================
   DELETE ASSET
===================================== */

export async function deleteAsset(id) {

  await deleteDoc(

    doc(
      db,
      "users",
      auth.currentUser.uid,
      "assets",
      id
    )

  )

}