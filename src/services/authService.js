import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth"

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore"

import { auth, db } from "../firebase/firebase"

/* ----------------------------------
   Register
----------------------------------- */

export async function registerUser({

  fullName,

  phone,

  country,

  currency,

  email,

  password,

}) {

  const credential = await createUserWithEmailAndPassword(

    auth,

    email,

    password

  )

  const user = credential.user

  await updateProfile(user, {

    displayName: fullName,

  })

  await setDoc(

    doc(db, "users", user.uid),

    {

      fullName,

      phone,

      country,

      currency,

      email,

      emailVerified: false,

      accountStatus: "active",

      createdAt: serverTimestamp(),

      lastLogin: serverTimestamp(),

    }

  )

  await sendEmailVerification(user)

  await signOut(auth)

}

/* ----------------------------------
   Login
----------------------------------- */

export async function loginUser(

  email,

  password

) {

  return signInWithEmailAndPassword(

    auth,

    email,

    password

  )

}

/* ----------------------------------
   Logout
----------------------------------- */

export async function logoutUser() {

  return signOut(auth)

}

/* ----------------------------------
   Forgot Password
----------------------------------- */

export async function forgotPassword(

  email

) {

  return sendPasswordResetEmail(

    auth,

    email

  )

}