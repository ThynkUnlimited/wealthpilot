import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore"

import { auth, db } from "../firebase/firebase"

const collectionRef = collection(db, "budgets")

export function subscribeToBudgets(callback) {

  const user = auth.currentUser

  if (!user) return () => {}

  const q = query(

    collectionRef,

    where("userId", "==", user.uid)

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

export async function addBudget(data) {

  const user = auth.currentUser

  await addDoc(collectionRef, {

    ...data,

    userId: user.uid,

    createdAt: new Date(),

  })

}

export async function updateBudget(id, data) {

  await updateDoc(

    doc(db, "budgets", id),

    data

  )

}

export async function deleteBudget(id) {

  await deleteDoc(

    doc(db, "budgets", id)

  )

}