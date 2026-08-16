import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore"

import {
  sendEmailVerification,
} from "firebase/auth"

import { db } from "../firebase/firebase"

/* -------------------------
   Create User Profile
------------------------- */

export async function createUserProfile(user, data) {

  await setDoc(

    doc(db, "users", user.uid),

    {

      uid: user.uid,

      fullName: data.fullName,

      email: user.email,

      phone: data.phone,

      country: data.country,

      currency: data.currency,

      createdAt: serverTimestamp(),

    }

  )

}

/* -------------------------
   Get Profile
------------------------- */

export async function getUserProfile(uid) {

  const snapshot = await getDoc(

    doc(db, "users", uid)

  )

  if (!snapshot.exists()) {

    return null

  }

  return {

    id: snapshot.id,

    ...snapshot.data(),

  }

}

/* -------------------------
   Update Profile
------------------------- */

export async function updateUserProfile(uid, data) {

  await updateDoc(

    doc(db, "users", uid),

    data

  )

}

/* -------------------------
   Resend Email Verification
------------------------- */

export async function resendVerificationEmail(user) {

  await sendEmailVerification(user)

}