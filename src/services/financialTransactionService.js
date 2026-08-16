import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore"

import { auth, db } from "../firebase/firebase"


/* =========================================
   TRANSACTION COLLECTION
========================================= */

const transactionsCollection = () => {

  const user = auth.currentUser

  if (!user) {
    throw new Error("User not authenticated")
  }

  return collection(
    db,
    "users",
    user.uid,
    "financialTransactions"
  )

}


/* =========================================
   CREATE TRANSACTION
========================================= */

export async function addFinancialTransaction(
  data
) {

  const user = auth.currentUser

  if (!user) {
    throw new Error("User not authenticated")
  }

  return addDoc(

    transactionsCollection(),

    {

      userId: user.uid,

      type: data.type,

      amount: Number(data.amount || 0),

      description:
        data.description || "",

      assetAccountId:
        data.assetAccountId || null,

      liabilityId:
        data.liabilityId || null,

      principalAllocated:
        Number(data.principalAllocated || 0),

      interestAllocated:
        Number(data.interestAllocated || 0),

      transactionDate:
        data.transactionDate ||
        new Date().toISOString(),

      createdAt: serverTimestamp(),

    }

  )

}


/* =========================================
   LOAN DISBURSEMENT
========================================= */

export async function recordLoanDisbursement({

  assetAccountId,

  liabilityId,

  amount,

  description,

}) {

  const user = auth.currentUser

  if (!user) {
    throw new Error("User not authenticated")
  }

  const loanAmount = Number(amount)

  if (loanAmount <= 0) {
    throw new Error(
      "Loan amount must be greater than zero"
    )
  }


  /* ================================
     CREATE TRANSACTION
  ================================= */

  await addFinancialTransaction({

    type: "LOAN_DISBURSEMENT",

    amount: loanAmount,

    description:
      description ||
      "Loan disbursement",

    assetAccountId,

    liabilityId,

  })


  /* ================================
     INCREASE ASSET
  ================================= */

  const assetRef = doc(

    db,

    "users",

    user.uid,

    "accounts",

    assetAccountId

  )

  /*

    IMPORTANT:

    We cannot safely calculate the new
    balance here without reading the
    current account first.

    The loan workflow will therefore
    use the account's current balance
    when the complete loan function
    is implemented.

  */

  return {

    success: true,

    amount: loanAmount,

    assetAccountId,

    liabilityId,

  }

}


/* =========================================
   RECORD LOAN REPAYMENT
========================================= */

export async function recordLoanRepayment({

  assetAccountId,

  liabilityId,

  amount,

  principalAllocated,

  interestAllocated,

  description,

}) {

  const repayment =
    Number(amount || 0)

  const principal =
    Number(principalAllocated || 0)

  const interest =
    Number(interestAllocated || 0)


  if (repayment <= 0) {

    throw new Error(
      "Repayment must be greater than zero"
    )

  }


  if (
    principal + interest !==
    repayment
  ) {

    throw new Error(
      "Principal plus interest must equal repayment amount"
    )

  }


  return addFinancialTransaction({

    type: "LOAN_REPAYMENT",

    amount: repayment,

    description:
      description ||
      "Loan repayment",

    assetAccountId,

    liabilityId,

    principalAllocated:
      principal,

    interestAllocated:
      interest,

  })

}